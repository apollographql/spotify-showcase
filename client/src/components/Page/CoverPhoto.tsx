import cx from 'classnames';
import { Music } from 'lucide-react';
import OriginalCoverPhoto, {
  CoverPhotoProps as OriginalCoverPhotoProps,
} from '../CoverPhoto';
import PlaceholderCoverPhoto, {
  PlaceholderCoverPhotoProps,
} from '../PlaceholderCoverPhoto';
import styles from './Page.module.scss';

export interface CoverPhotoProps {
  circular?: boolean;
  fallbackIcon?: PlaceholderCoverPhotoProps['icon'];
  image: OriginalCoverPhotoProps['image'];
}

const CoverPhoto = ({
  circular = false,
  fallbackIcon = Music,
  image,
}: CoverPhotoProps) => {
  return (
    <OriginalCoverPhoto
      image={image}
      className={cx(styles.page__coverPhoto, { [styles.circular]: circular })}
      fallback={<PlaceholderCoverPhoto icon={fallbackIcon} />}
      size="250px"
    />
  );
};

export default CoverPhoto;
