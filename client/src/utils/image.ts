interface Image {
  __typename: 'Image';
}

export const thumbnail = <TImage extends Image>(images: TImage[]) => {
  // Images are ordered widest first, so the smallest image should be last in
  // the array
  return images[images.length - 1];
};
