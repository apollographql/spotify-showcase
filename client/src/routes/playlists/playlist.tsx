import { useParams } from 'react-router-dom';
import { gql, useQuery, useSuspenseQuery } from '@apollo/client';
import {
  PlaylistQuery,
  PlaylistQueryVariables,
  PlaylistRoutePlaybackStateFragment,
} from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import PlaylistTable from '../../components/PlaylistTable';
import PlayButton from '../../components/PlayButton';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';
import Skeleton from '../../components/Skeleton';
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import { parseSpotifyIDFromURI } from '../../utils/spotify';
import useSavedTracksContains from '../../hooks/useSavedTracksContains';
import LoadingStateHighlighter from '../../components/LoadingStateHighlighter';

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    playlist(id: $id) {
      id
      name
      uri
      images {
        url
        vibrantColor(format: RGB, alpha: 0.9) @client
      }
      owner {
        id
        displayName
      }
      tracks(offset: $offset) {
        pageInfo {
          hasNextPage
          offset
          limit
          total
        }
      }

      ...PlaylistTable_playlist
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

export const RouteComponent = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data, fetchMore, loading } = useQuery<
    PlaylistQuery,
    PlaylistQueryVariables
  >(PLAYLIST_QUERY, { variables: { id: playlistId } });
  const playlist = data?.playlist;

  const tracksContains = useSavedTracksContains(
    playlist?.tracks.edges
      .filter((edge) => edge.node.__typename === 'Track')
      .map((edge) => edge.node.id) ?? []
  );

  const [resumePlayback] = useResumePlaybackMutation();

  const playbackState = usePlaybackState<PlaylistRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  if (!data || loading) {
    return (
      <LoadingStateHighlighter shade="#FF2600">
        <LoadingState />
      </LoadingStateHighlighter>
    );
  }

  if (!playlist) {
    throw new Error('Playlist not found');
  }

  const { tracks } = playlist;
  const images = playlist.images ?? [];
  const coverPhoto = images[0];
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = playbackState?.context?.uri === playlist.uri;

  return (
    <Page bgColor={coverPhoto.vibrantColor}>
      <Page.Header
        mediaType="playlist"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={playlist.name}
        details={[
          <EntityLink key="owner" entity={playlist.owner}>
            {playlist.owner.displayName}
          </EntityLink>,
          <span key="numSongs">
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
              const input = isPlayingPlaylist
                ? undefined
                : { offset: { position: 0 }, contextUri: playlist.uri };

              resumePlayback(input);
            }}
          />
        </Page.ActionsBar>
        <PlaylistTable playlist={playlist} tracksContains={tracksContains} />
        <OffsetBasedPaginationObserver
          fetchMore={fetchMore}
          pageInfo={tracks.pageInfo}
          threshold="1000px"
        />
      </Page.Content>
    </Page>
  );
};

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
