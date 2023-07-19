# Welcome to the Apollo Showcase Demo

Welcome to the **{{ graph.name }}** API! 🎉 You can follow along in this README to walk through a guided demo or just explore yourself.

# So what did clicking that button do to get me here?

In creating this demo, we've set up GraphOS to work with two GraphQL APIs we have hosted for you: - _spotify_ - Exposes the Spotify REST API - _playback_ - Exposes subscriptions for playback functionality coming from the Spotify REST API including the associated `mutation` operations

This includes provisioning a serverless instance of the [Apollo Router](https://www.apollographql.com/docs/graphos/routing/cloud) that can route traffic between our two GraphQL APIs 🚀

# Demo Guide: Where should I start?

_Note: There are links in this demo that might navigate you around, it might be helpful to open two windows to keep this README up on one side of the screen (or right-click->Open in a new window)_

## Running operations

You need a way to query your graph and [GraphOS Explorer](https://www.apollographql.com/docs/graphos/explorer) is built to make this easy. Try running your first operation:

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

GraphOS Explorer also supports tabs. Open a new tab and try pausing the running subscription:

```gql
mutation PausePlaybackMutation {
  pausePlayback {
    playbackState {
      isPlaying
    }
  }
}
```

Get familiar with available objects in the [Schema Reference]({{ graph.url.reference }}), or try querying this graph using [Explorer]({{ graph.url.explorer }}).

This is the default README content. You can customize it however you like. Graph Maintainers, you can edit to include any information that is relevant for developers working with this graph by clicking the pencil icon in the top right corner. ☝

## What this graph is all about

Describe the purpose and use cases for your graph here. This is where you can tell the story of your API, and all of its deep magic...🦄🌌✨

## Accessing the graph

🛰 You can send operations to this graph at `{{ graph.url.endpoint }}`

📇 The Apollo Registry holds the canonical location of your schema. In the registry, this graph is referred to by its “graph ref”, which is: **{{ graph.ref }}**.

_(Note: you can [download Rover](https://www.apollographql.com/docs/rover/getting-started/), the Apollo CLI tool for working with your schema locally.)_

## How to authenticate to this graph

Authentication information has not been added to this README yet. Be sure to let your API developers know how to authenticate, and where to find the auth tokens they’ll need to authenticate with.🔐 👀

## Running operations

Include some operations in your README to help your API developers get started with your graph. Using a code block designated as ````gql` will render the operation with the Run in Explorer mini-button, and will load the operation in Explorer when clicked!

```gql
query Query {
  id
}
```

### Getting help with this graph

For support working with this graph, contact the Graph Admin via [email(replace me)](mailto:email@email.com) or [chat(put your chat link here)](#chatlink).
