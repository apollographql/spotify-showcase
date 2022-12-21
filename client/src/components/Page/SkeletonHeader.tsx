import Skeleton from '../Skeleton';
import HeaderContainer from './HeaderContainer';
import HeaderDetails from './HeaderDetails';

const SkeletonHeader = () => {
  return (
    <HeaderContainer>
      <Skeleton.CoverPhoto size="250px" />
      <HeaderDetails>
        <Skeleton.Heading level={1} width="50%" fontSize="5rem" />
        <Skeleton.Text width="20%" />
      </HeaderDetails>
    </HeaderContainer>
  );
};

export default SkeletonHeader;
