import { Suspense } from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import * as IndexRoute from '../routes/index';
import client from '../apollo/client';
import { BrowserRouter } from 'react-router-dom';

describe('IndexRoute', () => {
  test('renders', async () => {
    render(
      <ApolloProvider client={client}>
        <Suspense fallback={<IndexRoute.LoadingState />}>
          <BrowserRouter>
            <IndexRoute.RouteComponent />
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    );

    expect(await screen.findByText(/afternoon delight/i)).toBeInTheDocument();
    expect(await screen.findByText(/this is my playlist/i)).toBeInTheDocument();
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
  });
});
