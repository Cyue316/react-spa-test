const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');

const devConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: "file-loader"
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          // 这里使用url-loader替代file-loader
          loader: "url-loader",
          options: {
            // 当图片小于8kb时，url-loader会将图片转为base64
            // 这样可以减少http请求的数量
            // 如果大于8kb的话，url-loader会将图片交给file-loader处理
            // 所以url-loader需要依赖file-loader
            limit: 1024 * 8,
            name: "img/[name].[hash:8].[ext]"
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  devtool: 'cheap-module-eval-soure-map'
};

module.exports = merge(commonConfig,devConfig);