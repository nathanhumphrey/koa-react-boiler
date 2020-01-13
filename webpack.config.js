// webpack v4
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

dotenv.config();
const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
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
    filename: '[name].js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devtool:
    NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
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
            options: { hmr: NODE_ENV !== 'production' }
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
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.min.css'
    })
  ]
};
