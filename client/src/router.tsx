import { Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';

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
import EpisodeRoute, {
  LoadingState as EpisodeRouteLoadingState,
} from './routes/episodes/episode';
import Playlist, {
  Loading as PlaylistLoading,
} from './routes/playlists/playlist';
import ShowRoute, {
  LoadingState as ShowRouteLoadingState,
} from './routes/shows/show';
import TrackRoute, {
  LoadingState as TrackRouteLoadingState,
} from './routes/tracks/track';
import Settings, {
  LoadingState as SettingsLoadingState,
} from './routes/settings';
import CollectionRoute from './routes/collection';
import CollectionPlaylistsRoute, {
  LoadingState as CollectionPlaylistsRouteLoadingState,
} from './routes/collection/playlists';
import CollectionAlbumsRoute, {
  LoadingState as CollectionAlbumsRouteLoadingState,
} from './routes/collection/albums';
import LoggedOutRoute, { loader as loggedOutLoader } from './routes/logged-out';
import CollectionPodcastsRoute, {
  LoadingState as CollectionPodcastsRouteLoadingState,
} from './routes/collection/podcasts';
import { loader as setTokenLoader } from './routes/set-token';
import { loader as loginLoader } from './routes/login';
import { loader as logoutLoader } from './routes/logout';
import * as CollectionIndexRoute from './routes/collection/index';
import * as CollectionArtistsRoute from './routes/collection/artists';
import { isLoggedInVar } from './vars';

import RootErrorBoundary from './components/RootErrorBoundary';
import RootLoadingState from './components/RootLoadingState';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<RootErrorBoundary />}>
      <Route path="set-token" loader={setTokenLoader} />,
      <Route path="login" loader={loginLoader} />,
      <Route path="logout" loader={logoutLoader} />,
      <Route
        path="logged-out"
        loader={loggedOutLoader}
        element={<LoggedOutRoute />}
      />
      <Route
        element={
          <Suspense fallback={<RootLoadingState />}>
            <Root />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<IndexLoadingState />}>
              <Index />
            </Suspense>
          }
        />
        <Route
          loader={() => {
            const isLoggedIn = isLoggedInVar();

            if (!isLoggedIn) {
              return redirect('/');
            }

            return null;
          }}
        >
          <Route
            path="settings"
            element={
              <Suspense fallback={<SettingsLoadingState />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="albums/:albumId"
            element={
              <Suspense fallback={<AlbumRouteLoadingState />}>
                <AlbumRoute />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="artists/:artistId"
          element={
            <Suspense fallback={<ArtistRouteLoadingState />}>
              <ArtistRoute />
            </Suspense>
          }
        />
        <Route
          path="episodes/:episodeId"
          element={
            <Suspense fallback={<EpisodeRouteLoadingState />}>
              <EpisodeRoute />
            </Suspense>
          }
        />
        <Route
          path="playlists/:playlistId"
          element={
            <Suspense fallback={<PlaylistLoading />}>
              <Playlist />
            </Suspense>
          }
        />
        <Route
          path="shows/:showId"
          element={
            <Suspense fallback={<ShowRouteLoadingState />}>
              <ShowRoute />
            </Suspense>
          }
        />
        <Route
          path="tracks/:trackId"
          element={
            <Suspense fallback={<TrackRouteLoadingState />}>
              <TrackRoute />
            </Suspense>
          }
        />
        <Route
          path="collection/tracks"
          element={
            <Suspense fallback={<CollectionTracksRouteLoadingState />}>
              <CollectionTracksRoute />
            </Suspense>
          }
        />
        <Route path="collection" element={<CollectionRoute />}>
          <Route index loader={CollectionIndexRoute.loader} />
          <Route
            path="playlists"
            element={
              <Suspense fallback={<CollectionPlaylistsRouteLoadingState />}>
                <CollectionPlaylistsRoute />
              </Suspense>
            }
          />
          <Route
            path="podcasts"
            element={
              <Suspense fallback={<CollectionPodcastsRouteLoadingState />}>
                <CollectionPodcastsRoute />
              </Suspense>
            }
          />
          <Route
            path="artists"
            element={
              <Suspense fallback={<CollectionArtistsRoute.LoadingState />}>
                <CollectionArtistsRoute.Component />
              </Suspense>
            }
          />
          <Route
            path="albums"
            element={
              <Suspense fallback={<CollectionAlbumsRouteLoadingState />}>
                <CollectionAlbumsRoute />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
