const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output: {
        //文件名称(指定名称和目录)
        filename:'js/[name].js',
        //输出文件目录，将来所有资源输出的公共目录
        path:resolve(__dirname,'biuld'),
    },
    module:{
        //loader配置
        rules:[
            {
                test:/\.css$/,
                //多个loader用use
                use:['style-laoder','css-laoder']
            },
            {
                test:/\.js$/,
                //排除node——modules下的js文件
                exclude:'node_modules',
                //只检查src下面的文件
                include:resolve(__dirname,'src'),
                //优先执行
                enforce:'pre',   //'post'延后执行
                //单个loader用loader
                loader:'eslint-laoder',
            },
            {
                //一下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}