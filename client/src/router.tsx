import { Suspense } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import Index, { LoadingState as IndexLoadingState } from './routes/index';
import Root from './routes/root';
import ArtistRoute, {
  LoadingState as ArtistRouteLoadingState,
} from './routes/artists/artist';
import AlbumRoute, {
  LoadingState as AlbumRouteLoadingState,
} from './routes/albums/album';
import CollectionTracksRoute, {
  LoadingState as CollectionTracksRouteLoadingState,
} from './routes/collection/tracks';
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
              <Suspense fallback={<AlbumRouteLoadingState />}>
                <AlbumRoute />
              </Suspense>
            ),
          },
          {
            path: '/artists/:artistId',
            element: (
              <Suspense fallback={<ArtistRouteLoadingState />}>
                <ArtistRoute />
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
          {
            path: '/collection/tracks',
            element: (
              <Suspense fallback={<CollectionTracksRouteLoadingState />}>
                <CollectionTracksRoute />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
