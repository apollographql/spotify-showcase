import { useEffect, useContext } from 'react';
import BackgroundColorContext from '../components/BackgroundColorContext';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';

const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  const [, setColor] = context;

  useEffect(() => {
    return () => {
      setColor(DEFAULT_BACKGROUND_COLOR);
    };
  }, [setColor]);

  return context;
};

export default useBackgroundColor;
