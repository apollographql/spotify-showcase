import { createBrowserRouter, redirect } from 'react-router-dom';

import Index from './routes/index';
import Root from './routes/root';
import Playlist from './routes/playlists/playlist';
import { logout, login } from './auth';
import { isLoggedInVar } from './vars';

import RootErrorBoundary from './components/RootErrorBoundary';

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
        loader: () => {
          const isLoggedIn = isLoggedInVar();

          if (!isLoggedIn) {
            return redirect('/');
          }
        },
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
