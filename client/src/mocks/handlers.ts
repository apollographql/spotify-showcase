import { rest } from 'msw';
import { buildSchema } from 'graphql';
import { addMocksToSchema, createMockStore } from '@graphql-tools/mock';
import { SchemaLink } from '@apollo/client/link/schema/index.js';
import SpotifySchema from '../../schema.graphql';

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'string',
};

export const resolvers = {
  FeaturedPlaylistConnection: {
    message: () => 'Afternoon delight',
    edges: () => [{}],
  },
  Image: {
    url: () => 'https://spotify.com/image.png',
  },
  Playlist: {
    id: () => 1,
    name: () => 'This is my playlist',
    description: () => 'A description',
  },
};

const schema = buildSchema(SpotifySchema?.loc?.source.body || '');

const store = createMockStore({ schema, mocks });

export const ExecutableSchemaLink = new SchemaLink({
  schema: addMocksToSchema({
    schema,
    store,
    resolvers,
  }),
});

export const handlers = [
  rest.post('https://accounts.spotify.com/api/token', (req, res, ctx) => {
    return res(
      ctx.json({
        expires_in: '10000000',
        access_token: 'foo',
        refresh_token: 'bar',
      })
    );
  }),
];
