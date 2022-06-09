module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-multiple-empty-lines': 'off',
    'jsx-a11y/label-has-associated-control': [
      'off',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
};
