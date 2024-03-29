import { ReactNode, useRef } from 'react';
import ScrollContainerContext from '../ScrollContainerContext';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main className="[--main-header--height:80px] [--main-content--padding:2rem] [grid-area:main-view] flex flex-col text-primary h-full overflow-y-auto relative rounded-md overflow-hidden bg-black-base">
      <article ref={scrollRef} className="flex flex-col flex-1 overflow-y-auto">
        <ScrollContainerContext.Provider value={scrollRef}>
          {children}
        </ScrollContainerContext.Provider>
      </article>
    </main>
  );
};

export default Main;
