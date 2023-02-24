import { loginApi, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现 ？ Vuex和前端缓存相结合
// const state = getDefaultState()
const state = {
  token: getToken() // 设置token初始状态   token持久化 => 放到缓存中
}
// 修改状态
const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  setToken(state, token) {
  // SET_TOKEN: (state, token) => { 
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步(注意这个setToken是从auth.js导入的)
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  }
}
// 执行异步
// 封装登录的action
// 登录action要做的事情，**`调用登录接口`**，**`成功后设置token到vuex`**，**`失败则返回失败`**
const actions = {
  // user login  // 定义login action  也需要参数 调用action时 传递过来的参数
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     loginApi({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  async login(context, data) {
    //注意这个login是从api/user.js中导入的
    const result = await loginApi(data) // 实际上就是一个promise  result就是执行的结果
    // 经过响应拦截器的处理之后 这里的result实际上就是 token
    // 为什么async/await 不用返回new Promise,因为 async函数本身就是 Promise,promise的值返回的值  
    // axios默认给数据加了一层data
    // if (result.data.success) {
    //   // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    //   // 现在有用户token
    //   // actions 修改state 必须通过mutations
    //   context.commit('setToken', result.data.data)
    // }
    context.commit('setToken', result)
  },
  // 上述代码中，使用了async/await语法,用then语法也是可以的,在项目研发过程中，尽可能的采用前一种
  // login(context, data) {
  //   return new Promise(function(resolve) {
  //     login(data).then(result => {
  //       if (result.data.success) {
  //         context.commit('setToken',  result.data.data) // 提交mutations设置token
  //         resolve()  // 表示执行成功了
  //       }
  //     })
  //   })
  // },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

