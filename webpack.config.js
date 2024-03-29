const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

const { version, name, license, repository, author } = getPackageJson(
  'version',
  'name',
  'license',
  'repository',
  'author'
);

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, ' ')} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: 'ScatterGraph',
    libraryTarget: 'umd',
    clean: true,
    globalObject: 'this'
  },
  externals: {
    react: 'react'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t|)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    new webpack.BannerPlugin(banner),
    new MergeIntoSingleFilePlugin({
      files: {
        'types/index.d.ts': [path.resolve(__dirname, 'src/types/types.d.ts')]
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json', '.css', '.scss']
  }
};
