import { CSSProperties, forwardRef, ReactNode } from 'react';
import useBackgroundColor from '../../hooks/useBackgroundColor';

interface MainProps {
  children: ReactNode;
}

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const Main = forwardRef<HTMLElement, MainProps>(({ children }, ref) => {
  const [backgroundColor] = useBackgroundColor();

  return (
    <main
      className="[--main-header--height:80px] [--main-content--padding:2rem] [grid-area:main-view] flex flex-col text-primary h-full overflow-y-auto relative"
      ref={ref}
    >
      <div
        className="[background:var(--backdrop-color)] absolute transition duration-200 ease-out inset-0 z-[-1] after:absolute after:inset-0 after:bg-[linear-gradient(rgba(255,255,255,0),#04060b)] after:transition-opacity after:duration-300 after:opacity-100"
        style={{ '--backdrop-color': backgroundColor } as BackdropStyle}
      />
      <article className="flex flex-col flex-1">{children}</article>
    </main>
  );
});

export default Main;
