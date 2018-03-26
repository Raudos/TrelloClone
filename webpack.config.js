var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
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
      template: __dirname + '/index.html'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BACKEND: JSON.stringify(process.env.BACKEND)
    })
  ],
  resolve: {
    modules: [path.resolve("./src"), "./node_modules"]
  }
};
