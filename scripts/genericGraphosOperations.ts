import { v4 } from 'uuid';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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

export function createGraph(id: string) {
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
    .then((r) => r.data);
}

export async function createOperationCollection(graphId: string) {
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
  await client.mutate({
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
  });
}

export function updateLinterConfig(graphId: string) {
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

export function updateReadme(graphId: string) {
  return client.mutate({
    mutation: UPDATE_README,
    variables: {
      graphId,
      name: graphVariant,
      readme: readFileSync(resolve('docs', 'enterprise-demo.md'), {
        encoding: 'utf-8',
      }),
    },
  });
}

export function createSubgraph(subgraph: any) {
  return client.mutate({
    mutation: CREATE_SUBGRAPH,
    variables: subgraph,
  });
}

export function updateExplorerUrl(graphId: string) {
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

export async function checkApiKey() {
  try {
    const data = await client
      .query({
        query: ME_CHECK,
      })
      .then((r) => r.data);

    if (data.me?.memberships)
      return { type: 'user', id: data.me.memberships[0].account.id };
    if (data.me?.title) return { type: 'graph', id: data.me.id };
  } catch (err) {
    console.log(err);
  }
  return null;
}
