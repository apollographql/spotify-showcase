import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Page from './Page';
import { PlaylistDetails_playlist as Playlist } from '../types/api';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import { gql } from '@apollo/client';

fragmentRegistry.register(gql`
  fragment PlaylistDetails_playlist on Playlist {
    id
    name
    images {
      url
    }
    owner {
      id
      displayName
    }
  }
`);

interface PlaylistDetailsProps {
  playlist: Playlist;
  totalTracks: number;
}

export const PlaylistDetails = ({
  playlist,
  totalTracks,
}: PlaylistDetailsProps) => {
  const coverPhoto = playlist.images[0];

  return (
    <Page.Header
      mediaType="playlist"
      coverPhoto={<CoverPhoto image={coverPhoto} />}
      title={playlist.name}
      details={[
        <EntityLink key="owner" entity={playlist.owner}>
          {playlist.owner.displayName}
        </EntityLink>,
        <span key="numSongs">
          {totalTracks} {totalTracks === 1 ? 'song' : 'songs'}
        </span>,
      ]}
    />
  );
};
