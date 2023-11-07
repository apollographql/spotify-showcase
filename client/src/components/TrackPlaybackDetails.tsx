import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import {
  TrackPlaybackDetailsQuery,
  TrackPlaybackDetailsQueryVariables,
  PlaybackContextType,
} from '../types/api';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { parseSpotifyIDFromURI } from '../utils/spotify';
import Skeleton from './Skeleton';

// EXERCISE: Convert this to a fragment and add it to the PlaybarQuery in playbar.tsx
const TRACK_PLAYBACK_DETAILS_QUERY: TypedDocumentNode<
  TrackPlaybackDetailsQuery,
  TrackPlaybackDetailsQueryVariables
> = gql`
  query TrackPlaybackDetailsQuery {
    me {
      player {
        playbackState {
          context {
            uri
            type
          }
          item {
            ... on Track {
              id
              name
              uri
              album {
                id
                name
              }
              artists {
                id
                uri
                name
              }
            }
          }
        }
      }
    }
  }
`;

const TrackPlaybackDetails = () => {
  const { data, loading } = useQuery(TRACK_PLAYBACK_DETAILS_QUERY);
  const context = data?.me?.player.playbackState?.context;
  const track = data?.me?.player.playbackState?.item;

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton.Text width="4rem" />
        <Skeleton.Text width="8rem" />
      </div>
    );
  }

  if (!track || track?.__typename === 'Episode') {
    return;
  }

  return (
    <Flex direction="column" gap="0.25rem">
      <ContextMenu
        content={
          <>
            <ContextMenuAction.AddToQueue uri={track.uri} />
            <ContextMenu.Separator />
            <ContextMenuAction.LinkToArtist artists={track.artists} />
            <ContextMenu.Link to={`/albums/${track.album.id}`}>
              Go to album
            </ContextMenu.Link>
            <ContextMenu.Separator />
            {context?.type === PlaybackContextType.Playlist && (
              <>
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={parseSpotifyIDFromURI(context.uri)}
                  uri={track.uri}
                />
                <ContextMenu.Separator />
              </>
            )}
            <ContextMenu.SubMenu
              content={<ContextMenuAction.CopyLinkToEntity entity={track} />}
            >
              Share
            </ContextMenu.SubMenu>
            <ContextMenu.Separator />
            <ContextMenuAction.OpenDesktopApp uri={track.uri} />
          </>
        }
      >
        <EntityLink className="text-sm" entity={track.album}>
          {track.name}
        </EntityLink>
      </ContextMenu>
      <DelimitedList className="text-muted text-xs" delimiter=", ">
        {track.artists.map((artist) => (
          <ContextMenu
            key={artist.id}
            content={
              <>
                <ContextMenu.SubMenu
                  content={
                    <ContextMenuAction.CopyLinkToEntity entity={artist} />
                  }
                >
                  Share
                </ContextMenu.SubMenu>
                <ContextMenu.Separator />
                <ContextMenuAction.OpenDesktopApp uri={artist.uri} />
              </>
            }
          >
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          </ContextMenu>
        ))}
      </DelimitedList>
    </Flex>
  );
};

export default TrackPlaybackDetails;
