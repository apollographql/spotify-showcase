import { cloneElement, ReactElement } from 'react';

import Details from './Details';
import HeaderContainer from './HeaderContainer';
import HeaderDetails from './HeaderDetails';
import MediaType from './MediaType';
import Title from './Title';

interface HeaderProps {
  coverPhoto: ReactElement<{ size: string }>;
  details: ReactElement[];
  mediaType?: string;
  title: string;
}

const Header = ({ coverPhoto, details, mediaType, title }: HeaderProps) => {
  return (
    <HeaderContainer>
      {cloneElement(coverPhoto, { size: '250px' })}
      <HeaderDetails>
        {mediaType && <MediaType mediaType={mediaType} />}
        <Title>{title}</Title>
        <Details items={details} />
      </HeaderDetails>
    </HeaderContainer>
  );
};

export default Header;
