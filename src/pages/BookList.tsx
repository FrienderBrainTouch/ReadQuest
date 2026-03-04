import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../data/books';
import styles from './BookList.module.css';

export default function BookList() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>책을 골라 보세요</h1>
        <p className={styles.subtitle}>표지를 누르면 내용을 확인할 수 있어요</p>
      </header>
      <section className={styles.bookSection} aria-label="도서 목록">
        <div className={styles.bookGrid} role="list">
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
                className={`${styles.bookCover} ${book.coverImage ? styles.bookCoverWithImg : ''}`}
                style={{ background: book.coverColor }}
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt=""
                    className={styles.bookCoverImg}
                  />
                ) : (
                  <span className={styles.bookCoverTitle}>{book.title}</span>
                )}
              </div>
              <span className={styles.bookTitle}>{book.title}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
