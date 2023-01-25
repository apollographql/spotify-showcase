import { useState } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { SettingsQuery, SettingsQueryVariables } from '../types/api';
import Page from '../components/Page';
import Select from '../components/Select';
import Skeleton from '../components/Skeleton';
import Text from '../components/Text';
import Markdown from '../components/Markdown';
import { stripSingleLineBreak } from '../utils/common';
import { toPlainText } from '../utils/markdown';
import { Get } from 'type-fest';

type SchemaType = NonNullable<Get<SettingsQuery, '__schema.types[0]'>>;
type SchemaField = NonNullable<
  Get<SettingsQuery, '__schema.types[0].fields[0]'>
>;

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
  const [selectedSchemaType, setSelectedSchemaType] = useState<SchemaType>();
  const [selectedSchemaField, setSelectedSchemaField] = useState<SchemaField>();
  const { data } = useSuspenseQuery<SettingsQuery, SettingsQueryVariables>(
    SETTINGS_QUERY
  );

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
        <div className="grid  grid-cols-2 gap-8">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="typename" className="text-sm">
              Type name
            </label>
            <Select
              id="typename"
              value={selectedSchemaType?.name ?? ''}
              onChange={(e) => {
                const schemaType = objectTypes.find(
                  (type) => type.name === e.target.value
                );

                if (schemaType) {
                  setSelectedSchemaType(schemaType);
                  setSelectedSchemaField(schemaType.fields?.[0]);
                }
              }}
            >
              {!selectedSchemaType && <option>-- Select a typename --</option>}
              {objectTypes.map((type) => (
                <option key={type.name} value={type.name ?? ''}>
                  {type.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="fieldname" className="text-sm">
              Field name
            </label>
            <Select
              id="fieldname"
              disabled={!selectedSchemaType}
              value={selectedSchemaField?.name ?? ''}
              onChange={(e) => {
                const field = selectedSchemaType?.fields?.find(
                  (field) => field.name === e.target.value
                );

                if (field) {
                  setSelectedSchemaField(field);
                }
              }}
            >
              {!selectedSchemaField && <option>-- Select a field --</option>}
              {selectedSchemaType?.fields?.map((field) => (
                <option value={field.name}>{field.name}</option>
              ))}
            </Select>
            {selectedSchemaField && (
              <Markdown
                className="text-offwhite line-clamp-2 text-xs"
                title={getTitleFromMarkdown(
                  selectedSchemaField.description ?? ''
                )}
              >
                {selectedSchemaField.description ?? ''}
              </Markdown>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const getTitleFromMarkdown = (markdown: string) => {
  return stripSingleLineBreak(toPlainText(markdown));
};

export const LoadingState = () => {
  return (
    <Page>
      <Skeleton.Text />
    </Page>
  );
};

export default Settings;
