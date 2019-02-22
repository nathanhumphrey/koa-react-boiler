// webpack v4
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

dotenv.config();
const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
  target: 'web',
  entry: {
    main: ['./client/index.js']
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'clean-css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.min.css'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};
