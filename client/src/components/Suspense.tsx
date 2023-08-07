import React, { SuspenseProps } from 'react';
import LoadingStateHighlighter from './LoadingStateHighlighter';

// A decorated <Suspense /> component that will highlight the loading state when
// the "Highlight Suspense Boundaries" setting is enabled.
const Suspense = ({ fallback, ...props }: SuspenseProps) => {
  return (
    <React.Suspense
      {...props}
      fallback={<LoadingStateHighlighter>{fallback}</LoadingStateHighlighter>}
    />
  );
};

export default Suspense;
