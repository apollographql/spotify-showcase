import { gql } from '@apollo/client';
import { PlaylistTile_playlist as Playlist } from '../types/api';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import CoverPhoto from './CoverPhoto';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaylistTileProps {
  playlist: Playlist;
}

fragmentRegistry.register(gql`
  fragment PlaylistTile_playlist on Playlist {
    id
    name
    description
    uri
    images {
      url
    }
  }
`);

const PlaylistTile = ({ playlist }: PlaylistTileProps) => {
  return (
    <ContextMenu
      content={
        <>
          <ContextMenu.SubMenu
            content={<ContextMenuAction.CopyLinkToEntity entity={playlist} />}
          >
            Share
          </ContextMenu.SubMenu>
          <ContextMenu.Separator />
          <ContextMenuAction.OpenDesktopApp uri={playlist.uri} />
        </>
      }
    >
      <MediaTile
        coverPhoto={<CoverPhoto image={playlist.images[0]} />}
        description={
          <span
            dangerouslySetInnerHTML={{ __html: playlist.description ?? '' }}
          />
        }
        title={playlist.name}
        to={`/playlists/${playlist.id}`}
      />
    </ContextMenu>
  );
};

export default PlaylistTile;
