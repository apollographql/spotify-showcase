import { Suspense } from 'react';
import { describe, test, expect, beforeEach } from '@jest/globals';
import { render as originalRender, screen } from '@testing-library/react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import * as IndexRoute from '../routes/index';
import client from '../apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { schemaProxy } from '../mocks/handlers';

const render = (client: ApolloClient<NormalizedCacheObject>) =>
  originalRender(
    <ApolloProvider client={client}>
      <Suspense fallback={<IndexRoute.LoadingState />}>
        <BrowserRouter>
          <IndexRoute.RouteComponent />
        </BrowserRouter>
      </Suspense>
    </ApolloProvider>
  );

describe('IndexRoute', () => {
  beforeEach(() => {
    // since all our tests now use our production Apollo Client instance
    // we need to reset the client cache before each test
    return client.cache.reset();
  });

  test('renders', async () => {
    render(client);

    expect(await screen.findByText(/afternoon delight/i)).toBeInTheDocument();
    expect(await screen.findByText(/this is my playlist/i)).toBeInTheDocument();
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
  });
  test('allows resolvers to be updated via schemaProxy', async () => {
    schemaProxy.addResolvers({
      FeaturedPlaylistConnection: {
        message: () => 'purple seahorse',
        edges: () => [{}],
      },
    });

    render(client);

    // the resolver has been updated
    expect(await screen.findByText(/purple seahorse/i)).toBeInTheDocument();
  });
});
