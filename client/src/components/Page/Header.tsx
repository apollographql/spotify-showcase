import { cloneElement, ReactElement } from 'react';
import cx from 'classnames';
import styles from './Page.module.scss';

import Details from './Details';
import HeaderContainer from './HeaderContainer';
import HeaderDetails from './HeaderDetails';
import MediaType from './MediaType';
import Title from './Title';

interface HeaderProps {
  coverPhoto: ReactElement<{ className: string; size: string }>;
  details: ReactElement[];
  mediaType?: string;
  title: string;
}

const Header = ({ coverPhoto, details, mediaType, title }: HeaderProps) => {
  return (
    <HeaderContainer>
      {cloneElement(coverPhoto, {
        size: '250px',
        className: cx(coverPhoto.props.className, styles.page__coverPhoto),
      })}
      <HeaderDetails>
        {mediaType && <MediaType mediaType={mediaType} />}
        <Title>{title}</Title>
        <Details items={details} />
      </HeaderDetails>
    </HeaderContainer>
  );
};

export default Header;
