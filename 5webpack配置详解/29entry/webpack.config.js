const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * entry:入口起点
 *  1.string -->'./src/index.js'
 *  单入口
 *  打包形成一个chunk，输出一个bundle文件
 *  此时chunk的名称默认为main
 *  2.array -->['./src/index.js','./src/add.js']
 *  多入口
 *  所有入口文件最终形成一个chunk，输出一个bundle文件
 *      只有在HMR功能中让html热更新生效才用
 *  3.object --> {index:'./src/add.js',add:'./src/add.js'}
 *      多入口
 *      有几个入口文件就生产几个chunk，输出几个bundle文件
*       此时chunk的名称是key

    特殊用法：entry:{
        index:['./src/index.js','./src/count.js'],
        add:'./src/add.js'
    },
 */
module.exports = {
    entry:'./src/index.js',
    output: {
        filename:'[name].js',
        path:resolve(__dirname,'biuld')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}