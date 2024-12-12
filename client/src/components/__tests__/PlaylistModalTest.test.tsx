import { expect, test } from 'vitest';
import {
  ApolloClient,
  InMemoryCache,
  createQueryPreloader,
} from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import { MockLink } from '@apollo/client/testing';
import PlaylistDetailsModal, {
  PLAYLIST_DETAILS_MODAL_QUERY,
} from '../PlaylistDetailsModal';

test('suspends with loading state', async () => {
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
