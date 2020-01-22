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
  ignorePatterns: ['js.js', 'css.js', 'dist/'], // build directory for server files
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['warn', 'windows'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'no-console': 'off'
  },
  globals: {
    __PRODUCTION__: 'readonly'
  }
};
