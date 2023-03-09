import { CSSProperties, ReactNode, forwardRef } from 'react';

interface TitleProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { children, style },
  ref
) {
  return (
    <h1
      ref={ref}
      className="line-clamp-2 overflow-hidden text-8xl font-black"
      style={style}
    >
      {children}
    </h1>
  );
});

export default Title;
