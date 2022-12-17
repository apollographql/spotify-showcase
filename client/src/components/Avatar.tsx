import { CSSProperties } from 'react';
import { gql } from '@apollo/client';
import { Avatar_user as User } from '../types/api';
import { thumbnail } from '../utils/image';
import LazyImage from './LazyImage';
import styles from './Avatar.module.scss';

interface AvatarProps {
  size?: CSSProperties['width'];
  user: User;
}

interface StyleProps extends CSSProperties {
  '--avatar--size': CSSProperties['width'];
}

const Avatar = ({ user, size }: AvatarProps) => {
  const image = thumbnail(user.images ?? []);

  return (
    <div
      className={styles.avatar}
      style={{ '--avatar--size': size } as StyleProps}
    >
      <LazyImage src={image?.url} />
    </div>
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
