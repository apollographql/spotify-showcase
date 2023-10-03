import { rest, graphql } from 'msw';
import { graphql as graphqlRequest, buildSchema } from 'graphql';
import { addMocksToSchema, createMockStore } from '@graphql-tools/mock';
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

export const store = createMockStore({ schema, mocks });

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

  graphql.operation(async (req, res, ctx) => {
    const { query } = await req.json();

    const executableSchema = addMocksToSchema({
      schema,
      store,
      resolvers,
    });

    const payload = await graphqlRequest({
      schema: executableSchema,
      source: query,
      variableValues: req.variables,
    });

    return res(ctx.data(payload.data || {}), ctx.errors(payload.errors));
  }),
];
