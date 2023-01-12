import { ReactNode } from 'react';
import Flex from '../Flex';

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
}

const Page = ({ children }: PageProps) => {
  return (
    <Flex direction="column" flex={1}>
      {children}
    </Flex>
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
