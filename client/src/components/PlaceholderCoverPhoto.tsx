import { ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import cx from 'classnames';

export interface PlaceholderCoverPhotoProps {
  className?: string;
  icon: ElementType<LucideProps>;
}

const PlaceholderCoverPhoto = ({
  className,
  icon: Icon,
}: PlaceholderCoverPhotoProps) => {
  return (
    <div
      className={cx(
        'aspect-square flex justify-center items-center w-full [background:var(--placeholder--cover-photo--background,var(--background--surface))] relative',
        className
      )}
    >
      <Icon className="absolute" strokeWidth={1} size="30%" />
    </div>
  );
};

export default PlaceholderCoverPhoto;
