const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output: {
        //文件名称(指定名称和目录)
        filename:'js/[name].js',
        //输出文件目录，将来所有资源输出的公共目录
        path:resolve(__dirname,'biuld'),
        //所有输出资源引入的公共路径，路径的前面
        //例：'imgs/a.jpg' ->>'/imgs/a.jpg'
        publicPtah:'/',//一般用于生产环境
        chunkFilename:'[name]_chunk.js',//非入口chunk的名称
        //library:'[name]',//全局整库向外暴露变量名
        // libraryTarget:'window',//变量名添加到哪个上，：browser
        //libraryTarget:'global',//node上
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}