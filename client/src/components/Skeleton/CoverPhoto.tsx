import cx from 'classnames';
import { CSSProperties } from 'react';
import Base from './Base';

interface CoverPhotoProps {
  size: CSSProperties['width'];
  shape?: 'circle' | 'square';
}

interface StyleProps extends CSSProperties {
  '--skeleton--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({ size, shape = 'square' }: CoverPhotoProps) => {
  return (
    <Base
      className={cx('aspect-square w-[var(--skeleton--cover-photo--size)]', {
        '!rounded': shape === 'square',
        '!rounded-full': shape === 'circle',
      })}
      style={{ '--skeleton--cover-photo--size': size } as StyleProps}
    />
  );
};

export default CoverPhoto;
