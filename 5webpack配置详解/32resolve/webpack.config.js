const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output: {
        filename:'js/[name].js',
        path:resolve(__dirname,'biuld'),
    },
    module:{
        //loader配置
        rules:[
            {
                test:/\.css$/,
                use:['style-laoder','css-laoder']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development',
    //解析模块的规则
    resolve:{
        //配置路径别名,有点简写路径，缺点路径没有提示
        alias:{
            $css:resolve(__dirname,'src/css')
        },
        //配置省略文件路径的后缀名
        //引入文件可以文件后缀
        extenstions:['.js','.json','.jsx'],
        //告诉webpack解析模块的时候，去找哪个目录
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    }
}