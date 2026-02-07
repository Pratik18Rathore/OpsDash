import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAppSelector } from '@/hooks/useAppDispatch';

export function DashboardLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 pl-16 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
