import 'dotenv/config';
import { HttpLink, gql } from '@apollo/client/core';
import { client, createBaseDemo } from './baseDemo';

async function main() {
  client.setLink(
    new HttpLink({
      uri: 'https://graphql.api.apollographql.com/api/graphql',
      headers: {
        'x-api-key': process.env.AUTH ?? '',
        'apollographql-client-name': 'spotify-demo-serverless',
        'apollographql-client-version': '1',
      },
    })
  );
  await createBaseDemo();
}

main();
