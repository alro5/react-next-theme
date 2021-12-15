// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   target: 'web',
//   mode: 'development',
//   entry: [path.join(__dirname, "src", "index.tsx"), path.join(__dirname, "src/sass", "style.scss")],
//   devServer: {
//     open: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(s(a|c)ss)$/,
//         use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, "index.html"),
//     }),
//     new MiniCssExtractPlugin()
//   ],
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//   }
// }