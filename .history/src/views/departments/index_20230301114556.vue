// 组织架构--department：部门
<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- // 头部的tree-tools -->
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
    <add-dept :show-dialog="showDialog" :tree-node="node" /> <!-- 新增部门弹层组件 -->
  </div>
</template>

<script>
import treeTools from "./components/tree-tools";
import AddDept from "./components/add-dept"; // 引入新增部门组件
import { getDepartments } from "@/api/departments";
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
    };
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人" };
      this.departs = result.depts; // 需要将其转化成树形结构
      // console.log(result)
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