import { readFile, writeFile } from 'fs/promises';
import { dump, load } from 'js-yaml';

import { gql } from 'graphql-tag';
import { printSchema } from 'graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolve } from 'path';

async function main() {
  const subgraph = process.argv[2];
  const subgraphFolder = resolve(__dirname, `..`, 'subgraphs', subgraph);
  const catalogInfoFile = resolve(subgraphFolder, 'catalog-info.yaml');
  const schema = await readFile(resolve(subgraphFolder, 'schema.graphql'), {
    encoding: 'utf-8',
  });
  const subgraphSchema = buildSubgraphSchema({ typeDefs: gql(schema) });
  const definition = printSchema(subgraphSchema);

  const catalogInfoContent = await readFile(catalogInfoFile, {
    encoding: 'utf-8',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catalogInfo = load(catalogInfoContent) as any;
  if (catalogInfo?.spec) {
    catalogInfo.spec.definition = definition;
    await writeFile(catalogInfoFile, dump(catalogInfo), {
      encoding: 'utf-8',
    });
  }
}

main();
