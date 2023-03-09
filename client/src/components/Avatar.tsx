import { CSSProperties } from 'react';
import { gql } from '@apollo/client';
import { Avatar_user as User } from '../types/api';
import { thumbnail } from '../utils/image';
import LazyImage from './LazyImage';

interface AvatarProps {
  size?: CSSProperties['width'];
  user: User;
}

const Avatar = ({ user, size }: AvatarProps) => {
  const image = thumbnail(user.images ?? []);

  return (
    <LazyImage
      className="aspect-square rounded-full overflow-hidden"
      src={image?.url}
      style={{ width: size }}
    />
  );
};

Avatar.fragments = {
  user: gql`
    fragment Avatar_user on User {
      id
      images {
        url
      }
    }
  `,
};

export default Avatar;
