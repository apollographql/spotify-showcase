import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/resolvers/types.ts': {
      config: {
        useIndexSignature: true,
        contextType: 'ContextValue',
        defaultScalarType: 'unknown',
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
