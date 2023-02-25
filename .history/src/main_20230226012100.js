import Vue from 'vue'
// reset.css:改革派
// normalize.css:
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'
// 针对上面的引入语法  **`import *  as  变量`**  
// 得到的是一个对象**`{ 变量1：对象1，变量2： 对象2 ...   }`**, 
// 所以可以采用对象遍历的方法进行处理
    // {imagerror: {}, abc: {}}
    // 注册自定义指令
    // 遍历所有的导出的指令对象 完成自定义全局注册
    // ['iamgerror', 'abc']
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 注释掉
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = true
Vue.config.devtools = true
new Vue({
  el: '#app',
   //注入路由及数据源  
  router,  
  store,
  render: h => h(App)
})
