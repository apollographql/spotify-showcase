import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  SettingsQuery,
  SettingsQueryVariables,
  __TypeKind,
} from '../types/api';
import EditFieldConfigForm from '../components/EditFieldConfigForm';
import GraphQLFieldConfigurationForm from '../components/GraphQLFieldConfigurationForm';
import Page from '../components/Page';
import Skeleton from '../components/Skeleton';
import Text from '../components/Text';
import useUpdateFieldConfigMutation from '../mutations/useUpdateFieldConfigMutation';
import { BARE_INTROSPECTION_FRAGMENT } from '../utils/graphql';
import { Get } from 'type-fest';

type SchemaField = NonNullable<
  Get<SettingsQuery, 'developer.fieldConfigs[0].schemaField'>
>;

type IntrospectionType = NonNullable<Get<SettingsQuery, '__schema.types[0]'>>;
type IntrospectionField = NonNullable<Get<IntrospectionType, 'fields[0]'>>;

const SETTINGS_QUERY = gql`
  query SettingsQuery {
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

    ...BareIntrospectionFragment
  }

  ${BARE_INTROSPECTION_FRAGMENT}
`;

const isObjectType = (type: IntrospectionType) =>
  type.kind === __TypeKind.Object;

const isIntrospectionSchemaType = (type: IntrospectionType) =>
  Boolean(type.name?.startsWith('__'));

const filterConfiguredFields = (
  typename: string,
  fields: IntrospectionField[],
  configuredFields: SchemaField[]
) => {
  return fields.filter((field) => {
    return !configuredFields.some((schemaField) => {
      return (
        schemaField.fieldName === field.name &&
        schemaField.typename === typename
      );
    });
  });
};

const Settings = () => {
  const { data } = useSuspenseQuery<SettingsQuery, SettingsQueryVariables>(
    SETTINGS_QUERY
  );

  const [updateFieldConfig] = useUpdateFieldConfigMutation();

  const {
    __schema,
    developer: { fieldConfigs },
  } = data;

  const schemaFields = fieldConfigs.map((field) => field.schemaField);

  const objectTypes = __schema.types
    .filter((type) => isObjectType(type) && !isIntrospectionSchemaType(type))
    .map((objectType) => ({
      ...objectType,
      fields: filterConfiguredFields(
        objectType.name ?? '',
        objectType.fields ?? [],
        schemaFields
      ),
    }))
    .filter((objectType) => objectType.fields?.length ?? 0 > 0);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <h1>Settings</h1>
      <section>
        <h2 className="text-xl">GraphQL Field Configuration</h2>
        <Text as="p" color="muted" size="base" className="text-sm">
          Configure sythetic errors and timeouts for a GraphQL field. These are
          cleared each time the server is restarted.
        </Text>
        <div className="mt-4 mb-8 flex flex-col gap-4">
          {fieldConfigs.map((config) => {
            return (
              <EditFieldConfigForm
                key={[
                  config.schemaField.typename,
                  config.schemaField.fieldName,
                ].join('.')}
                fieldConfig={config}
                onSubmit={(values, { schemaField }) => {
                  return updateFieldConfig({
                    field: {
                      schemaField: {
                        fieldName: schemaField.fieldName,
                        typename: schemaField.typename,
                      },
                    },
                    config: values,
                  });
                }}
              />
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
