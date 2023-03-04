// 公司设置
<template>
  <div class="setting-container">
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">角色管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">公司信息</el-tab-pane>
      </el-tabs>
      <el-row>
        <el-button type="primary">新增角色</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
</style>