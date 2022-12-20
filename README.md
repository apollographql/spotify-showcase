# React + Apollo w/ Spotify API demo

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

## Adding synthetic errors or timeouts for a field

This demo app has the ability to add synthetic timeouts and errors for a field.
To add or remove them, use the `updateFieldConfig` or `resetFieldConfig`
mutations.

You can use the Apollo Studio explorer at http://localhost:4000/graphql to run
these mutations.

```graphql
mutation ($config: FieldConfigInput!, $field: FieldInput!) {
  updateFieldConfig(config: $config, field: $field) {
    fieldConfig {
      schemaField {
        typename
        fieldName
      }
      errorRate
      timeout
    }
  }
}
```

Sample `variables`:

```json
{
  "config": {
    "timeout": 2000,
    "errorRate": 0.1
  },
  "field": {
    "schemaField": {
      "typename": "Query",
      "fieldName": "playlist"
    }
  }
}
```

To reset a field back to its defaults (no synthetic errors or timeouts), use the
`resetFieldConfig` mutation:

```graphql
mutation ($field: FieldInput!) {
  resetFieldConfig(field: $field) {
    fieldConfig {
      schemaField {
        typename
        fieldName
      }
      errorRate
      timeout
    }
  }
}
```

Sample `variables`:

```json
{
  "field": {
    "schemaField": {
      "typename": "Query",
      "fieldName": "playlist"
    }
  }
}
```
