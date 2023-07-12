import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { CountryCodeScalarConfig } from '../__generated__/resolvers-types';

const isValidValue = (countryCode: string) => countryCode.length === 2;

const config: CountryCodeScalarConfig = {
  name: 'CountryCode',
  description: 'An ISO 3166-1 alpha-2 country code',
  serialize(value) {
    if (typeof value !== 'string') {
      throw new GraphQLError('Provided value is not a string', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (!isValidValue(value)) {
      throw new GraphQLError(
        'Provided value is not a 2-character country code',
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    return value;
  },
  parseValue(value) {
    if (typeof value !== 'string') {
      throw new GraphQLError('Provided value is not a string', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (!isValidValue(value)) {
      throw new GraphQLError(
        'Provided value is not a 2-character country code',
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Provided value is not a string', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (!isValidValue(ast.value)) {
      throw new GraphQLError(
        'Provided value is not a 2-character country code',
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    return ast.value;
  },
};

export const CountryCode = new GraphQLScalarType(config);
