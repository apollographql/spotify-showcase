import { createContext, RefObject } from 'react';

const ScrollContainerContext = createContext<RefObject<Element | null>>({
  current: null,
});

export default ScrollContainerContext;
