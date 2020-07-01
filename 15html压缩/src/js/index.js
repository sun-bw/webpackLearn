// import '@babel/polyfill';
const add =(x, y)=> {
  return x + y;
}
// eslint-disable-nex-line
// 下一行eslint效果失效，不进行检查
console.log(add(4, 5));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('执行完了')
    resolve();
  },1000)
})

console.log(promise)

