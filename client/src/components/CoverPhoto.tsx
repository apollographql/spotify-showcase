import { ElementType, CSSProperties } from 'react';
import { LucideProps, Music } from 'lucide-react';
import cx from 'classnames';
import LazyImage from './LazyImage';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';

interface Image {
  url: string;
}

export interface CoverPhotoProps {
  className?: string;
  image: Image | null | undefined;
  size?: string;
  placeholderIcon?: ElementType<LucideProps>;
  shape?: 'square' | 'circle';
}

interface StyleProps extends CSSProperties {
  '--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({
  className,
  image,
  placeholderIcon = Music,
  size,
  shape = 'square',
}: CoverPhotoProps) => {
  return (
    <div
      className={cx(
        'aspect-square overflow-hidden w-[var(--cover-photo--size)]',
        className,
        {
          rounded: shape === 'square',
          'rounded-full': shape === 'circle',
        }
      )}
      style={{ '--cover-photo--size': size } as StyleProps}
    >
      {image ? (
        <LazyImage className="aspect-square object-cover" src={image.url} />
      ) : (
        <PlaceholderCoverPhoto
          className="aspect-square object-cover"
          icon={placeholderIcon}
        />
      )}
    </div>
  );
};

export default CoverPhoto;
