import { useParams } from 'react-router-dom';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  PlaylistQuery,
  PlaylistQueryVariables,
  PlaylistRoutePlaybackStateFragment,
} from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import PlaylistTable from '../../components/PlaylistTable';
import PlayButton from '../../components/PlayButton';
import Skeleton from '../../components/Skeleton';
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import { parseSpotifyIDFromURI } from '../../utils/spotify';

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($id: ID!) {
    playlist(id: $id) {
      id
      name
      uri
      images {
        url
      }
      owner {
        id
        displayName
      }
      tracks {
        edges {
          ...PlaylistTable_playlistTrackEdges
        }
        pageInfo {
          total
        }
      }
    }
  }

  ${PlaylistTable.fragments.playlistTrackEdges}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaylistRoutePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const Playlist = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data } = useSuspenseQuery<PlaylistQuery, PlaylistQueryVariables>(
    PLAYLIST_QUERY,
    { variables: { id: playlistId } }
  );

  const [resumePlayback] = useResumePlaybackMutation();

  const playbackState = usePlaybackState<PlaylistRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const playlist = data.playlist!;
  const { tracks } = playlist;
  const images = playlist.images ?? [];
  const coverPhoto = images[0];
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = playbackState?.context?.uri === playlist.uri;

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        mediaType="playlist"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={playlist.name}
        details={[
          <EntityLink entity={playlist.owner}>
            {playlist.owner.displayName}
          </EntityLink>,
          <span>
            {tracks.pageInfo.total}{' '}
            {tracks.pageInfo.total === 1 ? 'song' : 'songs'}
          </span>,
        ]}
      />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingPlaylist}
            onPlay={() => {
              const context = isPlayingPlaylist
                ? null
                : { contextUri: playlist.uri };

              resumePlayback({ context });
            }}
          />
        </Page.ActionsBar>
        <PlaylistTable playlistTrackEdges={playlist.tracks.edges} />
      </Page.Content>
    </Page>
  );
};

export const Loading = () => {
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
            <Skeleton.Text />,
            <Flex gap="0.5rem" alignItems="end">
              <Skeleton.CoverPhoto size="2.5rem" />
              <Flex direction="column" flex={1} gap="0.5rem">
                <Skeleton.Text width="25%" fontSize="1rem" />
                <Skeleton.Text width="20%" fontSize="0.75rem" />
              </Flex>
            </Flex>,
            <Skeleton.Text />,
            <Skeleton.Text />,
          ]}
        />
      </Page.Content>
    </Page>
  );
};

export default Playlist;
