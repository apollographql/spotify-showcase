import Button from './Button';
import Form from './Form';
import Markdown from './Markdown';
import { stripSingleLineBreak } from '../utils/common';
import { toPlainText } from '../utils/markdown';
import { Get, SetNonNullable } from 'type-fest';
import {
  combine,
  min,
  max,
  required,
  ValidationSchema,
} from '../utils/formValidation';
import useForm from '../hooks/useForm';
import { LimitedIntrospectionQuery, __TypeKind } from '../types/api';
import { useReadQuery } from "@apollo/client/react";
import type { QueryRef } from "@apollo/client/react";

type IntrospectionType = NonNullable<
  Get<LimitedIntrospectionQuery, '__schema.types[0]'>
>;

type IntrospectionField = NonNullable<Get<IntrospectionType, 'fields[0]'>>;

interface FormState {
  typename: string | null;
  fieldName: string | null;
  timeout: number;
  errorRate: number;
}

type SubmittedFormState = SetNonNullable<FormState, keyof FormState>;

interface SchemaSubType {
  name: string | null;
  kind: __TypeKind;
  ofType?: SchemaSubType | null;
}

interface SchemaField {
  fieldName: string;
  typename: string;
}

interface GraphQLFieldConfigurationFormProps {
  onCancel: () => void;
  onSubmit: (state: SubmittedFormState) => void;
  introspectionQueryRef: QueryRef<LimitedIntrospectionQuery>;
  configuredFields: SchemaField[];
}

const getTitleFromMarkdown = (markdown: string) => {
  return stripSingleLineBreak(toPlainText(markdown));
};

const validationSchema: ValidationSchema<FormState> = {
  typename: required('A type name must be selected'),
  fieldName: required('A field name must be selected'),
  timeout: combine(
    min(0, 'Timeout must be greater than or equal to 0'),
    required('The timeout must be configured')
  ),
  errorRate: combine(
    min(0, 'Error rate must be greater than or equal to 0'),
    max(1, 'Error rate must be less than or equal to 1'),
    required('The timeout must be configured')
  ),
};

export const typename = (type: SchemaSubType): string => {
  switch (type.kind) {
    case __TypeKind.NonNull:
      return typename(type.ofType!);
    case __TypeKind.List:
      return `${typename(type.ofType!)}[]`;
    default:
      return type.name ?? '';
  }
};

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

const GraphQLFieldConfigurationForm = ({
  onCancel,
  onSubmit,
  introspectionQueryRef,
  configuredFields,
}: GraphQLFieldConfigurationFormProps) => {
  const {
    data: { __schema },
  } = useReadQuery(introspectionQueryRef);

  const objectTypes = __schema.types
    .filter((type) => isObjectType(type) && !isIntrospectionSchemaType(type))
    .map((objectType) => ({
      ...objectType,
      fields: filterConfiguredFields(
        objectType.name ?? '',
        objectType.fields ?? [],
        configuredFields
      ),
    }))
    .filter((objectType) => objectType.fields?.length ?? 0 > 0);

  const form = useForm<FormState, SubmittedFormState>({
    initialValues: {
      typename: null,
      fieldName: null,
      timeout: 0,
      errorRate: 0,
    },
    onSubmit,
    validationSchema,
  });

  const selectedType = objectTypes.find(
    (type) => type.name === form.values.typename
  );
  const selectedField = selectedType?.fields?.find(
    (field) => field.name === form.values.fieldName
  );

  return (
    <Form<FormState> form={form}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-8">
          <Form.Select
            label="Type name"
            name="typename"
            onChange={(value) => {
              const type = objectTypes.find((type) => type.name === value);

              if (type) {
                form.setFieldValue('fieldName', type.fields?.[0]?.name ?? null);
              }
            }}
          >
            {!selectedType && <option>-- Select a typename --</option>}
            {objectTypes.map((type) => (
              <option key={type.name} value={type.name ?? ''}>
                {type.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            label="Field name"
            name="fieldName"
            disabled={!selectedType}
            description={
              selectedField && (
                <Markdown
                  className="text-offwhite line-clamp-2 text-xs"
                  title={getTitleFromMarkdown(selectedField.description ?? '')}
                >
                  {`\`${typename(selectedField.type)}\` ${
                    selectedField.description
                      ? ` - ${selectedField.description}`
                      : ''
                  }`}
                </Markdown>
              )
            }
          >
            {!selectedField && <option>-- Select a field --</option>}
            {selectedType?.fields?.map((field) => (
              <option key={field.name} value={field.name}>
                {field.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <Form.TextField
          label="Timeout (ms)"
          orientation="horizontal"
          description="The synthetic latency that will be applied when querying the field in milliseconds."
          name="timeout"
          type="number"
          placeholder="Enter a timeout"
          step={100}
          min={0}
        />
        <Form.TextField
          label="Error rate"
          description="Determines how often this field should return a synthetic error. This value should be between 0 and 1 where 0 returns no errors and 1 indicates an error is returned 100% of the time."
          orientation="horizontal"
          name="errorRate"
          type="float"
          placeholder="Enter an error rate"
          step={0.1}
          min={0}
          max={1}
          scale={2}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => {
              onCancel();
              form.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="secondary" size="xs">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default GraphQLFieldConfigurationForm;
