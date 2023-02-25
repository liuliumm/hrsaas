// // 控制页面登录权限的文件
import router from './router'  //引入路由实例
import store from './store'  //引入 vuex store 实例
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar引入一份进度条插件
import 'nprogress/nprogress.css' // progress bar style引入进度条样式
// import { indexOf } from 'core-js/core/array'
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 定义白名单
const whiteList = ['/login', '/404'] // no redirect whitelist
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
    //   start progress bar   开启进度条
    NProgress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next({ path: '/' }) //跳到主页
            NProgress.done()
        } else {    // ？？？ why
            next() // 直接放行
        }
    } else { //如果没有token
        if (whiteList.indexOf(to.path) > -1) { // indexOf返回值等于-1表示找不到该字符串
            next() //
        } else {
            next('/login')
        }
    }
    // 解决手动切换地址时，进度条不关闭的问题
    // NProgress.done()   // 手动强制关闭，

    router.afterEach(() => {
        // finish progress bar
        NProgress.done()

        // set page title  
        //   document.title = getPageTitle(to.meta.title)

        //   // determine whether the user has logged in  
        //   const hasToken = getToken()

        //   if (hasToken) {
        //     if (to.path === '/login') {
        //       // if is logged in, redirect to the home page
        //       next({ path: '/' })
        //       NProgress.done()
        //     } else {
        //       const hasGetUserInfo = store.getters.name
        //       if (hasGetUserInfo) {
        //         next()
        //       } else {
        //         try {
        //           // get user info
        //           await store.dispatch('user/getInfo')

        //           next()
        //         } catch (error) {
        //           // remove token and go to login page to re-login
        //           await store.dispatch('user/resetToken')
        //           Message.error(error || 'Has Error')
        //           next(`/login?redirect=${to.path}`)
        //           NProgress.done()
        //         }
        //       }
        //     }
        //   } else {
        //     /* has no token*/

        //     if (whiteList.indexOf(to.path) !== -1) {
        //       // in the free login whitelist, go directly
        //       next()
        //     } else {
        //       // other pages that do not have permission to access are redirected to the login page.
        //       next(`/login?redirect=${to.path}`)
        //       NProgress.done()
        //     }
        //   }
        // })

        // router.afterEach(() => {
        //   // finish progress bar
        //   NProgress.done()
    })
})