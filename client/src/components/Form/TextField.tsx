import { forwardRef, ChangeEvent, ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';
import { useField } from 'formik';
import { clamp, omit } from 'lodash';
import { parseFloatValue, parseIntValue } from '../../utils/form';
import Field from './Field';

type ForwardedInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'value'
>;

// Props allowed with specific input types
interface InputTypeSpecificProps {
  float: {
    scale?: number;
  };
}

type TextFieldTypeProps = {
  [Type in TextFieldType]: Type extends keyof InputTypeSpecificProps
    ? { type?: Type } & InputTypeSpecificProps[Type]
    : { type?: Type };
}[TextFieldType];

type TextFieldType = 'text' | 'int' | 'float';

// Allow numbers to have partially typed negative number or empty string
type PartialNumberValue = '' | '-';

type TextFieldValueByType = {
  text: string;
  int: number | PartialNumberValue;
  float: number | PartialNumberValue;
};

interface BaseTextFieldProps extends ForwardedInputProps {
  label: string;
  name: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
}

type TextFieldProps = TextFieldTypeProps & BaseTextFieldProps;

const REMAPPED_TYPES: Partial<Record<TextFieldType, string>> = {
  int: 'number',
  float: 'number',
};

type Parser<Type extends TextFieldType> = (
  event: ChangeEvent<HTMLInputElement>,
  props: BaseTextFieldProps & Extract<TextFieldTypeProps, { type?: Type }>
) => TextFieldValueByType[Type];

type ParsersMap = {
  [Type in TextFieldType]?: Parser<Type>;
};

const parsers: ParsersMap = {
  int: (event) => {
    const min = event.target.min ? parseFloat(event.target.min) : -Infinity;
    const max = event.target.max ? parseFloat(event.target.max) : Infinity;
    const value = parseIntValue(event.target.value);

    return typeof value === 'number' ? clamp(value, min, max) : value;
  },
  float: (event, { scale }) => {
    const min = event.target.min ? parseFloat(event.target.min) : -Infinity;
    const max = event.target.max ? parseFloat(event.target.max) : Infinity;
    const value = parseFloatValue(event.target.value, { scale });

    return typeof value === 'number' ? clamp(value, min, max) : value;
  },
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    description,
    label,
    name,
    type = 'text',
    orientation = 'vertical',
    ...rest
  } = props;
  const inputType = REMAPPED_TYPES[type] || type;
  const parser = parsers[type];
  const [field, , { setValue }] = useField({ name, type: inputType });

  return (
    <Field orientation={orientation}>
      <div
        className={cx('flex flex-col gap-1', {
          'flex-1': orientation === 'horizontal',
        })}
      >
        <label htmlFor={name}>{label}</label>
        {description && (
          <span className="text-offwhite max-w-lg text-sm">{description}</span>
        )}
      </div>
      <input
        {...field}
        {...omit(rest, 'scale')}
        ref={ref}
        type={inputType}
        value={field.value ?? ''}
        className={cx(
          'h-10 rounded bg-[#333] px-4 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50',
          { 'min-w-[200px]': orientation === 'horizontal' }
        )}
        onChange={(event) => {
          if (parser) {
            return setValue(parser(event, omit(props, ['type'])));
          }
        }}
      />
    </Field>
  );
});

export default TextField;
