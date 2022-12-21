import { ReactNode } from 'react';
import Flex from '../Flex';

import CoverPhoto from './CoverPhoto';
import Header from './Header';
import HeaderDetails from './HeaderDetails';
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

Page.CoverPhoto = CoverPhoto;
Page.Header = Header;
Page.HeaderDetails = HeaderDetails;
Page.MediaType = MediaType;
Page.Title = Title;

export default Page;
