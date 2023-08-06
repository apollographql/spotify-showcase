import { GraphQLSchema, defaultFieldResolver } from 'graphql';
import { mapSchema, MapperKind } from '@graphql-tools/utils';
import { wrapWithSynthetics } from './wrapWithSynthetics';

export function addSyntheticsToSchema(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const { resolve = defaultFieldResolver } = fieldConfig;

      return {
        ...fieldConfig,
        resolve: wrapWithSynthetics(resolve),
      };
    },
  });
}
