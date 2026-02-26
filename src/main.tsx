import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentCacheProvider } from './context/ContentCacheContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentCacheProvider>
          <App />
        </ContentCacheProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
