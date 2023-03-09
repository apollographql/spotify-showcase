import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import cx from 'classnames';

type LazyImageProps = ComponentPropsWithoutRef<'img'>;

const LazyImage = ({ className, src, alt = '', ...props }: LazyImageProps) => {
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
      setLoaded(false);
    };
  }, [src]);

  return (
    <img
      {...props}
      className={cx(
        'w-full h-auto transition-opacity duration-300 ease-out object-cover object-center opacity-0',
        className,
        { 'opacity-100': loaded }
      )}
      src={src}
      alt={alt}
    />
  );
};

export default LazyImage;
