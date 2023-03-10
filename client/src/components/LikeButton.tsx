import { Heart, LucideProps } from 'lucide-react';
import cx from 'classnames';
import Tooltip from './Tooltip';

export interface LikeButtonProps {
  className?: string;
  liked: boolean;
  onClick?: () => void;
  size?: LucideProps['size'];
}

const LikeButton = ({ className, liked, onClick, size }: LikeButtonProps) => {
  return (
    <Tooltip
      content={liked ? 'Remove from Your Library' : 'Save to Your Library'}
    >
      <button
        className={cx(
          'text-muted bg-none outline-0 border-none cursor-pointer transition-colors ease-out hover:text-primary',
          className,
          { 'text-theme hover:text-theme-light': liked }
        )}
        onClick={onClick}
      >
        <Heart fill={liked ? 'currentColor' : 'transparent'} size={size} />
      </button>
    </Tooltip>
  );
};

export default LikeButton;
