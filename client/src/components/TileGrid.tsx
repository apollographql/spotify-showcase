import { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';

interface TileGridProps {
  className?: string;
  children?: ReactNode;
  gap: CSSProperties['gap'];
  minTileWidth?: CSSProperties['minWidth'];
  autoSizing?: 'fit' | 'fill';
}

interface StyleProps extends CSSProperties {
  '--tile-grid--min-tile-width': CSSProperties['minWidth'];
}

const TileGrid = ({
  autoSizing = 'fill',
  className,
  children,
  gap,
  minTileWidth,
}: TileGridProps) => {
  return (
    <div
      className={cx('grid', className, {
        'grid-cols-[repeat(auto-fit,minmax(var(--tile-grid--min-tile-width,0),1fr))]':
          autoSizing === 'fit',
        'grid-cols-[repeat(auto-fill,minmax(var(--tile-grid--min-tile-width,0),1fr))]':
          autoSizing === 'fill',
      })}
      style={{ gap, '--tile-grid--min-tile-width': minTileWidth } as StyleProps}
    >
      {children}
    </div>
  );
};

export default TileGrid;
