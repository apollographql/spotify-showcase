import CoverPhoto, { CoverPhotoProps } from '../CoverPhoto';

type MediaTileCoverPhotoProps = Pick<
  CoverPhotoProps,
  'image' | 'shape' | 'animateIn'
>;

const MediaTileCoverPhoto = ({ image }: MediaTileCoverPhotoProps) => {
  return <CoverPhoto image={image} className="shadow-md" />;
};

export default MediaTileCoverPhoto;
