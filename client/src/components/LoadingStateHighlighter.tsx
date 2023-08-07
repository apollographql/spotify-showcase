import { Children, ReactNode, isValidElement } from 'react';
import { useReactiveVar } from '@apollo/client';
import { highlightSuspenseBoundariesVar } from '../vars';
import LoadingStateBackdrop from './LoadingStateBackdrop';

interface LoadingStateHighlighterProps {
  children: ReactNode;
}

interface HighlightConfig {
  className?: string;
  shade: string;
}

const defaultConfig: HighlightConfig = { shade: 'red' };

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
    <LoadingStateBackdrop className={config.className} shade={config.shade}>
      {children}
    </LoadingStateBackdrop>
  ) : (
    children
  );
};

const isHighlighted = (
  element: JSX.ElementType
): element is HighlightableComponent<unknown> => {
  return typeof element !== 'string' && '__highlight' in element;
};

interface HighlightableComponent<TProps> {
  (props: TProps): ReactNode;
  readonly __highlight: HighlightConfig;
}

interface Options {
  className?: string;
  shade?: string;
}

export function withHighlight<TProps = unknown>(
  LoadingState: (props: TProps) => ReactNode,
  { className, shade = 'red' }: Options = {}
): HighlightableComponent<TProps> {
  const LoadingStateWithHighlight =
    LoadingState as HighlightableComponent<TProps>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (LoadingStateWithHighlight as any).__highlight = {
    className,
    shade,
  };

  return LoadingStateWithHighlight;
}

export default LoadingStateHighlighter;
