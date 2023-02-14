# <a href="https://www.apollographql.com/"><img src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" height="100" alt="Apollo Client"></a>

# React + Apollo Spotify Showcase

## Getting started

1. Clone this repo
2. Install dependencies

```sh
npm install
```

> NOTE: This will install dependencies on both the `client` and the `server`

3. Start the app

```sh
npm start
```

> NOTE: This will start both the client and the server. If you'd like to start
> each independently, `cd` into either the `client` or `server` directories and
> run `npm start`.

4. Visit `http://localhost:3000` and follow the instructions on the home page to
   ensure the app can talk to Spotify.

## Philosophy

This app implements a GraphQL API on top of [Spotify's REST API](https://developer.spotify.com/documentation/web-api/).
The GraphQL server aims to mirror the REST API as much as possible, including
the field names and returned values. While tempting to patch the REST API in
areas that make it difficult to consume (such as a separate endpoint to check if
a track is in the user's library), this presented a perfect opportunity to
showcase how a developer can use Apollo Client's capabilities to make the app.

There are, however, a few cases where the GraphQL API differs from the REST API.

- This Spotify GraphQL API returns full object types in some areas where spotify
  returns "simplified" object types in some of the endpoints. For example,
  fetching a track via the `/tracks/:trackId` endpoint gives you the full track
  data, but fetching tracks through the `/albums/:albumId` endpoint gives you a
  simplified track type. In these cases, the GraphQL API consolidates the type
  into a single `Track` type since GraphQL provides a nice way to express
  relationships between object types.

- Paginated fields use a Relay-style [connection type](https://relay.dev/graphql/connections.htm#sec-Connection-Types).
  This allows the GraphQL API to avoid the need to repeat field names and
  express edge-specific data in a natural way.

- Endpoints that accept a `market` parameter are omitted in the equivalent
  GraphQL field. This is because, according to the documentation:

  > If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.

  The GraphQL server only works with authenticated users via an access
  token, so maintaining this parameter was unnecessary overhead.

- The GraphQL serves fields using camelCase. The Spotify REST API returns fields
  using snake_case. While not strictly enforced in the spec, GraphQL fields are
  commonly written in camelCase form. This API follows suit.
