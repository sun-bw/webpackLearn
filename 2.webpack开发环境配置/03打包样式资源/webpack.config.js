/* 
webpack.config.js :webpack的配置文件
所有的构建工具都是基于nodejs平台运行，模块化默认采用commonjs
*/
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
module.exports = {
    // webpack配置
    // 入口
    entry:'./src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename:'built.js',
        //输出路径
        // __dirname  nodejs的变量，代表当前文件的目录绝对路径
        path:resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            // 详细loader配置
            //不同文件配置不同loader处理
            {
                // 匹配那些文件
                test:/\.css$/,
                // 使用哪些loader进行处理
                use:[
                    // use执行顺序，从下到上依次执行
                    // 创建style标签，将js的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // 插件的配置
    plugins:[
        // 详细的配置
    ],
    // 模式
    mode:'development',//开发模式
    // mode:'production',
    resolve: {
        extensions: ['.js', '*', '.css']  //现在就没问题了
    }
}