import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../data/books';
import styles from './BookList.module.css';

export default function BookList() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>책을 골라 보세요</h1>
        <p className={styles.subtitle}>클릭하면 퀴즈를 풀 수 있어요</p>
      </header>
      <main className={styles.carousel} role="list">
        {BOOKS.map((book) => (
          <button
            key={book.id}
            type="button"
            className={styles.bookCard}
            onClick={() => navigate(`/books/${book.id}`)}
            aria-label={`${book.title} 읽기`}
            role="listitem"
          >
            <div
              className={styles.bookCover}
              style={{ background: book.coverColor }}
            >
              <span className={styles.bookTitle}>{book.title}</span>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
}
