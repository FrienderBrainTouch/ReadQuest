/** AI가 생성하는 콘텐츠 타입 */
export type ContentType = 'ox_quiz' | 'multiple_choice' | 'ordering' | 'fill_blank';

export interface OxQuizContent {
  id: string;
  type: 'ox_quiz';
  question: string;
  correctAnswer: 'O' | 'X';
  explanation: string;
  order: number;
}

export interface MultipleChoiceContent {
  id: string;
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  order: number;
}

export interface OrderingContent {
  id: string;
  type: 'ordering';
  question: string;
  items: string[];
  explanation: string;
  order: number;
}

export interface FillBlankContent {
  id: string;
  type: 'fill_blank';
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  order: number;
}

export type Content =
  | OxQuizContent
  | MultipleChoiceContent
  | OrderingContent
  | FillBlankContent;

export interface Book {
  id: string;
  title: string;
  coverColor: string;
  /** AI에게 전달할 도서 내용 요약/원문 (문제·답 생성용) */
  contentForPrompt: string;
}

export const MOCK_PASSWORD = 'readquest123';

export const BOOKS: Book[] = [
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
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
