import { gql } from '@apollo/client';
import { PlaylistTile_playlist as Playlist } from '../types/api';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import MediaTile from './MediaTile';

interface PlaylistTileProps {
  playlist: Playlist;
}

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
        coverPhoto={playlist.images[0]}
        description={playlist.description}
        title={playlist.name}
        to={`/playlists/${playlist.id}`}
      />
    </ContextMenu>
  );
};

PlaylistTile.fragments = {
  playlist: gql`
    fragment PlaylistTile_playlist on Playlist {
      id
      name
      description
      uri
      images {
        url
      }
    }
  `,
};

export default PlaylistTile;
