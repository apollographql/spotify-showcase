import { ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './PlaceholderCoverPhoto.module.scss';

export interface PlaceholderCoverPhotoProps {
  className?: string;
  icon: ElementType<LucideProps>;
}

const PlaceholderCoverPhoto = ({
  className,
  icon: Icon,
}: PlaceholderCoverPhotoProps) => {
  return (
    <div className={cx(styles.placeholderCoverPhoto, className)}>
      <Icon className={styles.icon} strokeWidth={1} size="30%" />
    </div>
  );
};

export default PlaceholderCoverPhoto;
