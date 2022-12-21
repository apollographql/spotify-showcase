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
  src: OriginalCoverPhotoProps['src'];
}

const CoverPhoto = ({
  circular = false,
  fallbackIcon = Music,
  src,
}: CoverPhotoProps) => {
  return (
    <OriginalCoverPhoto
      src={src}
      className={cx(styles.page__coverPhoto, { [styles.circular]: circular })}
      fallback={<PlaceholderCoverPhoto icon={fallbackIcon} />}
      size="250px"
    />
  );
};

export default CoverPhoto;
