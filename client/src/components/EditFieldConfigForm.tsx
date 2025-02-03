import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import useForm from '../hooks/useForm';
import { combine, max, min, required } from '../utils/formValidation';
import Button from './Button';
import Form from './Form';
import useResetFieldConfigMutation from '../mutations/useResetFieldConfigMutation';

interface FieldConfig {
  errorRate: number;
  timeout: number;
  schemaField: {
    fieldName: string;
    typename: string;
  };
}

interface FormState {
  timeout: number;
  errorRate: number;
}

interface EditFieldConfigFormProps {
  fieldConfig: FieldConfig;
  onSubmit: (values: FormState, schemaField: FieldConfig) => void;
}

const EditFieldConfigForm = ({
  fieldConfig,
  onSubmit,
}: EditFieldConfigFormProps) => {
  const [resetFieldConfig] = useResetFieldConfigMutation();
  const { schemaField } = fieldConfig;
  const form = useForm({
    initialValues: {
      timeout: fieldConfig.timeout,
      errorRate: fieldConfig.errorRate,
    },
    validationSchema: {
      timeout: combine(
        min(0, 'Timeout must be greater than or equal to 0'),
        required('A timeout value must be set')
      ),
      errorRate: combine(
        min(0, 'Error rate must be greater than or equal to 0'),
        max(1, 'Error rate must be less than or equal to 1'),
        required('An error rate must be set')
      ),
    },
    onSubmit: (values) => onSubmit(values, fieldConfig),
  });

  return (
    <Form
      form={form}
      key={fieldConfig.schemaField.fieldName}
      className="border-b border-primary flex flex-col gap-px pb-4 last:border-b-0"
    >
      <code className="bg-surface mb-2 self-start rounded py-px px-1">
        {fieldConfig.schemaField.typename}.{fieldConfig.schemaField.fieldName}
      </code>
      <div className="flex items-center gap-4">
        <FieldValue
          id={`${schemaField.typename}-${schemaField.fieldName}-timeout`}
          name="timeout"
          label="Timeout (ms)"
          value={form.values.timeout}
          min={0}
          step={100}
          onSubmit={() => {
            void form.submitForm();
          }}
        />
        <FieldValue
          id={`${schemaField.typename}-${schemaField.fieldName}-errorRate`}
          name="errorRate"
          label="Error rate"
          value={form.values.errorRate}
          type="float"
          step={0.1}
          max={1}
          min={0}
          onSubmit={() => {
            void form.submitForm();
          }}
        />
        <div className="flex flex-1 justify-end">
          <Button
            type="button"
            size="xs"
            variant="hollow"
            onClick={() => {
              void resetFieldConfig({
                field: {
                  schemaField: {
                    fieldName: schemaField.fieldName,
                    typename: schemaField.typename,
                  },
                },
              });
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </Form>
  );
};

interface FieldValueProps {
  id: string;
  label: string;
  name: string;
  value: number;
  type?: 'number' | 'float';
  step?: number;
  max?: number;
  min?: number;
  onSubmit?: () => void;
}

const FieldValue = ({
  id,
  label,
  name,
  value,
  onSubmit,
  type = 'number',
  ...props
}: FieldValueProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  const handleSubmit = () => {
    onSubmit?.();
    setEditing(false);
  };

  const sharedClassNames = 'h-7 w-20 px-2 -ml-2';

  return (
    <div className="flex flex-col gap-px">
      <span className="text-muted text-xs">{label}</span>
      {editing ? (
        <Form.TextField
          {...props}
          id={id}
          ref={ref}
          name={name}
          onBlur={handleSubmit}
          className={sharedClassNames}
          type={type}
          size="sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      ) : (
        <div
          className={cx(
            'flex cursor-text items-center rounded text-sm duration-150 hover:bg-[#333]',
            sharedClassNames
          )}
          onClick={() => {
            setEditing(true);
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default EditFieldConfigForm;
