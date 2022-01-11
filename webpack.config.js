const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: ['whatwg-fetch', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
    }),
  ],
};
