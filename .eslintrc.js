// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('./graphql.schema.json')

module.exports = {
  env: {
    browser: true,
    es6: true,
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
    'import/no-default-export': 'error',
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
          '**/__test__/**',
          '**/__tests__/**',
          'jest.setup.ts',
          '*.config.ts',
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
  },
}
