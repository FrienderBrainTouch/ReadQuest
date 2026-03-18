# 윌리가 보는 세상 (`book-willy`)

## 도서 원문 (contentForPrompt)

```text
윌리가 보는 세상. 여름 방학이 끝나갈 무렵 맞은편에 새 이웃이 이사 와 남자아이가 나를 쳐다보길래 손을 흔들었는데 녀석이 집으로 쏙 들어가 버렸다. 다음 날 그 애와 엄마가 찾아와 "같은 학교에 다니는데 둘이 함께 다니면 좋겠다"고 했고 나는 화가 났다(저 녀석이 어제 알은척도 안 했는데). 엄마가 "애비 이리 와서 윌리와 아주머니께 인사드리렴"이라 불러 나는 조그마한 목소리로 "안녕" 했고, 윌리가 "안녕 애비, 난 윌리라고 해. 네 손을 잡아도 될까?"라고 물었다. 윌리의 엄마가 "윌리는 눈이 보이지 않는단다. 네가 친구가 되어 윌리랑 함께 학교에 다녀 주면 좋겠구나"라고 했다. 나는 매일 윌리와 등하교하게 되었고 윌리는 길에서 마주하는 모든 일을 신기해해 덕분에 나도 탐험하게 됐다. 걸을 때 윌리는 내 팔꿈치를 잡았고 그렇게 해야 마음을 놓을 수 있다고 했다. 윌리는 점자(점으로 이루어진 글자)를 손가락 끝으로 읽고, 내가 평범하다고 느끼는 것들이 윌리에게는 평범하지 않다고 한다. 꿀벌 윙윙 소리도 윌리에게는 너무 커서 겁이 난다고 했다. 윌리는 수업에서 이해 못한 부분을 녹음해 집에서 몇 번이고 다시 듣고, 교과서는 글자가 점으로 되어 있고 그림도 볼록하게 솟아 있어 손으로 읽을 수 있다. "교과서를 손으로 꼼꼼히 만져야 아주 작은 부분까지 놓치지 않을 수 있다"고 윌리는 말했다. 윌리는 눈을 감고도 귀와 손으로 세상을 "보는" 마법사 같다. 한 번은 윌리네에서 정전이 나 캄캄해졌는데 윌리는 집 안 방향을 다 알고 복도 문 위치까지 정확히 찾아 나를 화장실에 데려다줬다. 바닷가에서는 코로 짭짤한 바닷바람, 발가락으로 조약돌의 따스한 햇볕, 귀로 행복한 웃음소리를 "보았"다. 공원에서는 손가락으로 촉촉한 잔디, 귀로 풀숲의 새와 달리는 강아지 소리를 "보았"다. 윌리는 고양이 마리를 울음소리(다정해서 다르다), 털이 곧고 가지런해 만지면 알아챔, 허브 차 같은 향기로 알아보는데 마트에서는 마리와 같은 향을 맡아 본 적이 없다고 한다. 반 아이들이 나쁜 말을 할 때 나는 화가 나지만 대꾸를 안 하는데, 윌리는 내가 화난 걸 손이 바들바들 떨리고 목소리가 가라앉은 걸로 알아차리고 공원으로 데려가 아이스크림을 함께 먹자고 한다. 윌리는 상대가 거짓말하는지 말투로 "느낄 수 있었다"고 한다. 할아버지가 세상을 떠난 날 나는 눈물을 흘리지 않아 친척들이 이상하다고 수군거렸지만, 윌리가 손을 잡고 꼬옥 안아 주며 등을 토닥이자 눈물이 주르륵 흘러내렸다. 윌리는 내 슬픔을 알아본 첫 번째 사람이었다. "사랑도 볼 수 있어?" "사랑은 느낄 수 있는 것 같아. 선생님이 어깨에 손을 얹고 물을 때, 아빠가 사랑해라고 할 때, 엄마가 품에 안아 줄 때… 매일 느껴." "그럼 나도 사랑을 느낄 수 있는 것 같아." "너랑 내가 함께 아이스크림 먹을 때야!"
```

## 활동 데이터 (문제/정답/설명 원본)

> 아래 코드는 `src/data/preGeneratedQuestions.ts`에서 해당 도서 섹션을 **그대로** 복사한 것입니다.

```ts
// ---------- 윌리가 보는 세상 (book-willy) ----------
const willyOx: Content[] = withIdsAndOrder(
  [
    { type: 'ox_quiz', question: '윌리는 눈이 보이지 않는 친구입니다.', correctAnswer: 'O', explanation: '정답인 이유: 윌리의 엄마가 "윌리는 눈이 보이지 않는단다"라고 말했어요. 윌리는 시각장애가 있어 손가락으로 점자를 읽고, 귀와 코와 손으로 세상을 느껴요. 틀린 이유: X라고 생각했다면, 이야기에서 윌리가 눈이 보이지 않는다고 분명히 나와 있어요.' },
    { type: 'ox_quiz', question: '윌리는 애비와 같은 학교에 다닙니다.', correctAnswer: 'O', explanation: '정답인 이유: 윌리 엄마가 "우리 애도 같은 학교에 다니는데, 둘이 함께 다니면 좋겠네요!"라고 했어요. 그래서 애비는 매일 윌리와 같이 등하교하게 됐어요. 틀린 이유: X라고 생각했다면, 같은 학교에 다닌다고 이야기에 나와 있어요.' },
    { type: 'ox_quiz', question: '걸을 때 윌리는 애비의 손을 잡았어요.', correctAnswer: 'X', explanation: '정답인 이유: 아니에요. 윌리는 애비의 "팔꿈치"를 잡았어요. "앞으로 걸어갈 때 윌리는 내 팔꿈치를 잡았어요. 그렇게 해야 자기가 마음을 놓을 수 있다고 하더라고요." 틀린 이유: O라고 생각했다면, 손이 아니라 팔꿈치를 잡는다고 나와 있어요.' },
    { type: 'ox_quiz', question: '윌리는 점으로 이루어진 글자를 손가락 끝으로 읽어요.', correctAnswer: 'O', explanation: '정답인 이유: 맞아요. "윌리는 조금 특별한 아이예요. 점으로 이루어진 글자들을 손가락 끝으로 읽거든요." 이 글자가 바로 점자예요. 틀린 이유: X라고 생각했다면, 점자(점으로 된 글자)를 손가락으로 읽는다고 나와 있어요.' },
    { type: 'ox_quiz', question: '꿀벌이 윙윙 거리는 소리는 윌리에게 작게 들려요.', correctAnswer: 'X', explanation: '정답인 이유: 아니에요. "꿀벌이 윙윙 날갯짓하는 소리도 윌리에게는 너무 크게 들려서 겁이 난다고 하더라고요." 윌리에게는 그 소리가 너무 커서 무서웠어요. 틀린 이유: O라고 생각했다면, 너무 "크게" 들린다고 했어요.' },
    { type: 'ox_quiz', question: '정전이 났을 때 윌리가 애비를 화장실로 데려다줬어요.', correctAnswer: 'O', explanation: '정답인 이유: 맞아요. "한 번은 윌리네 집에서 놀고 있는데 갑자기 정전이 돼서 집 안이 온통 캄캄해졌지 뭐예요. 하지만 윌리는 집 안의 모든 방향을 알고 있었어요. 복도에 있는 문 하나하나의 위치까지 정확하게 찾아 나를 금세 화장실에 데려다주었답니다." 틀린 이유: X라고 생각했다면, 윌리가 어둠 속에서 길을 안내해 줬다고 나와 있어요.' },
    { type: 'ox_quiz', question: '윌리의 고양이 이름은 마리예요.', correctAnswer: 'O', explanation: '정답인 이유: 맞아요. "윌리는 듣고, 만지고, 냄새를 맡아서 자신의 고양이 마리를 알아보기도 해요." 마리는 울음소리, 털 감촉, 허브 차 같은 향기로 알아챌 수 있대요. 틀린 이유: X라고 생각했다면, 고양이 이름이 마리라고 나와 있어요.' },
    { type: 'ox_quiz', question: '할아버지가 세상을 떠난 날 애비는 눈물을 흘렸어요.', correctAnswer: 'X', explanation: '정답인 이유: 아니에요. "슬퍼서 엉엉 우는 엄마, 아빠와 달리 나는 눈물을 흘리지 않았어요." 친척들은 이상하다고 수군거렸지만, 윌리가 손을 잡고 꼬옥 안아 주며 등을 토닥여 주자 그때서야 눈물이 주르륵 흘러내렸어요. 틀린 이유: O라고 생각했다면, 처음엔 눈물을 흘리지 않았다고 나와 있어요.' },
    { type: 'ox_quiz', question: '윌리는 상대가 거짓말하는지 말투로 알아차릴 수 있어요.', correctAnswer: 'O', explanation: '정답인 이유: 맞아요. "때로 윌리는 상대가 거짓말을 하는지 아닌지도 쉽게 알아차려요." "너한테 말하는 말투가 너무 이상했거든. 그냥 느낄 수 있었어."라고 윌리가 말했어요. 틀린 이유: X라고 생각했다면, 거짓말을 말투로 느낀다고 나와 있어요.' },
    { type: 'ox_quiz', question: '윌리는 사랑을 눈으로 볼 수 있어요.', correctAnswer: 'X', explanation: '정답인 이유: 아니에요. 애비가 "사랑도 볼 수 있어?"라고 묻자 윌리가 "음… 난 사랑을 느낄 수 있는 것 같아."라고 했어요. 선생님의 손, 아빠의 말, 엄마의 품에 안길 때 차고 넘치는 사랑을 "느낀다"고 했지, "본다"고 하지 않았어요. 틀린 이유: O라고 생각했다면, 윌리는 사랑을 "느끼는" 것 같다고 했어요.' },
  ],
  'willy-ox'
);

const willyMultiple: Content[] = withIdsAndOrder(
  [
    { type: 'multiple_choice', question: '윌리는 무엇으로 글자를 읽을까요?', options: ['눈', '손가락', '귀', '발'], correctIndex: 1, explanation: '정답은 손가락이에요. 점으로 이루어진 글자(점자)를 손가락 끝으로 읽어요.', explanationCorrect: '맞아요. "점으로 이루어진 글자들을 손가락 끝으로 읽거든요."라고 나와 있어요. 점자를 손으로 읽어요.', explanationWrong: '정답은 "손가락"이에요. 윌리는 점자를 손가락 끝으로 읽어요.' },
    { type: 'multiple_choice', question: '걸을 때 윌리는 애비의 어디를 잡았을까요?', options: ['손', '팔꿈치', '어깨', '옷자락'], correctIndex: 1, explanation: '팔꿈치를 잡았어요. 그렇게 해야 마음을 놓을 수 있다고 했어요.', explanationCorrect: '맞아요. "윌리는 내 팔꿈치를 잡았어요. 그렇게 해야 자기가 마음을 놓을 수 있다고 하더라고요."', explanationWrong: '정답은 "팔꿈치"예요. 손이 아니라 팔꿈치를 잡았어요.' },
    { type: 'multiple_choice', question: '윌리가 수업에서 이해하지 못한 부분은 어떻게 해요?', options: ['선생님에게 다시 물어요', '친구에게 물어요', '녹음한 다음 집에서 몇 번이고 다시 들어요', '그냥 넘어가요'], correctIndex: 2, explanation: '녹음을 한 다음 집에 와서 몇 번이고 다시 들어요.', explanationCorrect: '맞아요. "수업 시간에 이해하지 못한 부분은 녹음을 한 다음 집에 와서 몇 번이고 다시 듣는대요."', explanationWrong: '정답은 "녹음한 다음 집에서 몇 번이고 다시 듣기"예요.' },
    { type: 'multiple_choice', question: '바닷가에서 윌리가 "코로 봤다"고 한 것은 무엇일까요?', options: ['파도 소리', '짭짤한 바닷바람', '따스한 햇볕', '웃음소리'], correctIndex: 1, explanation: '짭짤한 바닷바람이에요. 코로 냄새를 맡아서 "봤어요."', explanationCorrect: '맞아요. "윌리는 코로 짭짤한 바닷바람을 보고"라고 나와 있어요. 냄새로 바닷바람을 느꼈어요.', explanationWrong: '정답은 "짭짤한 바닷바람"이에요. 코로 냄새를 맡았어요.' },
    { type: 'multiple_choice', question: '윌리가 화가 난 애비를 어떻게 도와줄까요?', options: ['말로 위로해요', '공원으로 데려가 아이스크림을 함께 먹자고 해요', '집에 데려다줘요', '선생님에게 말해요'], correctIndex: 1, explanation: '공원으로 데려가 아이스크림을 함께 먹자고 해요.', explanationCorrect: '맞아요. "그럴 때 윌리는 나를 공원으로 데려가 아이스크림을 함께 먹자고 해요."', explanationWrong: '정답은 "공원으로 데려가 아이스크림을 함께 먹자고 하기"예요.' },
    { type: 'multiple_choice', question: '윌리가 애비의 화남을 어떻게 알아챌까요?', options: ['얼굴 표정을 봐요', '바들바들 떨리는 손과 가라앉은 목소리를 느껴요', '친구들이 말해 줘요', '엄마가 알려 줘요'], correctIndex: 1, explanation: '손이 바들바들 떨리고 목소리가 잔뜩 가라앉은 걸 만지고 들으면 알아차려요.', explanationCorrect: '맞아요. "그런데 윌리는 내가 화난 걸 금방 알아차려요. 바들바들 떨고 있는 손을 만지고 잔뜩 가라앉은 목소리를 들으면 바로 \'알아볼\' 수 있대요."', explanationWrong: '정답은 "손이 떨리고 목소리가 가라앉은 걸 느끼기"예요. 윌리는 눈이 보이지 않아 손과 귀로 알아차려요.' },
    { type: 'multiple_choice', question: '윌리의 교과서는 어떤가요?', options: ['일반 책과 똑같아요', '글자가 점으로 되어 있고 그림도 볼록하게 솟아 있어 손으로 읽을 수 있어요', '큰 글씨로만 되어 있어요', '오디오로만 들어요'], correctIndex: 1, explanation: '글자가 점(점자)으로 되어 있고 그림도 볼록하게 솟아 있어 손으로 읽을 수 있어요.', explanationCorrect: '맞아요. "윌리의 교과서도 아주 특별해요. 글자가 많은 점으로 되어 있고 그림도 볼록하게 솟아 있어서 손으로 읽을 수 있어요."', explanationWrong: '정답은 "점자와 볼록한 그림으로 손으로 읽을 수 있는 교과서"예요.' },
    { type: 'multiple_choice', question: '애비가 슬플 때 윌리는 어떻게 했나요?', options: ['말로 위로했어요', '손을 잡고 꼬옥 안아 주며 가만히 등을 토닥였어요', '아이스크림을 사 줬어요', '공원에 데려갔어요'], correctIndex: 1, explanation: '한마디 말도 없이 손을 잡고 꼬옥 안아 주며 가만히 등을 토닥였어요.', explanationCorrect: '맞아요. "그런데 나를 찾아온 윌리가 손을 잡더니 꼬옥 안아 주며 가만히 등을 토닥이는 거예요. 한마디 말도 없이요."', explanationWrong: '정답은 "손을 잡고 꼬옥 안아 주며 등을 토닥이기"예요. 말 없이 함께해 줬어요.' },
    { type: 'multiple_choice', question: '애비가 사랑을 느낀 순간은 언제라고 했나요?', options: ['선생님이 칭찬할 때', '윌리랑 함께 아이스크림을 먹을 때', '엄마가 안아 줄 때', '아빠가 차로 데려다줄 때'], correctIndex: 1, explanation: '윌리와 함께 아이스크림을 먹을 때예요.', explanationCorrect: '맞아요. "알겠다! 그럼 나도 사랑을 느낄 수 있는 것 같아." "그건 바로 너랑 내가 함께 아이스크림을 먹을 때야!"', explanationWrong: '정답은 "너랑 내가 함께 아이스크림을 먹을 때"예요.' },
    { type: 'multiple_choice', question: '윌리가 마리를 알아보는 방법이 아닌 것은?', options: ['마리의 울음소리', '털이 곧고 가지런한 감촉', '허브 차 같은 향기', '눈으로 마리의 모습을 봐요'], correctIndex: 3, explanation: '윌리는 눈이 보이지 않아 눈으로 보지 않아요. 듣고, 만지고, 냄새를 맡아서 마리를 알아봐요.', explanationCorrect: '맞아요. "윌리는 듣고, 만지고, 냄새를 맡아서 자신의 고양이 마리를 알아보기도 해요." 눈으로 보는 건 아니에요.', explanationWrong: '"눈으로 마리의 모습을 본다"가 틀린 거예요. 윌리는 눈이 보이지 않아요.' },
  ],
  'willy-mc'
);

const willyFillBlank: Content[] = withIdsAndOrder(
  [
    { type: 'fill_blank', sentence: '윌리는 점으로 이루어진 글자를 손가락으로 읽습니다. 이 글자를 (  )라고 합니다.', options: ['점자', '한글', '영어', '숫자'], correctIndex: 0, explanation: '정답은 "점자"예요. 눈이 보이지 않는 사람이 손가락으로 읽는 점으로 된 글자예요.', explanationCorrect: '맞아요. "윌리는 조금 특별한 아이예요. 점으로 이루어진 글자들을 손가락 끝으로 읽거든요."라고 이야기에 나와 있어요. 이 점으로 된 글자가 바로 점자예요. 윌리는 눈이 보이지 않아서 눈 대신 손가락 끝으로 점자를 읽고, 교과서도 글자가 점으로 되어 있고 그림이 볼록하게 솟아 있어 손으로 꼼꼼히 만져 읽어요.', explanationWrong: '정답은 "점자"예요. 한글, 영어, 숫자가 아니라 "점으로 이루어진 글자"를 점자라고 해요. 눈이 보이지 않는 사람이 손가락으로 읽는 글자가 점자예요.' },
    { type: 'fill_blank', sentence: '걸을 때 윌리는 애비의 (  )를 잡았어요.', options: ['팔꿈치', '손', '어깨', '옷'], correctIndex: 0, explanation: '정답은 "팔꿈치"예요. 그렇게 해야 마음을 놓을 수 있다고 했어요.', explanationCorrect: '맞아요. "앞으로 걸어갈 때 윌리는 내 팔꿈치를 잡았어요. 그렇게 해야 자기가 마음을 놓을 수 있다고 하더라고요."라고 나와 있어요. 윌리는 손이 아니라 팔꿈치를 잡고 걸어서 마음을 놓을 수 있었어요. 그래서 애비와 매일 함께 등하교하게 됐대요.', explanationWrong: '정답은 "팔꿈치"예요. 윌리가 잡은 것은 손, 어깨, 옷이 아니라 "팔꿈치"예요. "윌리는 내 팔꿈치를 잡았어요"라고 분명히 나와 있어요. 그렇게 해야 마음을 놓을 수 있다고 했어요.' },
    { type: 'fill_blank', sentence: '윌리는 수업에서 이해하지 못한 부분을 (  )한 다음 집에서 몇 번이고 다시 들어요.', options: ['녹음', '쓰기', '그리기', '읽기'], correctIndex: 0, explanation: '정답은 "녹음"이에요. 녹음을 해서 집에서 반복해서 들어요.', explanationCorrect: '맞아요. "수업 시간에 이해하지 못한 부분은 녹음을 한 다음 집에 와서 몇 번이고 다시 듣는대요."라고 나와 있어요. 윌리는 눈이 보이지 않아서 교과서를 점자로 읽지만, 수업에서 못 따라간 부분은 녹음해 두고 집에서 반복해서 들어요. 그만큼 배우려는 마음이 있는 거예요.', explanationWrong: '정답은 "녹음"이에요. 쓰기, 그리기, 읽기가 아니라 "녹음"한 다음 집에서 다시 들어요. "녹음을 한 다음 집에 와서 몇 번이고 다시 듣는대요"라고 이야기에 나와 있어요.' },
    { type: 'fill_blank', sentence: '윌리는 바닷가에서 발가락으로 조약돌에 내려앉은 (  ) 햇볕을 "봤어요."', options: ['따스한', '차가운', '뜨거운', '촉촉한'], correctIndex: 0, explanation: '정답은 "따스한"이에요. 발가락으로 따스한 햇볕을 느꼈어요.', explanationCorrect: '맞아요. "윌리는 코로 짭짤한 바닷바람을 보고 발가락으로 동글동글 조약돌에 내려앉은 따스한 햇볕을 보고 귀로 모래사장 위 사람들의 행복한 웃음소리를 보았어요."라고 나와 있어요. 윌리는 눈으로 보지 않고 발가락 촉감으로 햇볕의 따스함을 "봤"어요. 눈이 보이지 않아도 감각으로 세상을 보는 거예요.', explanationWrong: '정답은 "따스한"이에요. 차가운, 뜨거운, 촉촉한이 아니라 "따스한" 햇볕이에요. "발가락으로 동글동글 조약돌에 내려앉은 따스한 햇볕을 보고"라고 나와 있어요.' },
    { type: 'fill_blank', sentence: '윌리의 고양이 (  )는 울음소리가 다정해서 다른 고양이들과 달라요.', options: ['마리', '나비', '초코', '콩이'], correctIndex: 0, explanation: '정답은 "마리"예요. 윌리의 고양이 이름이 마리예요.', explanationCorrect: '맞아요. "윌리는 듣고, 만지고, 냄새를 맡아서 자신의 고양이 마리를 알아보기도 해요. 마리의 울음소리는 다정해서 다르다, 털이 곧고 가지런해 만지면 알아챔, 허브 차 같은 향기로 알아보는데"라고 나와 있어요. 윌리는 눈이 보이지 않아도 마리의 울음소리, 털 감촉, 냄새로 마리를 알아봐요.', explanationWrong: '정답은 "마리"예요. 윌리의 고양이 이름은 나비, 초코, 콩이가 아니라 "마리"예요. "자신의 고양이 마리를 알아보기도 해요. 마리의 울음소리는 다정해서"라고 이야기에 나와 있어요.' },
    { type: 'fill_blank', sentence: '윌리는 내가 화난 걸 (  ) 떨고 있는 손을 만지고 가라앉은 목소리를 들으면 알아차려요.', options: ['바들바들', '반짝반짝', '살랑살랑', '둥실둥실'], correctIndex: 0, explanation: '정답은 "바들바들"이에요. 손이 떨리는 걸 만지고 목소리를 들어서 화남을 알아챠요.', explanationCorrect: '맞아요. "그런데 윌리는 내가 화난 걸 금방 알아차려요. 바들바들 떨고 있는 손을 만지고 잔뜩 가라앉은 목소리를 들으면 바로 \'알아볼\' 수 있대요."라고 나와 있어요. 윌리는 눈이 보이지 않지만 손의 떨림과 목소리 변화를 느껴서 애비의 화남을 알아차리고, 그럴 때마다 공원으로 데려가 아이스크림을 함께 먹자고 해요.', explanationWrong: '정답은 "바들바들"이에요. 반짝반짝, 살랑살랑, 둥실둥실이 아니라 손이 "바들바들" 떨리는 걸 만지고 가라앉은 목소리를 들어서 화남을 알아차려요. "바들바들 떨고 있는 손을 만지고"라고 나와 있어요.' },
    { type: 'fill_blank', sentence: '할아버지가 세상을 떠난 날 윌리가 애비를 꼬옥 안아 주자 눈물이 (  ) 흘러내렸어요.', options: ['주르륵', '뚝뚝', '반짝', '쏴아'], correctIndex: 0, explanation: '정답은 "주르륵"이에요. 윌리의 포근한 안아줌에 눈물이 쏟아졌어요.', explanationCorrect: '맞아요. "슬퍼서 엉엉 우는 엄마, 아빠와 달리 나는 눈물을 흘리지 않았어요."라고 했지만, "그런데 나를 찾아온 윌리가 손을 잡더니 꼬옥 안아 주며 가만히 등을 토닥이는 거예요. 한마디 말도 없이요. 그 순간 눈에서 눈물이 주르륵 흘러내렸어요."라고 나와 있어요. 윌리가 말 없이 안아 주자 그제서야 애비의 눈물이 나왔어요. 윌리가 슬픔을 알아본 첫 번째 사람이었대요.', explanationWrong: '정답은 "주르륵"이에요. 뚝뚝, 반짝, 쏴아가 아니라 "주르륵" 흘러내렸어요. "그 순간 눈에서 눈물이 주르륵 흘러내렸어요"라고 나와 있어요. 윌리의 안아줌에 그제서야 눈물이 났대요.' },
    { type: 'fill_blank', sentence: '윌리는 사랑을 "볼" 수 있는 게 아니라 (  ) 수 있는 것 같다고 했어요.', options: ['느낄', '들을', '맡을', '만질'], correctIndex: 0, explanation: '정답은 "느낄"이에요. 선생님의 손, 아빠의 말, 엄마의 품에 안길 때 사랑을 느껴요.', explanationCorrect: '맞아요. 애비가 "사랑도 볼 수 있어?"라고 묻자 윌리가 "음… 난 사랑을 느낄 수 있는 것 같아."라고 했어요. "선생님이 내 어깨에 손을 얹고 오늘 잘 지냈냐고 물으실 때, 아빠가 차로 나를 학교에 데려다주면서 \'사랑해, 우리 아들.\'이라고 말할 때, 그리고 엄마가 나를 품에 꼭 안아 줄 때… 난 매일 느낄 수 있어, 차고 넘치는 사랑을."라고 했대요. 윌리는 사랑을 눈으로 보는 게 아니라 느끼는 거예요.', explanationWrong: '정답은 "느낄"이에요. 윌리가 한 말은 들을, 맡을, 만질이 아니라 "난 사랑을 느낄 수 있는 것 같아"였어요. "음… 난 사랑을 느낄 수 있는 것 같아"라고 나와 있어요.' },
    { type: 'fill_blank', sentence: '정전이 났을 때 윌리는 집 안의 모든 (  )을/를 알고 있어서 애비를 화장실에 데려다줬어요.', options: ['방향', '창문', '가구', '전등'], correctIndex: 0, explanation: '정답은 "방향"이에요. 어둠 속에서도 집 구조를 다 알아요.', explanationCorrect: '맞아요. "한 번은 윌리네 집에서 놀고 있는데 갑자기 정전이 돼서 집 안이 온통 캄캄해졌지 뭐예요. 하지만 윌리는 집 안의 모든 방향을 알고 있었어요. 복도에 있는 문 하나하나의 위치까지 정확하게 찾아 나를 금세 화장실에 데려다주었답니다."라고 나와 있어요. 윌리는 눈이 보이지 않아도 집 안을 잘 알아서 어둠 속에서도 애비를 화장실까지 안내해 줬어요.', explanationWrong: '정답은 "방향"이에요. 창문, 가구, 전등이 아니라 "집 안의 모든 방향"을 알고 있어요. "윌리는 집 안의 모든 방향을 알고 있었어요"라고 나와 있어요. 그래서 정전이 나도 복도 문 위치까지 찾아 애비를 화장실에 데려다줬대요.' },
    { type: 'fill_blank', sentence: '공원에서 윌리는 손가락 끝으로 (  ) 잔디밭을 "봤"어요.', options: ['촉촉한', '뜨거운', '미끄러운', '딱딱한'], correctIndex: 0, explanation: '정답은 "촉촉한"이에요. 손으로 잔디의 촉촉함을 느꼈어요.', explanationCorrect: '맞아요. "윌리는 손가락 끝으로 촉촉한 잔디밭을 보고 귀로 바스락 풀숲을 걷는 작은 새와 쌔앵 날쌔게 달리는 강아지, 공원 밖 부릉부릉 시끄러운 자동차 소리를 보았지요."라고 나와 있어요. 윌리는 눈 대신 손가락으로 잔디의 촉촉함을 "보고", 귀로 새와 강아지, 자동차 소리를 "봤"어요. 감각으로 세상을 보는 거예요.', explanationWrong: '정답은 "촉촉한"이에요. 뜨거운, 미끄러운, 딱딱한이 아니라 "촉촉한" 잔디밭이에요. "손가락 끝으로 촉촉한 잔디밭을 보고"라고 나와 있어요. 윌리는 손으로 잔디의 촉촉함을 느껴서 "봤"대요.' },
  ],
  'willy-fill'
);

const willyOrdering: Content[] = withIdsAndOrder(
  [
    { type: 'ordering', question: '윌리와 애비가 친구가 되기까지의 순서를 맞춰 보세요.', items: ['새 이웃 남자아이가 집으로 들어가 버림', '윌리와 엄마가 애비네 집을 찾아옴', '윌리의 엄마가 "눈이 보이지 않는다"고 말함', '매일 함께 등하교하게 됨'], explanation: '처음 만남 → 찾아옴 → 윌리 소개 → 함께 다님 순서예요.', explanationCorrect: '맞아요. 애비가 손을 흔들었는데 녀석이 쏙 들어가 버렸고, 다음 날 윌리와 엄마가 찾아와서 같은 학교 다니니 함께 다니자고 했어요. 윌리 엄마가 눈이 보이지 않는다고 했고, 그다음부터 매일 함께 등하교했어요.', explanationWrong: '먼저 새 이웃이 들어가 버리고, 그다음 날 찾아와서 인사하고 윌리 소개한 뒤에 함께 다니게 됐어요.' },
    { type: 'ordering', question: '바닷가에서 윌리가 "본" 것의 순서를 맞춰 보세요.', items: ['코로 짭짤한 바닷바람을 봄', '발가락으로 조약돌의 따스한 햇볕을 봄', '귀로 행복한 웃음소리를 봄'], explanation: '냄새 → 촉감 → 소리 순으로 "봤"어요.', explanationCorrect: '맞아요. "윌리는 코로 짭짤한 바닷바람을 보고 발가락으로 동글동글 조약돌에 내려앉은 따스한 햇볕을 보고 귀로 모래사장 위 사람들의 행복한 웃음소리를 보았어요."', explanationWrong: '코(냄새) → 발(촉감) → 귀(소리) 순서로 나와 있어요.' },
    { type: 'ordering', question: '윌리가 수업 내용을 복습하는 순서를 맞춰 보세요.', items: ['수업 시간에 이해하지 못한 부분이 생김', '녹음을 함', '집에 와서 몇 번이고 다시 듣음', '교과서를 손으로 꼼꼼히 만짐'], explanation: '이해 못 함 → 녹음 → 반복 청취 → 점자 교과서로 확인 순이에요.', explanationCorrect: '맞아요. 수업에서 이해 못 한 부분을 녹음하고 집에서 몇 번이고 다시 들어요. 교과서도 점자와 볼록한 그림으로 손으로 꼼꼼히 만져서 읽어요.', explanationWrong: '먼저 이해 못 한 부분이 있고, 그다음 녹음하고, 집에서 다시 듣고, 교과서를 만져요.' },
    { type: 'ordering', question: '정전이 났을 때 일어난 일의 순서를 맞춰 보세요.', items: ['갑자기 정전이 됨', '집 안이 캄캄해짐', '윌리가 복도 문 위치를 정확히 찾음', '윌리가 애비를 화장실에 데려다줌'], explanation: '정전 → 어두움 → 윌리가 길 찾음 → 화장실까지 안내 순이에요.', explanationCorrect: '맞아요. 정전이 나서 캄캄해졌는데, 윌리는 집 안 방향을 다 알고 복도 문까지 정확히 찾아 애비를 금세 화장실에 데려다줬어요.', explanationWrong: '정전이 먼저 나고, 어두워진 다음, 윌리가 길을 찾아서 화장실까지 데려다줬어요.' },
    { type: 'ordering', question: '반 아이들이 나쁜 말을 할 때의 순서를 맞춰 보세요.', items: ['반 아이들이 나쁜 말을 함', '애비가 너무 화가 남', '대꾸는 하지 않음', '윌리가 손이 떨리는 걸 알아차리고 공원에 아이스크림 먹으러 감'], explanation: '나쁜 말 → 화남 → 참음 → 윌리가 알아채고 아이스크림 제안 순이에요.', explanationCorrect: '맞아요. 나쁜 말에 화가 나지만 대꾸는 안 해요. 윌리가 바들바들 떨리는 손과 가라앉은 목소리로 화남을 알아차리고, 공원으로 데려가 아이스크림을 함께 먹자고 해요.', explanationWrong: '나쁜 말이 먼저고, 화가 나고, 대꾸 안 하고, 윌리가 알아차린 뒤 아이스크림이에요.' },
    { type: 'ordering', question: '할아버지가 세상을 떠난 날의 순서를 맞춰 보세요.', items: ['애비는 눈물을 흘리지 않음', '친척들이 이상하다고 수군거림', '윌리가 손을 잡고 꼬옥 안아 주며 등을 토닥임', '눈물이 주르륵 흘러내림'], explanation: '눈물 안 흘림 → 수군거림 → 윌리가 안아 줌 → 그제서야 눈물 순이에요.', explanationCorrect: '맞아요. 엄마 아빠는 울었는데 애비는 눈물을 안 흘려서 친척들이 이상하다고 했어요. 윌리가 말 없이 손을 잡고 꼬옥 안아 주며 등을 토닥이자 그 순간 눈물이 주르륵 흘러내렸어요. 윌리가 슬픔을 알아본 첫 번째 사람이었답니다.', explanationWrong: '애비가 먼저 눈물을 안 흘리고, 친척들이 수군거린 다음, 윌리가 안아 주고, 그다음에 눈물이 나요.' },
    { type: 'ordering', question: '윌리가 "사랑을 느낀다"고 한 순서를 맞춰 보세요.', items: ['선생님이 어깨에 손을 얹고 오늘 잘 지냈냐고 물을 때', '아빠가 차로 데려다주며 "사랑해, 우리 아들"이라고 할 때', '엄마가 품에 꼭 안아 줄 때'], explanation: '선생님 → 아빠 → 엄마 순으로 말했어요.', explanationCorrect: '맞아요. "선생님이 내 어깨에 손을 얹고 오늘 잘 지냈냐고 물으실 때, 아빠가 차로 나를 학교에 데려다주면서 \'사랑해, 우리 아들.\'이라고 말할 때, 그리고 엄마가 나를 품에 꼭 안아 줄 때… 난 매일 느낄 수 있어, 차고 넘치는 사랑을."', explanationWrong: '선생님 말 → 아빠 말 → 엄마 품에 안기 순서예요.' },
    { type: 'ordering', question: '공원에서 윌리가 "본" 것의 순서를 맞춰 보세요.', items: ['손가락 끝으로 촉촉한 잔디밭을 봄', '귀로 풀숲을 걷는 작은 새 소리를 봄', '귀로 쌔앵 달리는 강아지 소리를 봄', '귀로 부릉부릉 자동차 소리를 봄'], explanation: '촉감(잔디) → 소리(새, 강아지, 자동차) 순이에요.', explanationCorrect: '맞아요. "손가락 끝으로 촉촉한 잔디밭을 보고 귀로 바스락 풀숲을 걷는 작은 새와 쌔앵 날쌔게 달리는 강아지, 공원 밖 부릉부릉 시끄러운 자동차 소리를 보았지요."', explanationWrong: '잔디를 손으로 먼저 "보고", 그다음 귀로 새, 강아지, 자동차 소리를 "봤"어요.' },
    { type: 'ordering', question: '이야기 맨 끝 대화의 순서를 맞춰 보세요.', items: ['"사랑도 볼 수 있어?"', '"사랑은 느낄 수 있는 것 같아"', '"나도 사랑을 느낄 수 있는 것 같아"', '"너랑 내가 함께 아이스크림 먹을 때야!"'], explanation: '질문 → 윌리 대답 → 애비 대답 → 애비가 느끼는 사랑 순이에요.', explanationCorrect: '맞아요. 애비가 사랑도 볼 수 있냐고 물었고, 윌리가 느낄 수 있다고 했어요. 애비가 "나도 느낄 수 있는 것 같아"라고 하자 "그건 바로 너랑 내가 함께 아이스크림을 먹을 때야!"라고 했어요.', explanationWrong: '사랑 볼 수 있어? → 윌리: 느낄 수 있어 → 애비: 나도 → 아이스크림 먹을 때 순서예요.' },
  ],
  'willy-ord'
);

const willyMatchPairsSense: Content[] = withIdsAndOrder(
  [
    { type: 'match_pairs_sense', question: '상황과 사용한 감각을 연결해 보세요.', leftItems: ['짭짤한 바닷바람', '조약돌의 따스한 햇볕', '행복한 웃음소리', '촉촉한 잔디밭'], rightItems: ['냄새', '따스한 촉감', '소리', '촉촉한 촉감'], correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]], explanation: '윌리는 눈 대신 다양한 감각으로 세상을 "봐요."', detailedExplanation: '① 짭짤한 바닷바람 → 코(냄새): "윌리는 코로 짭짤한 바닷바람을 보고"라고 나와 있어요.\n② 조약돌의 따스한 햇볕 → 발(촉감): "발가락으로 동글동글 조약돌에 내려앉은 따스한 햇볕을 보고"라고 했어요.\n③ 행복한 웃음소리 → 귀: "귀로 모래사장 위 사람들의 행복한 웃음소리를 보았어요."\n④ 촉촉한 잔디밭 → 손(촉감): "손가락 끝으로 촉촉한 잔디밭을 보고"라고 했어요.' },
    { type: 'match_pairs_sense', question: '공원에서 윌리가 "본" 것과 감각을 연결해 보세요.', leftItems: ['촉촉한 잔디밭', '풀숲을 걷는 작은 새', '쌔앵 달리는 강아지', '부릉부릉 자동차 소리'], rightItems: ['촉감', '소리', '소리', '소리'], correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]], explanation: '손으로 만지고 귀로 소리를 들어요.', detailedExplanation: '① 촉촉한 잔디밭 → 손(촉감): 손가락 끝으로 잔디를 만져요.\n② 풀숲의 작은 새 → 귀(소리): 바스락 소리를 귀로 들어요.\n③ 달리는 강아지 → 귀(소리): 쌔앵 소리를 귀로 들어요.\n④ 자동차 소리 → 귀(소리): 부릉부릉 소리를 귀로 들어요.' },
    { type: 'match_pairs_sense', question: '윌리가 마리를 알아보는 방법과 감각을 연결해 보세요.', leftItems: ['다정한 울음소리', '곧고 가지런한 털', '허브 차 같은 향기'], rightItems: ['소리', '촉감', '냄새'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '듣고, 만지고, 냄새를 맡아서 마리를 알아봐요.', detailedExplanation: '① 다정한 울음소리 → 귀(소리): "마리의 울음소리는 다정해서 다른 고양이들과는 다르대요."\n② 곧고 가지런한 털 → 손(촉감): "털이 곧고 가지런해 살짝만 만져도 마리인 줄 알아챌 수 있다더라고요."\n③ 허브 차 같은 향기 → 코(냄새): "마리를 안고 있으면 허브 차 같은 향기가 나는데"라고 했어요.' },
    { type: 'match_pairs_sense', question: '윌리가 "마법"처럼 세상을 보는 방법을 연결해 보세요.', leftItems: ['눈을 감고 무언가에 집중해 귀를 기울일 때', '손으로 꼼꼼히 만질 때', '말투가 이상할 때'], rightItems: ['소리로 알아차림', '점자·볼록한 그림', '거짓말 알아차림'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '윌리는 눈 대신 귀와 손과 말투로 세상을 느껴요.', detailedExplanation: '① 귀를 기울일 때 → 귀(소리로 알아차림): "눈썹 사이를 잔뜩 찌푸린 채 무언가를 집중해서 귀를 기울이고" "바로 윌리의 마법이 펼쳐지는 거죠."\n② 손으로 만질 때 → 손(점자·볼록한 그림): 교과서를 손으로 꼼꼼히 만져 읽어요.\n③ 말투가 이상할 때 → 감정(거짓말 알아차림): "너한테 말하는 말투가 너무 이상했거든. 그냥 느낄 수 있었어."' },
    { type: 'match_pairs_sense', question: '바닷가 장면과 감각을 연결해 보세요.', leftItems: ['코로 짭짤한 바닷바람을 봄', '발가락으로 조약돌의 햇볕을 봄', '귀로 웃음소리를 봄'], rightItems: ['냄새', '촉감', '소리'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '바닷가에서 윌리는 코, 발, 귀로 "봤"어요.', detailedExplanation: '① 코로 짭짤한 바닷바람 → 코(냄새): 코로 바닷바람 냄새를 맡았어요.\n② 발가락으로 조약돌의 햇볕 → 발(촉감): 발가락으로 따스한 햇볕을 느꼈어요.\n③ 귀로 웃음소리 → 귀(소리): 모래사장 사람들의 웃음소리를 들었어요.' },
    { type: 'match_pairs_sense', question: '윌리가 화난 애비를 알아챈 방법을 연결해 보세요.', leftItems: ['바들바들 떨고 있는 손', '잔뜩 가라앉은 목소리'], rightItems: ['만져서 알아차림', '들어서 알아차림'], correctPairs: [[0, 0], [1, 1]], explanation: '눈이 보이지 않아 손과 귀로 감정을 "봐요."', detailedExplanation: '① 바들바들 떨리는 손 → 손(만져서 알아차림): "바들바들 떨고 있는 손을 만지고" 알아차려요.\n② 가라앉은 목소리 → 귀(들어서 알아차림): "잔뜩 가라앉은 목소리를 들으면 바로 \'알아볼\' 수 있대요."' },
    { type: 'match_pairs_sense', question: '정전이 났을 때 윌리가 한 일과 사용한 감각을 연결해 보세요.', leftItems: ['집 안의 모든 방향을 앎', '복도 문 위치를 정확히 찾음', '애비를 화장실까지 데려다줌'], rightItems: ['기억', '촉감·기억', '이동'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '어둠 속에서도 익힌 공간이라 길을 찾을 수 있어요.', detailedExplanation: '① 방향을 앎 → 기억(평소 손·발로 익힌 공간): 눈이 보이지 않아 평소에 손과 발로 집 구조를 익혀 두었어요.\n② 문 위치를 찾음 → 촉감·기억(문 위치): 복도 문 하나하나 위치를 정확히 알아요.\n③ 화장실까지 데려다줌 → 이동(손잡거나 안내): 애비를 금세 화장실에 데려다줬어요.' },
    { type: 'match_pairs_sense', question: '교과서를 읽는 방법과 감각을 연결해 보세요.', leftItems: ['점으로 된 글자', '볼록하게 솟아 있는 그림', '손으로 꼼꼼히 만짐'], rightItems: ['점자', '촉감', '작은 부분까지 놓치지 않기'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '윌리의 교과서는 손으로 읽어요.', detailedExplanation: '① 점으로 된 글자 → 손(점자): "글자가 많은 점으로 되어 있고" 손가락 끝으로 읽어요.\n② 볼록한 그림 → 손(촉감으로 읽기): "그림도 볼록하게 솟아 있어서 손으로 읽을 수 있어요."\n③ 꼼꼼히 만짐 → 놓치지 않기: "교과서를 손으로 꼼꼼히 만져야 아주 작은 부분 하나까지도 놓치지 않을 수 있어."' },
    { type: 'match_pairs_sense', question: '꿀벌 소리와 윌리의 반응을 연결해 보세요.', leftItems: ['꿀벌이 윙윙 날갯짓하는 소리', '윌리에게 너무 크게 들림', '겁이 남'], rightItems: ['소리', '청각이 예민함', '반응'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '내가 평범하다고 느끼는 소리도 윌리에게는 다르게 느껴져요.', detailedExplanation: '① 윙윙 소리 → 귀(소리): 꿀벌 소리를 귀로 들어요.\n② 너무 크게 들림 → 청각 예민: "윌리에게는 너무 크게 들려서"라고 했어요.\n③ 겁이 남 → 반응(무서움): "겁이 난다고 하더라고요."' },
    { type: 'match_pairs_sense', question: '사랑을 "느끼는" 순간과 감각을 연결해 보세요.', leftItems: ['선생님이 어깨에 손을 얹고 물을 때', '아빠가 "사랑해, 우리 아들"이라고 할 때', '엄마가 품에 꼭 안아 줄 때'], rightItems: ['촉감·말소리', '말·촉감', '촉감'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '윌리는 사랑을 눈이 아니라 손과 귀와 몸으로 느껴요.', detailedExplanation: '① 선생님 손 → 손(촉감)·말: 어깨에 손을 얹고 "오늘 잘 지냈냐"고 물을 때 느껴요.\n② 아빠 말 → 귀(말)·촉감: 차로 데려다주며 "사랑해"라고 할 때 느껴요.\n③ 엄마 품 → 품에 안김(촉감): 품에 꼭 안아 줄 때 "차고 넘치는 사랑을" 매일 느껴요.' },
  ],
  'willy-match-sense'
);

const willyMatchPairsCauseEffect: Content[] = withIdsAndOrder(
  [
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['윌리는 눈이 보이지 않는다', '윌리와 애비가 매일 함께 등하교한다', '윌리가 애비의 팔꿈치를 잡는다'], rightItems: ['점자를 손가락으로 읽는다', '윌리 엄마가 "함께 다니면 좋겠다"고 했기 때문', '마음을 놓을 수 있어서'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '눈이 보이지 않아 점자를 쓰고, 함께 다니게 되었고, 팔꿈치를 잡아야 안심해요.', detailedExplanation: '① 눈이 보이지 않는다 → 점자: 그래서 점으로 된 글자를 손가락 끝으로 읽어요.\n② 함께 등하교 → 엄마가 부탁: "둘이 함께 다니면 좋겠네요!"라고 해서 매일 같이 다니게 됐어요.\n③ 팔꿈치를 잡는다 → 마음을 놓을 수 있어서: "그렇게 해야 자기가 마음을 놓을 수 있다고 하더라고요."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['정전이 되었다', '윌리는 집 구조를 잘 안다', '애비는 화장실 길을 찾지 못했다'], rightItems: ['집 안이 캄캄해졌다', '윌리가 애비를 화장실에 데려다줄 수 있었다', '윌리가 금세 데려다줬다'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '정전 → 어두움, 윌리의 공간 기억 → 안내 가능, 애비의 어려움 → 윌리가 도움.', detailedExplanation: '① 정전이 되었다 → 캄캄해졌다: "갑자기 정전이 돼서 집 안이 온통 캄캄해졌지 뭐예요."\n② 집 구조를 안다 → 데려다줄 수 있었다: "윌리는 집 안의 모든 방향을 알고 있었어요. 복도에 있는 문 하나하나의 위치까지 정확하게 찾아."\n③ 길을 찾지 못했다 → 윌리가 데려다줬다: "화장실 가는 길도 찾을 수 없을 지경이었지요." "나를 금세 화장실에 데려다주었답니다."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['반 아이들이 나쁜 말을 했다', '애비가 대꾸를 하지 않았다', '윌리가 애비의 손이 떨리는 걸 알아챘다', '윌리가 공원으로 데려갔다'], rightItems: ['애비가 너무 화가 났다', '뭐라고 말해야 할지 몰랐기 때문', '공원에 가서 아이스크림을 함께 먹자고 했다', '아이스크림을 함께 먹었다'], correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]], explanation: '나쁜 말 → 화남 → 참음, 윌리가 알아챔 → 아이스크림 제안.', detailedExplanation: '① 나쁜 말 → 화가 났다: "가끔 반 아이들이 나랑 윌리에게 나쁜 말을 할 때가 있어요. 그럴 때 너무너무 화가 나지만"\n② 대꾸를 안 함 → 몰랐기 때문: "솔직히 그 애들에게 뭐라고 말해야 좋을지도 잘 모르겠어요."\n③ 손이 떨리는 걸 알아챔 → 아이스크림 제안: "그럴 때 윌리는 나를 공원으로 데려가 아이스크림을 함께 먹자고 해요."\n④ 공원으로 데려감 → 함께 먹었다: 아이스크림을 함께 먹는 장면이에요.' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['할아버지가 세상을 떠났다', '애비는 눈물을 흘리지 않았다', '친척들이 수군거렸다', '윌리가 손을 잡고 꼬옥 안아 주며 등을 토닥였다'], rightItems: ['엄마 아빠는 엉엉 울었다', '친척들은 이상하다고 했다', '하나도 슬퍼 보이지 않는다고 했다', '그 순간 눈물이 주르륵 흘러내렸다'], correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]], explanation: '할아버지 떠남 → 애비는 안 울음 → 수군거림 → 윌리가 안아 주자 눈물.', detailedExplanation: '① 할아버지 떠남 → 엄마 아빠 울음: "슬퍼서 엉엉 우는 엄마, 아빠와 달리 나는 눈물을 흘리지 않았어요."\n② 눈물 안 흘림 → 친척들 반응: "친척들은 그런 나를 보며 이상하다고 수군거렸어요. 하나도 슬퍼 보이지 않는다고요."\n③ 수군거림 → (애비는 말 없음)\n④ 윌리가 안아 줌 → 눈물: "한마디 말도 없이요. 그 순간 눈에서 눈물이 주르륵 흘러내렸어요. 윌리는 내 슬픔을 알아본 첫 번째 사람이었답니다."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['윌리가 냄새를 맡았다', '마리의 울음소리가 다정하다', '털이 곧고 가지런하다', '마리를 안고 있으면 허브 차 같은 향기가 난다'], rightItems: ['고양이 마리를 알아본다', '다른 고양이들과 다르다', '살짝만 만져도 마리인 줄 알아챌 수 있다', '윌리는 마트에서 그런 향을 맡아 본 적이 없다고 한다'], correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]], explanation: '윌리는 듣고, 만지고, 냄새를 맡아 마리를 알아봐요.', detailedExplanation: '① 냄새를 맡았다 → 마리 알아봄: 듣고 만지고 냄새를 맡아서 마리를 알아보기도 해요.\n② 울음소리 다정함 → 다르다: "마리의 울음소리는 다정해서 다른 고양이들과는 다르대요."\n③ 털이 곧고 가지런함 → 만지면 알아챔: "살짝만 만져도 마리인 줄 알아챌 수 있다더라고요."\n④ 허브 차 같은 향기 → 마트에선 없음: "정작 윌리는 마트에서 한 번도 마리가 풍기는 것과 같은 향을 맡아 본 적이 없대요."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['수업 시간에 이해하지 못한 부분이 있다', '교과서가 점자와 볼록한 그림으로 되어 있다', '윌리가 말투가 이상하다고 느꼈다'], rightItems: ['녹음한 다음 집에서 몇 번이고 다시 듣는다', '손으로 꼼꼼히 만져서 읽어야 작은 부분까지 놓치지 않는다', '그 사람이 거짓말한 걸 알아차린다'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '이해 못 함 → 녹음 반복, 특별한 교과서 → 손으로 읽기, 말투 → 거짓말 알아챔.', detailedExplanation: '① 이해 못 함 → 녹음 반복: "수업 시간에 이해하지 못한 부분은 녹음을 한 다음 집에 와서 몇 번이고 다시 듣는대요."\n② 점자·볼록한 그림 → 손으로 만짐: "교과서를 손으로 꼼꼼히 만져야 아주 작은 부분 하나까지도 놓치지 않을 수 있어."\n③ 말투가 이상함 → 거짓말: "방금 그 사람이 거짓말한 걸 어떻게 알았어?" "너한테 말하는 말투가 너무 이상했거든. 그냥 느낄 수 있었어."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['윌리는 눈이 보이지 않는다', '애비가 "사랑도 볼 수 있어?"라고 물었다', '윌리가 "느낄 수 있는 것 같아"라고 했다'], rightItems: ['손·귀·코 등 다양한 감각으로 세상을 "본다"', '윌리가 사랑을 "볼" 수 있는지 궁금해서', '애비도 "나도 아이스크림 먹을 때 느낄 수 있어"라고 했다'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '시각장애 → 감각으로 세상 인식, 질문 → 윌리 대답 → 애비도 느낀다.', detailedExplanation: '① 눈이 보이지 않는다 → 감각으로 "본다": 눈 대신 귀, 손, 코로 세상을 느껴요. "눈을 감고도 세상 무엇이든 볼 수 있는 마법사 같기도 해요."\n② 사랑도 볼 수 있어? → 궁금해서: 윌리가 거짓말·화남·슬픔을 "알아보"니까 사랑도 볼 수 있냐고 물었어요.\n③ 느낄 수 있어 → 애비 대답: "그럼 나도 사랑을 느낄 수 있는 것 같아." "그건 바로 너랑 내가 함께 아이스크림을 먹을 때야!"' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['꿀벌이 윙윙 거리는 소리', '내가 평범하다고 느끼는 것', '윌리는 눈을 감고 귀를 기울이고 손으로 만진다'], rightItems: ['윌리에게는 너무 크게 들려서 겁이 난다', '윌리에게는 평범하지 않을 수 있다', '그때 "윌리의 마법"이 펼쳐진다'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '소리 크게 들림 → 겁, 평범한 것 → 윌리에겐 다름, 감각 집중 → 마법.', detailedExplanation: '① 꿀벌 윙윙 → 너무 커서 겁: "꿀벌이 윙윙 날갯짓하는 소리도 윌리에게는 너무 크게 들려서 겁이 난다고 하더라고요."\n② 내게 평범한 것 → 윌리에게는 아님: "내가 평범하다고 느끼는 것들이 윌리에게는 평범하지 않대요."\n③ 귀 기울이고 손으로 만짐 → 마법: "눈썹 사이를 잔뜩 찌푸린 채 무언가를 집중해서 귀를 기울이고 손으로 만질 때, 바로 윌리의 마법이 펼쳐지는 거죠."' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['새 이웃 남자아이가 애비를 쳐다봤다', '윌리 엄마가 "같은 학교에 다니는데 둘이 함께 다니면 좋겠다"고 했다', '윌리가 "네 손을 잡아도 될까?"라고 물었다'], rightItems: ['애비가 머뭇머뭇 손을 흔들었다', '애비와 윌리가 매일 함께 등하교하게 되었다', '윌리는 눈이 보이지 않아 인사를 손으로 하고 싶어 했기 때문'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '쳐다봄 → 손 흔듦, 엄마 부탁 → 함께 다님, 손 잡아도 될까 → 시각장애로 손 인사.', detailedExplanation: '① 쳐다봄 → 손 흔듦: "새 이웃집 남자아이가 나를 쳐다보길래 용기를 내어 머뭇머뭇 손을 흔들었어요."\n② 엄마 말 → 함께 다님: "우리 애도 같은 학교에 다니는데, 둘이 함께 다니면 좋겠네요!" "나는 매일 윌리와 같이 학교에 갔다가 집에 오기 시작했어요."\n③ 손 잡아도 될까? → 인사: 윌리는 눈이 보이지 않아 손을 잡으며 인사하고 싶었어요.' },
    { type: 'match_pairs_cause_effect', question: '원인과 결과를 연결해 보세요.', leftItems: ['윌리가 애비의 슬픔을 알아봤다', '윌리가 말 없이 손을 잡고 꼬옥 안아 주며 등을 토닥였다', '애비가 "윌리는 내 슬픔을 알아본 첫 번째 사람이었다"고 했다'], rightItems: ['할아버지가 세상을 떠난 날 애비가 눈물을 안 흘렸지만 속으로 슬펐기 때문', '그 순간 눈물이 주르륵 흘러내렸다', '윌리는 눈이 보이지 않아도 감정을 "보는" 사람이기 때문'], correctPairs: [[0, 0], [1, 1], [2, 2]], explanation: '슬픔 알아봄 → 할아버지 떠남·눈물 안 흘림, 안아 줌 → 눈물, 첫 번째 사람 → 감정을 "봄".', detailedExplanation: '① 슬픔을 알아봄 → 속으로 슬펐음: 친척들은 눈물을 안 흘려서 이상하다고 했지만, 윌리는 애비의 슬픔을 알아봤어요.\n② 말 없이 안아 주고 등을 토닥임 → 눈물: "한마디 말도 없이요. 그 순간 눈에서 눈물이 주르륵 흘러내렸어요."\n③ 첫 번째 사람 → 감정을 "봄": "윌리는 내 슬픔을 알아본 첫 번째 사람이었답니다." 윌리는 손과 귀와 말투로 마음을 "알아보"는 사람이에요.' },
  ],
  'willy-match-cause'
);

type ContentTypeKey = ContentType;
const MARY: Record<ContentTypeKey, Content[]> = {
  ox_quiz: maryOx,
  multiple_choice: maryMultiple,
  ordering: maryOrdering,
  fill_blank: maryFillBlank,
  emotion_stair: maryEmotionStair,
  elimination_reasons: maryEliminationReasons,
  categorize: maryCategorize,
  match_pairs: [],
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: [],
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: [],
};

const MONGMONG: Record<ContentTypeKey, Content[]> = {
  ox_quiz: mongmongOx,
  multiple_choice: mongmongMultiple,
  ordering: mongmongOrdering,
  fill_blank: mongmongFillBlank,
  emotion_stair: [],
  elimination_reasons: [],
  categorize: [],
  match_pairs: mongmongMatchPairs,
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: mongmongChoiceWithResult,
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: [],
};

const STICKPEBBLE: Record<ContentTypeKey, Content[]> = {
  ox_quiz: stickPebbleOx,
  multiple_choice: stickPebbleMultiple,
  ordering: stickPebbleOrdering,
  fill_blank: stickPebbleFillBlank,
  emotion_stair: [],
  elimination_reasons: [],
  categorize: [],
  match_pairs: [],
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: [],
  crisis_resolution: stickPebbleCrisisResolution,
  together_outcome: stickPebbleTogetherOutcome,
  listening_three_step: [],
};

const BIGEAR: Record<ContentTypeKey, Content[]> = {
  ox_quiz: bigEarOx,
  multiple_choice: bigEarMultiple,
  ordering: bigEarOrdering,
  fill_blank: bigEarFillBlank,
  emotion_stair: [],
  elimination_reasons: [],
  categorize: [],
  match_pairs: bigEarListeningResult,
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: [],
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: bigEarListeningThreeStep,
};

const UGO: Record<ContentTypeKey, Content[]> = {
  ox_quiz: ugoOx,
  multiple_choice: ugoMultiple,
  ordering: ugoOrdering,
  fill_blank: ugoFillBlank,
  emotion_stair: ugoEmotionStair,
  elimination_reasons: [],
  categorize: [],
  match_pairs: ugoMatchPairs,
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: [],
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: [],
};

const JIRUNGI: Record<ContentTypeKey, Content[]> = {
  ox_quiz: jirungiOx,
  multiple_choice: jirungiMultiple,
  ordering: jirungiOrdering,
  fill_blank: jirungiFillBlank,
  emotion_stair: [],
  elimination_reasons: [],
  categorize: [],
  match_pairs: jirungiMatchPairs,
  match_pairs_sense: [],
  match_pairs_cause_effect: [],
  choice_with_result: [],
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: [],
};

const WILLY: Record<ContentTypeKey, Content[]> = {
  ox_quiz: willyOx,
  multiple_choice: willyMultiple,
  ordering: willyOrdering,
  fill_blank: willyFillBlank,
  emotion_stair: [],
  elimination_reasons: [],
  categorize: [],
  match_pairs: [],
  match_pairs_sense: willyMatchPairsSense,
  match_pairs_cause_effect: willyMatchPairsCauseEffect,
  choice_with_result: [],
  crisis_resolution: [],
  together_outcome: [],
  listening_three_step: [],
};
```
