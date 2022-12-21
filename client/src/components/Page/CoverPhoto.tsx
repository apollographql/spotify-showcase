import cx from 'classnames';
import { Music } from 'lucide-react';
import OriginalCoverPhoto, {
  CoverPhotoProps as OriginalCoverPhotoProps,
} from '../CoverPhoto';
import styles from './Page.module.scss';

export interface CoverPhotoProps {
  circular?: boolean;
  placeholderIcon?: OriginalCoverPhotoProps['placeholderIcon'];
  image: OriginalCoverPhotoProps['image'];
}

const CoverPhoto = ({
  circular = false,
  placeholderIcon = Music,
  image,
}: CoverPhotoProps) => {
  return (
    <OriginalCoverPhoto
      image={image}
      className={cx(styles.page__coverPhoto, { [styles.circular]: circular })}
      placeholderIcon={placeholderIcon}
      size="250px"
    />
  );
};

export default CoverPhoto;
