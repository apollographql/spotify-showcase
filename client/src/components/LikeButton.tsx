import { Heart, LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './LikeButton.module.scss';

export interface LikeButtonProps {
  className?: string;
  liked: boolean;
  onClick?: () => void;
  size?: LucideProps['size'];
}

const LikeButton = ({
  className,
  liked: isLiked,
  onClick,
  size,
}: LikeButtonProps) => {
  return (
    <button
      className={cx(styles.likeButton, className, { [styles.liked]: isLiked })}
      onClick={onClick}
    >
      <Heart fill={isLiked ? 'currentColor' : 'transparent'} size={size} />
    </button>
  );
};

export default LikeButton;
