import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import ContextMenu from '../ContextMenu';
import {
  AddToPlaylistQuery,
  AddToPlaylistQueryVariables,
} from '../../types/api';
import { MergeExclusive } from 'type-fest';
import useAddToPlaylistMutation from '../../mutations/useAddToPlaylistMutation';
import OffsetBasedPaginationObserver from '../OffsetBasedPaginationObserver';

type AddToPlaylistProps = MergeExclusive<{ uri: string }, { uris: string[] }>;

const ADD_TO_PLAYLIST_QUERY = gql`
  query AddToPlaylistQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit)
        @connection(key: "addToPlaylistPlaylists") {
        pageInfo {
          hasNextPage
          limit
          offset
        }
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
  const { data, fetchMore } = useQuery<
    AddToPlaylistQuery,
    AddToPlaylistQueryVariables
  >(ADD_TO_PLAYLIST_QUERY, { variables: { limit: 50 } });

  const [addToPlaylist] = useAddToPlaylistMutation();
  const playlists = data?.me?.playlists?.edges.map((edge) => edge.node) ?? [];

  return (
    <ContextMenu.SubMenu
      content={
        <>
          {playlists.map((playlist) => (
            <ContextMenu.Action
              key={playlist.id}
              onSelect={() => {
                addToPlaylist({ playlistId: playlist.id, uris: uris || [uri] });
              }}
            >
              {playlist.name}
            </ContextMenu.Action>
          ))}
          <OffsetBasedPaginationObserver
            fetchMore={(options) => {
              console.log('fetch', options);
              return fetchMore(options);
            }}
            pageInfo={data?.me?.playlists?.pageInfo}
          />
        </>
      }
    >
      Add to playlist
    </ContextMenu.SubMenu>
  );
};

export default AddToPlaylist;
