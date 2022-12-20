import { useEffect } from 'react';
import useBackgroundColor from './useBackgroundColor';

const useSetBackgroundColor = (backgroundColor: string) => {
  const [, setBackgroundColor] = useBackgroundColor();

  useEffect(() => {
    setBackgroundColor(backgroundColor);
  }, [backgroundColor, setBackgroundColor]);
};

export default useSetBackgroundColor;
