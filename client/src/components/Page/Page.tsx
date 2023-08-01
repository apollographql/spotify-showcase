import { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';

import ActionsBar from './ActionsBar';
import Content from './Content';
import Details from './Details';
import EmptyState from './EmptyState';
import Header from './Header';
import HeaderDetails from './HeaderDetails';
import SkeletonHeader from './SkeletonHeader';
import Title from './Title';
import MediaType from './MediaType';

interface PageProps {
  bgColor?: string | null;
  children?: ReactNode;
  className?: string;
}

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const Page = ({ bgColor, children, className }: PageProps) => {
  return (
    <div
      className={cx(className, 'flex flex-1 flex-col')}
      style={{ '--backdrop-color': bgColor } as BackdropStyle}
    >
      {children}
    </div>
  );
};

Page.ActionsBar = ActionsBar;
Page.Content = Content;
Page.Details = Details;
Page.EmptyState = EmptyState;
Page.Header = Header;
Page.HeaderDetails = HeaderDetails;
Page.MediaType = MediaType;
Page.SkeletonHeader = SkeletonHeader;
Page.Title = Title;

export default Page;
