var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: [
    'babel-polyfill',
    './frontend/src/index.js'
  ],
  output: {
    path: __dirname + "/frontend/",
    filename: (process.env.NODE_ENV === "production") ? "index_bundle-[hash:6].js" : "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: __dirname + '/frontend/index.html'
    })
  ],
  resolve: {
    modules: [path.resolve("./frontend"), "./node_modules"]
  }
};
