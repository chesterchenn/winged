import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { dist, indexHTML, entryIndex } from '../paths';
import { Configuration } from 'webpack';
import dotenv from 'dotenv-webpack';

const config: Configuration = {
  entry: {
    app: entryIndex,
  },
  output: {
    filename: '[name].bundles.js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              poolTimeout: Infinity,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
              poolTimeout: Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // 默认使用 dart-sass
              implementation: require('sass'),
            },
          },
        ],
      },
      { test: /\.(png|svg|jpg|gif)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: indexHTML,
    }),
    new dotenv(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
};

export default config;
