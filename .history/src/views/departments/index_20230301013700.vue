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
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from "./components/tree-tools";
import { getDepartments, delDepartments } from "@/api/departments";
export default {
  name: "department",
  components: {
    treeTools,
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
    this.getDepartments(), // 调用自身的方法
    this.operateDepts
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人" };
      this.departs = result.depts; // 需要将其转化成树形结构
      // console.log(result)
    },
    // 操作节点调用的方法
    operateDepts(type) {
      if (type === "add") {
        // 添加子部门的操作
      } else if (type === "edit") {
        //  编辑部门的操作
      } else {
        //  删除操作
        this.$confirm("确定要删除该部门吗")
          .then(() => {
            // 如果点击了确定就会进入then
            return delDepartments(this.treeNode.id); // 返回promise对象
          })
          .then(() => {
            //注意：这个then的内部代码会在 上个then内部代码的删除成功 之后执行 ***
            //  如果删除成功了  就会进入这里
            this.$emit("delDepts"); // 触发自定义事件
            this.$message.success("删除部门成功"); //  如果删除成功了  就会进入这里
          });
      }
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