import { CSSProperties } from 'react';
import useBackgroundColor from '../hooks/useBackgroundColor';

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const AdaptableBackdrop = () => {
  const [backgroundColor] = useBackgroundColor();

  return (
    <div
      className="[background:var(--backdrop-color)] absolute transition duration-200 ease-out inset-0 z-[-1] after:absolute after:inset-0 after:bg-[linear-gradient(rgba(255,255,255,0),#04060b)] after:transition-opacity after:duration-300 after:opacity-100"
      style={{ '--backdrop-color': backgroundColor } as BackdropStyle}
    />
  );
};

export default AdaptableBackdrop;
