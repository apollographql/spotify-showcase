import { gql, useMutation, Reference } from '@apollo/client';
import { useCallback } from 'react';
import {
  UpdateFieldConfigInput,
  UpdateFieldConfigMutation,
  UpdateFieldConfigMutationVariables,
} from '../types/api';

const UPDATE_FIELD_CONFIG_MUTATION = gql`
  mutation UpdateFieldConfigMutation($input: UpdateFieldConfigInput!) {
    updateFieldConfig(input: $input) {
      fieldConfig {
        schemaField {
          fieldName
          typename
        }
        timeout
        errorRate
      }
    }
  }
`;

const useUpdateFieldConfigMutation = () => {
  const [execute, result] = useMutation<
    UpdateFieldConfigMutation,
    UpdateFieldConfigMutationVariables
  >(UPDATE_FIELD_CONFIG_MUTATION);

  const updateFieldConfig = useCallback(
    (input: UpdateFieldConfigInput) => {
      return execute({
        variables: { input },
        update: (cache, { data }) => {
          if (!data?.updateFieldConfig || !data.updateFieldConfig.fieldConfig) {
            return;
          }

          const { fieldConfig } = data.updateFieldConfig;

          cache.modify({
            id: cache.identify({ __typename: 'Developer' }),
            fields: {
              fieldConfigs: (existing: Reference[] = [], { readField }) => {
                const exists = existing.some((ref) => {
                  const { schemaField } = fieldConfig;
                  const schemaFieldRef = readField<Reference>(
                    'schemaField',
                    ref
                  );

                  return (
                    readField('fieldName', schemaFieldRef) ===
                      schemaField.fieldName &&
                    readField('typename', schemaFieldRef) ===
                      schemaField.typename
                  );
                });

                return exists ? existing : [...existing, fieldConfig];
              },
            },
          });
        },
      });
    },
    [execute]
  );

  return [updateFieldConfig, result] as const;
};

export default useUpdateFieldConfigMutation;
