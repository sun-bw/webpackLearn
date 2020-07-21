/**
 * loader :1.下载 2.使用
 * plugins：1.下载，2引入，3使用
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
            // 输出文件名
            filename:'built.js',
            //输出路径
            // __dirname  nodejs的变量，代表当前文件的目录绝对路径
            path:resolve(__dirname,'build')
    },
    module:{
        rules:[

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源（js/css）
            template:'./src/index.html'
        }),
        //告诉webpack哪些库不参与打包，同时使用时的名称也得变
        new webpack.DllReferencePlugin({
            manifest:resolve(__dirname,'dll/manifest.json')
        }),
        //将某个文件打包输出出去，并在html中自动引入资源
        new AddAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,'dll/jquery.js')
        })
    ],
    mode:'production'
}