export const parseFloatValue = (
  value: string,
  { scale }: { scale?: number } = {}
) => {
  if (value === '') {
    return '';
  }

  if (value === '-') {
    return '-';
  }

  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) {
    return '';
  }

  return scale == null ? parsedValue : Number(parsedValue.toFixed(scale));
};

export const parseIntValue = (value: string) => {
  if (value === '') {
    return '';
  }

  if (value === '-') {
    return '-';
  }

  const parsedValue = parseInt(value, 10);

  return isNaN(parsedValue) ? '' : parsedValue;
};
