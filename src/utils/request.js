// // 1、创建axios实例
// // 1.1 引入axios
import axios from 'axios'
const service = axios.create(// 1.2创建一个axios的实例
    { // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
        // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
        baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
        timeout: 5000 // 定义5秒超时
    }
)
service.interceptors.request.use(// 请求拦截器

)
service.interceptors.response.use(// 响应拦截器
    response => {
        // console.log(response); //
         // axios默认加了一层data,所以这个response就是axios包装之后的数据
        const { success, message, data } = response.data
        // console.log('success:', + success);
        // console.log('message:', message);
        // console.log('data):', data);
        // 根据success的成功与否决定下面的操作
        if(success) {
            return data //直接返回data，不给数据包裹(即数据处理，比如转换为json格式等。)。
        }else{
            Messsge.error(message) //提示错误消息
            // Promise其实是一个构造函数，它有resolve，reject，race等静态方法;它的原型（prototype）上有then，catch方法
            // 一个 Promise 必然处于以下几种状态之一：
            //     待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
            //     已兑现（fulfilled）：意味着操作成功完成。
            //     已拒绝（rejected）：意味着操作失败。
            return Promise.reject(new Error(message)) //如果请求正常，但是参数错误，success为false，通过reject，传递message
                                                    // success为false--举例：   1、手机号或者密码写错，服务器的success为false
                                                    //         2、请求参数未传，比如loginForm，写成loginFrom
                                                    //         3、请求参数名写错，比如password写成pasword
                                                    // 请求错误--举例：     1、路径写错  --此时可能服务器还会返回数据，并且success为false，但是状态码错误，会直接走response拦截器的error回调，就是下面的代码
                                                
        }           
    },error => {
        Message.error(error.message) // 提示错误信息
        return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功，通过reject，传递error，并触发catch（登录页面的登录方法里的登陆失败catch）
        // catch (e)是用来捕获错误的
    }
)
export default service // 导出新axios实例

// // 1、创建axios实例
// // 1.1 引入axios
// import store from '@/store';
// import axios from 'axios'
// import { Message, MessageBox } from 'element-ui';
// import { getToken } from './auth';
// // 1.2创建实例
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL,  // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000  // 超时时间
// })

// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
// // 响应拦截器
// service.interceptors.reponse.use(
//   response => {
//     const res = response.data
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000  //持续时间
//       })
//       // 5xxxx  服务器错误，服务器在处理请求的过程中发生了错误
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonClass: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error)
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// );





// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service

