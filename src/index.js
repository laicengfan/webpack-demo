import Header from './components/Header/index'
import Hello from './components/Add/index.ts'

console.log('Hello Index!')

Header()
Hello()

const body = document.body
const btn = document.createElement("button")
btn.innerText = '点击加载Minus组件'
body.append(btn)

const btnDom = document.querySelector('button')
btnDom.addEventListener('click',() => {
  import(/* webpackChunkName:"Minus", webpackPrefetch: true */ "./components/Minus/index").then((res) => {
    // 模块暴露的方式为默认暴露所以调用default方法使用
    const result = res.default(5,3)
    console.log(res)
    console.log(result)
  })
})