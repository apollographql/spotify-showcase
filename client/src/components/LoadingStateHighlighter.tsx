import {
  Children,
  CSSProperties,
  ElementType,
  ReactNode,
  isValidElement,
} from 'react';
import { useReactiveVar } from '@apollo/client';
import { highlightSuspenseBoundariesVar } from '../vars';

interface LoadingStateHighlighterProps {
  children: ReactNode;
}

interface OverlayStyleProps extends CSSProperties {
  '--shade': string;
}

interface ContainerSyleProps extends CSSProperties {
  '--border-color': string;
}

const isHighlighted = (
  element: JSX.ElementType
): element is HighlightableComponent<unknown> => {
  return typeof element !== 'string' && '__highlight' in element;
};

const defaultConfig = { shade: 'red' };

const LoadingStateHighlighter = ({
  children,
}: LoadingStateHighlighterProps) => {
  const highlightSuspenseBoundaries = useReactiveVar(
    highlightSuspenseBoundariesVar
  );

  const element = Children.only(children);
  const config =
    isValidElement(element) && isHighlighted(element.type)
      ? element.type.__highlight
      : defaultConfig;

  return highlightSuspenseBoundaries ? (
    <div className="relative overflow-hidden">
      <div
        className="border-4 border-[var(--border-color)] absolute inset-0 z-50"
        style={
          {
            '--border-color': config.shade,
          } as ContainerSyleProps
        }
      >
        <div
          className="absolute inset-0 opacity-25 bg-[var(--shade)]"
          style={{ '--shade': config.shade } as OverlayStyleProps}
        />
      </div>
      {children}
    </div>
  ) : (
    children
  );
};

interface HighlightableComponent<TProps> {
  (props: TProps): ReactNode;
  readonly __highlight: {
    shade: string;
  };
}

interface Options {
  shade?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withHighlight<TProps = unknown>(
  LoadingState: (props: TProps) => ReactNode,
  { shade = 'red' }: Options = {}
): HighlightableComponent<TProps> {
  const LoadingStateWithHighlight =
    LoadingState as HighlightableComponent<TProps>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (LoadingStateWithHighlight as any).__highlight = {
    shade,
  };

  return LoadingStateWithHighlight;
}

export default LoadingStateHighlighter;
