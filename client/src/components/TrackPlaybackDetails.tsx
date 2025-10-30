import { gql } from '@apollo/client';
import {
  TrackPlaybackDetailsContextFragment as Context,
  TrackPlaybackDetailsTrackFragment as Track,
} from '../types/api';
import { PlaybackContextType } from '../types/api.schema';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { parseSpotifyIDFromURI } from '../utils/spotify';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface TrackPlaybackDetailsProps {
  context: Context | null;
  track: Track;
}

const TrackPlaybackDetails = ({
  context,
  track,
}: TrackPlaybackDetailsProps) => {
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
            {context?.type === PlaybackContextType.PLAYLIST && (
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

fragmentRegistry.register(gql`
  fragment TrackPlaybackDetails_context on PlaybackContext {
    uri
    type
  }

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
`);

export default TrackPlaybackDetails;
