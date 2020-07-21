
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bulit.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                // 要使用多个loader
                use:['style-loader','css-loader','less-loader',]
            },
            {
                // 默认处理不了htm中img图片
                // 处理图片资源
                test:/\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载url-loader，file-loader
                loader:'url-loader',
                options:{
                    // 图片的大小小于8kb，base64处理
                    // 有点，能够减少请求数量（减 轻服务器压力）
                    // 缺点：图片体积会更大（文件请求更慢）
                    limit:8*1024,
                     // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,
                // 处理html文件的img图片（负责引入图片）
                loader:'html-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}