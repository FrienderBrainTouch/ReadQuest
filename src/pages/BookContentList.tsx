import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../data/books';
import type { ContentType } from '../data/books';
import { getAvailableContentTypes } from '../data/preGeneratedQuestions';
import styles from './BookContentList.module.css';

const CONTENT_ITEMS: { type: ContentType; label: string; subLabel: string }[] = [
  { type: 'ox_quiz', label: 'OX 퀴즈', subLabel: '도전해봐요!' },
  { type: 'multiple_choice', label: '객관식 퀴즈', subLabel: '같이 풀어요!' },
  { type: 'ordering', label: '순서 맞추기', subLabel: '순서를 맞춰요!' },
  { type: 'fill_blank', label: '빈칸 채우기', subLabel: '빈칸을 채워요!' },
  { type: 'emotion_stair', label: '감정 흐름 계단', subLabel: '사건을 감정 강도에 배치해요' },
  { type: 'elimination_reasons', label: '따뜻해진 이유 찾기', subLabel: '진짜 이유만 남겨요' },
  { type: 'categorize', label: '이야기 구조 나누기', subLabel: '시작·중간·끝으로 나눠요' },
  { type: 'match_pairs', label: '말-결과 연결', subLabel: '말과 결과를 이어요' },
  { type: 'choice_with_result', label: '같은 상황 다른 말', subLabel: '말에 따른 결과를 비교해요' },
];

export default function BookContentList() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = bookId ? getBookById(bookId) : undefined;
  const availableTypes = bookId ? getAvailableContentTypes(bookId) : [];
  const itemsToShow = availableTypes.length > 0
    ? CONTENT_ITEMS.filter((item) => availableTypes.includes(item.type))
    : CONTENT_ITEMS;

  if (!book) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>책을 찾을 수 없어요.</p>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/books')}
        >
          뒤로
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/books')}
          aria-label="책 목록으로 돌아가기"
        >
          뒤로
        </button>
        <div
          className={styles.bookBanner}
          style={{ background: book.coverColor }}
        >
          <h1 className={styles.title}>{book.title}</h1>
        </div>
        <p className={styles.subtitle}>아래에서 활동을 골라 보세요!</p>
      </header>
      <main className={styles.grid}>
        {itemsToShow.map((item) => (
          <button
            key={item.type}
            type="button"
            className={styles.card}
            onClick={() => bookId && navigate(`/books/${bookId}/content/${item.type}`)}
          >
            <span className={styles.cardIcon} data-type={item.type} aria-hidden />
            <span className={styles.cardLabel}>{item.label}</span>
            <span className={styles.cardSub}>{item.subLabel}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
