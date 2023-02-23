export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}
export function login(data) {

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
