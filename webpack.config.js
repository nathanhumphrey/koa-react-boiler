// webpack v4
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

// default to production
dotenv.config();
const { NODE_ENV = 'production' } = process.env;

module.exports = function(env, argv) {
  // determine desired mode
  let mode = NODE_ENV;

  // check for command line mode arg and use if present
  mode = argv.mode ? argv.mode : mode;
  const PRODUCTION = mode === 'production' ? true : false;

  let config = {
    name: PRODUCTION ? 'prod' : 'dev',
    mode: PRODUCTION ? 'production' : 'development',
    target: 'web',
    entry: {
      main: ['./src/client/index.js']
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
      fetch: 'fetch',
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    devtool: 'source-map',
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
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: PRODUCTION ? 'styles.[contenthash].css' : 'styles.css',
        chunkFilename: PRODUCTION ? '[id].[contenthash].css' : '[id].css'
      })
    ]
  };

  if (PRODUCTION)
    config.plugins.push(
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        inject: false,
        hash: false,
        template: 'src/templates/css.html',
        filename: 'css.html'
      }),
      new HtmlWebPackPlugin({
        inject: false,
        hash: false,
        template: 'src/templates/js.html',
        filename: 'js.html'
      })
    );

  return config;
};
