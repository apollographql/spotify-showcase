import Skeleton from '../Skeleton';
import Header from './Header';
import HeaderDetails from './HeaderDetails';

const SkeletonHeader = () => {
  return (
    <Header>
      <Skeleton.CoverPhoto size="250px" />
      <HeaderDetails>
        <Skeleton.Heading level={1} width="50%" fontSize="5rem" />
        <Skeleton.Text width="20%" />
      </HeaderDetails>
    </Header>
  );
};

export default SkeletonHeader;
