import { Fragment } from 'react';
import { gql } from '@apollo/client';
import { AlbumTrackTitleCell_track as Track } from '../types/api';
import CommaSeparatedList from './CommaSeparatedList';
import EntityLink from './EntityLink';
import Flex from './Flex';

interface AlbumTrackTitleCellProps {
  track: Track;
}

const AlbumTrackTitleCell = ({ track }: AlbumTrackTitleCellProps) => {
  return (
    <Flex direction="column" gap="0.5">
      {track.name}
      <CommaSeparatedList>
        {track.artists.map((artist) => (
          <EntityLink key={artist.id} entity={artist}>
            {artist.name}
          </EntityLink>
        ))}
      </CommaSeparatedList>
    </Flex>
  );
};

AlbumTrackTitleCell.fragments = {
  track: gql`
    fragment AlbumTrackTitleCell_track on Track {
      id
      name
      artists {
        id
        name
      }
    }
  `,
};

export default AlbumTrackTitleCell;
