import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createQueryPreloader,
  useBackgroundQuery,
} from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import { MockLink, MockedProvider } from '@apollo/client/testing';
import PlaylistDetailsModal, {
  PLAYLIST_DETAILS_MODAL_QUERY,
} from '../PlaylistDetailsModal';

test('works with preloadQuery', async () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink([
      {
        request: {
          query: PLAYLIST_DETAILS_MODAL_QUERY,
          variables: { id: '1' },
        },
        result: {
          data: {
            playlist: {
              __typename: 'Playlist',
              id: '1',
              name: 'Test',
              description: 'Test Playlist',
              images: [],
            },
          },
        },
        delay: 50,
      },
    ]),
  });
  const preloadQuery = createQueryPreloader(client);

  const queryRef = preloadQuery(PLAYLIST_DETAILS_MODAL_QUERY, {
    variables: { id: '1' },
  });

  render(
    <PlaylistDetailsModal
      open
      onChange={() => {
        // do nothing
      }}
      queryRef={queryRef}
    />
  );

  expect(screen.getByTestId('playlist-modal-skeleton')).toBeDefined();

  await waitFor(() => {
    expect(screen.getByLabelText('Name')).toHaveValue('Test');
  });
});

test('works with useBackgroundQuery', async () => {
  const mocks = [
    {
      request: {
        query: PLAYLIST_DETAILS_MODAL_QUERY,
        variables: { id: '1' },
      },
      result: {
        data: {
          playlist: {
            __typename: 'Playlist',
            id: '1',
            name: 'Test',
            description: 'Test Playlist',
            images: [],
          },
        },
      },
      delay: 50,
    },
  ];

  function App() {
    const [queryRef] = useBackgroundQuery(PLAYLIST_DETAILS_MODAL_QUERY, {
      variables: { id: '1' },
    });

    return (
      <PlaylistDetailsModal
        open
        onChange={() => {
          // do nothing
        }}
        queryRef={queryRef}
      />
    );
  }

  render(<App />, {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    ),
  });

  expect(screen.getByTestId('playlist-modal-skeleton')).toBeDefined();

  await waitFor(() => {
    expect(screen.getByLabelText('Name')).toHaveValue('Test');
  });
});

test('with preloaded value', async () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });

  client.writeQuery({
    query: PLAYLIST_DETAILS_MODAL_QUERY,
    variables: { id: '1' },
    data: {
      playlist: {
        __typename: 'Playlist',
        id: '1',
        name: 'Test',
        description: 'Test Playlist',
        images: [],
      },
    },
  });

  function App() {
    const [queryRef] = useBackgroundQuery(PLAYLIST_DETAILS_MODAL_QUERY, {
      variables: { id: '1' },
    });

    return (
      <PlaylistDetailsModal
        open
        onChange={() => {
          // do nothing
        }}
        queryRef={queryRef}
      />
    );
  }

  render(<App />, {
    wrapper: ({ children }) => (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    ),
  });

  expect(screen.queryByTestId('playlist-modal-skeleton')).toBeNull();
  expect(screen.getByLabelText('Name')).toHaveValue('Test');
});
