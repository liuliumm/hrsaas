// 自定义指令，并在main中全局注册
export const imagerror = {//名字不带v-，使用的时候带v-
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(el, binding) {
    // options是 指令中的变量的解释  其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // dom认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    el.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      el.src = binding.value //options.value就是使用指令时 ,传递进来的值
    }
  }
}