import { ReactNode } from 'react';
import { FormikContext, FormikProps, FormikValues } from 'formik';
import Select from './Select';
import TextField from './TextField';

interface FormProps<TValues> {
  className?: string;
  children: ReactNode;
  form: FormikProps<TValues>;
}

function Form<TValues extends FormikValues>({
  className,
  children,
  form,
}: FormProps<TValues>) {
  return (
    <FormikContext.Provider value={form}>
      <form
        className={className}
        onReset={form.handleReset}
        onSubmit={form.handleSubmit}
      >
        {children}
      </form>
    </FormikContext.Provider>
  );
}

Form.Select = Select;
Form.TextField = TextField;

export default Form;
