export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const isPlainObject = (obj: any): obj is object => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};
