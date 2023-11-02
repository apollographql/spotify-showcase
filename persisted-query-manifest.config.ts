import { PersistedQueryManifestConfig } from '@apollo/generate-persisted-query-manifest';

const config: PersistedQueryManifestConfig = {
  documents: [
    'client/src/**/*.{ts,tsx}',
    'scripts/operation-collection/**/*.ts',
  ],
  output: 'client/src/apollo/persisted-query-manifest.json',
};

export default config;
