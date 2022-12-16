import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { DateTimeScalarConfig } from './types';
import { parseISO } from 'date-fns';

const config: DateTimeScalarConfig = {
  name: 'DateTime',
  description: 'An ISO-8601 date string',
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }

    throw new GraphQLError('Provided value must be a Date', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  },
  parseValue(value) {
    if (typeof value === 'string') {
      return parseISO(value);
    }

    throw new GraphQLError(
      'Provided value is not a valid ISO-8601 date string',
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return parseISO(ast.value);
    }

    throw new GraphQLError(
      'Provided value is not a valid ISO-8601 date string',
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  },
};

export default new GraphQLScalarType(config);
