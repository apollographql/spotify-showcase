import { CSSProperties } from 'react';
import cx from 'classnames';
import { Play, Pause } from 'lucide-react';
import Tooltip from './Tooltip';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';

type PlayButtonProps = {
  className?: string;
  disabled?: boolean;
  size: CSSProperties['width'];
  playing: boolean;
  variant?: 'primary' | 'secondary';
  onPlay?: () => void;
};

interface StyleProps extends CSSProperties {
  '--play-button--size': CSSProperties['width'];
}

const PlayButton = ({
  className,
  disabled,
  playing,
  variant = 'secondary',
  onPlay: onClickPlay,
  size,
}: PlayButtonProps) => {
  const [pause] = usePausePlaybackMutation();

  return (
    <Tooltip content={playing ? 'Pause' : 'Play'}>
      <button
        disabled={disabled}
        className={cx(
          className,
          'flex h-[var(--play-button--size)] w-[var(--play-button--size)] scale-100 transform-gpu cursor-pointer items-center justify-center rounded-full border-2 border-solid p-0 transition-all ease-in-out [backface-visibility:hidden]',
          '[&:hover:not(:disabled)]:scale-110 [&:active:not(:disabled)]:scale-105',
          'focus:outline-0',
          'disabled:cursor-not-allowed disabled:opacity-25',
          {
            'bg-green-light border-green-light text-black-pure':
              variant === 'primary',
            'text-black-pure border-white bg-white': variant === 'secondary',
          }
        )}
        style={{ '--play-button--size': size } as StyleProps}
        onClick={(e) => {
          e.preventDefault();

          return playing ? pause() : onClickPlay?.();
        }}
      >
        {playing ? (
          <Pause size="60%" fill="currentColor" />
        ) : (
          <Play className="relative left-[5%]" size="60%" fill="currentColor" />
        )}
      </button>
    </Tooltip>
  );
};

export default PlayButton;
