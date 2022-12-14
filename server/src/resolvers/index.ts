import fs from 'fs';
import path from 'path';

const IGNORED_FILES = [path.basename(__filename), 'types.ts', 'helpers.ts'];

const importResolver = (filename: string) =>
  require(path.resolve(__dirname, filename)).default;

const resolverName = (filename: string) =>
  path.basename(filename, path.extname(filename));

const resolvers = fs
  .readdirSync(__dirname)
  .filter((filename) => !IGNORED_FILES.includes(filename))
  .reduce(
    (resolvers, filename) => ({
      ...resolvers,
      [resolverName(filename)]: importResolver(filename),
    }),
    {}
  );

export default resolvers;
