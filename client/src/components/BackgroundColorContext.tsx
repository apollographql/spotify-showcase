import { createContext } from 'react';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';

type BackgroundColorContext = [
  backgroundColor: string,
  setBackgroundColor: (color: string) => void
];

export default createContext<BackgroundColorContext>([
  DEFAULT_BACKGROUND_COLOR,
  () => {},
]);
