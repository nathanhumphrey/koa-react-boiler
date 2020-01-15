// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './index.js',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: 'index.js'
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
  // devtool: 'source-map',
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
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: { hmr: false }
          // },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          } //,
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [
          //       require('postcss-preset-env')(),
          //       require('cssnano')()
          //     ],
          //     sourceMap: true
          //   }
          // }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'styles.css'
    // }),
    new CleanWebpackPlugin()
  ]
};

let prod = Object.create(config);
prod.mode = 'production';
prod.name = 'prod';

let dev = Object.create(config);
dev.mode = 'development';
dev.name = 'dev';

module.exports = [prod, dev];
