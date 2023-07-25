# Welcome to the **{{ graph.name }}** API! 🎉

You can follow along in this README to walk through a guided demo or just explore around yourself.

# So what did clicking "Try a Demo Graph" do?

Behind the scenes, we've set up GraphOS to work with two GraphQL APIs we have hosted for you:

- _spotify_: Exposes the [Spotify REST API](https://developer.spotify.com/documentation/web-api)
- _playback_: Exposes subscriptions for playback functionality coming from the Spotify REST API including the associated `mutation` operations

GraphOS also provisioned a serverless instance of the [Apollo Router](https://www.apollographql.com/docs/graphos/routing/cloud) that can route traffic between our two GraphQL APIs 🚀

# Demo Guide: Where should I start?

> There are links in this demo that might navigate you around to different pages of Studio. It might be helpful to open two windows to keep this README up on one side of the screen (or right-click -> Open in a new window).

## Running operations

You need a way to query your graph and [GraphOS Explorer](https://www.apollographql.com/docs/graphos/explorer) is the perfect tool to help you! Try running your first few operations by clicking on the play icon beside each operation below:

```gql
query RoolWebsiteQuery($offset: Int, $limit: Int) {
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
}
```

The [Apollo Router also supports GraphQL subscriptions](https://www.apollographql.com/docs/graphos/operations/subscriptions/)!

```gql
subscription PlaybackStateSubscriberSubscription {
  playbackStateChanged {
    isPlaying
    progressMs
  }
}
```

GraphOS Explorer also supports tabs. Open a new tab and run the operation below to pause the running subscription:

```gql
mutation PausePlaybackMutation {
  pausePlayback {
    playbackState {
      isPlaying
    }
  }
}
```

## Identifying client operations

You can begin [identifying your client traffic](https://www.apollographql.com/docs/graphos/metrics/client-awareness) by ensuring the proper headers are sent. GraphOS will automatically associate the graph usage with the identified client information:

| Header name                    | Header value                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `apollographql-client-name`    | The name of your client.                                                            |
| `apollographql-client-version` | Increment this value with version numbers for your client as its API usage changes. |

If you're using [Explorer]({{ graph.url.explorer }}), add the `apollographql-client-name` and `apollographql-client-version` headers with `Apollo Explorer` and `main` (or whatever values you like).

If you have a client project, simply setting the `name` and `version` properties in the `ApolloClient` constructor will automatically add these header values to your requests for you. You can see how we set that in the Spotify Showcase Website [here](https://github.com/apollographql/spotify-showcase/blob/main/client/src/apollo.ts#L76):

```js
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  name: 'Spotify Showcase Website',
  version: '1.0',
});
```

Once you've sent some traffic, head over to the [Clients page]({{ graph.url.clients }}) and you should see the traffic being identified now 🎉

## Adding a new GraphQL API to GraphOS

You can view all of the GraphQL APIs in the Subgraphs page.

Try adding SpaceX to the demo by using the "Add a subgraph" button. You'll use `https://spacex-production.up.railway.app/` for the routing URL, then name the subgraph `spacex`.

> The SpaceX API has introspection turned on so GraphOS should be able to fetch the schema. If you try adding a subgraph that _doesn't_ support introspection or Apollo Federation, you will have to manually paste your schema into the UI using the "Advanced options" dropdown.

Adding a new subgraph triggers a [launch](https://www.apollographql.com/docs/graphos/delivery/launches/). Head over to the [Launches page]({{ graph.url.launches }}) to see the update run through the appropriate checks and get deployed. After a successful launch, jump over to [Explorer]({{ graph.url.explorer }}) to test out a query that includes both Spotify and SpaceX fields!

```graphql
query RoolWebsiteQuery($offset: Int, $limit: Int) {
  # SpaceX fields
  company {
    name
  }
  # Spotify fields
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
}
```

## Viewing your graph's changelog

Every update that is successfully made to your graph will appear as a Changelog entry. Since you just added the SpaceX API, you can head over to the [Changelog]({{ graph.url.changelog }}) page and see a list of the types and fields that were added.

Over in the [Schema Reference page]({{ graph.url.reference }}), you can also see a more detailed breakdown of the schema with the ability to search to find whatever you need. You can filter by multiple criteria, like specific subgraphs or even entities you have defined.

> If you don't know what an entity is in Apollo Federation, [head over to the docs to learn more](https://www.apollographql.com/docs/federation/entities).

## Understanding the usage of your graph

The Apollo Router automatically collects usage information on your graph based on what fields are being requested from client applications. You can start diving into specific fields and their usage in the graph by heading to the [Fields page]({{ graph.url.fields }}).

At the top of the Fields page, try using the search bar to search for `CurrentUser` to find the `me` field. You can also click the field insights button to the right to view a more detailed breakdown of the usage of this specific field.

## Knowing when to start pruning your graph

Since GraphOS has the usage information of our graph, it can also identify fields marked with the `@deprecated` directive and tell us if they are still being used or not. In the same [Fields page]({{ graph.url.fields }}), select "Deprecations" at the top and you should see some deprecated fields that were added from the SpaceX API.

## Looking at individual operations

In addition to the aggregate usage information provided in the Fields page, GraphOS also enables you to view sample individual traces that includes resolver level traces 🙌. Head over to the [Operations]({{ graph.url.operations }}) page and you can explore the traces generated from the operations you ran in previous steps.

## Testing out making a change to your subgraphs locally

Every change to a subgraph should be validated using [**schema checks**](https://www.apollographql.com/docs/graphos/delivery/schema-checks). You'll need to [install Rover](https://www.apollographql.com/docs/rover/getting-started), the GraphOS CLI interface, to run schema checks in this demo. Once you have Rover installed, you'll need to authenticate Rover.

Open your graph's Settings page, then select the "This Graph" tab. Then, select the "API Keys" tab. Click "Create New Key" and give it a name, like "demo". Make sure to copy your API key now. You won't be able to see it again.

Then in a terminal window, run the rover config command:

```shell
rover config auth --profile=demo
```

> We're adding the authorization under a 'demo' profile since we're configuring a graph API key. You can [learn more about the configuration profiles for rover's auth in the docs](https://www.apollographql.com/docs/rover/commands/config).

The terminal should prompt you to paste in your API key. Once you've pasted in your API key, you're all set up to run checks against our graph.

Let's try it out. Download [this example schema file locally](https://gist.githubusercontent.com/michael-watson/197152123c125fc6653b3bdb84265946/raw/bc5044d2dabd0aca18d022865538085efa90ad16/gistfile1.txt); you can open the link and save through the browser as `schema.graphql`.

Now let's switch back to the terminal window and run the schema check command:

```shell
rover subgraph check {{ graph.ref }} --profile=demo --name=spotify --schema={PATH_TO_DOWNLOADED_SCHEMA}
```

You should see a failed output with a URL. Go ahead and click that URL to see why the check failed. Schema checks use our graph's usage information to validate whether a change is safe to make or not 🚀

## Seeing schema checks in a PR

You can also see schema checks in a PR, but you'll have to [fork the demo repo](https://github.com/apollographql/spotify-showcase/fork). Once you've forked the repo, you'll need to do some minimum configuration:

1. [Ensure the Apollo app is installed in the repo](https://www.apollographql.com/docs/rover/ci-cd/#displaying-schema-check-results-on-github-pull-requests).
2. Add these secrets to your GitHub Actions secrets:

- `APOLLO_KEY`: You can use the same key you used to configure Rover in this example or feel free to create a new key.
- `APOLLO_GRAPH_REF`: You'll want to set this to `{{ graph.ref }}`.

Now that the new repo is configured, navigate to the `subgraphs/spotify/schema.graphql` file. Find the `type Query` and delete the `me` field from the schema (make sure you also delete the comment above it surrounded by three quotes """).

Commit that change to a new branch, then create a PR. You'll see the schema checks pop up in the PR with the Apollo app providing a link to the [GraphOS Studio Checks page]({{ graph.url.checks }}).

> If you don't see the Apollo app in your checks, you probably don't have the [Apollo app installed](https://www.apollographql.com/docs/rover/ci-cd/#displaying-schema-check-results-on-github-pull-requests). You can also click into the individual actions and see the URL printed out in the console window.

## Configuring your schema checks

There are a few different types of [schema checks](https://www.apollographql.com/docs/graphos/delivery/schema-checks):

- [**Composition checks**](https://www.apollographql.com/docs/graphos/delivery/schema-checks#composition-checks). Verifies whether your proposed changes to a subgraph schema will successfully compose with your other subgraph schemas.
- [**Operation checks**](https://www.apollographql.com/docs/graphos/delivery/schema-checks#operation-checks). Compares your proposed schema changes against historical operations to verify whether the changes will break any of your graph's active clients.
- [**Linter checks**](https://www.apollographql.com/docs/graphos/delivery/schema-linter). Analyzes your proposed schema changes for violations of formatting rules and other GraphQL best practices.

You can also [configure all of these checks](https://www.apollographql.com/docs/graphos/delivery/check-configurations) to fit the needs of your project. Maybe you need to ensure checks run against multiple environments of your graph (i.e. `pre-prod` and `prod`) or exclude past operations from an old client now that usage is low.

# Wrap up

We've covered some of the basics of GraphOS in this demo. If you're looking for more resources, check out the links below:

📚 [The Apollo documentation](https://www.apollographql.com/docs/graphos) covers all things GraphOS.

✏️ Learn through hands-on tutorials [available on Odyssey, our GraphQL learning platform](https://www.apollographql.com/tutorials/browse?categories=GraphOS).

👋 Need a little extra help? Jump into our [Discord server](https://discord.gg/graphos) and verify the email you used with this GraphOS account. It will give you access to a private channel where you can get help on anything GraphOS related!

> Got feedback or suggestions for this demo? Please [submit a GitHub issue](https://github.com/apollographql/spotify-showcase/issues)!
