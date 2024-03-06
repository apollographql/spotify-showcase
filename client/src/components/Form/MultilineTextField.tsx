import cx from 'classnames';
import { useField } from 'formik';
import { ComponentPropsWithoutRef } from 'react';
import Field from './Field';

type ForwardedTextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value'
>;

interface MultilineTextFieldProps extends ForwardedTextareaProps {
  label?: string;
  name: string;
  description?: string;
  size?: 'sm' | 'md';
  containerClassName?: string;
}

const MultilineTextField = ({
  className,
  containerClassName,
  name,
  description,
  label,
  size = 'md',
  ...rest
}: MultilineTextFieldProps) => {
  const [field] = useField({ name });

  return (
    <Field className={containerClassName} orientation="vertical">
      {(label || description) && (
        <div className="flex flex-col gap-1">
          {label && <label htmlFor={name}>{label}</label>}
          {description && (
            <span className="text-offwhite max-w-lg text-sm">
              {description}
            </span>
          )}
        </div>
      )}
      <textarea
        {...rest}
        {...field}
        value={field.value ?? ''}
        className={cx(
          className,
          'rounded bg-[#333] text-sm text-white disabled:cursor-not-allowed disabled:opacity-50',
          {
            'px-4 py-2': size === 'md',
            'p-2': size === 'sm',
          }
        )}
      />
    </Field>
  );
};

export default MultilineTextField;
