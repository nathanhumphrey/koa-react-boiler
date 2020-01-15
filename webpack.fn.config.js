// webpack v4
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

dotenv.config();
const { NODE_ENV } = process.env;

module.exports = function(env, argv) {
  // check for command line mode arg and use if present
  const PRODUCTION =
    (argv.mode && argv.mode === 'production') || NODE_ENV === 'production'
      ? true
      : false;

  let config = {
    mode: PRODUCTION ? 'production' : 'development',
    target: 'web',
    entry: {
      main: ['./client/index.js']
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(__dirname, 'static'),
      publicPath: '/',
      filename: PRODUCTION ? '[name].[hash].js' : '[name].js'
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.(m?js|jsx)$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !PRODUCTION }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-preset-env')(),
                  require('cssnano')()
                ],
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: PRODUCTION ? 'styles.[contenthash].css' : 'styles.css'
      }),
      new CleanWebpackPlugin()
    ]
  };

  // hacked to create a SSR template for koa, see package.json build script
  if (PRODUCTION) {
    config.plugins.push(
      new HtmlWebPackPlugin({
        inject: false,
        hash: false,
        template: 'templates/css.html',
        filename: 'css.html'
      }),
      new HtmlWebPackPlugin({
        inject: false,
        hash: false,
        template: 'templates/js.html',
        filename: 'js.html'
      })
    );
  }

  return config;
};
