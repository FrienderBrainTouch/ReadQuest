import type { Content, ContentType } from '../data/books';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function getApiKey(): string | undefined {
  return import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
}

export function isAiAvailable(): boolean {
  return Boolean(getApiKey()?.trim());
}

/** 콘텐츠 타입별 1문제만 생성. 이미 낸 문제(previousQuestions)와 겹치지 않게. 더 만들 수 없으면 null */
export async function generateNextContent(params: {
  bookTitle: string;
  contentForPrompt: string;
  contentType: ContentType;
  previousQuestions: string[];
}): Promise<Content | null> {
  const key = getApiKey();
  if (!key?.trim()) return null;

  const typeFormats: Record<ContentType, string> = {
    ox_quiz: '{"type":"ox_quiz","question":"질문","correctAnswer":"O"또는"X","explanation":"설명"}',
    multiple_choice: '{"type":"multiple_choice","question":"질문","options":["보기1","보기2","보기3","보기4"],"correctIndex":0~3,"explanation":"설명"}',
    ordering: '{"type":"ordering","question":"순서를 맞춰 보세요","items":["첫번째","두번째",...],"explanation":"설명"}',
    fill_blank: '{"type":"fill_blank","sentence":"문장(빈칸 ___)","options":["보기1",...],"correctIndex":0~3,"explanation":"설명"}',
    emotion_stair: '도서별 확장 활동(미리 정의된 콘텐츠만 사용)',
    elimination_reasons: '도서별 확장 활동(미리 정의된 콘텐츠만 사용)',
    categorize: '도서별 확장 활동(미리 정의된 콘텐츠만 사용)',
    match_pairs: '도서별 확장 활동(미리 정의된 콘텐츠만 사용)',
    choice_with_result: '도서별 확장 활동(미리 정의된 콘텐츠만 사용)',
  };

  const systemPrompt = `당신은 초등학교 1~3학년 독서 교육용 학습 문제를 만드는 선생님입니다.
주어진 도서 내용을 바탕으로, 지정된 타입의 문제를 **정확히 1개만** JSON 배열로 출력하세요. 이모지 사용 금지. 존댓말로 설명하세요.
이미 출제한 문제(목록으로 전달됨)와 겹치지 않게 새로 만들어 주세요.
더 만들 문제가 없으면 빈 배열 [] 만 출력하세요.
각 타입 형식: ${typeFormats[params.contentType]}`;

  const prevText =
    params.previousQuestions.length > 0
      ? `\n이미 출제한 문제 목록(이와 겹치지 않게 새로 만들어 주세요):\n${params.previousQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
      : '';

  const userPrompt = `도서 제목: ${params.bookTitle}

도서 내용 요약:
${params.contentForPrompt}
${prevText}

위 도서에서 "${params.contentType}" 타입 문제를 1개만 만들어 주세요. (이미 낸 문제 제외) 없으면 [] 출력.`;

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 800,
        temperature: 0.6,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content?.trim() ?? '';
    const parsed = parseJsonArray(raw);
    const list = normalizeContents(parsed);
    const one = list.find((c) => c.type === params.contentType) ?? null;
    return one;
  } catch {
    return null;
  }
}

/** API 키 없으면 빈 배열 반환 (일괄 생성용, 현재는 사용 안 함) */
export async function generateContentsForBook(params: {
  bookTitle: string;
  contentForPrompt: string;
}): Promise<Content[]> {
  const key = getApiKey();
  if (!key?.trim()) return [];

  const systemPrompt = `당신은 초등학교 1~3학년 독서 교육을 위한 학습 콘텐츠를 만드는 선생님입니다.
주어진 도서 내용을 바탕으로, 아래 형식의 JSON 배열만 출력하세요. 이모지는 사용하지 마세요. 존댓말로 설명하세요.

각 타입(ox_quiz, multiple_choice, ordering, fill_blank)마다 가능한 한 고르게 최소 10개 이상의 문항이 나오도록 만들어 주세요:
1. ox_quiz: { "type": "ox_quiz", "question": "질문", "correctAnswer": "O" 또는 "X", "explanation": "설명" }
2. multiple_choice: { "type": "multiple_choice", "question": "질문", "options": ["보기1","보기2","보기3","보기4"], "correctIndex": 0~3, "explanation": "설명" }
3. ordering: { "type": "ordering", "question": "순서를 맞춰 보세요", "items": ["첫번째","두번째","세번째",...], "explanation": "설명" }
4. fill_blank: { "type": "fill_blank", "sentence": "자연스러운 문장 한 개. 빈칸은 반드시 ___ 한 곳만", "options": ["빈칸에 들어갈 말 네 개"], "correctIndex": 0~3, "explanation": "설명" }
   - fill_blank 작성 규칙:
     · sentence는 초등 1~3학년이 읽기 쉬운 자연스러운 문장으로, 빈칸은 ___ 로 한 군데만 둡니다.
     · 빈칸 앞뒤 문맥에 맞는 품사와 형태로 정답을 씁니다. 문장에 정답을 넣었을 때 반드시 자연스러운 한 문장이 되어야 합니다.
     · 예: "___ 노력하면 이길 수 있어요" → 정답은 "꾸준히"(부사)가 자연스럽습니다. "꾸준한"(관형사)은 "꾸준한 노력하면"처럼 어색하므로 쓰지 마세요.
     · 예: "___가 결승선에 먼저 도착했어요." → options는 "거북이가", "토끼가", "늑대가", "개미가" 처럼 주어+조사 형태.
     · 예: "토끼는 ___ 잤어요." → options는 "나무 아래에서", "침대에서" 처럼 완결된 말로 씁니다.
     · 조사·부사·관형사 등을 구분해서, 빈칸 채운 뒤 문장이 문법적으로 자연스럽게 읽히도록 options와 explanation을 작성하세요.

반드시 유효한 JSON 배열만 출력하고, 다른 글은 붙이지 마세요.`;

  const userPrompt = `도서 제목: ${params.bookTitle}

도서 내용 요약:
${params.contentForPrompt}

위 내용을 바탕으로 초등 1~3학년용 학습 콘텐츠를 충분히 많이 만들어 주세요.
각 타입(ox_quiz, multiple_choice, ordering, fill_blank)마다 최소 10문제 이상이 생성되도록 해 주세요.
fill_blank 문항은 다음을 지켜 주세요. (1) 빈칸에 정답을 넣었을 때 문장이 문법적으로 자연스러워야 합니다. "꾸준한 노력하면"처럼 관형사+동사가 어색한 조합이 되지 않게, "꾸준히 노력하면"처럼 부사형(꾸준히, 열심히 등)을 쓰세요. (2) 설명(explanation)에서도 같은 뜻을 자연스러운 문장으로 풀어 씁니다.`;

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 4000,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('OpenAI API error:', res.status, err);
      return [];
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content?.trim() ?? '';
    const parsed = parseJsonArray(raw);
    return normalizeContents(parsed);
  } catch (e) {
    console.warn('AI generate contents failed:', e);
    return [];
  }
}

function parseJsonArray(raw: string): Record<string, unknown>[] {
  const trimmed = raw.replace(/^```json?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  try {
    const arr = JSON.parse(trimmed);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function normalizeContents(arr: Record<string, unknown>[]): Content[] {
  const result: Content[] = [];
  arr.forEach((item, index) => {
    const type = item.type as ContentType | undefined;
    const id = `gen-${index}-${Date.now()}`;
    const order = index + 1;

    if (type === 'ox_quiz') {
      const q = String(item.question ?? '');
      const ans = String(item.correctAnswer ?? 'O').toUpperCase() === 'X' ? 'X' : 'O';
      const exp = String(item.explanation ?? '');
      if (q && exp) {
        result.push({ id, type: 'ox_quiz', question: q, correctAnswer: ans, explanation: exp, order });
      }
    } else if (type === 'multiple_choice') {
      const q = String(item.question ?? '');
      const opts = Array.isArray(item.options) ? (item.options as string[]).slice(0, 4) : [];
      const idx = Number(item.correctIndex);
      const correctIndex = opts.length > 0 ? Math.max(0, Math.min(idx, opts.length - 1)) : 0;
      const exp = String(item.explanation ?? '');
      if (q && opts.length > 0 && exp) {
        result.push({ id, type: 'multiple_choice', question: q, options: opts, correctIndex, explanation: exp, order });
      }
    } else if (type === 'ordering') {
      const q = String(item.question ?? '순서를 맞춰 보세요');
      const items = Array.isArray(item.items) ? (item.items as string[]) : [];
      const exp = String(item.explanation ?? '');
      if (items.length >= 2 && exp) {
        result.push({ id, type: 'ordering', question: q, items, explanation: exp, order });
      }
    } else if (type === 'fill_blank') {
      const sentence = String(item.sentence ?? '').replace(/\s*_{2,}\s*/g, ' ___ ');
      const opts = Array.isArray(item.options) ? (item.options as string[]).slice(0, 4) : [];
      const idx = Number(item.correctIndex);
      const correctIndex = opts.length > 0 ? Math.max(0, Math.min(idx, opts.length - 1)) : 0;
      const exp = String(item.explanation ?? '');
      if (sentence && opts.length > 0 && exp) {
        result.push({ id, type: 'fill_blank', sentence, options: opts, correctIndex, explanation: exp, order });
      }
    }
  });
  return result;
}
