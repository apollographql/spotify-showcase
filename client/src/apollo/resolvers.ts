import { getVibrantColor } from '../utils/image';
import { ColorFormat, Resolvers } from './__generated__/local-resolvers';
import { toRGB } from '../utils/color';
import { maybe } from '../utils/common';

export const resolvers: Resolvers = {
  Image: {
    vibrantColor: async (image, { alpha, format }) => {
      if (!image.url) {
        throw new Error(
          'Image must select `url` in order to determine vibrant color'
        );
      }

      const swatch = await getVibrantColor(image.url);

      if (!swatch) {
        return null;
      }

      switch (format) {
        case ColorFormat.Rgb:
          return toRGB(swatch, maybe(alpha));
      }
    },
  },
};
