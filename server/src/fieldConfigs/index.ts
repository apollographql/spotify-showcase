import { GraphQLResolveInfo } from 'graphql';
import { NullifyOptionalProperties } from '../utils/types';
import { FieldConfig, FieldConfigID, Config } from './fieldConfig';

interface SchemaField {
  typename: string;
  fieldName: string;
}

const configs: Record<FieldConfigID, FieldConfig> = {};

export const identify = {
  fromSchemaField: (schemaField: SchemaField): FieldConfigID =>
    `${schemaField.typename}.${schemaField.fieldName}`,

  fromResolverInfo: (info: GraphQLResolveInfo): FieldConfigID =>
    `${info.parentType.name}.${info.fieldName}`,
};

export const getFieldConfig = (id: FieldConfigID): FieldConfig => {
  return configs[id] ?? new FieldConfig(id);
};

export const resetFieldConfig = (id: FieldConfigID) => {
  const fieldConfig = configs[id] || new FieldConfig(id);

  configs[id] = fieldConfig.update({ timeout: 0, errorRate: 0 });

  return fieldConfig;
};

export const updateFieldConfig = (
  id: FieldConfigID,
  config: NullifyOptionalProperties<Partial<Config>>
) => {
  const fieldConfig = configs[id] || new FieldConfig(id);

  configs[id] = fieldConfig.update(config);

  return fieldConfig;
};
