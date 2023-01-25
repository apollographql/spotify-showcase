import { ReactNode } from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';
import TextField from './TextField';

type ForwardedFormikProps<TValues> = Pick<
  FormikConfig<TValues>,
  'initialValues' | 'validate'
>;

interface FormProps<TValues, TSubmittedValues extends TValues = TValues>
  extends ForwardedFormikProps<TValues> {
  children: ReactNode;
  onSubmit: (values: TSubmittedValues) => void | Promise<unknown>;
}

function Form<
  TValues extends FormikValues,
  TSubmittedValues extends TValues = TValues
>({ children, onSubmit, ...props }: FormProps<TValues, TSubmittedValues>) {
  return (
    <Formik
      {...props}
      onSubmit={(values) => onSubmit(values as TSubmittedValues)}
      enableReinitialize={true}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit }) => {
        return <form onSubmit={handleSubmit}>{children}</form>;
      }}
    </Formik>
  );
}

Form.Select = Select;
Form.TextField = TextField;

export default Form;
