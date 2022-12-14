import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';

import Index from './routes/index';
import Root from './routes/root';
import SetToken from './routes/set-token';
import { logout } from './auth';

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
    loader: () => {
      logout();
      return redirect('/');
    },
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
