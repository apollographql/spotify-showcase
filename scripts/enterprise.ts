import 'dotenv/config';
import { HttpLink, gql } from '@apollo/client/core';
import { client, graphVariant, createBaseDemo } from './baseDemo';

async function main() {
  client.setLink(
    new HttpLink({
      uri: 'https://graphql.api.apollographql.com/api/graphql',
      headers: {
        'x-api-key': process.env.AUTH ?? '',
        'apollographql-client-name': 'spotify-demo-ent',
        'apollographql-client-version': '1',
      },
    })
  );
  const graphId = await createBaseDemo();
  await createContract(graphId);
}

main();

//Enterprise specific functions
const CREATE_CONTRACT = gql(`
  mutation UpsertContractVariant($contractVariantName: String!, $graphId: ID!, $filterConfig: FilterConfigInput!, $sourceVariant: String) {
    graph(id: $graphId) {
      upsertContractVariant(contractVariantName: $contractVariantName, filterConfig: $filterConfig, sourceVariant: $sourceVariant) {
        ... on ContractVariantUpsertSuccess {
          launchUrl
        }
        ... on ContractVariantUpsertErrors {
          errorMessages
        }
      }
    }
  }`);
function createContract(graphId: string) {
  return client.mutate({
    mutation: CREATE_CONTRACT,
    variables: {
      contractVariantName: 'public',
      graphId,
      filterConfig: {
        exclude: ['internal'],
        include: [],
        hideUnreachableTypes: true,
      },
      sourceVariant: graphVariant,
    },
  });
}
