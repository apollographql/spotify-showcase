import { Heart, LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  className?: string;
  isLiked: boolean;
  onClick: () => void;
  size?: LucideProps['size'];
}

const LikeButton = ({ className, isLiked, onClick, size }: LikeButtonProps) => {
  return (
    <button className={cx(styles.likeButton, className)} onClick={onClick}>
      <Heart
        fill={isLiked ? 'var(--color--theme)' : 'transparent'}
        size={size}
      />
    </button>
  );
};

export default LikeButton;
