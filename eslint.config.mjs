import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import graphql from '@graphql-eslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['**/dist', '**/__generated__'],
  },
  js.configs.recommended,
  ts.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['client/src/**/*.{ts,tsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['client/src/**/*.{ts,tsx}'],
    processor: graphql.processor,
  },
  {
    files: ['client/src/**/*.graphql'],
    ignores: ['client/src/apollo/localSchema.graphql'],
    extends: [graphql.configs['flat/operations-recommended']],
    languageOptions: {
      parser: graphql.parser,
    },
    plugins: {
      '@graphql-eslint': graphql,
    },
    rules: {
      '@graphql-eslint/known-directives': [
        'error',
        { ignoreClientDirectives: ['client', 'connection', 'synthetics'] },
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
  }
);
