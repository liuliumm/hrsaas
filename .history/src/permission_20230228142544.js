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
router.beforeEach((to, from, next) => {
    //   start progress bar   开启进度条
    NProgress.start()
    console.log("1:", to.path);
    if (store.state.user.token) {
        console.log("...:", store.state.user.token);
        if (to.path === '/login') {  // 这里会导致用户不用二次登录，只要token还在有效期，可以直接跳转到主页，而不用再次点击登录
            next('/') //跳到主页
            NProgress.done()
        } else {    //并且不是请求登陆页   
            // if(!store.state.user.userInfo.userId) {// 获取资料，如果没有id，说明没有用户信息,才会调用 vuex的获取资料的action
            if (!store.getters.userId) {

                store.dispatch('user/getUserInfo', store.getters.token) // 那么就需要获取用户资料
            }
            // await store.dispatch('user/getUserInfo')
            next() // 直接放行
        }
    } else { //如果没有token
        if (whiteList.indexOf(to.path) > -1) { // indexOf返回值等于-1表示找不到该字符串
            next() //
        } else {
            console.log("lujing:", to.path);
            next('/login')
            // next('/')
        }
    }
    // 解决手动切换地址时，进度条不关闭的问题
    NProgress.done()   // 手动强制关闭，
})
// 路由后置守卫
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
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
