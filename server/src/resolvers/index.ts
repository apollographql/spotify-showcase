import fs from 'fs';
import path from 'path';
import { Resolver } from './types';
import { wrap } from './helpers';

type EnumResolver = Record<string, string>;
type ResolverMap = Record<string, EnumResolver | Resolver<unknown>>;
type Resolvers = Record<string, ResolverMap>;

const IGNORED_FILES = [
  path.basename(__filename),
  'default.ts',
  'types.ts',
  'helpers.ts',
  'mappers.ts',
];

const importResolver = (filename: string) =>
  require(path.resolve(__dirname, filename)).default as ResolverMap;

const resolverName = (filename: string) =>
  path.basename(filename, path.extname(filename));

const wrapTypeResolvers = (typeResolvers: ResolverMap) => {
  return Object.fromEntries(
    Object.entries(typeResolvers).map(([key, resolver]) => [
      key,
      typeof resolver === 'function' ? wrap(resolver) : resolver,
    ])
  );
};

const resolvers: Resolvers = fs
  .readdirSync(__dirname)
  .filter((filename) => !IGNORED_FILES.includes(filename))
  .reduce(
    (resolvers, filename) => ({
      ...resolvers,
      [resolverName(filename)]: wrapTypeResolvers(importResolver(filename)),
    }),
    {}
  );

export default resolvers;
