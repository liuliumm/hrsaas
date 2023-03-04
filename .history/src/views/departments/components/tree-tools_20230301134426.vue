// 模块化(js) 组件化(把实现一个完整的逻辑需要的三个部分html css js完整的封装在一起，称为组件化) 
// css modules
<template>
  <!-- //注意：原来作用域插槽传递的内容，替换成父向子props传递 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">
                编辑部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">
                删除部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
// 该组件需要对外开放属性 外部需要提供一个对象 对象里需要有name  manager
export default {
  name: "tree-tools",
  // props可以用数组来接收数据 也可以用对象来接收
  // props: {   props属性: {  配置选项 }  }
  props: {
    //   定义一个props属性
    treeNode: {
      //当前树形节点的数据对象
      type: Object, // 对象类型
      required: true, // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      //增加isRoot，为真时不出现删除、编辑部门，假时出现，控制是否为头部，是否显示编辑部门和删除部门
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false, // 显示窗体
    };
  },
  methods: {
    // 操作节点调用的方法
    async operateDepts(type) {
      if (type === "add") {
        // 添加子部门的操作
        this.$emit("addDepts", this.treeNode); //子部门是添加到当前部门对象
      } else if (type === "edit") {
        //  编辑部门的操作
      } else {
        //  删除操作
        // this.$confirm("确定要删除该部门吗")
        // .then(() => {
        //   // 如果点击了确定就会进入then
        //   return delDepartments(this.treeNode.id); // 返回promise对象
        // })
        // .then(() => {
        //   //注意：这个then的内部代码会在 上个then内部代码的删除成功 之后执行 ***
        //   //  如果删除成功了  就会进入这里
        //   this.$emit("delDepts"); // 触发自定义事件
        //   this.$message.success("删除部门成功"); //  如果删除成功了  就会进入这里
        //  删除操作
        const ret = await this.$confirm("确定要删除该部门吗").catch(
          (err) => err
        );
        // $confirm效果，confirm确认的意思，会弹出一个带确认按钮的提示框
        // element全部注册之后，会在vue身上挂载$confirm的方法，用来弹框（与vant类似）
        // 如果用户取消，什么也不用做
        if (ret === "cancel") return;
        // 如果用户确定删除，调接口
        await delDepartments(this.treeNode.id);
        this.$emit("delDepts"); // 触发自定义事件
        this.$message.success("删除部门成功");
      }
    },
  },
};
</script>