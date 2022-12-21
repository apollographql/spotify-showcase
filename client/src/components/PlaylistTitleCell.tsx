import { gql } from '@apollo/client';
import CommaSeparatedList from './CommaSeparatedList';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import Text from './Text';
import { Music } from 'lucide-react';
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
    <Flex gap="0.5rem" alignItems="end">
      <CoverPhoto
        image={image}
        fallback={<PlaceholderCoverPhoto icon={Music} />}
        size="2.5rem"
      />
      <Flex direction="column">
        <Text as={EntityLink} size="base" entity={playlistTrack}>
          {playlistTrack.name}
        </Text>
        {playlistTrack.__typename === 'Track' ? (
          <CommaSeparatedList>
            {playlistTrack.artists.map((artist) => (
              <Text
                interactive
                key={artist.id}
                as={EntityLink}
                color="muted"
                entity={artist}
              >
                {artist.name}
              </Text>
            ))}
          </CommaSeparatedList>
        ) : (
          <Text color="muted">{playlistTrack.show.publisher}</Text>
        )}
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
          publisher
          images {
            url
          }
        }
      }

      ... on Track {
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
          }
        }
      }
    }
  `,
};

export default PlaylistTitleCell;
