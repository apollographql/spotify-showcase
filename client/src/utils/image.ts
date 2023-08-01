import Vibrant from 'node-vibrant';
import { Swatch } from 'node-vibrant/lib/color';

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

const swatchCache = new Map<string, Swatch | undefined>();

export const getVibrantColor = async (src: string) => {
  return new Promise<Swatch | undefined>((resolve) => {
    if (swatchCache.has(src)) {
      return resolve(swatchCache.get(src));
    }

    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const palette = await Vibrant.from(img).getPalette();
      const name = PREFERRED_SWATCHES.find((name) => palette[name]);
      const swatch = name ? palette[name] : undefined;

      swatchCache.set(src, swatch);

      resolve(swatch);
    };

    img.src = src;
  });
};
