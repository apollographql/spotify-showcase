import { CSSProperties, ReactNode } from 'react';

interface LoadingStateBackdropProps {
  shade: string;
  children?: ReactNode;
}

interface OverlayStyleProps extends CSSProperties {
  '--shade': string;
}

interface ContainerSyleProps extends CSSProperties {
  '--border-color': string;
}

const LoadingStateBackdrop = ({
  children,
  shade,
}: LoadingStateBackdropProps) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="border-4 border-[var(--border-color)] absolute inset-0 z-50"
        style={
          {
            '--border-color': shade,
          } as ContainerSyleProps
        }
      >
        <div
          className="absolute inset-0 opacity-25 bg-[var(--shade)]"
          style={{ '--shade': shade } as OverlayStyleProps}
        />
      </div>
      {children}
    </div>
  );
};

export default LoadingStateBackdrop;
