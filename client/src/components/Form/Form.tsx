import { ReactNode } from 'react';
import { FormikContext, FormikProps, FormikValues } from 'formik';
import Select from './Select';
import TextField from './TextField';

interface FormProps<TValues> {
  children: ReactNode;
  form: FormikProps<TValues>;
}

function Form<TValues extends FormikValues>({
  children,
  form,
}: FormProps<TValues>) {
  return (
    <FormikContext.Provider value={form}>
      <form onReset={form.handleReset} onSubmit={form.handleSubmit}>
        {children}
      </form>
    </FormikContext.Provider>
  );
}

Form.Select = Select;
Form.TextField = TextField;

export default Form;
