import { Swatch } from 'node-vibrant/lib/color';

export const toRGB = (swatch: Swatch, alpha?: number) => {
  const color = swatch.getRgb().join(',');

  return alpha ? `rgba(${color}, ${alpha})` : `rgb(${color})`;
};
