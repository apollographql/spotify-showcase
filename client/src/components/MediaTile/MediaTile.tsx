import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import MediaTileCoverPhoto from './CoverPhoto';
import MediaTileDetails from './Details';
import MediaTileTitle from './Title';

interface MediaTileProps extends LinkProps {
  children?: ReactNode;
}

const MediaTile = ({ children, ...props }: MediaTileProps) => {
  return (
    <Link
      {...props}
      className="flex flex-col gap-4 bg-surface-low-contrast transition-colors duration-200 ease-out p-4 rounded hover:bg-surface-low-contrast-hover hover:no-underline"
    >
      {children}
    </Link>
  );
};

MediaTile.CoverPhoto = MediaTileCoverPhoto;
MediaTile.Details = MediaTileDetails;
MediaTile.Title = MediaTileTitle;

export default MediaTile;
