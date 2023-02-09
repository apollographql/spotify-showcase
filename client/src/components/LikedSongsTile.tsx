import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  LikedSongsTile_connection as SavedTracksConnection,
  LikedSongsTile_playbackState as PlaybackState,
} from '../types/api';
import cx from 'classnames';
import DelimitedList from './DelimitedList';
import PlayButton from './PlayButton';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import usePlaybackState from '../hooks/usePlaybackState';

interface CurrentUser {
  id: string;
}

interface LikedSongsTileProps {
  className?: string;
  connection: SavedTracksConnection;
  currentUser: CurrentUser;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment LikedSongsTile_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const LikedSongsTile = ({
  className,
  connection,
  currentUser,
}: LikedSongsTileProps) => {
  const { pageInfo, edges } = connection;
  const tracks = edges.map((edge) => edge.node);
  const [resumePlayback] = useResumePlaybackMutation();
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const spotifyURI = `spotify:user:${currentUser.id}:collection`;
  const isPlayingLikedSongs = playbackState?.context?.uri === spotifyURI;
  const isPlaying = isPlayingLikedSongs && playbackState?.isPlaying;

  return (
    <Link
      to="/collection/tracks"
      className={cx(
        className,
        'p-4 bg-[linear-gradient(149.46deg,#450af5,#8e8ee5_99.16%)] hover:no-underline rounded flex relative group overflow-hidden'
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
        playing={isPlaying}
        size="3rem"
        variant="primary"
        className={cx('absolute right-4 bottom-4 shadow-md', {
          'group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0':
            !isPlaying,
        })}
        onPlay={() => {
          const input = isPlayingLikedSongs
            ? undefined
            : { offset: { position: 0 }, contextUri: spotifyURI };

          resumePlayback(input);
        }}
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
