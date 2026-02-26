import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';
import type { Book, Content } from '../data/books';
import { getBookById } from '../data/books';
import { generateContentsForBook } from '../services/ai';

type ContentMap = Record<string, Content[]>;

interface ContentCacheContextType {
  getContents: (bookId: string) => Content[] | undefined;
  setContents: (bookId: string, contents: Content[]) => void;
  fetchContentsForBook: (bookId: string) => Promise<Content[]>;
  isLoading: (bookId: string) => boolean;
}

const ContentCacheContext = createContext<ContentCacheContextType | null>(null);

export function ContentCacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<ContentMap>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const getContents = useCallback((bookId: string) => cache[bookId], [cache]);
  const setContents = useCallback((bookId: string, contents: Content[]) => {
    setCache((prev) => ({ ...prev, [bookId]: contents }));
  }, []);

  const isLoading = useCallback(
    (bookId: string) => loadingIds.has(bookId),
    [loadingIds]
  );

  const fetchContentsForBook = useCallback(async (bookId: string): Promise<Content[]> => {
    const book = getBookById(bookId) as Book | undefined;
    if (!book) return [];

    setLoadingIds((prev) => new Set(prev).add(bookId));
    try {
      const contents = await generateContentsForBook({
        bookTitle: book.title,
        contentForPrompt: book.contentForPrompt,
      });
      setCache((prev) => ({ ...prev, [bookId]: contents }));
      return contents;
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(bookId);
        return next;
      });
    }
  }, []);

  return (
    <ContentCacheContext.Provider
      value={{ getContents, setContents, fetchContentsForBook, isLoading }}
    >
      {children}
    </ContentCacheContext.Provider>
  );
}

export function useContentCache() {
  const ctx = useContext(ContentCacheContext);
  if (!ctx) throw new Error('useContentCache must be used within ContentCacheProvider');
  return ctx;
}
