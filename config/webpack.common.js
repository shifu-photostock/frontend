const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(process.cwd());
let config = {
  context: process.cwd(),

  entry: {
    app: './src/js/app.js'
  },

  output: {
    filename: 'main.js',
    path: path.join(__dirname, '../dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html')
    }),

    new ExtractTextPlugin('style.css')
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|jpg|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader?name=[name].[ext]' 
        ]
      }
    ]
  }
}

module.exports = config;
