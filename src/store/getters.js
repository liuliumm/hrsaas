const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 在根级的getters上 开发子模块的属性
  token: state => state.user.token,  //为了更好的让其他模块和组件更好的获取token数据，将token值作为公共的访问属性放出
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
}
export default getters
