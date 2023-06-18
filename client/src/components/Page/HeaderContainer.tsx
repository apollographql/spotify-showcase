import { ReactNode } from 'react';

interface HeaderContainerProps {
  children?: ReactNode;
}

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className="p-[var(--main-content--padding)] relative [background:var(--backdrop-color)] transition duration-200 ease-out">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0,rgba(0,0,0,0.5)_100%)]" />
      <div className="isolate flex gap-8 items-end">{children}</div>
    </div>
  );
};

export default HeaderContainer;
