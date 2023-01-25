export type Validator<TValue> = (value: TValue) => string | string[] | void;
export type ValidationSchema<TValues> = Partial<{
  [K in keyof TValues]: Validator<TValues[K]>;
}>;

export const combine = <TValue>(
  ...validators: Validator<TValue>[]
): Validator<TValue> => {
  return (value) => {
    return validators.reduce<string[] | void>((messages, validator) => {
      const messageOrMessages = validator(value);

      return messageOrMessages
        ? (messages ?? []).concat(messageOrMessages)
        : messages;
    }, undefined);
  };
};

export const min = (min: number, message: string): Validator<number | null> => {
  return (value) => {
    if (value != null && value < min) {
      return message;
    }
  };
};

export const required = (message: string): Validator<unknown> => {
  return (value) => {
    if (typeof value === 'string' && value === '') {
      return message;
    }

    if (value == null) {
      return message;
    }
  };
};

export const validate = <TValues>(
  values: TValues,
  schema: ValidationSchema<TValues>
) => {
  return Object.keys(schema).reduce<Record<string, string[]>>((errors, key) => {
    const validator = schema[key as keyof typeof schema];
    const value = values[key as keyof typeof values];
    const messageOrMessages = validator?.(value);

    if (!messageOrMessages) {
      return errors;
    }

    return {
      ...errors,
      [key]: Array.isArray(messageOrMessages)
        ? messageOrMessages
        : [messageOrMessages],
    };
  }, {});
};
