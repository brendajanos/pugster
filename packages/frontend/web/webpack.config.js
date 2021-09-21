/* eslint-disable prettier/prettier */
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname, '../');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// node_module.
const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    //path.resolve(appDirectory, 'node_modules/react-native-svg'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-typescript',
      ],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [path.resolve(appDirectory, 'index.web.js')],
  resolve: {
    alias: {
      react: path.resolve(appDirectory, '../../node_modules/react'),
      'react-native$': path.resolve(
        appDirectory,
        '../../node_modules/react-native-web',
      ),
    },
    extensions: [
      '.web.js',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      babelLoaderConfiguration,
      imageLoaderConfiguration,
    ],
  },
  output: {
    path: path.resolve(appDirectory, 'build/web'),
    filename: 'bundle.web.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      'process.env.MAPBOX_TOKEN': JSON.stringify(
        process.env.MAPBOX_TOKEN || 'Maja',
      ),
      DEV: process.env.NODE_ENV === 'production' || true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
  },
};
