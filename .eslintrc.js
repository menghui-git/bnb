/** @type { import("eslint").Linter.Config } */
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    // Add any other configurations you want to extend
    // 'eslint:recommended',
    // 'plugin:react/recommended',
  ],
  rules: {
    // Add or override any specific rules here
    'no-debugger': 'warn',
    'no-console': 'warn',
    'react/prop-types': 'off',
    'prefer-const': 'error',
    'newline-before-return': 'warn',
    'react/no-array-index-key': 'warn',
    'react/jsx-key': 'error',
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignorePattern: '^import .*|class .* extends .*',
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['multiple', 'single', 'all', 'none'],
        allowSeparatedGroups: true,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-*/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'styled-components',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'storybook*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'jest-*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'core',
            group: 'external',
          },
          {
            pattern: 'core/*',
            group: 'external',
          },
          {
            pattern: 'core/store',
            group: 'external',
          },
          {
            pattern: 'core/store/slices',
            group: 'external',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-var': 'error',
    camelcase: [
      'warn',
      {
        properties: 'always',
        ignoreDestructuring: true,
        allow: ['^tmp_', '^temp_'],
      },
    ],
  },
  // Add any additional plugins or settings
  plugins: ['react', 'jsx-a11y', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    es6: true,
  },
};
