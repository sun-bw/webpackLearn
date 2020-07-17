const { resolve } = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
//定义nodejs环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

/**
 * 缓存：babel缓存
 *  直接配置cacheDirectory:true
 *  让第二次打包构建速度更快
 * 文件资源缓存
 *  hash：每次webpack构建打包生成的唯一hash值
 *  问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效
 *          （可能只改动了一个文件，导致所有文件失效）
 * chunkhash：如果打包来源同一个chunk，hash值一样。
 *   问题：js和css，值还是一样
 *      因为：css是在js文件中被引入，所以同属于一个chunk
 * contenthash：根据文件的内容生成hash值，不同文件hash值一定不一样
 * 让代码上线运行缓存更好使用
 */


// 复用cssloader处理
const commonCssLoader = [
    /*
    use执行从下往上
    先执行less-loader，将less文件编译成css文件
    在经过postcss-loader对css做兼容性处理
    在通过css-loaderb把css加载到js中
    在通过MiniCssExtractPlugin把css提取成单独文件
    */
    MiniCssExtractPlugin.loader,
    'css-loader',
    // css兼容处理
    {
        //还需要在package.json中定义browserslist
        loader:'postcss-loader',
        options:{
            ident:'postcss',
            plugins:() => [
                require('postcss-preset-env')()
            ]
        }
    }
];
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.[contenthash:10].js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            /**
             * 正常来讲，一个文件只能被一个loader处理
             * 当一个文件要被多个loader处理，那么一定要指定loader执行顺序
             * 先执行eslint 在执行babel，通过enforce:'pre'设置优先执行
             */
            {
                //在package。json中eslintConfig  airbnb规则
                test:/\.js$/,
                exclude:/node_modules/,
                //优先执行
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                    fix:true
                }
            },
            {
                //以下loader只会匹配一个loader
                //注意：不能有两个配置处理同一类型文件
                //把eslint-loader放到外面
                oneOf: [
                    {
                        test:/\.css$/,
                        use:[...commonCssLoader]
                    },
                    {
                        test:/\.less$/,
                        use:[...commonCssLoader,'less-loader',]
                    },
                    //js兼容处理
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        loader:'babel-loader',
                        options:{
                            presets:[
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns:'usage',
                                        corejs:{version:3},
                                        targets:{
                                            chrome:'60',
                                            firefox:'50'
                                        }
                                    }
                                ]
                            ],
                            //开启babel缓存
                            //第二次构建时，会读取之前的缓存
                            cacheDirectory:true
                        }
                    },
                    // 处理图片
                    {
                        test:/\.(jpg|png|gif)/,
                        loader:'url-loader',
                        options:{
                            limit:8*1024,
                            name:'[hash:10].[ext]',
                            outputPath:'imgs',
                            esModule:false,
                        }
                    },
                    // 处理html中img
                    {
                        test:/\.html$/,
                        loader:'html-loader',
                    },
                    //处理其他文件
                    {
                        exclude:/\.(js|css|less|html|jpg|png|gif)/,
                        loader:'file-loader',
                        options:{
                            ouuputPath:'medis'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // 处理css
        new MiniCssExtractPlugin({
            filename:'css/built.[contenthash:10].css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            // 压缩html
            minify:{
                //压缩文档
                collapseWhitespace:true,
                // 去掉注释
                removeComments:true,
            }
        })
    ],
    //生产环境js自动压缩
    mode:'production',
    devtool:'source-map'
}