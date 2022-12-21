import cx from 'classnames';
import { Music } from 'lucide-react';
import CoverPhoto, { CoverPhotoProps } from '../CoverPhoto';
import PlaceholderCoverPhoto, {
  PlaceholderCoverPhotoProps,
} from '../PlaceholderCoverPhoto';
import styles from './Page.module.scss';

interface PageCoverPhotoProps {
  circular?: boolean;
  fallbackIcon?: PlaceholderCoverPhotoProps['icon'];
  src: CoverPhotoProps['src'];
}

const PageCoverPhoto = ({
  circular = false,
  fallbackIcon = Music,
  src,
}: PageCoverPhotoProps) => {
  return (
    <CoverPhoto
      src={src}
      className={cx(styles.page__coverPhoto, { [styles.circular]: circular })}
      fallback={<PlaceholderCoverPhoto icon={fallbackIcon} />}
      size="250px"
    />
  );
};

export default PageCoverPhoto;
