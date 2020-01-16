// webpack v4
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');

let config = {
  target: 'node',
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
    // publicPath: '/',
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
  plugins: [new CleanWebpackPlugin()]
};

let prod = Object.assign({}, config);
prod.mode = 'production';
prod.name = 'prod';

let dev = Object.assign({}, config);
dev.mode = 'development';
dev.name = 'dev';

module.exports = [prod, dev];
