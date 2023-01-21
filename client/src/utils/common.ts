export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const range = (lower: number, upper: number) => {
  const step = lower < upper ? 1 : -1;

  return [...Array(Math.abs(upper - lower)).keys()].map(
    (key) => key * step + lower
  );
};
