import { Fragment } from 'react';
import { gql } from '@apollo/client';
import { AlbumTrackTitleCell_track as Track } from '../types/api';
import EntityLink from './EntityLink';
import Flex from './Flex';

interface AlbumTrackTitleCellProps {
  track: Track;
}

const AlbumTrackTitleCell = ({ track }: AlbumTrackTitleCellProps) => {
  return (
    <Flex direction="column" gap="0.5">
      {track.name}
      <span>
        {track.artists.map((artist, index, artists) => (
          <Fragment key={artist.id}>
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
            {index !== artists.length - 1 && ', '}
          </Fragment>
        ))}
      </span>
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
