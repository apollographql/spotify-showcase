# Authorization Tutorial

How to use this project to demo router's [authorization features][authz docs].

## Overview

Authorization works in a few stages, starting with extracting claims. The router needs some claims in its request context in order to authorize requests—this happens automatically if using the [JWT][jwt docs] features, but Spotify tokens are not JWTs. So instead, we [add claims with a coprocessor][coprocessor docs].

Next, we need to add directives to the subgraph schemas which instruct the router on _how_ to enforce authorization for any given query. The `@authorized` directive just means that there are some claims in the context (the user is logged in), and the `@requiresScopes` directive lets us pick specific permissions that the user must have in order to access a field.

## Enabling the Coprocessor

There is already a coprocessor which integrates with the Spotify API in the `coprocessor` directory, we can run it with `docker compose` by editing `docker-compose.yml` to include both the `depends_on` line for the `coprocessor` service, and the `coprocessor` block itself (currently commented out).

We also need to tell the router to _use_ this coprocessor—we can do that by editing `router/router.yaml` and uncommenting both the `authorization` block (to enable auth features) and the `coprocessor` block (to enable the coprocessor).

## Enforcing Authorization

Now the router will receive claims from the coprocessor based on the Spotify token in the `authorization` header. All that's left to do is enforce permissions in the subgraph schemas.

We can add the `@authorized` directive to the `@link` import (which requires at least federation 2.5):

```graphql
# subgraphs/spotify/schema.graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.5"
    import: ["@key", "@shareable", "@tag", "@authenticated"]
  )
```

Then you can use this directive to require that the user is logged in to access a field:

```graphql 
# subgraphs/spotify/schema.graphql
type Query {
  me: CurrentUser! @authorized
}
```

Now, unless there is a valid Spotify token in the `Authorization` header, the `me` field will always resolve to `null` without even contacting the underlying subgraph! An appropriate, but relatively opaque error will be returned with the response.

## Checking permissions

To get more granular, we can use the `@requiresScopes` directive to require more specific permissions for a field. Our coprocessor currently adds the following scopes where relevant:

1. `spotify:premium` if the user has a premium subscription
2. `spotify:free` if the user has a free subscription
3. `country:{country_code}` if the user's country is known (for example `country:US`)
4. `apollo:employee` if the email ends in `@apollographql.com`

All of this information is derived from the Spotify token by default, but for ease of testing, `email` and `country` can be overridden with the `email` and `country` headers.

So, we can use some combinations of scopes to enforce difference combinations of permissions. For example:

```graphql
# subgraphs/spotify/schema.graphql
type Mutation {
    addItemToPlaybackQueue(
        input: AddItemToPlaybackQueueInput!
    ): AddItemToPlaybackQueuePayload @requiresScopes(scopes: [["spotify:premium", "country:US"]])
}
```

Will only allow the `addItemToPlaybackQueue` mutation to be called if the user has a premium subscription _and_ is in the US. We could also allow Apollo employees from outside the US to access this field by adding another set of scopes:

```graphql
# subgraphs/spotify/schema.graphql
type Mutation {
    addItemToPlaybackQueue(
        input: AddItemToPlaybackQueueInput!
    ): AddItemToPlaybackQueuePayload @requiresScopes(scopes: [["spotify:premium", "country:US"], ["spotify:premium", "apollo:employee"]])
}
```

Each array is an allowed combination of scopes, so the above means (`spotify:premium` AND `country:US`) OR (`spotify:premium` AND `apollo:employee`). We can also apply directives to types, and they'll required along with any field-level directives. So if we were okay with the entire `Mutation` type requiring premium, this would be equivalent (for this one field):

```graphql
# subgraphs/spotify/schema.graphql
type Mutation @requiresScopes(scopes: [["spotify:premium"]]) {
    addItemToPlaybackQueue(
        input: AddItemToPlaybackQueueInput!
    ): AddItemToPlaybackQueuePayload @requiresScopes(scopes: [["country:US"], ["apollo:employee"]])
}
```

Note that this applies cross-subgraph—so the `Mutation` type in the `playback` subgraph suddenly also requires `spotify:premium`!

[authz docs]: https://www.apollographql.com/docs/router/configuration/authorization
[jwt docs]: https://www.apollographql.com/docs/router/configuration/authn-jwt
[coprocessor docs]: https://www.apollographql.com/docs/router/customizations/coprocessor#adding-authorization-claims-via-coprocessor
