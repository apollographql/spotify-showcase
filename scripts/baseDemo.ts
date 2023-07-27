import { v4 } from 'uuid';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const graphVariant = 'main';
export const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const ME_CHECK = gql(`
  query ApiCheck {
    me {
      ...on User {
        id
        memberships {
          account {
            id
          }
        }
      }
      ...on Service {
        id
        title
      }
    }
  }
`);
const CREATE_GRAPH = gql(`
  mutation CreateDemoGraph ($accountId: ID!, $newServiceId: ID!, $name: String) {
    newService(accountId: $accountId, id: $newServiceId, name: $name) {
      id
      apiKeys { token }
      account {
        currentPlan {
          kind
        }
      }
    }
  }
`);
const CREATE_SUBGRAPH = gql(`
  mutation PublishSubgraphSchema($graphId: ID!, $graphVariant: String!, $name: String!, $activePartialSchema: PartialSchemaInput!, $url: String, $revision: String!) {
    graph(id: $graphId) {
      publishSubgraph(graphVariant: $graphVariant, activePartialSchema: $activePartialSchema, name: $name, url: $url, revision: $revision) { 
        launchUrl
        updatedGateway
        wasCreated
      }
    }
  }
`);
const CREATE_OPERATION_COLLECTION = gql(`
  mutation CreateOperationCollection($isSandbox: Boolean!, $isShared: Boolean!, $name: String!, $variantRefs: [ID!]) {
    createOperationCollection(isSandbox: $isSandbox, isShared: $isShared, name: $name, variantRefs: $variantRefs) {
      ... on OperationCollection {
        id
      }
      ... on PermissionError {
        message
      }
      ... on ValidationError {
        message
      }
    }
  }
`);
const ADD_OPERATION_TO_COLLECTION = gql(`
  mutation AddOperations($operations: [AddOperationInput!]!, $operationCollectionId: ID!) {
    operationCollection(id: $operationCollectionId) {
      addOperations(operations: $operations) {
        ... on ValidationError {
          message
        }
        ... on PermissionError {
          message
        }
        ... on AddOperationCollectionEntriesSuccess {
          operationCollectionEntries {
            id
            name
          }
        }
      }
    }
  }
`);
const UPDATE_EXPLORER_URL = gql(`
  mutation UpdateURL($name: String!, $graphId: ID!, $url: String, $subscriptionUrl: String, $sharedHeaders: String) {
    graph(id: $graphId) {
      variant(name: $name) {
        updateURL(url: $url) {
          url
        }
        updateSubscriptionURL(subscriptionUrl: $subscriptionUrl) {
          url
        }
        updateSharedHeaders(sharedHeaders: $sharedHeaders) {
          sharedHeaders
        }
      }
    }
  }
`);
const UPDATE_README = gql(`
  mutation UpdateVariantReadme($readme: String!, $name: String!, $graphId: ID!) {
    graph(id: $graphId) {
      variant(name: $name) {
        updateVariantReadme(readme: $readme) {
          id
        }
      }
    }
  }`);

const UPDATE_LINTER_CONFIG = gql(`
  mutation UpdateLinterConfiguration($changes: GraphLinterConfigurationChangesInput!, $graphId: ID!) {
    graph(id: $graphId) {
      updateLinterConfiguration(changes: $changes) {
        rules {
          rule
        }
      }
    }
  }`);

function createGraph(id: string) {
  const uniqueId = v4().replace('-', '').substring(0, 6);
  return client
    .mutate({
      mutation: CREATE_GRAPH,
      variables: {
        accountId: id,
        newServiceId: `spotify-demo-graph-${uniqueId}`,
        name: 'Spotify Demo Graph',
      },
    })
    .then((r) => ({
      newService: r.data?.newService,
    }));
}

async function createOperationCollection(graphId: string) {
  const { createOperationCollection } = await client
    .mutate({
      mutation: CREATE_OPERATION_COLLECTION,
      variables: {
        isSandbox: false,
        isShared: true,
        name: 'Example Operations',
        variantRefs: `${graphId}@${graphVariant}`,
      },
    })
    .then((r) => r.data);
  return await client
    .mutate({
      mutation: ADD_OPERATION_TO_COLLECTION,
      variables: {
        operationCollectionId: createOperationCollection.id,
        operations: [
          {
            name: 'MyPlaylists',
            document: {
              body: `query MyPlaylists($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            name
            uri
          }
        }
      }
    }
  }`,
            },
          },
          {
            name: 'PlaybackState',
            document: {
              body: `subscription PlaybackState {
    playbackStateChanged {
      isPlaying
      progressMs
      item {
        name
      }
    }
  }
  `,
            },
          },
          {
            name: 'PausePlayback',
            document: {
              body: `mutation PausePlayback {
    pausePlayback {
      playbackState {
        isPlaying
      }
    }
  }`,
            },
          },
          {
            name: 'ResumePlayback',
            document: {
              body: `mutation ResumePlayback {
    resumePlayback {
      playbackState {
        isPlaying
      }
    }
  }`,
            },
          },
        ],
      },
    })
    .then((r) => r.data);
}

function updateLinterConfig(graphId: string) {
  return client.mutate({
    mutation: UPDATE_LINTER_CONFIG,
    variables: {
      graphId,
      changes: {
        rules: [
          {
            rule: 'FIELD_NAMES_SHOULD_BE_CAMEL_CASE',
            level: 'ERROR',
          },
        ],
      },
    },
  });
}

function updateReadme(
  graphId: string,
  readme: string,
  ops: { id: string; name: string }[]
) {
  ops.forEach(({ id, name }) => {
    readme = readme.replace(`<replace-${name}>`, `{{ operation.${id} }}`);
  });
  return client.mutate({
    mutation: UPDATE_README,
    variables: {
      graphId,
      name: graphVariant,
      readme,
    },
  });
}

function createSubgraph(subgraph: any) {
  return client.mutate({
    mutation: CREATE_SUBGRAPH,
    variables: subgraph,
  });
}

function updateExplorerUrl(graphId: string) {
  const apolloHostedRouter = 'https://showcase-router.apollographql.com';
  return client.mutate({
    mutation: UPDATE_EXPLORER_URL,
    variables: {
      graphId,
      name: graphVariant,
      url: apolloHostedRouter,
      subscriptionUrl: apolloHostedRouter,
      sharedHeaders: `{"x-graphos-id": "${graphId}"}`,
    },
  });
}

async function checkApiKey() {
  const data = await client
    .query({
      query: ME_CHECK,
    })
    .then((r) => r.data);

  if (data.me?.memberships) return data.me.memberships[0].account.id;
  throw new Error(
    'You must use a user api key and be an org administrator for your account.'
  );
}

export async function createBaseDemo() {
  const identity = await checkApiKey();
  if (!identity) {
    console.log('Invalid API key');
    return;
  }

  const { newService } = await createGraph(identity);
  const isEnterprise = newService?.account?.currentPlan?.kind
    ?.toLowerCase()
    ?.includes('enterprise')
    ? true
    : false;
  let graphId = newService?.id;

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
  await updateExplorerUrl(graphId);
  const operationCollection = await createOperationCollection(graphId);
  const ops =
    operationCollection?.operationCollection?.addOperations
      ?.operationCollectionEntries ?? [];

  const readmeContentPath = isEnterprise
    ? resolve('docs', 'enterprise-demo.md')
    : resolve('docs', 'serverless-demo.md');
  await updateReadme(
    graphId,
    readFileSync(readmeContentPath, {
      encoding: 'utf-8',
    }),
    ops
  );
  await updateLinterConfig(graphId);

  return graphId;
}
