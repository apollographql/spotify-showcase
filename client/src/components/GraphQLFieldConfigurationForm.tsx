import { useState } from 'react';
import Button from './Button';
import FormField from './FormField';
import Form from './Form';
import Markdown from './Markdown';
import Select from './Select';
import { stripSingleLineBreak } from '../utils/common';
import { toPlainText } from '../utils/markdown';
import { SetNonNullable } from 'type-fest';
import {
  combine,
  validate,
  min,
  max,
  required,
  ValidationSchema,
} from '../utils/formValidation';

interface FormState {
  typename: string | null;
  fieldName: string | null;
  timeout: number | null;
  errorRate: number | null;
}

type SubmittedFormState = SetNonNullable<FormState, keyof FormState>;

interface SchemaType {
  name: string | null;
  fields: SchemaField[] | null;
}

interface SchemaField {
  name: string;
  description: string | null;
}

interface GraphQLFieldConfigurationFormProps {
  onSubmit: (state: SubmittedFormState) => void;
  types: SchemaType[];
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

const GraphQLFieldConfigurationForm = ({
  onSubmit,
  types,
}: GraphQLFieldConfigurationFormProps) => {
  const [state, setState] = useState<FormState>({
    typename: null,
    fieldName: null,
    timeout: null,
    errorRate: null,
  });

  const selectedType = types.find((type) => type.name === state.typename);
  const selectedField = selectedType?.fields?.find(
    (field) => field.name === state.fieldName
  );

  const handleChange = <
    TKey extends keyof FormState,
    TValue extends FormState[TKey]
  >(
    name: TKey,
    value: TValue
  ) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <Form<FormState, SubmittedFormState>
      initialValues={{
        typename: null,
        fieldName: null,
        timeout: null,
        errorRate: null,
      }}
      validate={(values) => {
        console.log('validate', {
          values,
          result: validate(values, validationSchema),
        });

        return validate(values, validationSchema);
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-8">
          <FormField name="typename" label="Type name">
            <Select
              id="typename"
              value={selectedType?.name ?? ''}
              onChange={(e) => {
                const schemaType = types.find(
                  (type) => type.name === e.target.value
                );

                if (schemaType) {
                  handleChange('typename', schemaType.name);
                  handleChange(
                    'fieldName',
                    schemaType.fields?.[0].name ?? null
                  );
                }
              }}
            >
              {!selectedType && <option>-- Select a typename --</option>}
              {types.map((type) => (
                <option key={type.name} value={type.name ?? ''}>
                  {type.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField name="fieldname" label="Field name">
            <Select
              id="fieldname"
              disabled={!selectedType}
              value={selectedField?.name ?? ''}
              onChange={(e) => {
                const field = selectedType?.fields?.find(
                  (field) => field.name === e.target.value
                );

                if (field) {
                  handleChange('fieldName', field.name);
                }
              }}
            >
              {!selectedField && <option>-- Select a field --</option>}
              {selectedType?.fields?.map((field) => (
                <option key={field.name} value={field.name}>
                  {field.name}
                </option>
              ))}
            </Select>
            {selectedField && selectedField.description && (
              <Markdown
                className="text-offwhite line-clamp-2 text-xs"
                title={getTitleFromMarkdown(selectedField.description ?? '')}
              >
                {selectedField.description}
              </Markdown>
            )}
          </FormField>
        </div>
        <Form.TextField
          label="Timeout (ms)"
          orientation="horizontal"
          description="The synthetic latency that will be applied when querying the field in milliseconds."
          name="timeout"
          type="int"
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
        <div className="flex justify-end">
          <Button type="submit" variant="hollow" size="xs">
            Add
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default GraphQLFieldConfigurationForm;
