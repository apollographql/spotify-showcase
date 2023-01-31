import { ReactNode } from 'react';
import cx from 'classnames';

import ActionsBar from './ActionsBar';
import Content from './Content';
import Details from './Details';
import Header from './Header';
import HeaderDetails from './HeaderDetails';
import SkeletonHeader from './SkeletonHeader';
import Title from './Title';
import MediaType from './MediaType';

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return (
    <div className={cx(className, 'flex flex-1 flex-col')}>{children}</div>
  );
};

Page.ActionsBar = ActionsBar;
Page.Content = Content;
Page.Details = Details;
Page.Header = Header;
Page.HeaderDetails = HeaderDetails;
Page.MediaType = MediaType;
Page.SkeletonHeader = SkeletonHeader;
Page.Title = Title;

export default Page;
