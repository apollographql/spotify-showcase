import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LikedSongsTile_connection as SavedTracksConnection } from '../types/api';
import cx from 'classnames';
import DelimitedList from './DelimitedList';
import PlayButton from './PlayButton';

interface LikedSongsTileProps {
  className?: string;
  connection: SavedTracksConnection;
}

const LikedSongsTile = ({ className, connection }: LikedSongsTileProps) => {
  const { pageInfo, edges } = connection;
  const tracks = edges.map((edge) => edge.node);

  return (
    <Link
      to="/collection/tracks"
      className={cx(
        className,
        'p-4 bg-[linear-gradient(149.46deg,#450af5,#8e8ee5_99.16%)] hover:no-underline rounded flex relative'
      )}
    >
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex-1 flex flex-col justify-center">
          <DelimitedList className="line-clamp-3 break-words" delimiter=" · ">
            {tracks.map((track) => {
              const [artist] = track.artists;

              return (
                <span key={track.id}>
                  {artist.name} <span className="opacity-70">{track.name}</span>
                </span>
              );
            })}
          </DelimitedList>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold font-title">Liked songs</div>
          <div className="text-sm">
            {new Intl.NumberFormat().format(pageInfo.total)} liked songs
          </div>
        </div>
      </div>
      <PlayButton
        playing={false}
        size="3rem"
        variant="primary"
        className="absolute right-4 bottom-4 shadow-sm"
      />
    </Link>
  );
};

LikedSongsTile.fragments = {
  connection: gql`
    fragment LikedSongsTile_connection on SavedTracksConnection {
      pageInfo {
        total
      }
      edges {
        node {
          id
          name
          artists {
            id
            name
          }
        }
      }
    }
  `,
};

export default LikedSongsTile;
