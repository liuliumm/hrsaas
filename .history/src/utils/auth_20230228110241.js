// cookie是类似于localStorage的工具，可以将数据持久化到本地
// vuex是将共享数据保存到内存中，项目重启后就会丢失，那么需要配合cookie才更合理
import Cookies from 'js-cookie' //这是一个操作cookie的工具类，cookie也是可以存储本地数据

// const TokenKey = 'vue_admin_template_token' // 设定一个独一无二的key，
const TokenKey = 'hrsaas-ihrm-token'  //ihrm也有国际人力资源管理的意思
// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 准备一下时间戳，处理token超时问题，该代码是在注入token后执行，
const timeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的key
// 首字符大写都是类和构造函数
// 变量、常量小写开头

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now()) //时间戳就是当前具体时间，所以设置的时间戳的值就是now
}