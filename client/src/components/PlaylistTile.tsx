import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { PlaylistTile_playlist } from '../types/api';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaylistTileProps {
  playlist: FragmentType<PlaylistTile_playlist>;
}

const PlaylistTileFragment: TypedDocumentNode<PlaylistTile_playlist> = gql`
  fragment PlaylistTile_playlist on Playlist {
    id
    name
    description
    uri
    images {
      url
    }
  }
`;

fragmentRegistry.register(PlaylistTileFragment);

const PlaylistTile = ({ playlist }: PlaylistTileProps) => {
  const { data, complete } = useFragment({
    fragment: PlaylistTileFragment,
    from: playlist,
  });

  if (!complete) {
    return null;
  }

  return (
    <ContextMenu
      content={
        <>
          <ContextMenu.SubMenu
            content={<ContextMenuAction.CopyLinkToEntity entity={data} />}
          >
            Share
          </ContextMenu.SubMenu>
          <ContextMenu.Separator />
          <ContextMenuAction.OpenDesktopApp uri={data.uri} />
        </>
      }
    >
      <MediaTile to={`/playlists/${data.id}`}>
        <MediaTile.CoverPhoto image={(data.images ?? [])[0]} />
        <div className="flex flex-col">
          <MediaTile.Title>{data.name}</MediaTile.Title>
          <MediaTile.Details>
            <span
              dangerouslySetInnerHTML={{ __html: data.description ?? '' }}
            />
          </MediaTile.Details>
        </div>
      </MediaTile>
    </ContextMenu>
  );
};

export default PlaylistTile;
