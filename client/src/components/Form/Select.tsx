import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';
import cx from 'classnames';
import Field from './Field';
import { useField } from 'formik';

type ForwardedSelectProps = Omit<
  ComponentPropsWithoutRef<'select'>,
  'value' | 'onChange'
>;

interface SelectProps extends ForwardedSelectProps {
  description?: ReactNode;
  label: string;
  name: string;
  orientation?: 'vertical' | 'horizontal';
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      name,
      description,
      onChange,
      orientation = 'vertical',
      ...props
    },
    ref
  ) => {
    const [field] = useField(name);

    return (
      <Field orientation={orientation}>
        <label htmlFor={name}>{label}</label>
        <select
          {...field}
          {...props}
          ref={ref}
          onChange={(event) => {
            field.onChange(event);
            onChange?.(event.target.value);
          }}
          className={cx(
            className,
            'text-offwhite h-8 rounded bg-[#333] px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
        {orientation === 'vertical' && description && (
          <span className="text-offwhite text-sm">{description}</span>
        )}
      </Field>
    );
  }
);

export default Select;
