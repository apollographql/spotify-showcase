import { useRef } from 'react';
import { SetNonNullable } from 'type-fest';
import useForm from '../hooks/useForm';

import Form from '../components/Form/Form';

interface FormState {
  query: string;
}

type SubmittedFormState = SetNonNullable<FormState, keyof FormState>;

interface EditFieldConfigFormProps {
  initialValue: FormState['query'];
  onSubmit: (values: FormState) => void;
}

const SearchQueryForm = ({
  initialValue,
  onSubmit,
}: EditFieldConfigFormProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const form = useForm<FormState, SubmittedFormState>({
    initialValues: {
      query: initialValue,
    },
    validationSchema: {},
    onSubmit: (values) => onSubmit(values),
  });

  const handleSubmit = () => {
    form.submitForm();
  };

  return (
    <Form
      form={form}
      className="border-b border-primary flex flex-col gap-px pb-4 last:border-b-0"
    >
      <Form.TextField
        ref={inputRef}
        orientation="horizontal"
        name="query"
        type="text"
        className="w-1/3"
        onChange={handleSubmit}
        onSubmit={handleSubmit}
        placeholder="Who do you want to listen to?"
      />
    </Form>
  );
};

export default SearchQueryForm;
