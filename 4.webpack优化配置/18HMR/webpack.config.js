/**
 * HMR:hot module replacement  热模块替换/模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块，而不是打包所有
 * 极大提升构建速度
 * 
 * 样式文件：可以使用HMR功能，因为style-laoder内部实现了
 * js文件：默认没有HMR功能 --》 需要修改js代码，添加支持HMR功能的代码
 *  注意：hmr功能对js处理，只能处理非入口js文件
 * html文件：默认不能使用HMR功能，导致html不能热更新了（不用做HMR功能，因为只有一个html文件）
 *  解决：修改entry，将html文件引入
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:['./src/js/index.js','./src/index.html'],
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
        open: true,
        //开启HMR功能   
        //当修改了webpack配置，重启webpack服务
        hot:true,
    }
}