import { GraphQLSchema, defaultFieldResolver } from 'graphql';
import { addResolversToSchema } from '@graphql-tools/schema';
import { mapSchema, MapperKind } from '@graphql-tools/utils';
import { wrapWithSynthetics } from './wrapWithSynthetics';
import { ErrorRate } from './scalars';

export function addSyntheticsToSchema(schema: GraphQLSchema) {
  return wrapSchemaFieldsWithSynthetics(addScalarsToSchema(schema));
}

function wrapSchemaFieldsWithSynthetics(schema: GraphQLSchema) {
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

function addScalarsToSchema(schema: GraphQLSchema) {
  return addResolversToSchema({ schema, resolvers: { ErrorRate } });
}
