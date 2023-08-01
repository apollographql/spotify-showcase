import Vibrant from 'node-vibrant';

type Palette = Awaited<ReturnType<Vibrant['getPalette']>>;
type Swatch = Palette[string];

interface Image {
  __typename: 'Image';
}

export const thumbnail = <TImage extends Image>(images: TImage[]) => {
  // Images are ordered widest first, so the smallest image should be last in
  // the array
  return images[images.length - 1];
};

const PREFERRED_SWATCHES = [
  'Vibrant',
  'LightVibrant',
  'DarkVibrant',
  'Muted',
  'LightMuted',
  'DarkMuted',
];

export const getVibrantColor = async (src: string) => {
  return new Promise<Swatch | undefined>((resolve) => {
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const palette = await Vibrant.from(img).getPalette();
      const name = PREFERRED_SWATCHES.find((name) => palette[name]);

      resolve(name ? palette[name] : undefined);
    };

    img.src = src;
  });
};
