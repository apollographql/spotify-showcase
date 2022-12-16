import { gql } from '@apollo/client';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { thumbnail } from '../utils/image';
import { PlaylistTitleCell_playlistTrack as PlaylistTrack } from '../types/api';

interface PlaylistTitleCellProps {
  playlistTrack: PlaylistTrack;
}

const PlaylistTitleCell = ({ playlistTrack }: PlaylistTitleCellProps) => {
  const images =
    playlistTrack.__typename === 'Episode'
      ? playlistTrack.show.images
      : playlistTrack.album.images;

  const image = thumbnail(images);

  return (
    <Flex gap="0.25rem">
      <CoverPhoto src={image.url} fallback={<></>} />
      <Flex direction="column">
        <EntityLink entity={playlistTrack}>{playlistTrack.name}</EntityLink>;
      </Flex>
    </Flex>
  );
};

PlaylistTitleCell.fragments = {
  playlistTrack: gql`
    fragment PlaylistTitleCell_playlistTrack on PlaylistTrack {
      id
      name

      ... on Episode {
        show {
          id
          images {
            url
          }
        }
      }

      ... on Track {
        album {
          id
          images {
            url
          }
        }
      }
    }
  `,
};

export default PlaylistTitleCell;
