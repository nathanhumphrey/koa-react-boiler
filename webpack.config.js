// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = [
  {
    name: 'prod',
    mode: 'production',
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
      filename: '[name].[hash].js'
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    devtool: 'source-map',
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.css$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
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
              options: { hmr: false }
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
      // hacked HtmlWebPackPlugin to create a SSR template for koa, see package.json build script
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
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      }),
      new CleanWebpackPlugin()
    ]
  },
  {
    name: 'dev',
    mode: 'development',
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
    devtool: 'cheap-module-eval-source-map',
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
              options: { hmr: true }
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
        filename: 'styles.css',
        chunkFilename: '[id].css'
      })
    ]
  }
];
