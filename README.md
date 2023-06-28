# <a href="https://www.apollographql.com/"><img src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" height="100" alt="Apollo logo"></a>

# React + Apollo Spotify Showcase

<img width="1512" alt="Screenshot 2023-03-07 at 5 13 26 PM" src="https://user-images.githubusercontent.com/565661/223585591-93b5b6d2-d3d8-44fb-9b30-8bb5fc508f90.png">

## Architecture 

The overall API architecture is made up of two GraphQL servers, one exposing subscription/mutation functionality and the other exposing query functionality. Both GraphQL servers use the Spotify REST API as their datasource, but we are hosting the subscription server on dedicated infrastructure (Railway) and the other on serverless functions (Netlify). 

The Apollo Router routes incoming traffic from the client application and integrates with GraphOS to receive schema updates and report usage metrics. 


```mermaid
graph LR;
B <--> C["Playback Subgraph\n(subriptions/mutations)"];
B <--> D["Spotify Subgraph\n(queries)"];
C <--> E[Spotify REST API];
D <--> E;

subgraph "Apollo Cloud"
  B --> F("<u><b>GraphOS</b></u>\nSchema Pipeline\nMetrics &  Reporting")
end

subgraph "Netlify"
  A["Website\n(client app)"] --> B{"Apollo Router"}
  B --> A;
end

subgraph "Railway"
  C
end

subgraph "Netlify Function"
  D
end

```

***Note**: We are using only the Spotify REST API as our datasource for demonstration purposes. The subscriptions subgraph implements a polling mechanism that we host on a dedicated infrastructure while the "query" subgraph is hosted on serverless infrastructure*

### Subgraph responsibilities

## Getting started

1. Clone this repo

2. What do you want to do next with this demo app? 

### I want to play around with the public version of the demo

1. Visit the [public Apollo Explorer instance](https://studio.apollographql.com/public/spotify-ev3of9/variant/prod/home) to interact with the graph (No GraphOS account required)
  - [Query the graph](https://studio.apollographql.com/public/spotify-ev3of9/variant/prod/explorer) *(**Spotify account required**) - OAuth workflow with be initiated from Apollo Explorer to login to our Spotify account to run any operation*
    - Try having your Spotify app playing on your phone or desktop and then run [this mutation](https://studio.apollographql.com/public/spotify-ev3of9/variant/prod/explorer?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4RxighigSwiQAIAFXGAZwTIBtcBPAI1ygGsBZHfI04ADqkSIgA6Ua9Jqw4lBwkWIYs27AMp4UCOUMV6SBKlMYEkAc136AvpZE3hVkFaA)
  - [View the graphs schema](https://studio.apollographql.com/public/spotify-ev3of9/variant/prod/schema/reference)
  - 

### I want to re-create this demo in my GraphOS account 

*To be completed*

3. Create a [personal API key](https://www.apollographql.com/docs/graphos/org/account/#personal-api-keys)
4. Run the clone script withh the API key

```sh
APOLLO_KEY={YOUR_API_KEY} npm run clone
```

### I want to run this demo locally

3. Install dependencies

```sh
npm install
```

4. Start the app

```sh
npm start
```

* Website - http://localhost:3000
* Supergraph - http://localhost:4000
* Spotify Subgraph - http://localhost:4001
* Playback Subgraph - http://localhost:4002

***Note**: We're currently working on subscriptions support with `rover dev` so the Website is pointing at the deployed production url when running locally. You can change that to point at your local website but the playback state (i.e. playback time) won't refresh properly due to the subscriptions aspect. 

## Feedback survey

If you used the React + Apollo Spotify Showcase and have two minutes then we'd
really appreciate it if you filled out [this survey](https://o0urpu09l9p.typeform.com/to/SrKsN0nv) -
it really helps us improve!

## Exploring the codebase?

If you're exploring the codebase and not sure where to get started, try the
following:

**Client**

- [`client/src/router.tsx`](./client/src/router.tsx) - This defines all routes
  used in the app. To view the source code for a given route, follow the import
  for the route component.
- [`client/src/index.tsx`](./client/src/index.tsx) - This is the entry point to
  the client app. This defines the providers used in the app.

**Server**

- [`server.ts`](./server.ts) - This defines the Apollo GraphQL
  server used to serve the Spotify GraphQL schema.
- [`server/src/resolvers/`](./server/src/resolvers/) - This defines the
  resolvers used to resolve types and fields in the schema. The file names
  correspond to their respective types in the schema.
- [`server/src/dataSources/spotify.ts`](./server/src/dataSources/spotify.ts) -
  Defines the Spotify client used to make REST calls to Spotify's REST API.

## About

Apollo Client's newest features unlock powerful UI development capabilities when
used with React 18.  Using Suspense via `useSuspenseQuery` is one such
capability, as is `useBackgroundQuery`.  Both of these will be shipped in 3.8.0.
These hooks, along with the already-available `useFragment` hook and the GraphQL
`@defer` directive, comprise a toolkit for the UI developer to implement the
_render-as-you-fetch_ pattern throughout the component tree.

[@jerelmiller](https://github.com/jerelmiller) started building this application
while building `useSuspenseQuery` in an effort to dogfood the changes with a
non-trivial app. Apollo Client and GraphQL are built to be both approachable and
scalable; to-do apps are the former but not the latter. A Spotify clone - and it
really is a clone (👀 that CSS) - offered a much more robust proving ground for
the functionality we were building. As the team used it more and more, we
decided that if we open-sourced it then the community could use it to try things
out for themselves.

So, here you go!  It's our hope that you are able to use this app to do any or all
of these things:

* Listen to music 🎧
* Learn how to use React Suspense
* See how the features in Apollo Client 3.7 and 3.8 work
* Try the GraphQL `@defer` directive
* Experiment with GraphOS by turning a monograph into a supergraph
* Get some concrete code samples to inspire your own applications
* Use as a template for reporting bugs

## Maintainers

| Name               | Username                                       |
| ------------------ | ---------------------------------------------- |
| Ben Newman         | [@benjamn](https://github.com/benjamn)         |
| Alessia Bellisario | [@alessbell](https://github.com/alessbell)     |
| Jeff Auriemma      | [@bignimbus](https://github.com/bignimbus)     |
| Hugh Willson       | [@hwillson](https://github.com/hwillson)       |
| Jerel Miller       | [@jerelmiller](https://github.com/jerelmiller) |
| Lenz Weber-Tronic  | [@phryneas](https://github.com/phryneas)       |

## Spotify API + GraphQL

This app implements a GraphQL API on top of [Spotify's REST API](https://developer.spotify.com/documentation/web-api/).
The GraphQL server aims to mirror the REST API as much as possible, including
the field names and returned values. While it's tempting to patch the REST API in
areas that make it difficult to consume (such as a separate endpoint to check if
a track is in the user's library), this presented a good opportunity to showcase
how a developer can use Apollo Client's capabilities to effectively build an app
with these kinds of shortcomings.

There are, however, a few cases where the GraphQL API differs from the REST API.

- This Spotify GraphQL API returns full object types in some areas where Spotify
  returns "simplified" object types. For example, fetching a track via the
  `/tracks/:trackId` endpoint gives you the full track data, but fetching tracks
  through the `/albums/:albumId` endpoint gives you a simplified track type. In
  these cases, the GraphQL API consolidates these distinct types into a the full
  object type (i.e. `Track`.)

- Paginated fields use a Relay-style [connection type](https://relay.dev/graphql/connections.htm#sec-Connection-Types).
  This allows the GraphQL API to express edge-specific data and pagination
  information in a natural way.

- Endpoints that accept a `market` parameter are omitted in the equivalent
  GraphQL field. This is because, according to the documentation:

  > If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.

  The GraphQL server only works with authenticated users via an access
  token, so maintaining this parameter was unnecessary overhead.

- The GraphQL serves fields using camelCase. The Spotify REST API returns fields
  using snake_case. While not strictly enforced in the spec, GraphQL fields are
  commonly written in camelCase form.
