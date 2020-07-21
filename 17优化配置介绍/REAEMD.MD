# webpack性能优化
*开发环境性能优化
*生产环境性能优化

## 开发环境性能优化
* 优化webpack打包构建速度
    *HMR
* 优化代码调试
    *source-map

## 生产环境性能优化
* 优化打包构建速度
    *oneOf 
    *babel缓存
    *多进程打包
    *externals   cdn直接引入包依赖，
    *dll
* 优化代码运行的性能
    *缓存（hash,chunkhash,contenthash）
    *tree shaking  去掉无用代码
    *code split 
    *懒加载
    *PWA