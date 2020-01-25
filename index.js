require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@loadable/babel-plugin',
    '@babel/plugin-syntax-dynamic-import',
    [
      'babel-plugin-react-css-modules',
      {
        webpackHotModuleReloading: true,
        autoResolveMultipleImports: true
      }
    ]
  ],
  ignore: ['node_modules']
});

module.exports = require('./src/server/index.js');
