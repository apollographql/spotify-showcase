import { gql } from '@apollo/client';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import {
  SidebarPlaylists_playlists as Playlist,
  SidebarPlaylists_pageInfo as PageInfo,
} from '../types/api';
import ScrollContainerContext from './ScrollContainerContext';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import { useRef } from 'react';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import YourEpisodesPlaylistCoverPhoto from './YourEpisodesPlaylistCoverPhoto';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import OffsetBasedPaginationObserver, {
  OffsetBasedPaginationObserverProps,
} from './OffsetBasedPaginationObserver';

interface SidebarPlaylistsProps {
  playlists: Playlist[];
  pageInfo: PageInfo;
  onLoadMore: OffsetBasedPaginationObserverProps['fetchMore'];
}

fragmentRegistry.register(gql`
  fragment SidebarPlaylists_playlists on Playlist {
    id
    images {
      url
    }
    ...PlaylistSidebarLink_playlist
  }

  fragment SidebarPlaylists_pageInfo on PageInfo {
    offset
    limit
    hasNextPage
  }
`);

const SidebarPlaylists = ({
  pageInfo,
  playlists,
  onLoadMore,
}: SidebarPlaylistsProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const profile = useCurrentUserProfile();

  return (
    <ScrollContainerContext.Provider value={sidebarRef}>
      <div className="overflow-y-auto flex-1 -mx-1 px-3" ref={sidebarRef}>
        <PlaylistSidebarLink
          pinned
          playlist={{
            __typename: 'Playlist',
            id: 'collection:tracks',
            name: 'Liked Songs',
            uri: `spotify:user:${profile.id}:collection`,
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
            uri: `spotify:user:${profile.id}:collection:your-episodes`,
            owner: {
              __typename: 'User',
              id: 'spotify',
              displayName: 'Spotify',
            },
          }}
          coverPhoto={<YourEpisodesPlaylistCoverPhoto iconSize="1rem" />}
          to="/collection/episodes"
        />
        {playlists.map((playlist) => (
          <PlaylistSidebarLink
            pinned={false}
            key={playlist.id}
            playlist={playlist}
            coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
            to={`/playlists/${playlist.id}`}
          />
        ))}
        <OffsetBasedPaginationObserver
          pageInfo={pageInfo}
          fetchMore={onLoadMore}
        />
      </div>
    </ScrollContainerContext.Provider>
  );
};

export default SidebarPlaylists;
