const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/App.js",
  module: {
    rules: [
      // test: /\.jsx?$/, use: "babel-loader"},
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      { test: /\.svg$/, use: "svg-inline-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file-loader", 
        options: 'name=[name].[ext]'// <-- retain original file name
      },
      //   { test: /\.(js)$/, use: "babel-loader" },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({ favicon: "src/images/favicon.ico" }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     // relative path is from src
    //     { from: "./images/favicon.ico" }, // <- your path to favicon
    //   ],
    // }),
  ],
};
