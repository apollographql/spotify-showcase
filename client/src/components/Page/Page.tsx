import { ReactNode } from 'react';
import Flex from '../Flex';

import CoverPhoto from './CoverPhoto';
import Header from './Header';

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

export default Page;
