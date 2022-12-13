import fs from 'fs';
import path from 'path';

const importResolver = (filename: string) =>
  require(path.resolve(__dirname, filename));

const resolverName = (filename: string) =>
  path.basename(filename, path.extname(filename));

const resolvers = fs
  .readdirSync(__dirname)
  .filter((filename) => filename !== path.basename(__filename))
  .reduce(
    (resolvers, filename) => ({
      ...resolvers,
      [resolverName(filename)]: importResolver(filename),
    }),
    {}
  );

export default resolvers;
