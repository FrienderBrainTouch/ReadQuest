import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookContentList from './pages/BookContentList';
import ContentPlay from './pages/ContentPlay';
import AppLayout from './components/AppLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // 새로고침 등으로 로그인이 풀리면 로그인 화면으로 이동
  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
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
      </Route>
    </Routes>
  );
}
