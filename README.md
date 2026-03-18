## ReadQuest

초등 1~3학년을 위한 **독서 기반 퀴즈/활동 학습 도구**입니다.  
그림책/동화의 내용을 바탕으로 다양한 유형의 활동을 제공해, 책 읽기 이후의 사고 확장과 대화를 돕는 것을 목표로 합니다.


### 주요 특징

- **도서 기반 활동**: `docs/books/*.md`와 `src/data/books.ts`에 정의된 책 정보를 바탕으로 활동이 구성됩니다.
- **다양한 활동 타입**: 단순 퀴즈(OX/객관식/순서/빈칸)부터 감정·관계·서사 구조를 다루는 확장 활동까지 포함합니다.
- **초등 저학년 친화 UI**: 큰 버튼, 명확한 피드백 문구, 최소 입력으로 사용할 수 있는 흐름을 지향합니다.


### 실행 방법

1. 패키지 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 `http://localhost:5173` (Vite 기본 포트 기준)을 열어 접속합니다.


### 환경 변수

현재 버전에서는 OpenAI 등 외부 AI API를 사용하지 않습니다. 별도의 환경 변수 설정 없이 바로 실행할 수 있습니다.


### 화면 흐름

1. **로그인 화면 (`/login`)**
   - 비밀번호 하나만 입력하면 되는 단일 로그인 화면입니다.
   - `src/context/AuthContext.tsx`/`authCore.ts`에서 **MOCK_PASSWORD**를 기준으로 검증합니다.
   - 성공 시 `/books`로 이동합니다.

2. **도서 목록 화면 (`/books`)**
   - `src/pages/BookList.tsx`
   - `BOOKS` 상수(`src/data/books.ts`)에 정의된 책들을 카드 형태로 보여줍니다.
   - 상단 돋보기 버튼을 눌러 **제목 검색**을 토글할 수 있습니다.
   - 각 카드(표지)를 클릭하면 `/books/:bookId`로 이동합니다.

3. **도서별 활동 선택 화면 (`/books/:bookId`)**
   - `src/pages/BookContentList.tsx`
   - 선택한 책에 대해 제공되는 **활동 타입 목록**을 보여줍니다.
   - `getAvailableContentTypes(bookId)`(`src/data/preGeneratedQuestions.ts`) 결과가 있으면,
     - 해당 타입만 노출합니다(사전 생성된 활동이 있는 타입).
   - 결과가 없으면, 정의된 모든 타입을 노출합니다.
   - 활동 카드 클릭 시 `/books/:bookId/content/:contentType`으로 이동합니다.

4. **활동 플레이 화면 (`/books/:bookId/content/:contentType`)**
   - `src/pages/ContentPlay.tsx`
   - 흐름
     - 먼저 `getPreGeneratedContents(bookId, contentType)`로 사전 생성된 활동이 있는지 확인합니다.
       - 있으면 그 목록을 그대로 사용(순차 진행).
       - 없으면 해당 활동 타입은 **"이 책에서는 이 활동 문제를 만들 수 없어요."** 메시지를 보여주고 종료합니다.
     - 마지막 문제까지 풀면 **"모든 문제를 풀었어요!"** 메시지가 표시되며 활동이 종료됩니다.
   - 뒤로 가기
     - 상단 `뒤로` 버튼을 누르면 `/books/:bookId`로 이동하며, 진행 중이던 문제 상태는 초기화됩니다.


### 지원하는 활동 타입

`ContentPlay.tsx`와 `BookContentList.tsx`에서 다음과 같은 `ContentType`을 지원합니다.

- **ox_quiz**: OX 퀴즈
  - 질문에 대해 O / X 중 하나를 선택합니다.
  - 정답 여부와 함께 설명이 표시됩니다.

- **multiple_choice**: 객관식 퀴즈
  - 4지선다 등을 선택하는 전형적인 객관식 문제입니다.
  - 보기 순서는 랜덤 셔플되며, 정답/오답에 따라 각각 다른 설명을 보여줄 수 있습니다.

- **ordering**: 순서 맞추기
  - 주어진 문장/사건 카드를 드래그 앤 드롭으로 재배치합니다.
  - 확인 후, 내가 고른 순서와 정답 순서를 한 눈에 비교할 수 있게 표시합니다.

- **fill_blank**: 빈칸 채우기
  - 지문 내 `____` 부분을 `(  )`로 표시하고, 보기 중에서 알맞은 단어/문장을 선택합니다.

- **emotion_stair**: 감정 흐름 계단
  - 사건 카드를 여러 단계의 감정 계단(예: 외로움 → 따뜻함)에 배치합니다.
  - 정답 단계와 함께 각 단계에 대한 설명을 보여 줄 수 있습니다.

- **elimination_reasons**: 따뜻해진 이유 찾기
  - 여러 이유 중에서 **겉이유**라고 생각되는 항목을 클릭하여 지우는 활동입니다.
  - 결과 화면에서 진짜 이유/겉이유를 구분해 피드백을 제공합니다.

- **categorize**: 이야기 구조 나누기
  - 사건 카드를 `시작 / 중간 / 끝` 등 카테고리로 나누어 배치합니다.
  - 각 카드의 정답 카테고리와 맞춘 개수에 대한 피드백을 제공합니다.

- **match_pairs / match_pairs_sense / match_pairs_cause_effect**: 짝 맞추기
  - 왼쪽 카드(말/상황/원인 등)와 오른쪽 카드(결과/감각/결과 등)를 클릭으로 연결합니다.
  - 연결선이 그려지며 시각적으로 대응 관계를 확인할 수 있습니다.
  - 결과 화면에서 잘못 연결된 짝에 대해 정답을 함께 보여줍니다.

- **choice_with_result**: 같은 상황, 다른 말
  - 동일한 상황에 대해 여러 말을 제시하고, 그 중 하나를 고르면
    - **정답의 이야기**와 **틀린 답의 이야기**를 나란히 비교해서 보여줍니다.
  - 말의 선택에 따라 다른 결과가 나타나는 것을 체험하게 합니다.

- **crisis_resolution**: 위기 상황 해결하기
  - 책 속 위기 상황을 주고, 어떻게 대응해야 하는지 선택하게 합니다.
  - 정답/오답 별로 다른 설명을 제공하여 바람직한 대처를 학습합니다.

- **together_outcome**: 함께하면 어떻게 될까?
  - 함께 행동했을 때의 긍정적 결과를 고르는 활동입니다.
  - `함께라면`에 해당하는 선택지를 정답으로 인식합니다.

- **listening_three_step**: 경청 3단계 실천 판단하기
  - `멈춘다 / 기울인다 / 기다린다` 중 어떤 단계에 해당하는지 선택하는 활동입니다.
  - 각 단계의 의미를 함께 보여주어, 올바른 경청 태도를 학습하도록 돕습니다.


### 인증 / 상태 관리 구조

- **인증**
  - `AuthProvider` (`src/context/AuthContext.tsx`)
    - `isLoggedIn`, `login`, `logout`을 제공하는 컨텍스트입니다.
    - `MOCK_PASSWORD` (`src/data/books.ts`)와 비교하여 로그인 여부를 판단합니다.
  - `useAuth` 훅 (`src/context/useAuth.ts`)
    - 컴포넌트에서 손쉽게 인증 상태를 사용하기 위한 래퍼입니다.
  - `ProtectedRoute` (`src/App.tsx`)
    - 로그인되지 않은 사용자가 보호된 라우트에 접근하면 `/login`으로 리다이렉트합니다.

-- **콘텐츠 캐시**
  - `ContentCacheProvider` (`src/context/ContentCacheContext.tsx`)
    - 책별로 메모리에 보관한 활동 목록을 제공하기 위한 컨텍스트입니다.
    - 현재 구현에서는 사전 정의된 활동을 중심으로 사용하며, 외부 AI를 통한 일괄 생성은 사용하지 않습니다.


### 데이터 구조

- `src/data/books.ts`
  - 개별 책의 메타데이터 (`id`, `title`, `coverColor`, `coverImage` 등)를 정의합니다.
  - 로그인에 사용하는 `MOCK_PASSWORD` 상수도 이 파일에서 관리합니다.

- `src/data/preGeneratedQuestions.ts`
  - 일부 책/활동 타입에 대해, **사전에 사람이 직접 검증한 문제/활동**을 담고 있습니다.
  - `getPreGeneratedContents(bookId, contentType)`로 가져오며,
    - 있으면 그대로 사용합니다.
    - 없으면 해당 책/활동 타입에서는 플레이할 문제가 없는 것으로 처리합니다.

- `docs/books/*.md`
  - 각 도서의 원본/요약 콘텐츠가 마크다운으로 정리되어 있습니다.
  - `books.ts` 및 프롬프트 설계 시 참고 자료로 사용할 수 있습니다.


### 기술 스택

- **프론트엔드**
  - React 18
  - React Router 6
  - TypeScript
  - Vite 6

- **스타일링**
  - 페이지별 CSS 모듈 (`src/pages/*.module.css`)
  - 글로벌 스타일 `src/index.css`


### 배포/빌드

- 프로덕션 빌드
  ```bash
  npm run build
  ```
- 빌드 결과 미리보기
  ```bash
  npm run preview
  ```


### 개발자가 보면 좋은 추가 문서

- `ALL_BOOKS_ACTIVITIES.md`: 각 도서별로 어떤 활동 타입이 준비되어 있는지 한눈에 보는 정리 파일
- `docs/콘텐츠_문제답_검증.md`: 콘텐츠(문제/답안)의 검증 기준 및 사례를 정리한 문서
  - 새로운 사전 생성 문제를 추가할 때 참고하면 좋습니다.
