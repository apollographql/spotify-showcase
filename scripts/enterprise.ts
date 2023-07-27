import 'dotenv/config';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { HttpLink, gql } from '@apollo/client/core';
import {
  checkApiKey,
  client,
  createGraph,
  createOperationCollection,
  createSubgraph,
  graphVariant,
  updateExplorerUrl,
  updateLinterConfig,
  updateReadme,
} from './genericGraphosOperations';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const token = process.env.AUTH ?? '';

async function main() {
  client.setLink(
    new HttpLink({
      uri: 'https://graphql.api.apollographql.com/api/graphql',
      headers: {
        'x-api-key': token,
        'apollographql-client-name': 'spotify-demo-ent',
        'apollographql-client-version': '1',
      },
    })
  );
  const identity = await checkApiKey();
  if (!identity) {
    console.log('Invalid API key');
    return;
  }

  let graphId;
  let graphApiKey;

  switch (identity.type) {
    case 'graph':
      graphId = identity.id;
      break;
    case 'user':
      //Create Graph
      const { newService } = await createGraph(identity.id);
      graphId = newService?.id;
      graphApiKey = newService?.apiKeys[0]?.token;
      break;
  }

  const subgraphs = [
    {
      graphId,
      graphVariant,
      activePartialSchema: {
        sdl: readFileSync(resolve('subgraphs', 'spotify', 'schema.graphql'), {
          encoding: 'utf-8',
        }),
      },
      name: 'spotify',
      url: 'https://showcase-spotify.apollographql.com',
      revision: '1',
    },
    {
      graphId,
      graphVariant,
      activePartialSchema: {
        sdl: readFileSync(resolve('subgraphs', 'playback', 'schema.graphql'), {
          encoding: 'utf-8',
        }),
      },
      name: 'playback',
      url: 'https://showcase-spotify.apollographql.com',
      revision: '1',
    },
  ];

  await createSubgraph(subgraphs[0]);
  await sleep(1000);
  await createSubgraph(subgraphs[1]);
  await createOperationCollection(graphId);
  await updateExplorerUrl(graphId);
  await updateReadme(graphId);
  await createContract(graphId);
  await updateLinterConfig(graphId);
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
