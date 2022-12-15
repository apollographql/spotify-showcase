import { useEffect } from 'react';
import useBackgroundColor from './useBackgroundColor';
import Vibrant from 'node-vibrant';

const PREFERRED_SWATCHES = [
  'Vibrant',
  'LightVibrant',
  'DarkVibrant',
  'Muted',
  'LightMuted',
  'DarkMuted',
];

const useSetBackgroundColorFromImage = (
  src: string | null | undefined,
  { fallback }: { fallback?: string } = {}
) => {
  const [, setBackgroundColor] = useBackgroundColor();

  useEffect(() => {
    if (!src && fallback) {
      setBackgroundColor(fallback);
    }

    if (!src) {
      return;
    }

    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const result = await Vibrant.from(img).getPalette();

      const name = PREFERRED_SWATCHES.find((name) => result[name]);

      if (name) {
        const swatch = result[name]!;

        setBackgroundColor(`rgba(${swatch.r}, ${swatch.g}, ${swatch.b}, 0.5)`);
      }
    };
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [fallback, src, setBackgroundColor]);
};

export default useSetBackgroundColorFromImage;
