import { createContext } from 'react';
import type { Content } from '../data/books';

type ContentMap = Record<string, Content[]>;

export interface ContentCacheContextType {
  getContents: (bookId: string) => Content[] | undefined;
  setContents: (bookId: string, contents: Content[]) => void;
  fetchContentsForBook: (bookId: string) => Promise<Content[]>;
  isLoading: (bookId: string) => boolean;
}

export const ContentCacheContext = createContext<ContentCacheContextType | null>(null);

export type { ContentMap };

