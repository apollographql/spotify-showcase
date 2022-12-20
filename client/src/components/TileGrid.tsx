import { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';
import styles from './TileGrid.module.scss';

interface TileGridProps {
  className?: string;
  children?: ReactNode;
  gap?: CSSProperties['gap'];
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
  gap = '2.5rem 1rem',
  minTileWidth,
}: TileGridProps) => {
  return (
    <div
      className={cx(styles.tileGrid, className, {
        [styles.sizing__Fit]: autoSizing === 'fit',
        [styles.sizing__Fill]: autoSizing === 'fill',
      })}
      style={{ gap, '--tile-grid--min-tile-width': minTileWidth } as StyleProps}
    >
      {children}
    </div>
  );
};

export default TileGrid;
