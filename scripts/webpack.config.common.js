const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfigBase = {
  entry:{
    app: path.resolve(__dirname,'../src/index.js'),
  },
  output: {
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[hash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
    alias: {
      'pages': path.resolve('./src/pages'),
      'modules': path.resolve('./src/modules'),
      'components': path.resolve('./src/components'),
      'utility': path.resolve('./src/utility'),
      'router': path.resolve('./src/router'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      title: 'index'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};

module.exports = webpackConfigBase;