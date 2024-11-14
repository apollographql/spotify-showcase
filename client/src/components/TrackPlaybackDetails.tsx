import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import {
  TrackPlaybackDetails_context as Context,
  TrackPlaybackDetails_track as Track,
  PlaybackContextType,
  TrackPlaybackDetails_context,
  TrackPlaybackDetails_track,
} from '../types/api';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { parseSpotifyIDFromURI } from '../utils/spotify';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface TrackPlaybackDetailsProps {
  context: Context | null;
  track: FragmentType<Track>;
}

const TrackPlaybackDetails = ({
  context,
  track,
}: TrackPlaybackDetailsProps) => {
  const { data: trackData, complete } = useFragment({
    fragment: TrackPlaybackDetailsTrackFragment,
    from: track,
  });

  if (!complete) {
    return null;
  }

  return (
    <Flex direction="column" gap="0.25rem">
      <ContextMenu
        content={
          <>
            <ContextMenuAction.AddToQueue uri={trackData.uri} />
            <ContextMenu.Separator />
            <ContextMenuAction.LinkToArtist artists={trackData.artists} />
            <ContextMenu.Link to={`/albums/${trackData.album.id}`}>
              Go to album
            </ContextMenu.Link>
            <ContextMenu.Separator />
            {context?.type === PlaybackContextType.Playlist && (
              <>
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={parseSpotifyIDFromURI(context.uri)}
                  uri={trackData.uri}
                />
                <ContextMenu.Separator />
              </>
            )}
            <ContextMenu.SubMenu
              content={
                <ContextMenuAction.CopyLinkToEntity entity={trackData} />
              }
            >
              Share
            </ContextMenu.SubMenu>
            <ContextMenu.Separator />
            <ContextMenuAction.OpenDesktopApp uri={trackData.uri} />
          </>
        }
      >
        <EntityLink className="text-sm" entity={trackData.album}>
          {trackData.name}
        </EntityLink>
      </ContextMenu>
      <DelimitedList className="text-muted text-xs" delimiter=", ">
        {trackData.artists.map((artist) => (
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

const TrackPlaybackDetailsContextFragment: TypedDocumentNode<TrackPlaybackDetails_context> = gql`
  fragment TrackPlaybackDetails_context on PlaybackContext {
    uri
    type
  }
`;

const TrackPlaybackDetailsTrackFragment: TypedDocumentNode<TrackPlaybackDetails_track> = gql`
  fragment TrackPlaybackDetails_track on Track {
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
`;

fragmentRegistry.register(
  TrackPlaybackDetailsContextFragment,
  TrackPlaybackDetailsTrackFragment
);

export default TrackPlaybackDetails;
