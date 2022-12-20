import { Suspense } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import Index, { LoadingState as IndexLoadingState } from './routes/index';
import Root from './routes/root';
import Artist, {
  LoadingState as ArtistLoadingState,
} from './routes/artists/artist';
import Album, {
  LoadingState as AlbumLoadingState,
} from './routes/albums/album';
import Playlist, {
  Loading as PlaylistLoading,
} from './routes/playlists/playlist';
import { logout, login } from './auth';
import { isLoggedInVar } from './vars';

import RootErrorBoundary from './components/RootErrorBoundary';
import RootLoadingState from './components/RootLoadingState';

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
    element: (
      <Suspense fallback={<RootLoadingState />}>
        <Root />
      </Suspense>
    ),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<IndexLoadingState />}>
            <Index />
          </Suspense>
        ),
      },
      {
        loader: () => {
          const isLoggedIn = isLoggedInVar();

          if (!isLoggedIn) {
            return redirect('/');
          }

          return null;
        },
        children: [
          {
            path: '/albums/:albumId',
            element: (
              <Suspense fallback={<AlbumLoadingState />}>
                <Album />
              </Suspense>
            ),
          },
          {
            path: '/artists/:artistId',
            element: (
              <Suspense fallback={<ArtistLoadingState />}>
                <Artist />
              </Suspense>
            ),
          },
          {
            path: '/playlists/:playlistId',
            element: (
              <Suspense fallback={<PlaylistLoading />}>
                <Playlist />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
