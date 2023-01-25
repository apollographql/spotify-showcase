import { useFormik, FormikConfig, FormikValues } from 'formik';
import { validate, ValidationSchema } from '../utils/formValidation';

interface Options<TValues, TSubmittedValues>
  extends Pick<FormikConfig<TValues>, 'initialValues'> {
  validationSchema?: ValidationSchema<TValues>;
  onSubmit: (values: TSubmittedValues) => void | Promise<unknown>;
}

const useForm = <
  TValues extends FormikValues,
  TSubmittedValues extends TValues = TValues
>({
  onSubmit,
  validationSchema,
  ...options
}: Options<TValues, TSubmittedValues>) => {
  return useFormik({
    ...options,
    validate: (values) => {
      if (validationSchema) {
        return validate(values, validationSchema);
      }
    },
    onSubmit: (values) => onSubmit(values as TSubmittedValues),
    enableReinitialize: false,
    validateOnBlur: false,
    validateOnChange: false,
  });
};

export default useForm;
