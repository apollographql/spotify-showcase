import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import {
  PlaybackContextType,
  PlaybackItemDetails_playbackState,
} from '../types/api';
import EntityLink from './EntityLink';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import { parseSpotifyIDFromURI } from '../utils/spotify';
import DelimitedList from './DelimitedList';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaybackItemDetailsProps {
  playbackState: FragmentType<PlaybackItemDetails_playbackState> | null;
}

const PlaybackItemDetailsFragment: TypedDocumentNode<PlaybackItemDetails_playbackState> = gql`
  fragment PlaybackItemDetails_playbackState on PlaybackState {
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
      ... on Episode {
        name
        show {
          id
          name
          images {
            url
          }
        }
      }
    }
  }
`;

fragmentRegistry.register(PlaybackItemDetailsFragment);

const PlaybackItemDetails = ({ playbackState }: PlaybackItemDetailsProps) => {
  const { data, complete } = useFragment({
    fragment: PlaybackItemDetailsFragment,
    from: playbackState,
  });

  if (!complete || !data.item) {
    return null;
  }

  const { context, item } = data;

  if (item.__typename === 'Episode') {
    return (
      <div className="flex flex-col gap-1">
        <EntityLink className="text-sm" entity={item}>
          {item.name}
        </EntityLink>
        <EntityLink className="text-xs text-muted" entity={item.show}>
          {item.show.name}
        </EntityLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <ContextMenu
        content={
          <>
            <ContextMenuAction.AddToQueue uri={item.uri} />
            <ContextMenu.Separator />
            <ContextMenuAction.LinkToArtist artists={item.artists} />
            <ContextMenu.Link to={`/albums/${item.album.id}`}>
              Go to album
            </ContextMenu.Link>
            <ContextMenu.Separator />
            {context?.type === PlaybackContextType.Playlist && (
              <>
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={parseSpotifyIDFromURI(context.uri)}
                  uri={item.uri}
                />
                <ContextMenu.Separator />
              </>
            )}
            <ContextMenu.SubMenu
              content={<ContextMenuAction.CopyLinkToEntity entity={item} />}
            >
              Share
            </ContextMenu.SubMenu>
            <ContextMenu.Separator />
            <ContextMenuAction.OpenDesktopApp uri={item.uri} />
          </>
        }
      >
        <EntityLink className="text-sm" entity={item.album}>
          {item.name}
        </EntityLink>
      </ContextMenu>
      <DelimitedList className="text-muted text-xs" delimiter=", ">
        {item.artists.map((artist) => (
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
    </div>
  );
};

export default PlaybackItemDetails;
