/*
index.js：webpack入口起点文件
1.运行指令：
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
        解释：webpack会以./src/index.js为入口文件，打包后输出到./build/built.js
        整体打包环境，是开发环境
    生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
2.结论：
    1.webpack能处理js/json，不能处理css/img等其他资源
    2.生产环境和开发环境，将es6模块（module）编译成浏览器能识别的module
    3.生产环境比开发环境多一个压缩js代码
*/
// import './index.css'
import data from './data.json'
function add(x,y){
    return x+y;
}
console.log(add(1,2))