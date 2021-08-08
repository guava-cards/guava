// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('./graphql.schema.json')

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['graphql', 'prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/test-utils/**',
          '**/tests/**',
          '**/spec/**',
          '**/__test__/**',
          '**/__tests__/**',
          'jest.setup.js',
          'jest.config.js',
          '*.config.ts',
          'vite.config.ts',
          '**/config-overrides.js',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'react/prop-types': 'off',
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        schemaJson: schema,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'warn',
    'react/require-default-props': 'off', // just define default props in function
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
}
