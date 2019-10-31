const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    manager: './src/manager.js',
    customer: './src/customer.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'manager.html',
      template: './src/manager.html',
      chunks: ['manager'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'customer.html',
      template: './src/customer.html',
      chunks: ['customer'],
      inject: true
    })
  ],
  devServer: {
         contentBase: './dist'
  }
};
