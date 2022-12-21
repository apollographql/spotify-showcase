import { gql } from '@apollo/client';
import { AlbumTrackTitleCell_track as Track } from '../types/api';
import cx from 'classnames';
import CommaSeparatedList from './CommaSeparatedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import typography from '../styles/typography.module.scss';

interface AlbumTrackTitleCellProps {
  track: Track;
}

const AlbumTrackTitleCell = ({ track }: AlbumTrackTitleCellProps) => {
  return (
    <Flex direction="column" gap="0.5">
      <span className={typography.text__body}>{track.name}</span>
      <CommaSeparatedList>
        {track.artists.map((artist) => (
          <EntityLink
            key={artist.id}
            className={cx(
              typography.text__muted,
              typography.text__muted__interactive
            )}
            entity={artist}
          >
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
