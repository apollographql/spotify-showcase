import { cloneElement, Fragment, ReactNode } from 'react';
import { useReactiveVar } from '@apollo/client';
import { highlightSuspenseBoundariesVar } from '../vars';

interface LoadingStateHighlighterProps {
  children: ReactNode;
}

const LoadingStateHighlighter = ({
  children,
}: LoadingStateHighlighterProps) => {
  const highlightSuspenseBoundaries = useReactiveVar(
    highlightSuspenseBoundariesVar
  );

  return cloneElement(
    highlightSuspenseBoundaries ? (
      <div className="border-4 border-suspense-boundary" />
    ) : (
      <Fragment />
    ),
    { children }
  );
};

export default LoadingStateHighlighter;
