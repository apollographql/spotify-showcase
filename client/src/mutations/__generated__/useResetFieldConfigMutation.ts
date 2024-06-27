import * as Types from '../../types/globalTypes.codegen';

export type ResetFieldConfigMutationVariables = Types.Exact<{
  input: Types.ResetFieldConfigInput;
}>;

export type ResetFieldConfigMutation = {
  __typename: 'Mutation';
  resetFieldConfig: {
    __typename: 'ResetFieldConfigPayload';
    fieldConfig: {
      __typename: 'FieldConfig';
      schemaField: {
        __typename: 'SchemaField';
        fieldName: string;
        typename: string;
      };
    } | null;
  } | null;
};
