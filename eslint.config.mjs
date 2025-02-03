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
    files: ['**/*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['client/src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: 'client/tsconfig.json',
      },
    },
  },
  {
    files: ['subgraphs/spotify/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: 'subgraphs/spotify/tsconfig.json',
      },
    },
  },
  {
    files: ['subgraphs/playback/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: 'subgraphs/playback/tsconfig.json',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: [
      'subgraphs/spotify/src/**/*.ts',
      'subgraphs/playback/src/**/*.ts',
      'scripts/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
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
      react: {
        version: 'detect',
      },
      linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/display-name': 'off',
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
