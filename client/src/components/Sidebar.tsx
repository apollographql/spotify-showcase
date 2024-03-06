import { useRef } from 'react';
import { Sidebar_playlists } from '../types/api';
import OffsetBasedPaginationObserver, {
  OffsetBasedPaginationObserverProps,
} from './OffsetBasedPaginationObserver';
import Layout from './Layout';
import { Library } from 'lucide-react';
import ScrollContainerContext from './ScrollContainerContext';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import YourEpisodesPlaylistCoverPhoto from './YourEpisodesPlaylistCoverPhoto';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import { gql } from '@apollo/client';
import { randomBetween, range } from '../utils/common';
import Skeleton from './Skeleton';
import PlaylistDetailsModal, {
  PLAYLIST_DETAILS_MODAL_QUERY,
} from './PlaylistDetailsModal';

interface SidebarProps {
  playlists: Sidebar_playlists | null;
  currentUserId: string;
  onLoadMore: OffsetBasedPaginationObserverProps['fetchMore'];
}

fragmentRegistry.register(gql`
  fragment Sidebar_playlists on PlaylistConnection {
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
`);

const Sidebar = ({ playlists, currentUserId, onLoadMore }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Demo! Let's use a hook that allows us to load the query in response to user
  // interaction

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
                uri: `spotify:user:${currentUserId}:collection`,
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
                uri: `spotify:user:${currentUserId}:collection:your-episodes`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<YourEpisodesPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/episodes"
            />
            {playlists?.edges.map(({ node: playlist }) => (
              <PlaylistSidebarLink
                pinned={false}
                key={playlist.id}
                playlist={playlist}
                coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
                to={`/playlists/${playlist.id}`}
                onClickEdit={(playlist) => {
                  // Demo! Let's load the playlist details when we click the
                  // edit link
                }}
              />
            ))}
            <OffsetBasedPaginationObserver
              pageInfo={playlists?.pageInfo}
              fetchMore={onLoadMore}
            />
          </div>
        </ScrollContainerContext.Provider>
      </Layout.Sidebar.Section>
      {/* Demo! Let's add the playlist modal */}
    </Layout.Sidebar>
  );
};

const LoadingState = () => {
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
};

Sidebar.LoadingState = LoadingState;

export default Sidebar;
