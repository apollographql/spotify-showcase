import { gql, useMutation } from '@apollo/client';
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
      return execute({ variables: { input } });
    },
    [execute]
  );

  return [updateFieldConfig, result] as const;
};

export default useUpdateFieldConfigMutation;
