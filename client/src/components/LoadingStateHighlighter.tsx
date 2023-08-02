import { CSSProperties, ReactNode } from 'react';
import { useReactiveVar } from '@apollo/client';
import { highlightSuspenseBoundariesVar } from '../vars';

interface LoadingStateHighlighterProps {
  shade?: string;
  children: ReactNode;
}

interface StyleProps extends CSSProperties {
  '--shade': string;
}

interface ContainerSyleProps extends CSSProperties {
  '--border-color': string;
}

const LoadingStateHighlighter = ({
  children,
  shade,
}: LoadingStateHighlighterProps) => {
  const highlightSuspenseBoundaries = useReactiveVar(
    highlightSuspenseBoundariesVar
  );

  return highlightSuspenseBoundaries ? (
    <div className="relative">
      <div
        className="border-4 border-[var(--border-color)] absolute inset-0 z-50"
        style={
          {
            '--border-color': shade || 'red',
          } as ContainerSyleProps
        }
      >
        {shade && (
          <div
            className="absolute inset-0 opacity-25 bg-[var(--shade)]"
            style={{ '--shade': shade } as StyleProps}
          />
        )}
      </div>
      {children}
    </div>
  ) : (
    children
  );
};

export default LoadingStateHighlighter;
