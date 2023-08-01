import { Heart, LucideProps } from 'lucide-react';
import cx from 'classnames';
import Tooltip from './Tooltip';

export interface LikeButtonProps {
  className?: string;
  disabled?: boolean;
  liked: boolean;
  onClick?: () => void;
  size?: LucideProps['size'];
}

const LikeButton = ({
  disabled,
  className,
  liked,
  onClick,
  size,
}: LikeButtonProps) => {
  return (
    <Tooltip
      content={liked ? 'Remove from Your Library' : 'Save to Your Library'}
    >
      <button
        disabled={disabled}
        className={cx(
          'text-muted bg-none outline-0 border-none cursor-pointer transition-colors ease-out hover:text-primary disabled:text-muted disabled:opacity-30 disabled:pointer-events-none',
          className,
          { 'text-theme hover:text-theme-light': liked }
        )}
        onClick={onClick}
      >
        <Heart
          className="max-w-[unset]"
          fill={liked ? 'currentColor' : 'transparent'}
          size={size}
        />
      </button>
    </Tooltip>
  );
};

export default LikeButton;
