import { ReactElement, ReactNode, forwardRef, cloneElement } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cx from 'classnames';
import DelimitedList from './DelimitedList';

interface MediaTileProps extends LinkProps {
  coverPhoto: ReactElement<{ className: string }>;
  title: string;
  description: ReactNode;
}

const MediaTile = forwardRef<HTMLAnchorElement, MediaTileProps>(
  ({ coverPhoto, description, title, ...props }, ref) => {
    return (
      <Link
        {...props}
        className="flex flex-col gap-4 bg-surface-low-contrast p-4 rounded hover:bg-surface-low-contrast-hover hover:no-underline"
        ref={ref}
      >
        {cloneElement(coverPhoto, {
          className: cx('shadow-md', coverPhoto.props.className),
        })}
        <div className="flex flex-col">
          <span
            className="whitespace-nowrap text-ellipsis overflow-hidden font-bold"
            title={title}
          >
            {title}
          </span>
          <DelimitedList
            className="text-muted text-sm line-clamp-2"
            delimiter=" · "
          >
            {description}
          </DelimitedList>
        </div>
      </Link>
    );
  }
);

export default MediaTile;
