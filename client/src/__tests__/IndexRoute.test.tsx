import { Suspense } from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import * as IndexRoute from '../routes/index';
import client from '../apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { schemaProxy } from '../mocks/handlers';

const customRender = (client: ApolloClient<NormalizedCacheObject>) =>
  render(
    <ApolloProvider client={client}>
      <Suspense fallback={<IndexRoute.LoadingState />}>
        <BrowserRouter>
          <IndexRoute.RouteComponent />
        </BrowserRouter>
      </Suspense>
    </ApolloProvider>
  );

describe('IndexRoute', () => {
  test('renders', async () => {
    customRender(client);

    expect(await screen.findByText(/afternoon delight/i)).toBeInTheDocument();
    expect(await screen.findByText(/this is my playlist/i)).toBeInTheDocument();
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
  });
  test.failing('allows resolvers to be updates via schemaProxy', async () => {
    schemaProxy.addResolvers({
      FeaturedPlaylistConnection: {
        message: () => 'purple seahorse',
        edges: () => [{}],
      },
    });

    customRender(client);

    // we should be able to see the updated resolver data here, but L44 is failing
    expect(await screen.findByText(/purple seahorse/i)).toBeInTheDocument();
    expect(await screen.findByText(/this is my playlist/i)).toBeInTheDocument();
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
  });
});
