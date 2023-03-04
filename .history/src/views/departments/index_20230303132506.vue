// 组织架构--department：部门
<template>
  <div v-loading="loading" class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- // 头部的tree-tools -->
        <tree-tools :tree-node="company" :is-root="true"  @addDepts="addDepts"/>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门弹层组件     tree-node判断同级别是否有相同的部门名称-->
    <add-dept :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments"/>
  </div>
</template>

<script>
import treeTools from "./components/tree-tools";
import AddDept from "./components/add-dept"; // 引入新增部门组件
import { getDepartments } from "@/api/departments";
import { tranListToTree } from "@/utils";
export default {
  name: "department",
  components: {
    treeTools,
    AddDept,
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: "name", // 设置显示文本的字段名称  从这个属性显示内容
        // children: "children", //设置子节点的字段名称
      },
      company: { name: "江苏传智播客教育科技股份有限公司", manager: "负责人" },
      showDialog: false, // 显示窗体
      node: null, // 操作的节点
      loading: false, // 用来控制进度弹层的显示和隐藏
    };
  },
  created() {
    this.getDepartments(); // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      this.loading = true  //获取前，改为true
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人", id: '' };  //这里设置id是空，是将公司company视为最顶级的部门，这样做是为了判断公司的一级部门名称是否重复
      this.departs = tranListToTree(result.depts, ""); // 需要将其转化成树形结构
      // console.log(result)
      this.loading = false //获取后，改为false
    },
    addDepts(node) {
      this.showDialog = true; // 显示弹层
      // 因为node是当前的点击的部门，就是为这个部门添加子部门，所以这个部门应该记录下来传递给 【添加部门】组件
      this.node = node;
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>