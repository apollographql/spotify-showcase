import { gql, useQuery } from '@apollo/client';
import ContextMenu from '../ContextMenu';
import {
  AddToPlaylistQuery,
  AddToPlaylistQueryVariables,
} from '../../types/api';
import { MergeExclusive } from 'type-fest';
import useAddToPlaylistMutation from '../../mutations/useAddToPlaylistMutation';

type AddToPlaylistProps = MergeExclusive<{ uri: string }, { uris: string[] }>;

const ADD_TO_PLAYLIST_QUERY = gql`
  query AddToPlaylistQuery {
    me {
      playlists {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const AddToPlaylist = ({ uri, uris }: AddToPlaylistProps) => {
  const { data } = useQuery<AddToPlaylistQuery, AddToPlaylistQueryVariables>(
    ADD_TO_PLAYLIST_QUERY
  );

  const [addToPlaylist] = useAddToPlaylistMutation();
  const playlists = data?.me?.playlists?.edges.map((edge) => edge.node) ?? [];

  return (
    <ContextMenu.SubMenu
      content={playlists.map((playlist) => (
        <ContextMenu.Action
          key={playlist.id}
          onSelect={() => {
            addToPlaylist({ playlistId: playlist.id, uris: uris || [uri] });
          }}
        >
          {playlist.name}
        </ContextMenu.Action>
      ))}
    >
      Add to playlist
    </ContextMenu.SubMenu>
  );
};

export default AddToPlaylist;
