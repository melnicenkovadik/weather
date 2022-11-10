module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/ban-ts-comment': ['off'],
        'no-param-reassign': ['off'],
        'react/button-has-type': ['off'],
        ' @typescript-eslint/no-non-null-assertion': ['off'],
      },
    },
  ],
};
