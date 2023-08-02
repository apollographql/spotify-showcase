module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['client/src/**/*.{ts,tsx}'],
      processor: '@graphql-eslint/graphql',
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['client/src/**/*.graphql'],
      excludedFiles: ['client/src/apollo/localSchema.graphql'],
      extends: 'plugin:@graphql-eslint/operations-recommended',
      rules: {
        '@graphql-eslint/known-directives': [
          'error',
          { ignoreClientDirectives: ['client', 'connection'] },
        ],
        '@graphql-eslint/naming-convention': [
          'error',
          {
            FragmentDefinition: {
              ignorePattern: '.+_.+',
            },
          },
        ],
        '@graphql-eslint/no-deprecated': 'warn',
        '@graphql-eslint/no-unused-fragments': 'off',
      },
      parserOptions: {
        operations: './client/src/**/*.{ts,tsx}',
        schema: [
          './client/schema.graphql',
          './client/src/apollo/localSchema.graphql',
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
};
