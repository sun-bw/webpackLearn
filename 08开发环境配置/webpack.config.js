/**
 * 开发环境配置，能让代码运行起来
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // loder配置
            // 处理less资源
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            // 处理css资源
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            // 处理图片资源
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:8 * 1024,
                    name:'[hash:10].[ext]',
                    outputPath:'imgs'
                }
            },
            // 处理html中img
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            // 处理其他资源
            {
                exclude:/\.(html|js|css|less|jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'media'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}