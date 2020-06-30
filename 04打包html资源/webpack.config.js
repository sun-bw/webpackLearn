/**
 * loader :1.下载 2.使用
 * plugins：1.下载，2引入，3使用
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        // html-webpack-plugin
        // 功能：默认创建一个空的htnl文件，自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源（js/css）
            template:'./src/index.html'
        })
    ],
    mode:'development'
}