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
    },
    devtool:'eval-source-map'
}
/**
 * source-map:一种提供源代码到构建后代码映射技术（如果构建代码出错了，
 * 通过映射关系，可以追踪到源代码错误）
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * source-map：外部
 *  错误代码准确信息，源代码错误位置
 * inline-source-map：内联（只生成一个内联的source-map）
 *  错误代码准确信息和源代码错误位置
 * hidden-source-map：外部
 *  错误代码原因，但是没有错误位置
 *  不能追踪到源代码错误，只能提示到构建后代码位置
 * eval-source-map：内联（每一个文件都生成source-map）
 *   错误代码准确信息和源代码错误位置
 * nosources-source-map：外部的
 *  错误代码准确信息，但是没有任何源代码的信息
 * cheap-source-map：外部
 *  错误代码准确信息，和位置，只能精确到行
 * cheap-module-source-map：外部
 *  错误代码准确信息，和位置，只能精确到行
 *  module会将loader和source map加入
 *  
 * 内联和外部的区别：外部生成的文件，内联没有，内联构建速度更快
 * 
 * 开发环境：速度开点，调试友好
 *  速度快（eval>inline>cheap...）
 *  eval-cheap-source-map
 *  eval-souce-map
 *  调试友好
 *  source-map
 *  cheap-module-source-map
 *  cheap-source-map
 *  -- eval-source-map / eval-cheap-module-source-map
 * 生产环境：源代码要不要隐藏？调试要不要友好
 *  内联代码体积会非常大，所以不用内联
 *  nosources-source-map全部隐藏
 *  hidden-source-map只隐藏源代码，会提示构建后代码错误信息
 *  
 *  source-map
 * 
 *      --source-map / cheap-module-source-map
 */