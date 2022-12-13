import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/resolvers/types.ts': {
      config: {
        contextType: 'ContextValue',
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
        useIndexSignature: true,
      },
      plugins: [
        { add: { content: "import { ContextValue } from '../types';" } },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
};

export default config;
