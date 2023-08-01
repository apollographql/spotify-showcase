import { Resolvers } from '@apollo/client';
import { Image, RGB } from '../types/api';
import { getVibrantColor } from '../utils/image';

export const resolvers: Resolvers = {
  Image: {
    vibrantColor: async (image: Image): Promise<RGB | null> => {
      if (!image.url) {
        throw new Error(
          'Image must select `url` in order to determine vibrant color'
        );
      }

      const swatch = await getVibrantColor(image.url);

      return swatch
        ? { __typename: 'RGB', red: swatch.r, green: swatch.g, blue: swatch.b }
        : null;
    },
  },
};
