const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  mode: "production",
  devtool: "inline-source-map",
  // 提取公共模块，包括第三方库和自定义工具库等
  optimization: {
    // 找到chunk中共享的模块,取出来生成单独的chunk
    splitChunks: {
      chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      cacheGroups: {
        vendors: {  // 抽离第三方插件
          test: /(react|react-dom|react-router-dom|antd)/,
          // test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
          name: "vendors",
          priority: 10 ,                     // 抽取优先级
          minChunks: 1
        }
      }
    },
    // 为 webpack 运行时代码创建单独的chunk
    runtimeChunk:{
      name:'manifest'
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    //提取css到style.css中
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      chunkFilename: "[id].[contentHash].css"
    }),
  ]
};

module.exports = merge(commonConfig,prodConfig);