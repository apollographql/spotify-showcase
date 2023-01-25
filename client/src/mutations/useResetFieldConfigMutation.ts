import { gql, useMutation } from '@apollo/client';
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
        timeout
        errorRate
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
      return execute({ variables: { input } });
    },
    [execute]
  );
  return [resetFieldConfig, result] as const;
};

export default useResetFieldConfigMutation;
