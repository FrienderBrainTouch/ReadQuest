import { useContext } from 'react';
import { ContentCacheContext } from './contentCacheCore';

export function useContentCache() {
  const ctx = useContext(ContentCacheContext);
  if (!ctx) throw new Error('useContentCache must be used within ContentCacheProvider');
  return ctx;
}

