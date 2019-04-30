const webpack = require('webpack');
const path = require('path');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

BUILD_DIR = path.resolve(__dirname, 'client/public');
APP_DIR = path.resolve(__dirname, 'client/views');

var config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new BrotliGzipPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotli',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    })
]
}

module.exports = config;