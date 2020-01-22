// webpack v4
const path = require('path');
const dotenv = require('dotenv');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

// default to production
dotenv.config();
const { NODE_ENV } = process.env;

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  entry: {
    main: ['./src/server/index.js']
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'index.js'
  },
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
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false
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
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(NODE_ENV === 'production')
    })
  ]
};
