import 'dotenv/config';
import { v4 } from 'uuid';
import { resolve } from 'path';
import inquirer from 'inquirer';
import { readFileSync } from 'fs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const graphVariant = 'main';
const ROUTER_CONFIG = (graphId: string) =>
  `cors:\n  allow_any_origin: true\nheaders:\n  subgraphs:\n    spotify:\n      request:\n        - propagate:\n            matching: \"authorization\"\n        - insert:\n            name: \"x-graphos-id\"\n            value: \"${graphId}\"\n    playback:\n      request:\n        - propagate:\n            matching: \"authorization\"\n        - insert:\n            name: \"x-graphos-id\"\n            value: \"${graphId}\"`;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphql.api.apollographql.com/api/graphql',
  headers: {
    'x-api-key': process.env.AUTH ?? '',
    'apollographql-client-name': 'spotify-demo-script',
    'apollographql-client-version': '1',
  },
});

const ME_CHECK = gql(`
  query ApiCheck {
    me {
      ...on User {
        id
        memberships {
          account {
            id
            name
            currentPlan {
              tier
            }
          }
          permission
        }
      }
    }
  }
`);
const CREATE_GRAPH = gql(`
  mutation CreateDemoGraph ($accountId: ID!, $graphType: GraphType!, $hiddenFromUninvitedNonAdmin: Boolean!, $createGraphId: ID!, $title: String!) {
    account(id: $accountId) {
      createGraph(graphType: $graphType, hiddenFromUninvitedNonAdmin: $hiddenFromUninvitedNonAdmin, id: $createGraphId, title: $title) {
        ...on Service {
          id
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
const UPDATE_CLOUD_ROUTER_CONFIG = gql(`
  mutation UpdateRouterConfigMutation(
    $graphId: ID!
    $variant: String!
    $newRouterConfig: String!
  ) {
    service(id: $graphId) {
      variant(name: $variant) {
        upsertRouterConfig(configuration: $newRouterConfig) {
          ... on RouterUpsertFailure {
            message
          }
        }
      }
    }
  }`);

function createGraph(id: string, isEnterprise: boolean) {
  const uniqueId = v4().replace('-', '').substring(0, 6);
  return client
    .mutate({
      mutation: CREATE_GRAPH,
      variables: {
        graphType: isEnterprise ? 'SELF_HOSTED_SUPERGRAPH' : 'CLOUD_SUPERGRAPH',
        accountId: id,
        createGraphId: `spotify-demo-graph-${uniqueId}`,
        title: 'Spotify Demo Graph',
        hiddenFromUninvitedNonAdmin: false,
      },
    })
    .then(async (r) => {
      if (!isEnterprise) await sleep(30000);
      return {
        graphId: r.data?.account?.createGraph?.id,
      };
    });
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

  if (data.me?.memberships) {
    let selectedAccount: { id: string; isEnterprise: boolean } | undefined;
    const accounts: { [name: string]: string } = {};

    if (data.me.memberships.length == 1) {
      const { account } = data.me.memberships[0];
      selectedAccount = {
        id: account.id,
        isEnterprise: account.currentPlan.tier
          .toLowerCase()
          .includes('enterprise')
          ? true
          : false,
      };
    } else if (data.me.memberships.length > 1) {
      data.me.memberships.forEach((m: any) => {
        const name = (m?.account?.name as string) ?? undefined;
        if (name && m.permission == 'ORG_ADMIN') accounts[name] = m.account.id;
      });
    }

    if (selectedAccount) return selectedAccount;

    const { theme } = await inquirer.prompt([
      {
        type: 'list',
        name: 'theme',
        message:
          'We found multiple accounts, which one do you want to create in?',
        choices: Object.keys(accounts),
      },
    ]);
    const { account } = data.me.memberships.find(
      (a: any) => a.account.id == accounts[theme]
    );
    if (theme) {
      selectedAccount = {
        id: account.id,
        isEnterprise: account.currentPlan.tier
          .toLowerCase()
          .includes('enterprise')
          ? true
          : false,
      };
      return selectedAccount;
    }
  }
  throw new Error(
    'You must use a user api key and be an org administrator for your account.'
  );
}

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
function updateClourRouterConfig(graphId: string) {
  return client.mutate({
    mutation: UPDATE_CLOUD_ROUTER_CONFIG,
    variables: {
      graphId,
      variant: graphVariant,
      newRouterConfig: ROUTER_CONFIG(graphId),
    },
  });
}

async function createDemo() {
  const { id, isEnterprise } = await checkApiKey();
  if (!id) {
    console.log('Invalid API key');
    return;
  }

  const { graphId } = await createGraph(id, isEnterprise);
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
      url: 'https://showcase-playback.apollographql.com',
      revision: '1',
    },
  ];

  await createSubgraph(subgraphs[0]);
  await sleep(isEnterprise ? 1000 : 10000);
  await createSubgraph(subgraphs[1]);
  await sleep(isEnterprise ? 10 : 10000);
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

  if (isEnterprise) {
    await updateExplorerUrl(graphId);
    await createContract(graphId);
  } else {
    await updateClourRouterConfig(graphId);
  }
}

createDemo();
