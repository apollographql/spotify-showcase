import { graphql, http, HttpResponse } from 'msw';
import { execute } from 'graphql';
import { gql } from '@apollo/client';
import { createMockSchema, proxiedSchema } from '@apollo/client/testing';
import { makeExecutableSchema } from '@graphql-tools/schema';
import SpotifySchema from '../../schema.graphql';

const resolvers = {
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

const staticSchema = makeExecutableSchema({ typeDefs: SpotifySchema });

const schema = createMockSchema(staticSchema, {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'string',
});

export const schemaProxy = proxiedSchema(schema, resolvers);

export const handlers = [
  http.post('https://accounts.spotify.com/api/token', () => {
    return HttpResponse.json({
      expires_in: '10000000',
      access_token: 'foo',
      refresh_token: 'bar',
    });
  }),

  graphql.operation(async ({ query, variables, operationName }) => {
    const document = gql(query);

    const result = await execute({
      document,
      operationName,
      schema: schemaProxy,
      variableValues: variables,
    });

    return HttpResponse.json(result);
  }),
];
