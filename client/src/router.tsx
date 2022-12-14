import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';

import Logout from './routes/logout';
import Index from './routes/index';
import Root from './routes/root';
import SetToken from './routes/set-token';

import RequireAuth from './components/RequireAuth';

import { LOGIN_URL } from './constants';

const router = createBrowserRouter([
  { path: '/set-token', element: <SetToken /> },
  {
    path: '/login',
    loader: () => redirect(LOGIN_URL),
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Oops!</div>,
    children: [
      { index: true, element: <Index /> },
      {
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [],
      },
    ],
  },
]);

export default router;
