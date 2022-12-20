export const range = (start: number, end: number) => {
  return Array.from({ length: Math.max(end - start, 0) }, (_, i) => i + start);
};
