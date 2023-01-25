import { ReactNode } from 'react';
import cx from 'classnames';

interface FormFieldProps {
  children?: ReactNode;
  description?: string;
  id: string;
  label: string;
  orientation?: 'vertical' | 'horizontal';
}

const FormField = ({
  children,
  description,
  id,
  label,
  orientation = 'vertical',
}: FormFieldProps) => {
  return (
    <div
      className={cx('flex flex-1 gap-2', {
        'flex-col': orientation === 'vertical',
        'items-center justify-between': orientation === 'horizontal',
      })}
    >
      <div
        className={cx('flex flex-col gap-1', {
          'flex-1': orientation === 'horizontal',
        })}
      >
        <label htmlFor={id}>{label}</label>
        {description && (
          <span className="text-offwhite max-w-lg text-sm">{description}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormField;
