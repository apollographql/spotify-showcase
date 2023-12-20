import { ReactNode } from 'react';

interface MediaTileTitleProps {
  children: ReactNode;
}

const MediaTileTitle = ({ children }: MediaTileTitleProps) => {
  return (
    <span
      className="whitespace-nowrap text-ellipsis overflow-hidden font-bold"
      title={typeof children === 'string' ? children : undefined}
    >
      {children}
    </span>
  );
};

export default MediaTileTitle;
