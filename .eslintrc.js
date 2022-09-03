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
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },

  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-multiple-empty-lines': 'off',
    'import/no-named-as-default': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-no-constructed-context-values': 'off',
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
