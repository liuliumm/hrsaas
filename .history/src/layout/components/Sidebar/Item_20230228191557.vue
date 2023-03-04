<script>
export default {
  name: 'MenuItem',
  // 局部组件
  functional: true,   //函数式组件想像成组件里的一个函数，入参是渲染上下文(render context)，返回值是渲染好的HTML
                        //  对于函数式组件，可以这样定义：
                        //  Stateless(无状态)：组件自身是没有状态的
                        //  Instanceless(无实例)：组件自身没有实例，也就是没有this
                        //  由于函数式组件拥有的这两个特性，我们就可以把它用作高阶组件(High order components)，所谓高阶，就是可以生成其它组件的组件。
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
        //根据icon添加svg-icon
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
      console.log("...", title);
      //根据title添加span
    }
    return vnodes  //返回添加完标签的节点对象
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
