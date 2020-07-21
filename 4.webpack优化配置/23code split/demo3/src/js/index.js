
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
/***
 * 通过js代码，让某个文件单独打包成一个chunk
 * import 动态导入，能将某个文件单独打包
 */
import(/*webpackChunkName:'test',chunk固定的名字*/'./test')
.then((result) => {
  console.log(result)
})
.catch(() => {
  console.log('文件加载失败')
})
console.log(mul)
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
