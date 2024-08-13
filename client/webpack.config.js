const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const isProduction = process.argv.NODE_ENV === "production";

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Webpack Schedule app",
      inject: true,
    }),
    new MiniCssExtractPlugin(),
    /*
    new InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
      maximumFileSizeToCacheInBytes: 50000000,
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    compress: true,
    port: 3001,
    open: true,
  },
};
