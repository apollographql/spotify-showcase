import { cloneElement, CSSProperties, ReactElement } from 'react';
import cx from 'classnames';
import { range } from 'lodash';

interface TileGridProps {
  gap: CSSProperties['gap'];
  minTileWidth?: CSSProperties['minWidth'];
  template: ReactElement;
  tileCount: number;
  autoSizing?: 'fit' | 'fill';
}

interface StyleProps extends CSSProperties {
  '--skeleton-tile-grid--min-tile-width': CSSProperties['minWidth'];
}

const TileGrid = ({
  gap,
  minTileWidth,
  template,
  tileCount,
  autoSizing = 'fill',
}: TileGridProps) => {
  const tiles = range(0, tileCount).map((index) =>
    cloneElement(template, { key: index })
  );

  return (
    <div
      className={cx('grid', {
        'grid-cols-[repeat(auto-fill,minmax(var(--skeleton-tile-grid--min-tile-width,0),1fr))]':
          autoSizing === 'fill',
        'grid-cols-[repeat(auto-fit,minmax(var(--skeleton-tile-grid--min-tile-width,0),1fr))]':
          autoSizing === 'fit',
      })}
      style={
        {
          gap,
          '--skeleton-tile-grid--min-tile-width': minTileWidth,
        } as StyleProps
      }
    >
      {tiles}
    </div>
  );
};

export default TileGrid;
