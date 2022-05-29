const webpack = require("webpack");
const path = require("path");
const package = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");

const banner = package.name + " - " + package.version;

const dist = path.resolve("./dist");

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV || "development",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // TODO: remove this and fix errors
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [
          {
            loader: "lit-scss-loader",
            options: {
              minify: true,
            },
          },
          "extract-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(dist),
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new CopyPlugin({
      patterns: [
        { from: "static", to: path.resolve(dist) },
        { from: "templates", to: path.resolve(dist) },
      ],
    }),
  ],
};
