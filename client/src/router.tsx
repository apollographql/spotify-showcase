import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';

import Index from './routes/index';
import Root from './routes/root';
import Playlist from './routes/playlists/$id';
import { logout, login } from './auth';

import RootErrorBoundary from './components/RootErrorBoundary';
import RequireAuth from './components/RequireAuth';

import { LOGIN_URL } from './constants';

const router = createBrowserRouter([
  {
    path: '/set-token',
    loader: ({ request }) => {
      const url = new URL(request.url);
      const token = url.searchParams.get('token');

      if (token) {
        login(token);
      }

      return redirect('/');
    },
  },
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
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: <Index /> },
      {
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [
          {
            path: '/playlists/:playlistId',
            element: <Playlist />,
          },
        ],
      },
    ],
  },
]);

export default router;
