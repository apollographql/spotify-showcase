import { ReactNode, useState, useMemo } from 'react';
import BackgroundColorContext from './BackgroundColorContext';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';

interface BackgroundColorProviderProps {
  children?: ReactNode;
}

const BackgroundColorProvider = ({
  children,
}: BackgroundColorProviderProps) => {
  const state = useState(DEFAULT_BACKGROUND_COLOR);
  const context = useMemo(() => state, [state]);

  return (
    <BackgroundColorContext.Provider value={context}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export default BackgroundColorProvider;
