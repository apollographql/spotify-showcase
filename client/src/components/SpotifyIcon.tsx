import cx from 'classnames';
import styles from './SpotifyIcon.module.scss';

interface SpotifyIconProps {
  className?: string;
}

const SpotifyIcon = ({ className }: SpotifyIconProps) => {
  return (
    <img
      loading="eager"
      src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
      alt="Spotify"
      className={cx(styles.spotifyIcon, className)}
    />
  );
};

export default SpotifyIcon;
