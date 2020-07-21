const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 使用多入口进行拆分
 */
module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],

  /**
   * 可以将node_modules中代码单独打包成一个chunk最终输出
   * 自动分析多入口文件中，有没有共工的文件，如果有会打包成一个单独的chunk
   */
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode: 'production'
};
