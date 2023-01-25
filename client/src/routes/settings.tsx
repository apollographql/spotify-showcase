import { ReactNode, useState } from 'react';
import cx from 'classnames';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { SettingsQuery, SettingsQueryVariables } from '../types/api';
import Button from '../components/Button';
import Page from '../components/Page';
import Select from '../components/Select';
import Skeleton from '../components/Skeleton';
import Text from '../components/Text';
import TextField from '../components/TextField';
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
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-8">
            <FormField id="typename" label="Type name">
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
                {!selectedSchemaType && (
                  <option>-- Select a typename --</option>
                )}
                {objectTypes.map((type) => (
                  <option key={type.name} value={type.name ?? ''}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField id="fieldname" label="Field name">
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
                  <option key={field.name} value={field.name}>
                    {field.name}
                  </option>
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
            </FormField>
          </div>
          <FormField
            id="timeout"
            label="Timeout (ms)"
            orientation="horizontal"
            description="The synthetic latency that will be applied when querying the field in milliseconds."
          >
            <TextField
              id="timeout"
              type="number"
              placeholder="Enter a timeout"
              step={100}
              className="min-w-[200px]"
            />
          </FormField>
          <FormField
            id="errorRate"
            label="Error rate"
            orientation="horizontal"
            description="Determines how often this field should return a synthetic error. This value should be between 0 and 1 where 0 returns no errors and 1 indicates an error is returned 100% of the time."
          >
            <TextField
              id="errorRate"
              type="number"
              placeholder="Enter an error rate"
              step={0.1}
              min={0}
              max={1}
              className="min-w-[200px]"
            />
          </FormField>
          <div className="flex justify-end">
            <Button variant="hollow" size="xs">
              Add
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FormFieldProps {
  children?: ReactNode;
  description?: string;
  id: string;
  label: string;
  orientation?: 'vertical' | 'horizontal';
}

const FormField = ({
  children,
  description,
  id,
  label,
  orientation = 'vertical',
}: FormFieldProps) => {
  return (
    <div
      className={cx('flex flex-1 gap-2', {
        'flex-col': orientation === 'vertical',
        'items-center justify-between': orientation === 'horizontal',
      })}
    >
      <div
        className={cx('flex flex-col gap-1', {
          'flex-1': orientation === 'horizontal',
        })}
      >
        <label htmlFor={id}>{label}</label>
        {description && (
          <span className="text-offwhite max-w-lg text-sm">{description}</span>
        )}
      </div>
      {children}
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
