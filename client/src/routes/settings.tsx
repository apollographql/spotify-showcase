import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  SettingsQuery,
  SettingsQueryVariables,
  __TypeKind,
} from '../types/api';
import Button from '../components/Button';
import EditFieldConfigForm from '../components/EditFieldConfigForm';
import GraphQLFieldConfigurationForm from '../components/GraphQLFieldConfigurationForm';
import Page from '../components/Page';
import Skeleton from '../components/Skeleton';
import useUpdateFieldConfigMutation from '../mutations/useUpdateFieldConfigMutation';
import { BARE_INTROSPECTION_FRAGMENT } from '../utils/graphql';
import { Get } from 'type-fest';
import { useState } from 'react';
import useSetBackgroundColor from '../hooks/useSetBackgroundColor';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';

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

export const RouteComponent = () => {
  useSetBackgroundColor(DEFAULT_BACKGROUND_COLOR);

  const { data } = useSuspenseQuery<SettingsQuery, SettingsQueryVariables>(
    SETTINGS_QUERY
  );

  const [updateFieldConfig] = useUpdateFieldConfigMutation();
  const [isAddingNewFieldConfig, setIsAddingNewFieldConfig] = useState(false);

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
    <Page className="mx-auto w-full max-w-4xl gap-6 py-8">
      <h1>Settings</h1>
      <section>
        <h2 className="text-xl">GraphQL Field Configuration</h2>
        <p className="mb-4 text-sm text-muted">
          Configure sythetic errors and timeouts for a GraphQL field. These are
          cleared each time the server is restarted.
        </p>
        {fieldConfigs.length > 0 ? (
          <div className="border-b border-primary mb-8 flex flex-col gap-4">
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
        ) : !isAddingNewFieldConfig ? (
          <div className="mt-12 flex flex-col pl-12">
            <h3 className="text-md text-2xl">All set!</h3>
            <p className="text-offwhite mb-6 text-sm">
              There are no fields configured with synthetic errors or timeouts.
              Click the button below to configure a field.
            </p>
            <div>
              <Button
                variant="hollow"
                size="xs"
                onClick={() => setIsAddingNewFieldConfig(true)}
              >
                Configure field
              </Button>
            </div>
          </div>
        ) : null}
        {isAddingNewFieldConfig ? (
          <GraphQLFieldConfigurationForm
            types={objectTypes}
            onCancel={() => setIsAddingNewFieldConfig(false)}
            onSubmit={async (config) => {
              await updateFieldConfig({
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

              setIsAddingNewFieldConfig(false);
            }}
          />
        ) : fieldConfigs.length > 0 ? (
          <div className="flex justify-end">
            <Button
              variant="hollow"
              size="xs"
              onClick={() => setIsAddingNewFieldConfig(true)}
            >
              Add field
            </Button>
          </div>
        ) : null}
      </section>
    </Page>
  );
};

export const LoadingState = () => {
  return (
    <Page>
      <Skeleton.Text />
    </Page>
  );
};
