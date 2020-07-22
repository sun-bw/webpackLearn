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
        alias:{
            $css:resolve(__dirname,'src/css')
        },
        extenstions:['.js','.json','.jsx'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    },
    devServer:{
        //运行代码目录
        contentBase:resolve(__dirname,'build'),
        //监视contentBase目录下所有文件，一但文件变化就会reload
        watchContentBase:true,
        watchOptions:{
            //忽略文件
            ignored:'/node_modules'
        },
        //启动gzip压缩
        compress:true,
        //端口号
        port:5000,
        //域名
        host:'localhost',
        //自动打开浏览器
        open:true,
        //开启HMR功能
        hot:true,
        //不要显示启动服务器日志信息
        clientLogLevel:'none',
        //除了基本启动信息外，其他内容都不打印
        quiet:true,
        //如果出现出错，不要全屏提示
        overlay:true,
        //服务器代理
        //解决开发环境下跨域问题
        proxy:{
            //一旦devServer（5000服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器（3000））
            '/api':{
                target:'http:localhost:3000',
                //发送请求时，请求路径重写，将/api/xxx修改成/xxx
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}