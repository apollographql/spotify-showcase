import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { ErrorRateScalarConfig } from './types';

const isValidValue = (errorRate: number) => errorRate >= 0 && errorRate <= 1;

const config: ErrorRateScalarConfig = {
  name: 'ErrorRate',
  description: 'The rate of error reflected as a number between 0 and 1',
  serialize(value) {
    if (typeof value !== 'number') {
      throw new GraphQLError('Provided value is not a number', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (!isValidValue(value)) {
      throw new GraphQLError('Provided value must be between 0 and 1', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    return value;
  },
  parseValue(value) {
    if (typeof value !== 'number') {
      throw new GraphQLError('Provided value is not a number', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    if (!isValidValue(value)) {
      throw new GraphQLError('Provided value must be between 0 and 1', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.FLOAT) {
      throw new GraphQLError('Provided value is not a number', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const value = parseFloat(ast.value);

    if (!isValidValue(value)) {
      throw new GraphQLError('Provided value must be between 0 and 1', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    return value;
  },
};

export default new GraphQLScalarType(config);
