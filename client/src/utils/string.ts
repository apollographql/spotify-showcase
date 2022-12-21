export const pluralize = (singularWord: string, count: number) => {
  return count === 1 ? singularWord : `${singularWord}s`;
};

export const capitalize = (word: string) =>
  word.slice(0, 1).toUpperCase() + word.slice(1);
