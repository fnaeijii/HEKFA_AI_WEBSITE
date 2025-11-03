import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // اطلاعات کاربر را از localStorage می‌خوانیم
  const userInfo = localStorage.getItem('userInfo');

  // اگر اطلاعات وجود داشت (یعنی کاربر لاگین کرده)، اجازه دسترسی به صفحات فرزند را بده (با <Outlet />)
  // در غیر این صورت، کاربر را به صفحه لاگین هدایت کن
  return userInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;