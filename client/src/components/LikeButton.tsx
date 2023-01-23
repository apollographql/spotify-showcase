import { Heart, LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './LikeButton.module.scss';
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
        className={cx(styles.likeButton, className, {
          [styles.liked]: liked,
        })}
        onClick={onClick}
      >
        <Heart fill={liked ? 'currentColor' : 'transparent'} size={size} />
      </button>
    </Tooltip>
  );
};

export default LikeButton;
