// Taken from https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7
import { GraphQLScalarType, Kind } from 'graphql';
import { TimestampScalarConfig } from '../__generated__/resolvers-types';

const parseDate = (value: unknown) => {
  if (value === null) {
    return null;
  }

  try {
    return new Date(value as any);
  } catch (err) {
    return null;
  }
};

const config: TimestampScalarConfig = {
  name: 'Timestamp',
  description:
    'The date and time as number of milliseconds from start of UNIX epoch.',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }

    if (typeof value === 'number') {
      return Math.trunc(value);
    }

    if (typeof value === 'string') {
      return Date.parse(value);
    }

    return null;
  },
  parseValue: parseDate,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    if (ast.kind === Kind.STRING) {
      return parseDate(ast.value);
    }

    return null;
  },
};

export const Timestamp = new GraphQLScalarType(config);
