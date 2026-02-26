import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookContentList from './pages/BookContentList';
import ContentPlay from './pages/ContentPlay';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/:bookId"
        element={
          <ProtectedRoute>
            <BookContentList />
          </ProtectedRoute>
        }
      />
      {/* 콘텐츠 타입(ox_quiz, multiple_choice 등) 단위로 플레이 */}
      <Route
        path="/books/:bookId/content/:contentType"
        element={
          <ProtectedRoute>
            <ContentPlay />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
