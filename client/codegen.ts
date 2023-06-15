import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/introspection.json': {
      plugins: ['fragment-matcher'],
    },
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
          CountryCode: 'string',
          DateTime: 'string',
          ErrorRate: 'number',
          ID: 'string',
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
