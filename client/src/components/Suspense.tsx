import React, { SuspenseProps as ReactSuspenseProps } from 'react';
import LoadingStateHighlighter from './LoadingStateHighlighter';

interface SuspenseProps extends ReactSuspenseProps {
  shade?: string;
}

// A decorated <Suspense /> component that will highlight the loading state when
// the "Highlight Suspense Boundaries" setting is enabled.
const Suspense = ({ fallback, shade, ...props }: SuspenseProps) => {
  return (
    <React.Suspense
      {...props}
      fallback={
        <LoadingStateHighlighter shade={shade}>
          {fallback}
        </LoadingStateHighlighter>
      }
    />
  );
};

export default Suspense;
