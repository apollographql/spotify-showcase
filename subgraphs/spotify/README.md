# Apollo Server Typescript Subgraph Template

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/WdJd2w?referralCode=xsbY2R)

This template can be used to quickly create an [Apollo Federation] subgraph with the [@apollo/subgraph] and [@apollo/server] packages. You can use this template from [Rover](https://www.apollographql.com/docs/rover/commands/template/) with `rover template use --template subgraph-typescript-apollo-server`.

## What's Included

- A basic, [Apollo Federation] subgraph with simple examples for queries, entities, and mutations. You can run this subgraph with `npm start`.
- [nodemon] is setup for `npm run dev` for a hot-reloading development environment.
- Example tests in the `src/__tests__` directory. You can run these tests with `npm run test`.
- GitHub Actions workflows which will:
  - Run `npm run test` on every push.
  - Check the schema against Apollo Studio on every push.
  - Publish the subgraph to Apollo Studio on every push to the `main` branch.
- [GraphQL Code Generator] pre-configured as a `build` step.

## Next Steps

- Setup project with `npm install`
  - This will also run the `postinstall` script which will run `codegen` and compile the project
- Download [Rover] and start it using the command printed out from `cargo run` to start a local version of Apollo Explorer.
- Replace "name" in `package.json` with the name of your subgraph.
- Start filling in your own schema in `schema.graphql`.
- Start filling in your own types and resolvers in `src/resolvers`.
- Set these secrets in GitHub Actions to enable all checks:
  - `APOLLO_KEY`: An Apollo Studio API key for the supergraph to enable schema checks and publishing of the subgraph.
  - `APOLLO_GRAPH_REF`: The name of the supergraph in Apollo Studio.
  - `PRODUCTION_URL`: The URL of the deployed subgraph that the supergraph gateway will route to.
- Remove the if: false lines from .github/workflows/checks.yaml and .github/workflows/deploy.yaml to enable schema checks and publishing.
- Write your custom deploy logic in `.github/workflows/deploy.yaml`.
- Send the Router-Authorization header [from your Cloud router](https://www.apollographql.com/docs/graphos/routing/cloud-configuration#managing-secrets) and set the ROUTER_SECRET environment variable wherever you deploy this to.

[apollo federation]: https://www.apollographql.com/docs/federation/
[@apollo/server]: https://www.apollographql.com/docs/apollo-server/
[@apollo/subgraph]: https://www.apollographql.com/docs/federation/subgraphs
[rover]: https://www.apollographql.com/docs/rover/
[nodemon]: https://www.npmjs.com/package/nodemon
[GraphQL Code Generator]: https://www.the-guild.dev/graphql/codegen
