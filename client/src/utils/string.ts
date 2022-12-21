export const pluralize = (singularWord: string, count: number) => {
  return count === 1 ? singularWord : `${singularWord}s`;
};
