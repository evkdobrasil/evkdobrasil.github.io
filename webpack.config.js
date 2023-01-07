const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./_js/index.ts",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  watch: true,
};

module.exports = config;
