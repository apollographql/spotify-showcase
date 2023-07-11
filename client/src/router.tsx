import { Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';

import * as AlbumRoute from './routes/albums/album';
import * as ArtistRoute from './routes/artists/artist';
import * as CollectionAlbumsRoute from './routes/collection/albums';
import * as CollectionArtistsRoute from './routes/collection/artists';
import * as CollectionIndexRoute from './routes/collection/index';
import * as CollectionRoute from './routes/collection';
import * as CollectionPlaylistsRoute from './routes/collection/playlists';
import * as CollectionPodcastsRoute from './routes/collection/podcasts';
import * as CollectionTracksRoute from './routes/collection/tracks';
import * as EpisodeRoute from './routes/episodes/episode';
import * as IndexRoute from './routes/index';
import * as LoggedOutRoute from './routes/logged-out';
import * as LogoutRoute from './routes/logout';
import * as PlaylistRoute from './routes/playlists/playlist';
import * as QueueRoute from './routes/queue';
import * as RootRoute from './routes/root';
import * as SettingsRoute from './routes/settings';
import * as ShowRoute from './routes/shows/show';
import * as TrackRoute from './routes/tracks/track';
import * as LoginRoute from './routes/login';
import * as OAuthRoute from './routes/oauth/finalize';

import RootErrorBoundary from './components/RootErrorBoundary';
import { isLoggedInVar } from './vars';

const routes = createRoutesFromElements(
  <Route path="/" errorElement={<RootErrorBoundary />}>
    <Route path="logout" loader={LogoutRoute.loader} />,
    <Route path="login" loader={LoginRoute.loader} />,
    <Route path="/oauth/finalize" errorElement={<RootErrorBoundary />} loader={OAuthRoute.loader} />,
    <Route
      path="logged-out"
      loader={LoggedOutRoute.loader}
      element={<LoggedOutRoute.RouteComponent />}
    />
    <Route
      element={
        <Suspense fallback={<RootRoute.LoadingState />}>
          <RootRoute.RouteComponent />
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Suspense fallback={<IndexRoute.LoadingState />}>
            <IndexRoute.RouteComponent />
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
            <Suspense fallback={<SettingsRoute.LoadingState />}>
              <SettingsRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="/queue"
          element={
            <Suspense fallback={<QueueRoute.LoadingState />}>
              <QueueRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="albums/:albumId"
          element={
            <Suspense fallback={<AlbumRoute.LoadingState />}>
              <AlbumRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="artists/:artistId"
          element={
            <Suspense fallback={<ArtistRoute.LoadingState />}>
              <ArtistRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="episodes/:episodeId"
          element={
            <Suspense fallback={<EpisodeRoute.LoadingState />}>
              <EpisodeRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="playlists/:playlistId"
          element={
            <Suspense fallback={<PlaylistRoute.LoadingState />}>
              <PlaylistRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="shows/:showId"
          element={
            <Suspense fallback={<ShowRoute.LoadingState />}>
              <ShowRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="tracks/:trackId"
          element={
            <Suspense fallback={<TrackRoute.LoadingState />}>
              <TrackRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route
          path="collection/tracks"
          element={
            <Suspense fallback={<CollectionTracksRoute.LoadingState />}>
              <CollectionTracksRoute.RouteComponent />
            </Suspense>
          }
        />
        <Route path="collection" element={<CollectionRoute.RouteComponent />}>
          <Route index loader={CollectionIndexRoute.loader} />
          <Route
            path="playlists"
            element={
              <Suspense fallback={<CollectionPlaylistsRoute.LoadingState />}>
                <CollectionPlaylistsRoute.RouteComponent />
              </Suspense>
            }
          />
          <Route
            path="podcasts"
            element={
              <Suspense fallback={<CollectionPodcastsRoute.LoadingState />}>
                <CollectionPodcastsRoute.RouteComponent />
              </Suspense>
            }
          />
          <Route
            path="artists"
            element={
              <Suspense fallback={<CollectionArtistsRoute.LoadingState />}>
                <CollectionArtistsRoute.RouteComponent />
              </Suspense>
            }
          />
          <Route
            path="albums"
            element={
              <Suspense fallback={<CollectionAlbumsRoute.LoadingState />}>
                <CollectionAlbumsRoute.RouteComponent />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Route>
  </Route>
);

export default createBrowserRouter(routes);
