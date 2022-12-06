import { createBrowserRouter, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import UserLogin from '../pages/Login';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminLogin from '../pages/Admin/Login';
import NotFound from '../pages/NotFound';
import ViewReportSidebar from '../pages/Home/components/ViweReportSidebar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'login',
        element: <UserLogin />,
      },

      {
        path: 'register',
        element: <Register />,
      },

      {
        path: 'view/:reportId',
        element: <ViewReportSidebar />,
      },
    ],
  },

  {
    path: '/admin',
    element: <Navigate to='/admin/dashboard' />,
  },

  // {
  //   path: '/register',
  //   element: <Register />,
  // },

  // {
  //   path: '/login',
  //   element: <UserLogin />,
  // },

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
