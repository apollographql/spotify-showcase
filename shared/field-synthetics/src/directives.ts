import { gql } from 'graphql-tag';
import { readFileSync } from 'node:fs';

export const syntheticsDirective = gql(
  readFileSync('./schema.graphql', { encoding: 'utf8' })
);
