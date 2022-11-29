import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import UserLogin from '../pages/Login';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminLogin from '../pages/Admin/Login';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/login',
    element: <UserLogin />,
  },

  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
]);

export default router;
