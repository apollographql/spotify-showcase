import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import {
  PlaybackContextType,
  TrackPlaybackDetails_playbackState,
} from '../types/api';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { parseSpotifyIDFromURI } from '../utils/spotify';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface TrackPlaybackDetailsProps {
  playbackState: FragmentType<TrackPlaybackDetails_playbackState>;
}

const TrackPlaybackDetailsFragment: TypedDocumentNode<TrackPlaybackDetails_playbackState> = gql`
  fragment TrackPlaybackDetails_playbackState on PlaybackState {
    context {
      uri
      type
    }
    item {
      id
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
`;

fragmentRegistry.register(TrackPlaybackDetailsFragment);

const TrackPlaybackDetails = ({ playbackState }: TrackPlaybackDetailsProps) => {
  const { data, complete } = useFragment({
    fragment: TrackPlaybackDetailsFragment,
    from: playbackState,
  });

  if (!complete || data.item?.__typename !== 'Track') {
    return null;
  }

  const { context, item: track } = data;

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
