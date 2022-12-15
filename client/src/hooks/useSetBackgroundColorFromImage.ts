import { useEffect } from 'react';
import useBackgroundColor from './useBackgroundColor';
import Vibrant from 'node-vibrant';

const useSetBackgroundColorFromImage = (src: string | null | undefined) => {
  const [, setBackgroundColor] = useBackgroundColor();

  useEffect(() => {
    if (!src) {
      return;
    }

    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log({ Vibrant, default: Vibrant.DefaultOpts });
      // Vibrant.from(img).getPalette((err, palette) => {
      //   console.log({ err, palette });
      // });
    };
    img.src = src;

    return () => {
      img.onload = null;
    };

    // const result = Vibrant.from(src);

    // console.log(result);
    // const img = new Image();

    // if (src) {
    //   // img.crossOrigin = true;
    //   img.onload = () => {
    //     // const colorThief = new ColorThief();
    //     // const color = rgb(...colorThief.getColor(img));
    //     // setColor(shade(0.3, color));
    //   };
    //   img.src = src;
    // }

    // return () => {
    //   img.onload = null;
    // };
    //
  }, [src]);
};

export default useSetBackgroundColorFromImage;
