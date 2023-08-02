import { CSSProperties } from 'react';
import { gql } from '@apollo/client';
import { Avatar_profile as Profile } from '../types/api';
import { thumbnail } from '../utils/image';
import LazyImage from './LazyImage';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface AvatarProps {
  size?: CSSProperties['width'];
  profile: Profile;
}

const Avatar = ({ profile, size }: AvatarProps) => {
  const image = thumbnail(profile.images ?? []);

  return (
    <LazyImage
      className="aspect-square rounded-full overflow-hidden"
      src={image?.url}
      style={{ width: size }}
    />
  );
};

fragmentRegistry.register(gql`
  fragment Avatar_profile on UserProfile {
    id
    images {
      url
    }
  }
`);

export default Avatar;
