import { forwardRef, ReactNode } from 'react';
import AdaptableBackdrop from '../AdaptableBackdrop';

interface MainProps {
  children: ReactNode;
}

const Main = forwardRef<HTMLElement, MainProps>(({ children }, ref) => {
  return (
    <main
      className="[--main-header--height:80px] [--main-content--padding:2rem] [grid-area:main-view] flex flex-col text-primary h-full overflow-y-auto relative"
      ref={ref}
    >
      <AdaptableBackdrop />
      <article className="flex flex-col flex-1">{children}</article>
    </main>
  );
});

export default Main;
