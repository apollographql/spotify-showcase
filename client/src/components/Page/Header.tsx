import { ReactElement } from 'react';

import CoverPhoto, { CoverPhotoProps } from './CoverPhoto';
import Details from './Details';
import HeaderContainer from './HeaderContainer';
import HeaderDetails from './HeaderDetails';
import MediaType from './MediaType';
import Title from './Title';

interface HeaderProps {
  coverPhoto: CoverPhotoProps;
  details: ReactElement[];
  mediaType?: string;
  title: string;
}

const Header = ({ coverPhoto, details, mediaType, title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <CoverPhoto {...coverPhoto} />
      <HeaderDetails>
        {mediaType && <MediaType mediaType={mediaType} />}
        <Title>{title}</Title>
        <Details items={details} />
      </HeaderDetails>
    </HeaderContainer>
  );
};

export default Header;
