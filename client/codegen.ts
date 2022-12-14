import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/types/api.ts': {
      config: {
        avoidOptionals: true,
        dedupeOperationSuffix: true,
        defaultScalarType: 'unknown',
        immutableTypes: true,
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
