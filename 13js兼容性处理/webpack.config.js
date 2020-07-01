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
             * js兼容处理：babel-loader @babel/core @babel/preset-env
             * 1.基本兼容性处理 --》 @babel/preset-env 
             *  只能转换基本语法，如promise不能转换
             * 2.全部js兼容性处理 --》 @babel/polyfill
             *  问题：我只要解决部分兼容性问题，将所有兼容性代码全部引入，体积太大
             * 3.需要做兼容性处理，按需加载。 --》 core-js
             */
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    // 预设：指示babel做怎样的兼容处理
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns:'usage',
                                // 指定corejs版本
                                corejs:{
                                    version:3
                                },
                                // 指定具体兼容做到那个版本浏览器
                                targets:{
                                    chrome:'60',
                                    firefox:'60',
                                    ie:'9'
                                }
                            }
                        ]
                    ]
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