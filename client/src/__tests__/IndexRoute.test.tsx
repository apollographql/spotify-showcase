import { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import * as IndexRoute from '../routes/index';
import client from '../apollo/client';

// @ts-ignore
test('allows user to log in', async () => {
  // Render components, perform requests, receive mocked responses.

  render(
    <ApolloProvider client={client}>
      <Suspense fallback={<IndexRoute.LoadingState />}>
        <IndexRoute.RouteComponent />
      </Suspense>
    </ApolloProvider>
  );

  await waitFor(() => {
    screen.findByText('Afternoon jams');
  });
});
