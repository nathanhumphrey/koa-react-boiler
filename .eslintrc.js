module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'no-console': 'off'
  }
};
