export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const isPlainObject = (obj: any): obj is object => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

export const maybe = <T>(value: T | null | undefined): T | undefined => {
  return value ?? undefined;
};

type MaybeDeep<T> = T extends Record<any, any>
  ? { [K in keyof T]: Exclude<MaybeDeep<T[K]>, null> }
  : T;

export const maybeDeep = <T>(
  value: T | null | undefined
): MaybeDeep<T> | undefined => {
  if (value == null) {
    return;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, maybeDeep(value)])
    ) as MaybeDeep<T>;
  }

  return value as MaybeDeep<T>;
};
