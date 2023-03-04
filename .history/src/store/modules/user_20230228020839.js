import { loginApi, getUserInfo, getUserDetailById, } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'


// const getDefaultState = () => {  //初始化时生成的
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }
// const state = getDefaultState(
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现 ？ Vuex和前端缓存相结合)
const state = {  //在这里设置token为共享状态，初始化vuex时，先从缓存中读取
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {} //定义一个空的对象,保存用户信息
}
// 修改状态
const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  // 设置用户信息
  setToken(state, token) {
    // SET_TOKEN: (state, token) => {
    // 将数据同步给token 
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步(注意这个setToken是从auth.js导入的)
  },
  setUserInfo(state, userInfo) {
    //state.userInfo = userInfo; // 这个也是响应式，直接修改对象本身的数据
    //也可以如下写法：
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  },
  removeToken(state) {  // 删除缓存
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    // state.userInfo = {}
  },


}
// 执行异步
// 封装登录的action
// 登录action要做的事情，**`调用登录接口`**，**`成功后设置token到vuex`**，**`失败则返回失败`**
const actions = {
  // user login  
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
  // 定义login action  也需要参数 调用action时 传递过来的参数
  // 1. 这个login是个k:v的简写形式 login: async () => {}
  async login(context, data) {
    // console.log("vuex的context: " , context);
    // console.log("vuex的data: " , data);
    //注意这个loginApi是变量， 按照作用域链查找 是从api/user.js中导入的  loginApi执行完毕将data传递给登录页面的登录函数里的data
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
    console.log('actions调用接口成功后执行');
    context.commit('setToken', result)
    // 写入时间戳
    // setTimeStamp()
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
  // 获取用户资料action   
  async getUserInfo(context, token) {
    // console.log('context:', context);  //可以通过这里的context将token传递给获取用户信息的接口
    const result = await getUserInfo(token)  // 获取返回值
    console.log('用户信息result：', result);
    // context.commit('setUserInfo', result) // 将整个的个人信息设置到用户的vuex数据中
    // return result //这里为什么要返回，为后面埋下伏笔
    const baseInfo = await getUserDetailById(result.userId, token) //获取头像 ，必须传递token

    const baseResult = { ...result, ...baseInfo, }  //合并接口结果
    console.log('头像：', {...baseInfo});
    console.log('头像2：', {...baseResult});
    context.commit('setUserInfo', baseResult) // 提交给mutations
    // return baseResult  点睛之笔???
  },
  // getInfo ({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 登出的action（写在actions中）
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

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

