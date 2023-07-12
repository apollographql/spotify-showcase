import invariant from 'ts-invariant';

interface ReadEnvOptions {
  defaultValue?: string;
}

export const readEnv = (key: string, options?: ReadEnvOptions) => {
  const value = process.env[key] || options?.defaultValue;

  invariant(
    value,
    `\`process.env.${key}\` must be defined. To get started, visit the home page at http://localhost:3000.`
  );

  return value;
};
