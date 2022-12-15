import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './LazyImage.module.scss';

type LazyImageProps = ComponentPropsWithoutRef<'img'>;

const LazyImage = ({ src, alt = '', ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      return;
    }

    const img = new Image();

    img.onload = () => setLoaded(true);
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <img
      className={cx(styles.lazyImage, { [styles.loaded]: loaded })}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
