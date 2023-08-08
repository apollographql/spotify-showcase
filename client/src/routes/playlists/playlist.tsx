import { useParams } from 'react-router-dom';
import { gql, useSuspenseQuery } from '@apollo/client';
import {
  PlaylistQuery,
  PlaylistQueryVariables,
  PlaylistRoutePlaybackStateFragment,
} from '../../types/api';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import PlayButton from '../../components/PlayButton';
import Skeleton from '../../components/Skeleton';
import usePlaybackState from '../../hooks/usePlaybackState';
import { parseSpotifyIDFromURI } from '../../utils/spotify';
import { PlaylistPage } from '../../components/PlaylistPage';

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    playlist(id: $id) {
      id
      tracks(offset: $offset) {
        edges {
          addedAt
          node {
            id
            name
            durationMs
            uri

            ... on Track {
              album {
                id
                name
              }

              ...TrackNumberCell_track
            }

            ... on Episode {
              releaseDate {
                date
                precision
              }
              show {
                id
                name
              }
            }

            ...PlaylistTitleCell_playlistTrack
          }
        }
        pageInfo {
          hasNextPage
          offset
          limit
          total
        }
        ...PlaylistPage_tracks
      }

      ...PlaylistPage_playlist
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaylistRoutePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const PlaylistRoute = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data, fetchMore } = useSuspenseQuery<
    PlaylistQuery,
    PlaylistQueryVariables
  >(PLAYLIST_QUERY, { variables: { id: playlistId } });
  const playlist = data.playlist;

  if (!playlist) {
    throw new Error('Playlist not found');
  }

  return (
    <PlaylistPage
      playlist={playlist}
      tracks={playlist.tracks}
      onLoadMore={fetchMore}
    />
  );
};

export const RouteComponent = PlaylistRoute;

export const LoadingState = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const playbackState = usePlaybackState<PlaylistRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const contextUri = playbackState?.context?.uri;
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = contextUri
    ? parseSpotifyIDFromURI(contextUri) === playlistId
    : false;

  return (
    <Page>
      <Page.SkeletonHeader />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            disabled
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingPlaylist}
          />
        </Page.ActionsBar>
        <Skeleton.Table
          rows={10}
          columns={[
            <Skeleton.Text key="text" />,
            <Flex key="header" gap="0.5rem" alignItems="end">
              <Skeleton.CoverPhoto size="2.5rem" />
              <Flex direction="column" flex={1} gap="0.5rem">
                <Skeleton.Text width="25%" fontSize="1rem" />
                <Skeleton.Text width="20%" fontSize="0.75rem" />
              </Flex>
            </Flex>,
            <Skeleton.Text key="text2" />,
            <Skeleton.Text key="text3" />,
          ]}
        />
      </Page.Content>
    </Page>
  );
};
