import {
  Children,
  ComponentType,
  FunctionComponent,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { useReactiveVar } from '@apollo/client';
import { highlightSuspenseBoundariesVar } from '../vars';
import LoadingStateBackdrop from './LoadingStateBackdrop';

interface LoadingStateHighlighterProps {
  className?: string;
  shade?: string;
  children: ReactNode;
}

interface HighlightConfig {
  className?: string;
  shade: string;
}

const LoadingStateHighlighter = ({
  className,
  children,
  shade = 'red',
}: LoadingStateHighlighterProps) => {
  const highlightSuspenseBoundaries = useReactiveVar(
    highlightSuspenseBoundariesVar
  );

  const element = Children.only(children);
  const config =
    isValidElement(element) && isHighlighted(element.type)
      ? element.type.__highlight
      : { shade, className };

  const child =
    isValidElement<WithHighlightProps>(element) && isHighlighted(element.type)
      ? cloneElement(element, { isActiveSuspenseBoundary: true })
      : element;

  return highlightSuspenseBoundaries ? (
    <LoadingStateBackdrop className={config.className} shade={config.shade}>
      {child}
    </LoadingStateBackdrop>
  ) : (
    children
  );
};

function isHighlighted(
  element: JSX.ElementType
): element is HighlightableComponent<unknown> {
  return typeof element !== 'string' && '__highlight' in element;
}

interface HighlightableComponent<TProps> extends FunctionComponent<TProps> {
  readonly __highlight: HighlightConfig;
}

interface WithHighlightProps {
  isActiveSuspenseBoundary: boolean;
}

interface Options {
  className?: string;
  shade?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withHighlight<TProps = {}>(
  LoadingState: ComponentType<TProps & WithHighlightProps>,
  { className, shade = 'red' }: Options = {}
): HighlightableComponent<TProps> {
  const LoadingStateWithHighlight = (
    props: TProps & { isActiveSuspenseBoundary?: boolean }
  ) => {
    return (
      <LoadingState
        {...props}
        isActiveSuspenseBoundary={props.isActiveSuspenseBoundary ?? false}
      />
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (LoadingStateWithHighlight as any).__highlight = {
    className,
    shade,
  };

  return LoadingStateWithHighlight as HighlightableComponent<TProps>;
}

export default LoadingStateHighlighter;
