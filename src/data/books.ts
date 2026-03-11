/** AI가 생성하는 콘텐츠 타입 + 도서별 확장 활동 타입 */
export type ContentType =
  | 'ox_quiz'
  | 'multiple_choice'
  | 'ordering'
  | 'fill_blank'
  | 'emotion_stair'
  | 'elimination_reasons'
  | 'categorize'
  | 'match_pairs'
  | 'match_pairs_sense'
  | 'match_pairs_cause_effect'
  | 'choice_with_result'
  | 'crisis_resolution'
  | 'together_outcome'
  | 'listening_three_step';

export interface OxQuizContent {
  id: string;
  type: 'ox_quiz';
  question: string;
  correctAnswer: 'O' | 'X';
  explanation: string;
  /** 정답일 때 보여줄 설명(정답인 이유). 없으면 explanation 사용 */
  explanationCorrect?: string;
  /** 오답일 때 보여줄 설명(틀린 이유). 없으면 explanation 사용 */
  explanationWrong?: string;
  order: number;
}

export interface MultipleChoiceContent {
  id: string;
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationCorrect?: string;
  explanationWrong?: string;
  order: number;
}

export interface OrderingContent {
  id: string;
  type: 'ordering';
  question: string;
  items: string[];
  explanation: string;
  explanationCorrect?: string;
  explanationWrong?: string;
  order: number;
}

export interface FillBlankContent {
  id: string;
  type: 'fill_blank';
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationCorrect?: string;
  explanationWrong?: string;
  order: number;
}

/** 감정 흐름 계단: 5단계 감정에 사건 카드 배치 (메리식당) */
export interface EmotionStairContent {
  id: string;
  type: 'emotion_stair';
  question: string;
  steps: string[];
  items: string[];
  /** 각 단계(인덱스)에 들어갈 정답 카드의 item 인덱스. stepIndex -> itemIndex (한 단계에 하나씩). length = steps.length */
  correctPlacement?: number[];
  /** 단계별 설명. correctPlacement[stepIndex]인 카드가 그 단계에 왜 어울리는지. length = steps.length */
  stepExplanations?: string[];
  explanation?: string;
  order: number;
}

/** 따뜻해진 이유 찾기: 겉이유 제거 후 진짜 이유만 남기기 (메리식당) */
export interface EliminationReasonsContent {
  id: string;
  type: 'elimination_reasons';
  question: string;
  reasons: string[];
  realReasonIndices: number[];
  explanation?: string;
  order: number;
}

/** 이야기 구조 나누기: 시작·중간·끝으로 카드 분류 (메리식당) */
export interface CategorizeContent {
  id: string;
  type: 'categorize';
  question: string;
  categories: string[];
  items: string[];
  correctPlacement: number[];
  explanation?: string;
  order: number;
}

/** 말-결과 연결: 왼쪽 말 카드와 오른쪽 결과 카드 매칭 (몽몽 숲). 감각 연결·원인-결과는 동일 구조, type만 다름 */
export interface MatchPairsContent {
  id: string;
  type: 'match_pairs' | 'match_pairs_sense' | 'match_pairs_cause_effect';
  question: string;
  leftItems: string[];
  rightItems: string[];
  correctPairs: [number, number][];
  explanation?: string;
  /** 결과 화면에서 표시할 자세한 설명 (짝별 인과 설명 등) */
  detailedExplanation?: string;
  order: number;
}

/** 같은 상황 다른 말: 선택에 따라 결과 문장 제시 (몽몽 숲) */
export interface ChoiceWithResultContent {
  id: string;
  type: 'choice_with_result';
  situation: string;
  options: string[];
  resultTexts: string[];
  correctIndex: number;
  explanation?: string;
  order: number;
}

/** 위기 상황 해결하기: 친구의 역할을 상황 속에서 판단 (막대기랑 돌멩이랑) */
export interface CrisisResolutionContent {
  id: string;
  type: 'crisis_resolution';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationCorrect?: string;
  explanationWrong?: string;
  order: number;
}

/** 함께하면 어떻게 될까?: 혼자 vs 함께 결과 드래그 분류 (막대기랑 돌멩이랑) */
export interface TogetherOutcomeContent {
  id: string;
  type: 'together_outcome';
  question: string;
  categories: string[];
  items: string[];
  correctPlacement: number[];
  explanation?: string;
  order: number;
}

/** 경청 3단계 실천 판단하기: 멈춘다/기울인다/기다린다 중 고르기 (커다란 귀) */
export interface ListeningThreeStepContent {
  id: string;
  type: 'listening_three_step';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationCorrect?: string;
  explanationWrong?: string;
  order: number;
}

export type Content =
  | OxQuizContent
  | MultipleChoiceContent
  | OrderingContent
  | FillBlankContent
  | EmotionStairContent
  | EliminationReasonsContent
  | CategorizeContent
  | MatchPairsContent
  | ChoiceWithResultContent
  | CrisisResolutionContent
  | TogetherOutcomeContent
  | ListeningThreeStepContent;

export interface Book {
  id: string;
  title: string;
  coverColor: string;
  /** 표지 이미지 경로 (public 기준). 없으면 coverColor로 표시 */
  coverImage?: string;
  /** AI에게 전달할 도서 내용 요약/원문 (문제·답 생성용) */
  contentForPrompt: string;
}

export const MOCK_PASSWORD = '1234';

export const BOOKS: Book[] = [
  /* --- 이전 도서 (일단 주석) ---
  {
    id: 'book-1',
    title: '토끼와 거북이',
    coverColor: '#FFB6C1',
    contentForPrompt: `이솝 우화 「토끼와 거북이」. 옛날에 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고 거북이는 매우 느렸다. 토끼가 거북이를 느림보라고 놀리고 자기가 제일 빠르다고 자랑하자, 거북이는 달리기 경주를 제안했다. 경주가 시작되자 토끼는 거북이가 훨씬 뒤쳐진 것을 보고 안심하여 중간에 나무 아래에서 낮잠을 잤다. 그 사이 거북이는 꾸준히 걸어서 토끼를 추월했다. 잠에서 깬 토끼는 빨리 뛰어갔지만 결국 거북이가 결승선에 먼저 도착해 승리했다. 교훈: 천천히 꾸준히 노력하는 자가 이긴다. 능력보다 성실한 노력이 중요하다.`,
  },
  {
    id: 'book-2',
    title: '아기 돼지 삼형제',
    coverColor: '#98D8AA',
    contentForPrompt: `서양 고전 동화 「아기 돼지 삼형제」. 엄마 돼지가 아기 돼지 삼형제를 독립시키려 바깥으로 내보냈고, 세 형제는 각자 집을 짓기로 한다. 첫째 돼지는 짚더미로 집을 대충 만들었고, 늑대가 입김으로 불어 날려 버렸다. 첫째는 둘째 집으로 도망쳤다. 둘째 돼지는 나무로 집을 지었으나 역시 늑대의 입김으로 부서졌다. 셋째 돼지는 벽돌로 튼튼한 집을 지었다. 늑대가 아무리 불어도 무너지지 않았다. 늑대가 굴뚝으로 들어오려다 셋째 돼지가 준비한 끓는 물에 빠져 도망갔고, 다시는 돼지들을 괴롭히지 않았다. 결국 돼지 삼형제는 벽돌집에서 함께 산다. 교훈: 부지런함과 신중함, 튼튼한 준비의 중요성.`,
  },
  {
    id: 'book-3',
    title: '빨간 모자',
    coverColor: '#FFEAA7',
    contentForPrompt: `샤를 페로·그림 형제 동화 「빨간 모자」. 빨간 모자를 쓴 어린 소녀가 숲을 건너 아프신 할머니 집으로 심부름을 간다. 숲에서 늑대를 만난 소녀는 늑대에게 할머니 집 위치를 알려 준다. 배고픈 늑대는 소녀에게 할머니께 꽃을 꺾어 드리라고 하며 소녀를 지연시키고, 먼저 할머니를 잡아먹은 뒤 할머니로 변장해 침대에 누운다. 소녀가 도착해 "할머니, 귀가 왜 크세요?" 등 말을 나누다 늑대에게 잡아먹히려 할 때, 사냥꾼이 나타나 늑대를 물리치고 소녀와 할머니를 구한다. 교훈: 낯선 사람에게 말하지 말고 어른 말을 듣고 조심하는 것, 자기 방어의 중요성.`,
  },
  {
    id: 'book-4',
    title: '양치기 소년',
    coverColor: '#DDA0DD',
    contentForPrompt: `이솝 우화 「양치기 소년」(The Boy Who Cried Wolf). 양을 치는 소년이 지루함을 이기지 못해 장난으로 "늑대가 왔다!"라고 여러 번 소리쳐서 마을 사람들이 달려온다. 사람들은 속은 것을 알고 화가 난다. 나중에 진짜 늑대가 나타나 양을 물었을 때, 소년이 도움을 요청해도 아무도 믿지 않고 오지 않는다. 소년은 양을 잃고 만다. 거짓말을 반복하면 신뢰를 잃고, 진짜 위험할 때 아무도 믿어 주지 않는다는 교훈이다.`,
  },
  {
    id: 'book-5',
    title: '개미와 베짱이',
    coverColor: '#87CEEB',
    contentForPrompt: `이솝 우화 「개미와 베짱이」. 여름에 개미는 열심히 먹을 것을 모으고, 베짱이는 날마다 노래하고 놀기만 한다. 겨울이 되자 개미는 여름에 모아둔 식량을 말리며 따뜻하게 지낸다. 배고픈 베짱이가 식량을 나누어 달라고 찾아오자, 개미가 "왜 여름에 식량을 모아 두지 않았어?"라고 묻는다. 베짱이는 "노래를 부르느라 그럴 시간이 없었어"라고 대답한다. 개미는 "여름에 노래를 불렀으니 겨울에는 춤을 추면 되겠구나"라며 도움을 거절한다. 교훈: 미리 준비하고 꾸준히 일하는 것이 중요하다. 게으름과 쾌락만 추구하면 나중에 어려움을 겪는다.`,
  },
  {
    id: 'book-6',
    title: '신데렐라',
    coverColor: '#E8B4B8',
    contentForPrompt: `전래동화 「신데렐라」(샤를 페로·그림 형제). 어머니를 일찍 잃은 신데렐라는 계모와 계모의 두 딸에게 학대받으며 산다. 왕자가 주최하는 무도회가 열리자 계모와 딸들은 신데렐라가 가는 것을 막는다. 요정의 도움으로 환상적인 드레스와 유리구두를 받은 신데렐라는 무도회에 가서 왕자와 춤을 춘다. 자정이 되기 전에 서둘러 떠나다 유리구두 한 짝을 잃어버린다. 왕자는 유리구두 주인을 찾아 나서고, 신데렐라의 발에만 구두가 맞아 둘은 결혼해 행복하게 산다. 교훈: 어려움 속에서도 희망을 잃지 말 것, 선한 마음과 인내가 보상받는다.`,
  },
  {
    id: 'book-7',
    title: '팥죽 할머니와 호랑이',
    coverColor: '#C4A77D',
    contentForPrompt: `한국 전래동화 「팥죽 할머니와 호랑이」. 팥죽 할머니가 팥밭을 매고 있을 때, 호랑이가 나타나 밭을 다 매주면 잡아먹겠다고 한다. 할머니는 팥을 거두어 팥죽을 쑤면 팥죽도 주고 그때 잡아먹어도 되겠다고 약속한다. 동짓날 호랑이가 팥죽 받으러 오지만, 부엌에 있던 알밤·자라·송곳·맷돌·멍석·지게가 할머니를 도와 호랑이를 무찌른다. 알밤이 눈을 맞히고, 자라가 코를 깨물고, 송곳이 찌르고, 맷돌이 머리에 떨어지고, 멍석이 호랑이를 말아 지게가 깊은 강물에 던져 버린다. 약한 존재들이 힘을 합치면 강한 적도 이길 수 있다는 교훈. 할머니의 따뜻한 마음과 나눔이 결국 목숨을 구한다.`,
  },
  {
    id: 'book-8',
    title: '미운 오리새끼',
    coverColor: '#B5EAD7',
    contentForPrompt: `안데르센 동화 「미운 오리새끼」. 연못가에서 엄마 오리가 알을 품었는데, 다른 오리들과 다르게 생긴 아기 오리가 태어났다. 이 아기는 칠면조로 오인되며 주변 오리들에게 괴롭힘을 당한다. 괴롭힘을 피해 연못가를 떠난 아기 오리는 여러 곳을 떠돌아다닌다. 시간이 지나 자란 아기 오리는 자신이 사실 아름다운 백조였음을 깨닫는다. 물에 비친 자신의 모습이 다른 백조들과 같음을 보고, 백조들로부터 환영받으며 하늘로 날아오른다. 교훈: 다르게 보여도 포기하지 말고, 자신의 가치를 믿는 것.`,
  },
  {
    id: 'book-9',
    title: '호랑이와 곶감',
    coverColor: '#FF9F43',
    contentForPrompt: `한국 전래동화 「호랑이와 곶감」(범보다 무서운 곶감). 배고픈 호랑이가 산에서 마을로 내려와, 우는 아이를 달래는 어머니 말을 엿듣는다. 어머니가 "호랑이가 왔다"고 해도 아이가 울자 호랑이는 자신을 무서워하지 않는 줄 안다. "곶감 있으니까 울지 말아라"라고 하자 아이 울음이 뚝 그친다. 호랑이는 곶감이 자기보다 더 무서운 존재라고 착각해 겁을 먹는다. 그때 소도둑이 호랑이를 소로 착각해 등에 올라탄다. 호랑이는 곶감이라고 생각하고 죽을 힘으로 도망친다. 소도둑은 달빛에 호랑이임을 알고 나뭇가지에서 뛰어내리고, 호랑이와 소도둑 모두 다시는 마을에 오지 않게 된다. 교훈: 오해와 재치, 강자의 어리석음과 약자의 지혜.`,
  },
  --- */
  {
    id: 'book-mary',
    title: '메리식당',
    coverColor: '#E8A87C',
    coverImage: '/covers/mery-cover.png',
    contentForPrompt: `메리식당. 사람들은 "잘 웃지도 않아", "말에 가시가 있어"라고 했고 아무도 고슴도치 씨를 좋아하지 않았습니다. 고슴도치 씨는 속으로 겁이 나고 마음이 오해받고 있다고 느꼈습니다. 흰 눈이 사락사락 내렸고, 고슴도치 씨는 좁은 길을 나와 넓은 길로 갔습니다. 목욕탕을 지나고 마트를 지나고 정류장을 지났고, 가게마다 거리마다 사람들로 붐볐습니다. 놀이터를 지나다 나뭇가지에 걸린 빨간 풍선을 보았고, 풍선이 길을 이끄는 것만 같았습니다. 어느 골목 끝에서 풍선이 멈췄고, 오랫동안 문이 닫혀 있던 이름도 없던 식당 앞이었습니다. 문에 붙은 종이를 보고 슬며시 문을 열고 들어서자 수염이 눈처럼 하얀 할아버지가 반갑게 맞아주었습니다. 식당 한가운데에는 커다랗고 둥근 식탁이 놓여 있었습니다. 길냥이 씨, 기러기 씨, 거북이 씨도 와 있었고 모두 빨간 풍선을 의자에 매달았습니다. 고슴도치 씨는 오므라이스를 골랐고, 할아버지는 "마음을 안아 주는 오므라이스입니다."라고 말했습니다. 어릴 적 좋아하던 눈사람 그릇이었고, 한 입씩 먹을 때마다 잊고 있던 날들이 떠올랐습니다. 루돌프 코가 되어 눈썰매를 타던 크리스마스, 알록달록 반짝반짝 트리를 장식하던 크리스마스가 생각났습니다. 길냥이 씨는 메리라면을, 기러기 씨는 메리피자를, 거북이 씨는 메리버거를 먹으며 웃었습니다. 캐럴이 울리자 할아버지가 케이크를 내왔고, 케이크 장식에 "마음이 사르르 녹아요"라고 적혀 있었습니다. 모두 두 볼이 발그레 물들며 "메리 크리스마스"라고 말했습니다. 바깥에는 찬 바람이 불었지만 이제는 춥지 않았습니다. 고슴도치 씨는 버스 정류장을 지나다 빨간 냄비를 보고 동전을 꺼내 냄비에 넣었습니다. 밤이 되자 메리식당 불이 꺼지고, 그림자는 산타 옷을 입은 진짜 산타 할아버지가 되어 "루돌프야, 또 선물을 나눠 주러 가자꾸나"라고 하며 루돌프 썰매를 타고 빨간 풍선 꾸러미를 나부끼며 달렸습니다. 지나간 자리에 흰 눈이 소복소복 쌓였습니다.`,
  },
  {
    id: 'book-mongmong',
    title: '몽몽 숲의 박쥐 두마리',
    coverColor: '#85CDCA',
    coverImage: '/covers/mongmong-cover.png',
    contentForPrompt: `몽몽 숲에 달콤 박쥐와 뾰족 박쥐가 이사를 왔어요. 달콤 박쥐는 과일나무에, 뾰족 박쥐는 가시나무에 자리를 잡았지요. 달콤 박쥐는 "나무님! 꽃향기가 참 좋아요."라고 인사하자 과일나무가 가지를 살랑살랑 흔들었어요. 뾰족 박쥐는 "이 못생긴 나무야!"라고 투덜대자 가시나무가 가시로 콕콕 찔렀어요. 달콤 박쥐는 "괜찮니?"라고 물었고, 뾰족 박쥐는 "상관 마!"라고 했어요. 몽몽 숲에 나비들이 날아들었을 때 달콤 박쥐는 "어서 오세요!"라고 맞이했지만 뾰족 박쥐는 "저리 가!"라고 했어요. 동물들이 찾아왔을 때도 달콤 박쥐는 반갑게 반겼고 뾰족 박쥐는 "흥!"이라고 했어요. 보름달이 뜨자 달콤 박쥐는 "고마워요"라고 했고 뾰족 박쥐는 "눈부셔!"라고 했어요. 과일나무에 탐스런 열매가 열리자 달콤 박쥐는 동물들을 초대해 나눠 먹었어요. 가시나무에는 딱딱한 열매가 열렸고 뾰족 박쥐는 "퉤퉤!"라고 하며 가지를 꺾었더니 열매가 떨어져 "살려!"라고 외쳤어요. 달콤 박쥐가 "울지 마, 친구야. 나랑 가서 열매 먹자."라고 해서 둘은 과일나무로 갔고, 뾰족 박쥐는 "고마워!"라고 했어요. 두 박쥐는 사이좋게 매달렸어요.`,
  },
  {
    id: 'book-stick-pebble',
    title: '막대기랑 돌멩이랑',
    coverColor: '#C4A77D',
    coverImage: '/covers/stick-pebble-cover.png',
    contentForPrompt: `막대기와 돌멩이 이야기. 막대기는 1을, 돌멩이는 0을 닮았어요. 처음엔 둘 다 외롭고 쓸쓸했어요. 막대기가 놀러 오고 돌멩이도 놀러 왔는데, 솔방울이 다가와 돌멩이를 놀렸어요. 막대기가 "저리 가!"라고 소리치자 효과가 있었고, 돌멩이가 "와! 네가 날 막아 줬어!"라고 속삭였어요. "그게 바로 막대기가 하는 일이야. 친구가 하는 일이기도 하지." 막대기랑 돌멩이는 함께 돌아다니고 탐험하고 바닷가에서 쉬었어요. 갑자기 천둥과 비바람에 허리케인이 몰아치고 막대기가 바람에 날아갔어요. 돌멩이가 "꽉 잡아!"라고 외쳤지만 돌멩이는 다시 혼자가 되었어요. 돌멩이는 낮에도 밤에도 "막대기야?" 하고 찾아다녔지만 막대기는 보이지 않았어요. 커다란 웅덩이에 막대기가 꽂혀 있는 걸 발견했어요. 돌멩이가 "도와줘!" 하는 소리를 듣고 재빨리 굴러가서 "자, 간다아아!" 하고 첨벙 들어가 막대기를 구했어요. "정말 잘 굴렀어, 돌멩아!" "그게 바로 돌멩이가 하는 일이야. 친구가 하는 일이기도 하지." 막대기랑 돌멩이는 다시 함께 있고 10을 닮았어요. 완벽한 짝꿍이에요. 마지막에 솔방울이 "놀려서 미안해.."라고 사과했어요.`,
  },
  {
    id: 'book-big-ear',
    title: '나의 경청 이야기: 친구를 만드는 커다란 귀',
    coverColor: '#F5D0C5',
    coverImage: '/covers/big-ear-cover.png',
    contentForPrompt: `나의 경청 이야기: 친구를 만드는 커다란 귀. 나는 듣기 싫은 소리가 들리면 귀를 접는 아이였다. 엄마 아빠 말은 귓등으로, 선생님 말은 쇠귀에 경 읽기, 친구 말은 한 귀로 듣고 한 귀로 흘렸다. 마녀가 옆집으로 이사 왔고 간판에는 "뭐든지 들어 드립니다. 누구나 들어 드립니다. 언제나 들어 드립니다"라고 적혀 있었다. 성난 아주머니가 마녀 집에 들어갔다가 순한 양처럼 나오는 걸 보고 나는 마녀를 관찰했다. 마녀가 하는 말은 "그랬군요." "너무 웃겨요." "그래서요?" "정말요?" 같은 짧은 말뿐이었다. 나는 마녀에게 차를 마시며 "난 친구가 하나도 없어요"라고 말했고, 마녀는 "진짜? 친구가 많게 생겼는데?"라고 물었다. 마녀는 "우정은 듣는 데서 시작한다", "말 잘하는 사람에게는 귀를 열지만 잘 듣는 사람에게는 마음을 연다", "입은 하나고 귀는 두 개인거야 잘 들으라고", "이야기를 잘 듣는다는 건 상대방을 인정하고 존중한다는 뜻"이라고 가르쳐 줬다. 잘 들으려면 멈춘다(하던 일을 멈추고 참견·비난·충고하고 싶은 마음을 멈춤), 기울인다(몸과 마음을 상대에게 기울이고 눈을 바라보고 고개를 끄덕임), 기다린다(끼어들지 않고 말을 다 할 때까지 기다림). 경청은 마법이라고 했고, 잘 듣다 보면 몰랐던 것도 알게 되고 그 사람이 다르게 보인다고 했다. 나는 결국 친구가 생겼다.`,
  },
  {
    id: 'book-am-i-really-me',
    title: '내가 정말 나일까?',
    coverColor: '#FFE066',
    coverImage: '/covers/am-i-really-me-cover.png',
    contentForPrompt: `내가 정말 나일까?. 주인공 우고는 어느 날 아침 잠에서 깨어나 더 이상 예전의 우고가 아니게 된다. 온몸이 끄적끄적 낙서였고, 속으로도 생각이 뒤죽박죽 뒤엉킨 낙서였다. 다음 날은 온몸이 가늘가늘 점선이 되어 엄마에게 대답할 때 "입에 음식을 가득 문 채로 말하지 말라"는 말만 들었다. 그다음엔 온몸이 점점점 점이 되어 선생님 질문에 "........"만 하고 수줍어 말을 끝내지 못했다. 그다음엔 구불구불 곡선이 되어 누나와 형에게 우아하다, 멋쟁이 같다고 듣고 마리우치아가 나와 놀고 싶어 할 거라 생각했다. 그다음엔 흐릿흐릿 흐리멍덩해져 이상한 말로 말다툼을 벌이고, 부들부들 덜덜거리는 날엔 망가진 핀볼처럼 흔들려 주변에 멀미를 일으켰다. 반듯반듯 사각형이 된 날엔 시간표를 정확히 지켰지만 실수를 받아들이지 못해 따분하다는 말을 들었다. 동글동글 동심원이 된 날엔 연못에 돌 던지고 과녁 맞히며 놀며 처음으로 목표가 있다고 느꼈지만 무엇인지 완전히 이해하지는 못했다. 뾰족뾰족 가시, 지그재그 제멋대로인 날에는 한 손으로 이것 저 손으로 저것 하며 공 튀기고 윗도리 벗어 던지는 등 문제를 많이 일으켰다. 거울에 비친 내 모습이 미로를 헤매는 날엔 신발 끈 묶기, 버스 타기 같은 간단한 일도 어려웠고 출구를 찾지 못했다. 날마다 다른 모습으로 깨어나 나 자신이 누구인지, 무엇을 좋아하는지, 무엇을 해야 하는지 몰라 수수께끼처럼 느껴졌다. 그러던 어느 날 깨어나니 다시 우고였고, 식구들이 있는 부엌로 달려가 "나 다시…" "정상이야…"라고 말한다.`,
  },
  {
    id: 'book-jirungi',
    title: '너무너무 지루한 지룽이',
    coverColor: '#BDE0FE',
    coverImage: '/covers/jirungi-cover.png',
    contentForPrompt: `너무너무 지루한 지룽이. 에밀은 침대에 앉아 있어요. 방에는 책도 많고 장난감도 산더미예요. 하지만 에밀은 아무것도 안 해요, 아무 일도 안 일어나요. 똑똑 소리에 창밖을 보니 손이 없고 몸은 길쭉하고 키는 아주아주 큰 누군가가 뾰족한 코로 창문을 두드리고 있었어요. 에밀이 창문을 살짝 열자 누군가가 연기처럼 창틈으로 스며들어 왔어요. "나는 지룽이야. 너무너무 지루한 지룽이." 지룽이는 글씨를 못 읽고 아는 이야기도 없다고 했어요. 에밀은 '아무렇게나 지어 봐'라며 장난감 악어 프리츠와 인형 펠린느를 내밀어 이야기를 만들기 시작해요. 지룽이는 "말도 안 돼"라며 심통을 부렸어요. 에밀은 진짜 보물 상자(조개껍데기, 새 깃털, 젤리 곰)를 내밀며 "이거 봐!" 했는데, 지룽이가 "저리 치워!"라고 소리치며 침대 밑으로 숨어 버렸어요. 에밀은 상자를 침대 밑으로 밀어 넣으며 장난감 강아지 둘과 호랑이를 "보물 상자를 지키는 용"으로 바꿨어요. 베개와 방석으로 성을 쌓고, 프리츠가 용을 달래 과자와 케이크를 주는 이야기를 이어갔어요. 침대 밑에서 지룽이가 투덜대다가 에밀이 "나와서 같이 놀자!"라고 하자 슬그머니 기어 나왔는데, 아까보다 훨씬 작아지고 짧아져 있었어요. 지룽이는 "여긴 내가 있을 데가 아니야. 사실 나는 처음부터 여기 없었어."라고 말하며 연기처럼 스르르 창밖으로 빠져나갔어요. 에밀은 지룽이를 잠깐 내려다보았고, 곧 성과 호랑이와 용과 보물 상자에 정신이 팔려 앞으로의 모험을 기대해요.`,
  },
  {
    id: 'book-willy',
    title: '윌리가 보는 세상',
    coverColor: '#E8D5A3',
    coverImage: '/covers/willy-cover.png',
    contentForPrompt: `윌리가 보는 세상. 여름 방학이 끝나갈 무렵 맞은편에 새 이웃이 이사 와 남자아이가 나를 쳐다보길래 손을 흔들었는데 녀석이 집으로 쏙 들어가 버렸다. 다음 날 그 애와 엄마가 찾아와 "같은 학교에 다니는데 둘이 함께 다니면 좋겠다"고 했고 나는 화가 났다(저 녀석이 어제 알은척도 안 했는데). 엄마가 "애비 이리 와서 윌리와 아주머니께 인사드리렴"이라 불러 나는 조그마한 목소리로 "안녕" 했고, 윌리가 "안녕 애비, 난 윌리라고 해. 네 손을 잡아도 될까?"라고 물었다. 윌리의 엄마가 "윌리는 눈이 보이지 않는단다. 네가 친구가 되어 윌리랑 함께 학교에 다녀 주면 좋겠구나"라고 했다. 나는 매일 윌리와 등하교하게 되었고 윌리는 길에서 마주하는 모든 일을 신기해해 덕분에 나도 탐험하게 됐다. 걸을 때 윌리는 내 팔꿈치를 잡았고 그렇게 해야 마음을 놓을 수 있다고 했다. 윌리는 점자(점으로 이루어진 글자)를 손가락 끝으로 읽고, 내가 평범하다고 느끼는 것들이 윌리에게는 평범하지 않다고 한다. 꿀벌 윙윙 소리도 윌리에게는 너무 커서 겁이 난다고 했다. 윌리는 수업에서 이해 못한 부분을 녹음해 집에서 몇 번이고 다시 듣고, 교과서는 글자가 점으로 되어 있고 그림도 볼록하게 솟아 있어 손으로 읽을 수 있다. "교과서를 손으로 꼼꼼히 만져야 아주 작은 부분까지 놓치지 않을 수 있다"고 윌리는 말했다. 윌리는 눈을 감고도 귀와 손으로 세상을 "보는" 마법사 같다. 한 번은 윌리네에서 정전이 나 캄캄해졌는데 윌리는 집 안 방향을 다 알고 복도 문 위치까지 정확히 찾아 나를 화장실에 데려다줬다. 바닷가에서는 코로 짭짤한 바닷바람, 발가락으로 조약돌의 따스한 햇볕, 귀로 행복한 웃음소리를 "보았"다. 공원에서는 손가락으로 촉촉한 잔디, 귀로 풀숲의 새와 달리는 강아지 소리를 "보았"다. 윌리는 고양이 마리를 울음소리(다정해서 다르다), 털이 곧고 가지런해 만지면 알아챔, 허브 차 같은 향기로 알아보는데 마트에서는 마리와 같은 향을 맡아 본 적이 없다고 한다. 반 아이들이 나쁜 말을 할 때 나는 화가 나지만 대꾸를 안 하는데, 윌리는 내가 화난 걸 손이 바들바들 떨리고 목소리가 가라앉은 걸로 알아차리고 공원으로 데려가 아이스크림을 함께 먹자고 한다. 윌리는 상대가 거짓말하는지 말투로 "느낄 수 있었다"고 한다. 할아버지가 세상을 떠난 날 나는 눈물을 흘리지 않아 친척들이 이상하다고 수군거렸지만, 윌리가 손을 잡고 꼬옥 안아 주며 등을 토닥이자 눈물이 주르륵 흘러내렸다. 윌리는 내 슬픔을 알아본 첫 번째 사람이었다. "사랑도 볼 수 있어?" "사랑은 느낄 수 있는 것 같아. 선생님이 어깨에 손을 얹고 물을 때, 아빠가 사랑해라고 할 때, 엄마가 품에 안아 줄 때… 매일 느껴." "그럼 나도 사랑을 느낄 수 있는 것 같아." "너랑 내가 함께 아이스크림 먹을 때야!"`,
  },
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
