// 组织架构--department：部门
<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        // 头部的tree-tools
        <tree-tools :tree-node="company" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
        <tree-tools slot-scope="{ data }" :tree-node="data"  />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
export default {
  name: 'department',
  components: {
    treeTools,
  },
  data() {
    return {
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }],
        },
        { name: "行政部", manager: "刘备" },
        { name: "人事部", manager: "孙权" },
      ],
      defaultProps: {
        label: "name", // 设置显示文本的字段名称
        // children: "children", //设置子节点的字段名称
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
    };
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>