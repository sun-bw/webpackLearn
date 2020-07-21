/**
 * 使用dll结束，对某些库（第三方库）进行单独打包
 *  当运行webpack是，默认查找webpack.config.js文件
 *  需要运行webpack.dll.js文件
 *     通过webpack --config webpack.dll.js运行当前文件
 */
const { resolve } = require('path');
const webpack = require('webpack')
module.exports = {
    entry:{
        //最终打包生成[name]-->jquery
        //['jquery']->> 要打包的库是jquery
        jquery:['jquery']
    },
    output: {
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]',//打包的里面向外暴露出的内容叫什么名字
    },
    plugins: [
        //打包生成一个manifest.json，提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hahs]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json')
        })
    ],
    mode:'production'
}