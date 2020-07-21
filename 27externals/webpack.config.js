
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/js/index.js',
    output:{
            filename:'js/built.js',
            path:resolve(__dirname,'build')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'production',
    externals:{
        //忽略的库名：npm下载的包。
        //忽略这个包，之后使用cdn链接，在html文件中引入
        jquery:'jQuery'
    }
}