import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { SettingsQuery, SettingsQueryVariables } from '../types/api';
import GraphQLFieldConfigurationForm from '../components/GraphQLFieldConfigurationForm';
import Page from '../components/Page';
import Skeleton from '../components/Skeleton';
import Text from '../components/Text';
import useUpdateFieldConfigMutation from '../mutations/useUpdateFieldConfigMutation';

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    __schema {
      types {
        name
        kind
        fields {
          name
          description
        }
      }
    }
    developer {
      fieldConfigs {
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

const Settings = () => {
  const { data } = useSuspenseQuery<SettingsQuery, SettingsQueryVariables>(
    SETTINGS_QUERY
  );

  const [updateFieldConfig] = useUpdateFieldConfigMutation();

  const {
    __schema,
    developer: { fieldConfigs },
  } = data;

  const objectTypes = __schema.types.filter(
    (type) => type.kind === 'OBJECT' && !type.name?.startsWith('__')
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <h1>Settings</h1>
      <section>
        <h2 className="text-xl">GraphQL Field Configuration</h2>
        <Text as="p" color="muted" size="base" className="text-sm">
          Configure sythetic errors and timeouts for a GraphQL field. These are
          cleared each time the server is restarted.
        </Text>
        <div className="mt-4">
          {fieldConfigs.map((config) => {
            return (
              <div key={config.schemaField.fieldName}>
                {config.schemaField.typename}.{config.schemaField.fieldName}
              </div>
            );
          })}
        </div>
        <GraphQLFieldConfigurationForm
          types={objectTypes}
          onSubmit={(config) => {
            return updateFieldConfig({
              field: {
                schemaField: {
                  fieldName: config.fieldName,
                  typename: config.typename,
                },
              },
              config: {
                timeout: config.timeout,
                errorRate: config.errorRate,
              },
            });
          }}
        />
      </section>
    </div>
  );
};

export const LoadingState = () => {
  return (
    <Page>
      <Skeleton.Text />
    </Page>
  );
};

export default Settings;
