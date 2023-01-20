import { gql } from '@apollo/client';
import {
  TrackPlaybackDetails_context as Context,
  TrackPlaybackDetails_track as Track,
  PlaybackContextType,
} from '../types/api';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import Text from './Text';
import { parseSpotifyIDFromURI } from '../utils/spotify';

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
      <Text size="sm">
        <ContextMenu
          content={
            <>
              <ContextMenuAction.AddToQueue uri={track.uri} />
              <ContextMenu.Separator />
              <ContextMenu.Link to={`/artists/${track.artists[0].id}`}>
                Go to artist
              </ContextMenu.Link>
              <ContextMenu.Link to={`/albums/${track.album.id}`}>
                Go to album
              </ContextMenu.Link>
              <ContextMenu.Separator />
              {context?.type === PlaybackContextType.Playlist && (
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={parseSpotifyIDFromURI(context.uri)!}
                  uri={track.uri}
                />
              )}
              <ContextMenu.Separator />
              <ContextMenuAction.OpenDesktopApp uri={track.uri} />
            </>
          }
        >
          <EntityLink entity={track.album}>{track.name}</EntityLink>
        </ContextMenu>
      </Text>
      <Text size="xs" color="muted">
        <DelimitedList delimiter=", ">
          {track.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          ))}
        </DelimitedList>
      </Text>
    </Flex>
  );
};

TrackPlaybackDetails.fragments = {
  context: gql`
    fragment TrackPlaybackDetails_context on PlaybackContext {
      uri
      type
    }
  `,
  track: gql`
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
        name
      }
    }
  `,
};

export default TrackPlaybackDetails;
