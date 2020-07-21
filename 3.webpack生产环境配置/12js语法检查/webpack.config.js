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
            /**
             * 语法检查:eslint-loader  依赖于eslint
             * 只检查用户自己写的源代码，不检查第三方库
             * 设置检查规则
             * package.json中eslintConfig中设置
             *   eslint-config-airbnb-base eslint eslint-plugin-import
             */
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'eslint-loader',
                options:{
                    // 自动修复
                    fix:true
                }
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