import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import graphql from '@graphql-eslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: [
      '**/dist',
      '**/__generated__',
      'codegen.ts',
      '**/*.config.{js,mjs,ts}',
    ],
  },
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
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
    processor: graphql.processor,
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: 'client/tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
      linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      'react/display-name': 'off',
    },
  },
  {
    files: ['subgraphs/spotify/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: 'subgraphs/spotify/tsconfig.json',
      },
    },
  },
  {
    files: ['subgraphs/playback/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
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
      'shared/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-type-assertion': 'warn',
    },
  },
  {
    files: ['client/src/**/*.graphql'],
    ignores: ['client/src/apollo/localSchema.graphql'],
    extends: [
      graphql.configs['flat/operations-recommended'],
      ts.configs.disableTypeChecked,
    ],
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
      '@graphql-eslint/no-deprecated': 'error',
      '@graphql-eslint/no-unused-fragments': 'off',
    },
  }
);
