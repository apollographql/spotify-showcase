import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  AlbumRouteQuery,
  AlbumRouteQueryVariables,
  AlbumRoutePlaybackStateFragment,
} from '../../types/api';
import AlbumTracksTable from '../../components/AlbumTracksTable';
import Page from '../../components/Page';
import EntityLink from '../../components/EntityLink';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import { yearOfRelease } from '../../utils/releaseDate';
import { pluralize } from '../../utils/string';
import CoverPhoto from '../../components/CoverPhoto';
import Text from '../../components/Text';
import ReleaseDate from '../../components/ReleaseDate';
import Flex from '../../components/Flex';
import PlayButton from '../../components/PlayButton';
import Skeleton from '../../components/Skeleton';
import usePlaybackState from '../../hooks/usePlaybackState';
import { parseSpotifyIDFromURI } from '../../utils/spotify';

const ALBUM_ROUTE_QUERY = gql`
  query AlbumRouteQuery($albumId: ID!) {
    album(id: $albumId) {
      id
      albumType
      name
      totalTracks
      uri
      artists {
        id
        name
      }
      copyrights {
        text
        type
      }
      images {
        url
      }
      releaseDate {
        date
        precision
      }
      tracks {
        edges {
          node {
            id
            durationMs
            name
            trackNumber

            ...AlbumTracksTable_tracks
          }
        }
      }
    }
  }

  ${AlbumTracksTable.fragments.tracks}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment AlbumRoutePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const AlbumRoute = () => {
  const { albumId } = useParams() as { albumId: 'string' };
  const { data } = useSuspenseQuery<AlbumRouteQuery, AlbumRouteQueryVariables>(
    ALBUM_ROUTE_QUERY,
    { variables: { albumId } }
  );

  const [resumePlayback] = useResumePlaybackMutation();

  const album = data.album!;
  const images = album.images ?? [];
  const coverPhoto = images[0];
  const playbackState = usePlaybackState<AlbumRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingAlbum = playbackState?.context?.uri === album.uri;

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={album.name}
        mediaType={album.albumType}
        details={[
          ...album.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          )),
          <span key="releaseDate">{yearOfRelease(album.releaseDate)}</span>,
          <span key="song">
            {album.totalTracks} {pluralize('song', album.totalTracks)}
          </span>,
        ]}
      />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingAlbum}
            onPlay={() => {
              const context = isPlayingAlbum
                ? null
                : { offset: { position: 0 }, contextUri: album.uri };

              resumePlayback({ context });
            }}
          />
        </Page.ActionsBar>
        <AlbumTracksTable
          tracks={album.tracks?.edges.map((edge) => edge.node) ?? []}
        />
        <Flex direction="column">
          <Text as="div" color="muted" size="sm">
            <ReleaseDate releaseDate={album.releaseDate} />
          </Text>
          {album.copyrights.map((copyright) => (
            <Text
              key={copyright.text.concat(copyright.type ?? '')}
              color="muted"
              size="xxs"
            >
              {copyright.text}
            </Text>
          ))}
        </Flex>
      </Page.Content>
    </Page>
  );
};

export const LoadingState = () => {
  const { albumId } = useParams() as { albumId: string };
  const playbackState = usePlaybackState<AlbumRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const contextUri = playbackState?.context?.uri;
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingAlbum = contextUri
    ? parseSpotifyIDFromURI(contextUri) === albumId
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
            playing={isPlaying && isPlayingAlbum}
          />
        </Page.ActionsBar>
        <Skeleton.Table
          rows={10}
          columns={[
            <Flex gap="0.5rem" alignItems="end">
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

export default AlbumRoute;
