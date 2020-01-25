// webpack v4
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');

const DIST_PATH = path.resolve(__dirname, 'public/dist');

const production = process.env.NODE_ENV === 'production';
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: [`./src/client/index-${target}.js`],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: { target }
            }
          },
          { loader: 'eslint-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: development }
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
              plugins: [require('postcss-preset-env')(), require('cssnano')()],
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
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  externals:
    target === 'node'
      ? ['@loadable/component', 'fetch', nodeExternals()]
      : ['fetch', 'React', 'ReactDOM']
});

module.exports = [getConfig('web'), getConfig('node')];
