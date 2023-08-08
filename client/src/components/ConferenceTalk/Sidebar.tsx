import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { Library } from 'lucide-react';
import { useRef } from 'react';
import { thumbnail } from '../../utils/image';
import CoverPhoto from '../CoverPhoto';
import Layout from '../Layout';
import LikedSongsPlaylistCoverPhoto from '../LikedSongsPlaylistCoverPhoto';
import OffsetBasedPaginationObserver from '../OffsetBasedPaginationObserver';
import PlaylistSidebarLink from '../PlaylistSidebarLink';
import ScrollContainerContext from '../ScrollContainerContext';
import YourEpisodesPlaylistCoverPhoto from '../YourEpisodesPlaylistCoverPhoto';
import { SidebarQuery, SidebarQueryVariables } from '../../types/api';
import { randomBetween, range } from '../../utils/common';
import Skeleton from '../Skeleton';
import { withHighlight } from '../LoadingStateHighlighter';

const SIDEBAR_QUERY: TypedDocumentNode<
  SidebarQuery,
  SidebarQueryVariables
> = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      profile {
        id
      }
      playlists(offset: $offset, limit: $limit)
        @connection(key: "rootPlaylists") {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            images {
              url
            }
            ...PlaylistSidebarLink_playlist
          }
        }
      }
    }
  }
`;

export const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useSuspenseQuery(SIDEBAR_QUERY, {
    variables: { limit: 50 },
  });

  const { me } = data;

  if (!me) {
    throw new Error('Must be logged in');
  }

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
        <header className="px-4 py-2">
          <h2 className="text-muted flex gap-2 items-center py-2 text-base">
            <Library /> Your Library
          </h2>
        </header>
        <ScrollContainerContext.Provider value={sidebarRef}>
          <div className="overflow-y-auto flex-1 -mx-1 px-3" ref={sidebarRef}>
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:tracks',
                name: 'Liked Songs',
                uri: `spotify:user:${me.profile.id}:collection`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<LikedSongsPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/tracks"
            />
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:episodes',
                name: 'Your Episodes',
                uri: `spotify:user:${me.profile.id}:collection:your-episodes`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<YourEpisodesPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/episodes"
            />
            {me.playlists?.edges.map(({ node: playlist }) => (
              <PlaylistSidebarLink
                pinned={false}
                key={playlist.id}
                playlist={playlist}
                coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
                to={`/playlists/${playlist.id}`}
              />
            ))}
            <OffsetBasedPaginationObserver
              pageInfo={me.playlists?.pageInfo}
              fetchMore={fetchMore}
            />
          </div>
        </ScrollContainerContext.Provider>
      </Layout.Sidebar.Section>
    </Layout.Sidebar>
  );
};

Sidebar.LoadingState = withHighlight(
  () => {
    const skeletons = range(0, randomBetween(10, 15));

    return (
      <Layout.Sidebar>
        <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
          <header className="px-4 py-2">
            <h2 className="text-muted flex gap-2 items-center py-2 text-base">
              <Library /> Your Library
            </h2>
          </header>
          <div className="overflow-y-auto flex-1 -mx-1 px-3">
            {skeletons.map((num) => (
              <li key={num} className="px-0 py-2">
                <div className="flex gap-2">
                  <Skeleton.CoverPhoto size="3rem" />
                  <div className="flex flex-col gap-4 flex-1">
                    <Skeleton.Text
                      width={`${randomBetween(40, 60)}%`}
                      fontSize="1rem"
                    />
                    <Skeleton.Text
                      width={`${randomBetween(50, 70)}%`}
                      fontSize="0.75rem"
                    />
                  </div>
                </div>
              </li>
            ))}
          </div>
        </Layout.Sidebar.Section>
      </Layout.Sidebar>
    );
  },
  { shade: '#FF40FF' }
);
