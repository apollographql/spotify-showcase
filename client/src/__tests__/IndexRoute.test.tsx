import { expect, test, describe } from 'vitest';
import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import * as IndexRoute from '../routes/index';
import client from '../apollo/client';
import { BrowserRouter } from 'react-router-dom';

describe('IndexRoute', () => {
  test('allows user to log in', async () => {
    render(
      <ApolloProvider client={client}>
        <Suspense fallback={<IndexRoute.LoadingState />}>
          <BrowserRouter>
            <IndexRoute.RouteComponent />
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    );

    expect(await screen.findByText(/afternoon acoustic/i)).toBeInTheDocument();
  });
});
