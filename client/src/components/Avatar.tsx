import { CSSProperties } from 'react';
import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { Avatar_profile as Profile } from '../types/api';
import { thumbnail } from '../utils/image';
import LazyImage from './LazyImage';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface AvatarProps {
  size?: CSSProperties['width'];
  profile: FragmentType<Profile>;
}

const AvatarFragment: TypedDocumentNode<Profile> = gql`
  fragment Avatar_profile on UserProfile {
    id
    images {
      url
    }
  }
`;

fragmentRegistry.register(AvatarFragment);

const Avatar = ({ profile, size }: AvatarProps) => {
  const { data, complete } = useFragment({
    fragment: AvatarFragment,
    from: profile,
  });

  if (!complete) {
    return null;
  }

  const image = thumbnail(data.images ?? []);

  return (
    <LazyImage
      className="aspect-square rounded-full overflow-hidden"
      src={image?.url}
      style={{ width: size }}
    />
  );
};

export default Avatar;
