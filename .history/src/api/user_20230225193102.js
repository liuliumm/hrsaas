import request from '@/utils/request'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}
// 对登录接口进行封装
export function loginApi(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/sys/login',  
    method: 'post',
    data
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getInfo(token) {

}

export function logout() {

}
// import request from '@/utils/request'
// 使用了封装的request工具，每个接口的请求都单独导出了一个方法，
// 样做的好处就是，任何位置需要请求的话，可以直接引用我们导出的请求方法
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
