import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/types/api.ts': {
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        dedupeOperationSuffix: true,
        defaultScalarType: 'unknown',
        nonOptionalTypename: true,
        omitOperationSuffix: true,
        skipTypeNameForRoot: true,
        scalars: {
          DateTime: 'string',
          ErrorRate: 'number',
          Timestamp: 'number',
        },
        namingConvention: {
          typeNames: 'keep',
        },
      },
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
