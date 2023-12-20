import { ReactNode } from 'react';
import DelimitedList from '../DelimitedList';

interface MediaTileDetailsProps {
  children: ReactNode;
}

const MediaTileDetails = ({ children }: MediaTileDetailsProps) => {
  return (
    <DelimitedList className="text-muted text-sm line-clamp-2" delimiter=" · ">
      {children}
    </DelimitedList>
  );
};

export default MediaTileDetails;
