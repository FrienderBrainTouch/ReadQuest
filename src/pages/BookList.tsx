import { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../data/books';
import styles from './BookList.module.css';

export default function BookList() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isSearchOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [isSearchOpen]);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BOOKS;
    return BOOKS.filter((b) => b.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.topRight}>
          <div className={styles.searchWrap} data-open={isSearchOpen ? 'true' : 'false'}>
            <button
              type="button"
              className={styles.searchButton}
              aria-label={isSearchOpen ? '도서 검색 닫기' : '도서 검색 열기'}
              onClick={() => {
                setIsSearchOpen((v) => {
                  const next = !v;
                  if (v && query) setQuery('');
                  return next;
                });
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M10.5 3a7.5 7.5 0 1 0 4.6 13.4l4.75 4.75a1 1 0 0 0 1.42-1.42l-4.75-4.75A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <input
              ref={inputRef}
              className={styles.searchInput}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="도서 검색"
              aria-label="도서 검색"
            />
          </div>
        </div>
        <h1 className={styles.title}>책을 골라 보세요</h1>
        <p className={styles.subtitle}>표지를 누르면 내용을 확인할 수 있어요</p>
      </header>
      <section className={styles.bookSection} aria-label="도서 목록">
        <div className={styles.bookGrid} role="list">
          {filteredBooks.map((book) => (
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
        {filteredBooks.length === 0 && (
          <p className={styles.emptyState}>검색 결과가 없어요.</p>
        )}
      </section>
    </div>
  );
}
