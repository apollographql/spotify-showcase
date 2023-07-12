import { gql, Reference, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import {
  ResetFieldConfigInput,
  ResetFieldConfigMutation,
  ResetFieldConfigMutationVariables,
} from '../types/api';

const RESET_FIELD_CONFIG_MUTATION = gql`
  mutation ResetFieldConfigMutation($input: ResetFieldConfigInput!) {
    resetFieldConfig(input: $input) {
      fieldConfig {
        schemaField {
          fieldName
          typename
        }
      }
    }
  }
`;

const useResetFieldConfigMutation = () => {
  const [execute, result] = useMutation<
    ResetFieldConfigMutation,
    ResetFieldConfigMutationVariables
  >(RESET_FIELD_CONFIG_MUTATION);

  const resetFieldConfig = useCallback(
    (input: ResetFieldConfigInput) => {
      return execute({
        variables: { input },
        update: (cache, { data }) => {
          if (!data?.resetFieldConfig?.fieldConfig) {
            return;
          }
          const {
            fieldConfig: { schemaField },
          } = data.resetFieldConfig;

          cache.modify({
            id: cache.identify({ __typename: 'Developer' }),
            fields: {
              fieldConfigs: (existing: readonly Reference[], { readField }) => {
                return existing.filter((ref) => {
                  const schemaFieldRef = readField<Reference>(
                    'schemaField',
                    ref
                  );

                  return (
                    readField('fieldName', schemaFieldRef) !==
                      schemaField.fieldName ||
                    readField('typename', schemaFieldRef) !==
                      schemaField.typename
                  );
                });
              },
            },
          });
        },
      });
    },
    [execute]
  );
  return [resetFieldConfig, result] as const;
};

export default useResetFieldConfigMutation;
