import { useCallback, useState, type ReactNode } from 'react';
import type { Content } from '../data/books';
import { ContentCacheContext, type ContentMap } from './contentCacheCore';

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
    // OpenAI 기반 일괄 생성 기능은 제거되었으므로,
    // 현재 구현에서는 캐시에 이미 존재하는 내용만 반환하고,
    // 없으면 빈 배열을 돌려줍니다.
    const existing = cache[bookId];
    if (existing) return existing;
    return [];
  }, [cache]);

  return (
    <ContentCacheContext.Provider
      value={{ getContents, setContents, fetchContentsForBook, isLoading }}
    >
      {children}
    </ContentCacheContext.Provider>
  );
}
