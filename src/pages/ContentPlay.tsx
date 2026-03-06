import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../data/books';
import type {
  Content,
  ContentType,
  OxQuizContent,
  MultipleChoiceContent,
  OrderingContent,
  FillBlankContent,
  EmotionStairContent,
  EliminationReasonsContent,
  CategorizeContent,
  MatchPairsContent,
  ChoiceWithResultContent,
  CrisisResolutionContent,
  TogetherOutcomeContent,
  ListeningThreeStepContent,
} from '../data/books';
import { getPreGeneratedContents } from '../data/preGeneratedQuestions';
import { generateNextContent } from '../services/ai';
import styles from './ContentPlay.module.css';

function getQuestionText(c: Content): string {
  if (c.type === 'fill_blank') return c.sentence;
  if (c.type === 'choice_with_result') return c.situation;
  return 'question' in c ? (c as { question: string }).question : '';
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 설명 앞의 "정답은 … 예요/이에요." 또는 "맞아요. ", "아니에요. " 제거 (UI에서 정답 문구를 따로 넣으므로 중복 방지) */
function stripExplanationPrefix(text: string): string {
  return text
    // 따옴표 종류에 상관없이 "정답은 … 예요." / "정답은 … 이에요." 한 덩어리 제거 (중복 방지)
    .replace(/^정답은\s*.+?(이에요|예요)\.\s*/u, '')
    .replace(/^(맞아요\.\s*|아니에요\.\s*)/, '')
    .replace(/(\.\s*)(맞아요\.\s*|아니에요\.\s*)/, '$1');
}

/** "정답인 이유:" / "틀린 이유:" → "설명:"으로 바꾸고, 맞아요/아니에요 제거 */
function normalizeExplanation(text: string): string {
  let s = text;
  if (s.startsWith('정답인 이유:')) s = '설명: ' + s.slice('정답인 이유:'.length).trimStart();
  else if (s.startsWith('틀린 이유:')) s = '설명: ' + s.slice('틀린 이유:'.length).trimStart();
  const afterLabel = s.startsWith('설명: ') ? s.slice('설명: '.length) : s;
  return s.startsWith('설명: ') ? '설명: ' + stripExplanationPrefix(afterLabel) : stripExplanationPrefix(s);
}

export default function ContentPlay() {
  const { bookId, contentType } = useParams<{ bookId: string; contentType: ContentType }>();
  const navigate = useNavigate();
  const book = bookId ? getBookById(bookId) : undefined;

  const [questions, setQuestions] = useState<Content[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [noFirstQuestion, setNoFirstQuestion] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const isPreGeneratedMode = useRef(false);

  const handleBack = useCallback(() => {
    navigate(`/books/${bookId}`);
  }, [navigate, bookId]);

  useEffect(() => {
    if (!book || !contentType) return;
    if (questions.length > 0) return;

    const preGenerated = getPreGeneratedContents(book.id, contentType);
    if (preGenerated && preGenerated.length > 0) {
      isPreGeneratedMode.current = true;
      setQuestions(preGenerated);
      setLoadingFirst(false);
      return;
    }

    isPreGeneratedMode.current = false;
    let cancelled = false;
    setLoadingFirst(true);
    setNoFirstQuestion(false);
    generateNextContent({
      bookTitle: book.title,
      contentForPrompt: book.contentForPrompt,
      contentType,
      previousQuestions: [],
    })
      .then((one) => {
        if (cancelled) return;
        setLoadingFirst(false);
        if (one) {
          const withOrder = { ...one, order: 1 };
          setQuestions([withOrder]);
        } else {
          setNoFirstQuestion(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadingFirst(false);
          setNoFirstQuestion(true);
        }
      });
    return () => { cancelled = true; };
  }, [book?.id, contentType]);

  function handleNext() {
    const total = questions.length;
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setShowResult(false);
      return;
    }

    if (isPreGeneratedMode.current) {
      setNoMore(true);
      return;
    }

    if (!book || !contentType) return;
    setLoadingNext(true);
    const prevTexts = questions.map(getQuestionText);
    generateNextContent({
      bookTitle: book.title,
      contentForPrompt: book.contentForPrompt,
      contentType,
      previousQuestions: prevTexts,
    })
      .then((one) => {
        setLoadingNext(false);
        if (one) {
          setQuestions((q) => [...q, { ...one, order: q.length + 1 }]);
          setCurrentIndex(prevTexts.length);
          setShowResult(false);
        } else {
          setNoMore(true);
        }
      })
      .catch(() => {
        setLoadingNext(false);
        setNoMore(true);
      });
  }

  if (!book) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>책을 찾을 수 없어요.</p>
        <button type="button" className={styles.backBtn} onClick={() => navigate('/books')}>
          뒤로
        </button>
      </div>
    );
  }

  if (!contentType) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>활동을 선택해 주세요.</p>
        <button type="button" className={styles.backBtn} onClick={handleBack}>
          뒤로
        </button>
      </div>
    );
  }

  if (loadingFirst) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.loading}>잠시만 기다려 주세요...</p>
        </main>
      </div>
    );
  }

  if (noFirstQuestion) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.empty}>이 책에서는 이 활동 문제를 만들 수 없어요.</p>
          <button type="button" className={styles.backToContentBtn} onClick={handleBack}>
            활동 목록으로
          </button>
        </main>
      </div>
    );
  }

  if (noMore) {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            뒤로
          </button>
          <span className={styles.bookTitle}>{book.title}</span>
        </header>
        <main className={styles.main}>
          <p className={styles.finished}>모든 문제를 풀었어요!</p>
          <button type="button" className={styles.backToContentBtn} onClick={handleBack}>
            활동 목록으로
          </button>
        </main>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const total = questions.length;
  const current = questions[Math.min(currentIndex, total - 1)];
  const canRequestMore = !noMore;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={handleBack} aria-label="이전으로">
          뒤로
        </button>
        <span className={styles.bookTitle}>{book.title}</span>
      </header>
      <main className={styles.main}>
        {current.type === 'ox_quiz' && (
          <OxQuizPlay
            key={current.id}
            content={current as OxQuizContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'multiple_choice' && (
          <MultipleChoicePlay
            key={current.id}
            content={current as MultipleChoiceContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'ordering' && (
          <OrderingPlay
            key={current.id}
            content={current as OrderingContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'fill_blank' && (
          <FillBlankPlay
            key={current.id}
            content={current as FillBlankContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'emotion_stair' && (
          <EmotionStairPlay
            key={current.id}
            content={current as EmotionStairContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'elimination_reasons' && (
          <EliminationReasonsPlay
            key={current.id}
            content={current as EliminationReasonsContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'categorize' && (
          <CategorizePlay
            key={current.id}
            content={current as CategorizeContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'match_pairs' && (
          <MatchPairsPlay
            key={current.id}
            content={current as MatchPairsContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'choice_with_result' && (
          <ChoiceWithResultPlay
            key={current.id}
            content={current as ChoiceWithResultContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'crisis_resolution' && (
          <CrisisResolutionPlay
            key={current.id}
            content={current as CrisisResolutionContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'together_outcome' && (
          <TogetherOutcomePlay
            key={current.id}
            content={current as TogetherOutcomeContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
        {current.type === 'listening_three_step' && (
          <ListeningThreeStepPlay
            key={current.id}
            content={current as ListeningThreeStepContent}
            showResult={showResult}
            setShowResult={setShowResult}
            onBack={handleBack}
            onNext={handleNext}
            canRequestMore={canRequestMore}
            loadingNext={loadingNext}
            index={currentIndex}
          />
        )}
      </main>
    </div>
  );
}

interface PlayCommonProps {
  showResult: boolean;
  setShowResult: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  canRequestMore: boolean;
  loadingNext: boolean;
  index: number;
}

function OxQuizPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: OxQuizContent }) {
  const [selected, setSelected] = useState<'O' | 'X' | null>(null);
  const isCorrect = selected === content.correctAnswer;

  function handleAnswer(choice: 'O' | 'X') {
    if (showResult) return;
    setSelected(choice);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.oxSplit}>
          <button
            type="button"
            className={styles.oxHalf}
            data-side="o"
            onClick={() => handleAnswer('O')}
            aria-label="O 정답"
          >
            <span className={styles.oxLetter}>O</span>
          </button>
          <button
            type="button"
            className={styles.oxHalf}
            data-side="x"
            onClick={() => handleAnswer('X')}
            aria-label="X 정답"
          >
            <span className={styles.oxLetter}>X</span>
          </button>
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.answerLabel}>정답: {content.correctAnswer}</p>
          <p className={styles.explanation}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : isCorrect
                ? `설명: ${content.explanation}`
                : `설명: 정답은 ${content.correctAnswer}예요. ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function MultipleChoicePlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: MultipleChoiceContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [optionOrder] = useState<number[]>(() => shuffle(content.options.map((_, i) => i)));
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {optionOrder.map((origIdx) => (
            <button
              key={origIdx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(origIdx)}
            >
              {content.options[origIdx]}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.answerLabel}>정답: {content.options[content.correctIndex]}</p>
          <p className={styles.explanation}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : isCorrect
                ? `설명: ${content.explanation}`
                : `설명: 정답은 "${content.options[content.correctIndex]}"예요. ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function OrderingPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: OrderingContent }) {
  const [order, setOrder] = useState<number[]>(() =>
    shuffle(content.items.map((_, i) => i))
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const isCorrect = showResult && order.every((idx, i) => idx === i);

  function handleDragStart(e: React.DragEvent, listIndex: number) {
    if (showResult) return;
    setDraggedIndex(listIndex);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(listIndex));
    (e.currentTarget as HTMLElement).classList.add(styles.orderingItemDragging);
  }

  function handleDragOver(e: React.DragEvent, listIndex: number) {
    e.preventDefault();
    if (showResult || draggedIndex === null) return;
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(listIndex);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(e: React.DragEvent, dropListIndex: number) {
    e.preventDefault();
    setDragOverIndex(null);
    if (showResult || draggedIndex === null) return;
    if (draggedIndex === dropListIndex) {
      setDraggedIndex(null);
      return;
    }
    setOrder((prev) => {
      const next = [...prev];
      const [removed] = next.splice(draggedIndex, 1);
      next.splice(dropListIndex, 0, removed);
      return next;
    });
    setDraggedIndex(null);
  }

  function handleDragEnd(e: React.DragEvent) {
    (e.target as HTMLElement).classList.remove(styles.orderingItemDragging);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleCheck() {
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
        <p className={styles.orderingHint}>드래그해서 순서를 바꿔 보세요</p>
      </div>
      {!showResult ? (
        <div className={styles.orderingArea}>
          <ul className={styles.orderingList}>
            {order.map((itemIdx, listIndex) => (
              <li
                key={`${itemIdx}-${listIndex}`}
                className={`${styles.orderingItem} ${draggedIndex === listIndex ? styles.orderingItemDragging : ''} ${dragOverIndex === listIndex ? styles.orderingItemDragOver : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, listIndex)}
                onDragOver={(e) => handleDragOver(e, listIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, listIndex)}
                onDragEnd={handleDragEnd}
              >
                <span className={styles.orderingNum}>{listIndex + 1}</span>
                <span className={styles.orderingText}>{content.items[itemIdx]}</span>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.checkButton} onClick={handleCheck}>
            순서 확인하기
          </button>
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <div className={styles.orderingAnswerBlock}>
            <p className={styles.answerLabel}>정답 순서</p>
            <ol className={styles.orderingAnswerList}>
              {content.items.map((item, i) => (
                <li key={i} className={styles.orderingAnswerItem}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.answerLabel}>설명</p>
          <p className={`${styles.explanation} ${styles.explanationOrdering}`}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : `설명: ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FillBlankPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: FillBlankContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [optionOrder] = useState<number[]>(() => shuffle(content.options.map((_, i) => i)));
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.sentence}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {optionOrder.map((origIdx) => (
            <button
              key={origIdx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(origIdx)}
            >
              {content.options[origIdx]}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.answerLabel}>정답: {content.options[content.correctIndex]}</p>
          <p className={styles.explanation}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : isCorrect
                ? `설명: ${content.explanation}`
                : `설명: 정답은 "${content.options[content.correctIndex]}"예요. ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function EmotionStairPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: EmotionStairContent }) {
  const [itemToStep, setItemToStep] = useState<Record<number, number>>({});
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [itemOrder] = useState<number[]>(() => shuffle(content.items.map((_, i) => i)));
  const stepCount = content.steps.length;

  const assignItemToStep = (itemIndex: number, stepIndex: number) => {
    setItemToStep((prev) => ({ ...prev, [itemIndex]: stepIndex }));
  };

  const handleDragStart = (e: React.DragEvent, itemIndex: number) => {
    setDraggedItem(itemIndex);
    e.dataTransfer.setData('text/plain', String(itemIndex));
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (e: React.DragEvent, stepIndex: number) => {
    e.preventDefault();
    const idx = e.dataTransfer.getData('text/plain');
    if (idx !== '') assignItemToStep(Number(idx), stepIndex);
    setDraggedItem(null);
  };
  const handleDragEnd = () => setDraggedItem(null);

  const itemsByStep = Array.from({ length: stepCount }, (_, stepIdx) =>
    content.items
      .map((text, itemIdx) => ({ text, itemIdx }))
      .filter(({ itemIdx }) => itemToStep[itemIdx] === stepIdx)
  );
  const unassigned = content.items
    .map((text, itemIdx) => ({ text, itemIdx }))
    .filter(({ itemIdx }) => itemToStep[itemIdx] == null);
  const unassignedSorted = [...unassigned].sort(
    (a, b) => itemOrder.indexOf(a.itemIdx) - itemOrder.indexOf(b.itemIdx)
  );

  if (showResult) {
    const hasStepAnswers = content.correctPlacement && content.stepExplanations && content.stepExplanations.length >= stepCount;
    const userItemsByStep = Array.from({ length: stepCount }, (_, stepIdx) =>
      content.items
        .map((text, itemIdx) => ({ text, itemIdx }))
        .filter(({ itemIdx }) => itemToStep[itemIdx] === stepIdx)
    );
    return (
      <>
        <div className={styles.questionArea}>
          <p className={styles.question}>{index + 1}번 · {content.question}</p>
        </div>
        <div className={styles.resultArea}>
          {hasStepAnswers ? (
            <div className={styles.stairResultList}>
              {content.steps.map((step, stepIdx) => {
                const correctItemIndex = content.correctPlacement![stepIdx];
                const correctItemText = correctItemIndex != null ? content.items[correctItemIndex] : null;
                const stepExp = content.stepExplanations![stepIdx];
                const userCards = userItemsByStep[stepIdx] ?? [];
                const hasCorrect = userCards.some(({ itemIdx }) => itemIdx === correctItemIndex);
                const showCorrectHint = correctItemText != null && (userCards.length === 0 || !hasCorrect);
                return (
                  <div key={stepIdx} className={styles.stairResultItem}>
                    <span className={styles.stairResultStep}>{step}</span>
                    <div className={styles.stairResultCardsRow}>
                      {userCards.length > 0
                        ? userCards.map(({ text, itemIdx }) => {
                            const isCorrect = itemIdx === correctItemIndex;
                            return (
                              <span
                                key={itemIdx}
                                className={
                                  isCorrect ? styles.stairResultCardCorrect : styles.stairResultCardWrong
                                }
                              >
                                {text}
                              </span>
                            );
                          })
                        : null}
                      {showCorrectHint && (
                        <span className={styles.stairResultCardsWrap}>
                          {userCards.length === 0 && (
                            <span className={styles.stairResultCardEmpty}>배치하지 않음</span>
                          )}
                          <span className={styles.stairResultCardSep}>→ 정답:</span>
                          <span className={styles.stairResultCardCorrect}>{correctItemText}</span>
                        </span>
                      )}
                    </div>
                    {stepExp && <p className={styles.stairResultExplanation}>{stepExp}</p>}
                  </div>
                );
              })}
            </div>
          ) : null}
          {content.explanation && (
            <p className={styles.explanation}>{content.explanation}</p>
          )}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번 · {content.question}</p>
        <p className={styles.extensionHint}>카드를 감정 계단에 드래그해서 놓아 보세요.</p>
      </div>
      <div className={styles.extensionActivity}>
        <p className={styles.extensionLabel}>감정 계단 (아래→위: 외로움 → 따뜻함)</p>
        <div className={styles.stairZones}>
          {content.steps.map((step, stepIdx) => (
            <div
              key={stepIdx}
              className={styles.stairZone}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stepIdx)}
            >
              <span className={styles.stairStepLabel}>{step}</span>
              <div className={styles.stairStepCards}>
                {itemsByStep[stepIdx]?.map(({ text, itemIdx }) => (
                  <span
                    key={itemIdx}
                    className={styles.stairCard}
                    draggable
                    onDragStart={(e) => handleDragStart(e, itemIdx)}
                    onDragEnd={handleDragEnd}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {unassigned.length > 0 && (
          <>
            <p className={styles.extensionLabel}>배치할 사건 카드</p>
            <div className={styles.cardPool}>
              {unassignedSorted.map(({ text, itemIdx }) => (
                <span
                  key={itemIdx}
                  className={`${styles.stairCard} ${draggedItem === itemIdx ? styles.dragging : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, itemIdx)}
                  onDragEnd={handleDragEnd}
                >
                  {text}
                </span>
              ))}
            </div>
          </>
        )}
        <button type="button" className={styles.checkButton} onClick={() => setShowResult(true)}>
          확인하기
        </button>
      </div>
      <div className={styles.resultButtons}>
        <button type="button" className={styles.backToContentBtn} onClick={onBack}>
          활동 끝내기
        </button>
      </div>
    </>
  );
}

function EliminationReasonsPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: EliminationReasonsContent }) {
  const [removedIndices, setRemovedIndices] = useState<Set<number>>(new Set());
  const [displayOrder] = useState<number[]>(() => shuffle(content.reasons.map((_, i) => i)));

  const toggleRemoved = (i: number) => {
    if (showResult) return;
    setRemovedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const realSet = new Set(content.realReasonIndices);

  if (showResult) {
    return (
      <>
        <div className={styles.questionArea}>
          <p className={styles.question}>{index + 1}번 · {content.question}</p>
        </div>
        <div className={styles.resultArea}>
          <p className={styles.answerLabel}>정답/오답</p>
          <ul className={styles.cardList}>
            {displayOrder.map((origIdx) => {
              const r = content.reasons[origIdx];
              const isReal = realSet.has(origIdx);
              const removed = removedIndices.has(origIdx);
              const isCorrect = (isReal && !removed) || (!isReal && removed);
              const resultClass = removed
                ? styles.reasonResultRemoved
                : isCorrect
                  ? styles.reasonResultCorrect
                  : styles.reasonResultWrong;
              return (
                <li key={origIdx} className={resultClass}>
                  <span className={styles.reasonResultBadge}>
                    {removed ? '지운 이유' : isCorrect ? '정답' : '오답'}
                  </span>
                  {r}
                  {isReal && <span className={styles.reasonResultRealMark}> (진짜 이유)</span>}
                </li>
              );
            })}
          </ul>
          {content.explanation && (
            <p className={styles.explanation}>{content.explanation}</p>
          )}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번 · {content.question}</p>
        <p className={styles.extensionHint}>겉이유라고 생각되는 항목을 클릭해서 지워 보세요.</p>
      </div>
      <div className={styles.extensionActivity}>
        <ul className={styles.cardList}>
          {displayOrder.map((origIdx) => (
            <li
              key={origIdx}
              role="button"
              tabIndex={0}
              className={`${styles.reasonItem} ${removedIndices.has(origIdx) ? styles.reasonRemoved : ''}`}
              onClick={() => toggleRemoved(origIdx)}
              onKeyDown={(e) => e.key === 'Enter' && toggleRemoved(origIdx)}
            >
              {content.reasons[origIdx]}
            </li>
          ))}
        </ul>
        <button type="button" className={styles.checkButton} onClick={() => setShowResult(true)}>
          확인하기
        </button>
      </div>
      <div className={styles.resultButtons}>
        <button type="button" className={styles.backToContentBtn} onClick={onBack}>
          활동 끝내기
        </button>
      </div>
    </>
  );
}

function CategorizePlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: CategorizeContent }) {
  const [itemToCategory, setItemToCategory] = useState<Record<number, number>>({});
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [itemOrder] = useState<number[]>(() => shuffle(content.items.map((_, i) => i)));
  const n = content.categories.length;

  const assignItem = (itemIndex: number, catIndex: number) => {
    setItemToCategory((prev) => ({ ...prev, [itemIndex]: catIndex }));
  };

  const handleDragStart = (e: React.DragEvent, itemIndex: number) => {
    setDraggedItem(itemIndex);
    e.dataTransfer.setData('text/plain', String(itemIndex));
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (e: React.DragEvent, catIndex: number) => {
    e.preventDefault();
    const idx = e.dataTransfer.getData('text/plain');
    if (idx !== '') assignItem(Number(idx), catIndex);
    setDraggedItem(null);
  };
  const handleDragEnd = () => setDraggedItem(null);

  const correct = content.items.length && content.correctPlacement.length === content.items.length
    ? content.items.filter((_, i) => itemToCategory[i] === content.correctPlacement[i]).length
    : 0;
  const total = content.items.length;
  const isCorrect = total > 0 && correct === total;

  if (showResult) {
    return (
      <>
        <div className={styles.questionArea}>
          <p className={styles.question}>{index + 1}번 · {content.question}</p>
        </div>
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : `${correct}개 맞았어요`}
          </div>
          {content.explanation && (
            <p className={styles.explanation}>{content.explanation}</p>
          )}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      </>
    );
  }

  const byCategory = Array.from({ length: n }, (_, catIdx) =>
    content.items
      .map((text, itemIdx) => ({ text, itemIdx }))
      .filter(({ itemIdx }) => itemToCategory[itemIdx] === catIdx)
  );
  const unassigned = content.items
    .map((text, itemIdx) => ({ text, itemIdx }))
    .filter(({ itemIdx }) => itemToCategory[itemIdx] == null);
  const unassignedSorted = [...unassigned].sort(
    (a, b) => itemOrder.indexOf(a.itemIdx) - itemOrder.indexOf(b.itemIdx)
  );

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번 · {content.question}</p>
        <p className={styles.extensionHint}>카드를 시작·중간·끝 칸에 드래그해서 넣어 보세요.</p>
      </div>
      <div className={styles.extensionActivity}>
        <div className={styles.categorizeZones}>
          {content.categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className={styles.categorizeZone}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, catIdx)}
            >
              <p className={styles.extensionLabel}>{cat}</p>
              <div className={styles.categorizeCards}>
                {byCategory[catIdx]?.map(({ text, itemIdx }) => (
                  <span
                    key={itemIdx}
                    className={styles.categorizeCard}
                    draggable
                    onDragStart={(e) => handleDragStart(e, itemIdx)}
                    onDragEnd={handleDragEnd}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {unassigned.length > 0 && (
          <>
            <p className={styles.extensionLabel}>분류할 카드</p>
            <div className={styles.cardPool}>
              {unassignedSorted.map(({ text, itemIdx }) => (
                <span
                  key={itemIdx}
                  className={`${styles.categorizeCard} ${draggedItem === itemIdx ? styles.dragging : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, itemIdx)}
                  onDragEnd={handleDragEnd}
                >
                  {text}
                </span>
              ))}
            </div>
          </>
        )}
        <button type="button" className={styles.checkButton} onClick={() => setShowResult(true)}>
          확인하기
        </button>
      </div>
      <div className={styles.resultButtons}>
        <button type="button" className={styles.backToContentBtn} onClick={onBack}>
          활동 끝내기
        </button>
      </div>
    </>
  );
}

function MatchPairsPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: MatchPairsContent }) {
  const [leftToRight, setLeftToRight] = useState<Record<number, number>>({});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [leftOrder] = useState<number[]>(() => shuffle(content.leftItems.map((_, i) => i)));
  const [rightOrder] = useState<number[]>(() => shuffle(content.rightItems.map((_, i) => i)));
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [containerSize, setContainerSize] = useState({ w: 100, h: 100 });

  useLayoutEffect(() => {
    if (showResult || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    setContainerSize({ w: rect.width, h: rect.height });
    const pairs = Object.entries(leftToRight).map(([l, r]) => ({ left: Number(l), right: r }));
    if (pairs.length === 0) {
      setLineCoords([]);
      return;
    }
    const getCenter = (el: HTMLSpanElement | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
    };
    const coords: { x1: number; y1: number; x2: number; y2: number }[] = [];
    pairs.forEach(({ left, right }) => {
      const L = getCenter(leftDotRefs.current[left] ?? null);
      const R = getCenter(rightDotRefs.current[right] ?? null);
      if (L && R) coords.push({ x1: L.x, y1: L.y, x2: R.x, y2: R.y });
    });
    setLineCoords(coords);
  }, [leftToRight, showResult]);

  const correctSet = new Set(
    content.correctPairs.map(([l, r]) => `${l}-${r}`)
  );
  const userPairs = Object.entries(leftToRight).map(([l, r]) => ({
    left: Number(l),
    right: r,
    key: `${l}-${r}`,
  }));
  const correctCount = userPairs.filter((p) => correctSet.has(p.key)).length;
  const totalCorrect = content.correctPairs.length;
  const isCorrect = totalCorrect > 0 && correctCount === totalCorrect;

  const connectPair = (leftIdx: number, rightIdx: number) => {
    setLeftToRight((prev) => {
      const next: Record<number, number> = { ...prev };
      // 같은 왼쪽 카드에 기존 연결이 있으면 끊어준다.
      delete next[leftIdx];
      // 같은 오른쪽 카드에 연결된 다른 왼쪽 카드도 끊어준다.
      Object.entries(next).forEach(([lKey, r]) => {
        if (r === rightIdx && Number(lKey) !== leftIdx) {
          delete next[Number(lKey)];
        }
      });
      next[leftIdx] = rightIdx;
      return next;
    });
  };

  const handleLeftClick = (leftIdx: number) => {
    if (showResult) return;
    // 오른쪽이 먼저 선택된 상태에서 왼쪽을 눌러 연결하는 경우
    if (selectedRight != null && selectedLeft == null) {
      connectPair(leftIdx, selectedRight);
      setSelectedRight(null);
      return;
    }
    // 왼쪽 선택 토글/변경
    if (selectedLeft === leftIdx) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(leftIdx);
    setSelectedRight(null);
  };

  const handleRightClick = (rightIdx: number) => {
    if (showResult) return;
    // 왼쪽이 선택된 상태에서 오른쪽을 눌러 연결
    if (selectedLeft != null) {
      connectPair(selectedLeft, rightIdx);
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }
    // 오른쪽 선택 토글
    if (selectedRight === rightIdx) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(rightIdx);
  };

  if (showResult) {
    return (
      <>
        <div className={styles.questionArea}>
          <p className={styles.question}>{index + 1}번 · {content.question}</p>
        </div>
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : `${correctCount}개 맞았어요`}
          </div>
          {content.detailedExplanation ? (
            <div className={styles.detailedExplanation}>
              {content.detailedExplanation.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          ) : content.explanation ? (
            <p className={styles.explanation}>{content.explanation}</p>
          ) : null}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번 · {content.question}</p>
        <p className={styles.extensionHint}>말을 클릭한 뒤 결과를 클릭해서 짝을 지어 보세요.</p>
      </div>
      <div className={styles.extensionActivity} ref={containerRef}>
        <div className={styles.pairsGrid}>
          <div>
            <p className={styles.extensionLabel}>말</p>
            <ul className={styles.pairsList}>
              {leftOrder.map((origL) => (
                <li
                  key={origL}
                  role="button"
                  tabIndex={0}
                  className={
                    selectedLeft === origL
                      ? styles.pairSelected
                      : leftToRight[origL] != null
                        ? styles.pairMatched
                        : ''
                  }
                  data-selected={selectedLeft === origL ? 'true' : undefined}
                  onClick={() => handleLeftClick(origL)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLeftClick(origL)}
                >
                  <span className={styles.pairText}>{content.leftItems[origL]}</span>
                  <span
                    className={styles.pairDotRight}
                    ref={(el) => {
                      leftDotRefs.current[origL] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeftClick(origL);
                    }}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.extensionLabel}>결과</p>
            <ul className={styles.pairsList}>
              {rightOrder.map((origR) => (
                <li
                  key={origR}
                  role="button"
                  tabIndex={0}
                  className={
                    selectedLeft != null || selectedRight === origR
                      ? styles.pairRightHighlight
                      : ''
                  }
                  data-selected={selectedRight === origR ? 'true' : undefined}
                  onClick={() => handleRightClick(origR)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRightClick(origR)}
                >
                  <span
                    className={styles.pairDotLeft}
                    ref={(el) => {
                      rightDotRefs.current[origR] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRightClick(origR);
                    }}
                    aria-hidden
                  />
                  <span className={styles.pairText}>{content.rightItems[origR]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {lineCoords.length > 0 && (
          <svg className={styles.pairsLinesSvg} viewBox={`0 0 ${containerSize.w} ${containerSize.h}`} preserveAspectRatio="none">
            {lineCoords.map((c, idx) => (
              <line key={idx} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} className={styles.pairLine} />
            ))}
          </svg>
        )}
        <button type="button" className={styles.checkButton} onClick={() => setShowResult(true)}>
          확인하기
        </button>
      </div>
      <div className={styles.resultButtons}>
        <button type="button" className={styles.backToContentBtn} onClick={onBack}>
          활동 끝내기
        </button>
      </div>
    </>
  );
}

/** 문장 단위로 나누기 (마침표·물음표·느낌표 뒤 공백 또는 줄바꿈) */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?。])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ChoiceWithResultPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: ChoiceWithResultContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [optionOrder] = useState<number[]>(() => shuffle(content.options.map((_, i) => i)));

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  const situationLines = splitSentences(content.situation);
  const resultText = selectedIndex != null ? content.resultTexts[selectedIndex] : '';
  const resultLines = splitSentences(resultText);

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번</p>
        <div className={styles.situationBlock}>
          {situationLines.map((line, i) => (
            <p key={i} className={styles.situationLine}>{line}</p>
          ))}
        </div>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {optionOrder.map((origIdx) => (
            <button
              key={origIdx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(origIdx)}
            >
              {content.options[origIdx]}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          {resultLines.length > 0 && (
            <div className={styles.resultTextBlock}>
              {resultLines.map((line, i) => (
                <p key={i} className={styles.resultTextLine}>{line}</p>
              ))}
            </div>
          )}
          {content.explanation && (
            <p className={styles.explanation}>{content.explanation}</p>
          )}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CrisisResolutionPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: CrisisResolutionContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [optionOrder] = useState<number[]>(() => shuffle(content.options.map((_, i) => i)));
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {optionOrder.map((origIdx) => (
            <button
              key={origIdx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(origIdx)}
            >
              {content.options[origIdx]}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.answerLabel}>정답: {content.options[content.correctIndex]}</p>
          <p className={styles.explanation}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : isCorrect
                ? `설명: ${content.explanation}`
                : `설명: 정답은 "${content.options[content.correctIndex]}"예요. ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function TogetherOutcomePlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: TogetherOutcomeContent }) {
  const [itemToCategory, setItemToCategory] = useState<Record<number, number>>({});
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [itemOrder] = useState<number[]>(() => shuffle(content.items.map((_, i) => i)));
  const n = content.categories.length;

  const assignItem = (itemIndex: number, catIndex: number) => {
    setItemToCategory((prev) => ({ ...prev, [itemIndex]: catIndex }));
  };

  const handleDragStart = (e: React.DragEvent, itemIndex: number) => {
    setDraggedItem(itemIndex);
    e.dataTransfer.setData('text/plain', String(itemIndex));
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (e: React.DragEvent, catIndex: number) => {
    e.preventDefault();
    const idx = e.dataTransfer.getData('text/plain');
    if (idx !== '') assignItem(Number(idx), catIndex);
    setDraggedItem(null);
  };
  const handleDragEnd = () => setDraggedItem(null);

  const correct =
    content.items.length && content.correctPlacement.length === content.items.length
      ? content.items.filter((_, i) => itemToCategory[i] === content.correctPlacement[i]).length
      : 0;
  const total = content.items.length;
  const isCorrect = total > 0 && correct === total;

  if (showResult) {
    return (
      <>
        <div className={styles.questionArea}>
          <p className={styles.question}>{index + 1}번 · {content.question}</p>
        </div>
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : `${correct}개 맞았어요`}
          </div>
          {content.explanation && (
            <p className={styles.explanation}>{content.explanation}</p>
          )}
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button type="button" className={styles.checkButton} onClick={onNext} disabled={loadingNext}>
                {loadingNext ? '다음 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      </>
    );
  }

  const byCategory = Array.from({ length: n }, (_, catIdx) =>
    content.items
      .map((text, itemIdx) => ({ text, itemIdx }))
      .filter(({ itemIdx }) => itemToCategory[itemIdx] === catIdx)
  );
  const unassigned = content.items
    .map((text, itemIdx) => ({ text, itemIdx }))
    .filter(({ itemIdx }) => itemToCategory[itemIdx] == null);
  const unassignedSorted = [...unassigned].sort(
    (a, b) => itemOrder.indexOf(a.itemIdx) - itemOrder.indexOf(b.itemIdx)
  );

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>{index + 1}번 · {content.question}</p>
        <p className={styles.extensionHint}>카드를 혼자라면 / 함께라면 칸에 드래그해서 넣어 보세요.</p>
      </div>
      <div className={styles.extensionActivity}>
        <div className={styles.categorizeZones}>
          {content.categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className={styles.categorizeZone}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, catIdx)}
            >
              <p className={styles.extensionLabel}>{cat}</p>
              <div className={styles.categorizeCards}>
                {byCategory[catIdx]?.map(({ text, itemIdx }) => (
                  <span
                    key={itemIdx}
                    className={styles.categorizeCard}
                    draggable
                    onDragStart={(e) => handleDragStart(e, itemIdx)}
                    onDragEnd={handleDragEnd}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {unassigned.length > 0 && (
          <>
            <p className={styles.extensionLabel}>분류할 카드</p>
            <div className={styles.cardPool}>
              {unassignedSorted.map(({ text, itemIdx }) => (
                <span
                  key={itemIdx}
                  className={`${styles.categorizeCard} ${draggedItem === itemIdx ? styles.dragging : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, itemIdx)}
                  onDragEnd={handleDragEnd}
                >
                  {text}
                </span>
              ))}
            </div>
          </>
        )}
        <button type="button" className={styles.checkButton} onClick={() => setShowResult(true)}>
          확인하기
        </button>
      </div>
      <div className={styles.resultButtons}>
        <button type="button" className={styles.backToContentBtn} onClick={onBack}>
          활동 끝내기
        </button>
      </div>
    </>
  );
}

function ListeningThreeStepPlay({
  content,
  showResult,
  setShowResult,
  onBack,
  onNext,
  canRequestMore,
  loadingNext,
  index,
}: PlayCommonProps & { content: ListeningThreeStepContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [optionOrder] = useState<number[]>(() => shuffle(content.options.map((_, i) => i)));
  const isCorrect = selectedIndex === content.correctIndex;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelectedIndex(idx);
    setShowResult(true);
  }

  return (
    <>
      <div className={styles.questionArea}>
        <p className={styles.question}>
          {index + 1}번 · {content.question}
        </p>
        <p className={styles.extensionHint}>멈춘다 / 기울인다 / 기다린다 중에서 골라 보세요.</p>
      </div>
      {!showResult ? (
        <div className={styles.optionList}>
          {optionOrder.map((origIdx) => (
            <button
              key={origIdx}
              type="button"
              className={styles.optionButton}
              onClick={() => handleSelect(origIdx)}
            >
              {content.options[origIdx]}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.resultArea}>
          <div className={styles.resultBadge} data-correct={isCorrect}>
            {isCorrect ? '정답이에요!' : '다시 생각해 보세요'}
          </div>
          <p className={styles.answerLabel}>정답: {content.options[content.correctIndex]}</p>
          <p className={styles.explanation}>
            {content.explanationCorrect != null && content.explanationWrong != null
              ? normalizeExplanation(isCorrect ? content.explanationCorrect : content.explanationWrong)
              : isCorrect
                ? `설명: ${content.explanation}`
                : `설명: 정답은 "${content.options[content.correctIndex]}"예요. ${stripExplanationPrefix(content.explanation)}`}
          </p>
          <div className={styles.resultButtons}>
            {canRequestMore && (
              <button
                type="button"
                className={styles.checkButton}
                onClick={onNext}
                disabled={loadingNext}
              >
                {loadingNext ? '다음 문제 불러오는 중...' : '다음 문제'}
              </button>
            )}
            <button type="button" className={styles.backToContentBtn} onClick={onBack}>
              활동 끝내기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
