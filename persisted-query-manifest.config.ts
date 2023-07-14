import { PersistedQueryManifestConfig } from '@apollo/generate-persisted-query-manifest';

const config: PersistedQueryManifestConfig = {
  documents: 'client/src/**/*.{ts,tsx}',
  output: 'client/src/persisted-query-manifest.json',
};

export default config;
