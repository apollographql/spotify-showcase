import CoverPhoto, { CoverPhotoProps } from '../CoverPhoto';

type MediaTileCoverPhotoProps = Pick<
  CoverPhotoProps,
  'image' | 'shape' | 'animateIn'
>;

const MediaTileCoverPhoto = (props: MediaTileCoverPhotoProps) => {
  return <CoverPhoto {...props} className="shadow-md" />;
};

export default MediaTileCoverPhoto;
