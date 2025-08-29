import { gql, TypedDocumentNode } from '@apollo/client';
import { useBackgroundQuery, useSuspenseQuery } from '@apollo/client/react';
import {
  LimitedIntrospectionQuery,
  SettingsQuery,
  SettingsQueryVariables,
} from '../types/api';
import Button from '../components/Button';
import EditFieldConfigForm from '../components/EditFieldConfigForm';
import GraphQLFieldConfigurationForm from '../components/GraphQLFieldConfigurationForm';
import Page from '../components/Page';
import Skeleton from '../components/Skeleton';
import useUpdateFieldConfigMutation from '../mutations/useUpdateFieldConfigMutation';
import { useState } from 'react';
import AppSettingsForm from '../components/AppSettingsForm';

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
  }
`;

const LIMITED_INTROSPECTION_QUERY: TypedDocumentNode<
  LimitedIntrospectionQuery,
  Record<string, never>
> = gql`
  query LimitedIntrospectionQuery {
    __schema {
      types {
        name
        kind
        fields {
          name
          description
          type {
            ...TypeRef
          }
        }
      }
    }
  }

  # eslint-disable-next-line @graphql-eslint/naming-convention
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const RouteComponent = () => {
  const [queryRef] = useBackgroundQuery(LIMITED_INTROSPECTION_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const { data } = useSuspenseQuery<SettingsQuery, SettingsQueryVariables>(
    SETTINGS_QUERY
  );

  const [updateFieldConfig] = useUpdateFieldConfigMutation();
  const [isAddingNewFieldConfig, setIsAddingNewFieldConfig] = useState(false);

  const {
    developer: { fieldConfigs },
  } = data;

  const schemaFields = fieldConfigs.map((field) => field.schemaField);

  return (
    <Page className="mx-auto w-full max-w-4xl gap-4 py-8">
      <h1>Settings</h1>
      <div className="flex flex-col gap-16">
        <section>
          <h2>App configuration</h2>
          <p className="mb-4 text-sm text-muted">Configure app settings.</p>
          <AppSettingsForm />
        </section>
        <section>
          <h2>GraphQL Field Configuration</h2>
          <p className="mb-4 text-sm text-muted">
            Configure synthetic errors and timeouts for a GraphQL field. These
            are cleared each time the server is restarted.
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
                      void updateFieldConfig({
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
              <h3>All set!</h3>
              <p className="text-offwhite mb-6 text-sm">
                There are no fields configured with synthetic errors or
                timeouts. Click the button below to configure a field.
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
              introspectionQueryRef={queryRef}
              configuredFields={schemaFields}
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
      </div>
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
