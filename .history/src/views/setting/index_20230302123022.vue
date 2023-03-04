// 公司设置
<template>
  <div class="setting-container">
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first"></el-tab-pane>
        <el-tab-pane label="公司信息" name="second"></el-tab-pane>
      </el-tabs>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button style="float: left; padding: 3px 0" type="text"
            >新增角色</el-button
          >
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="date" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="角色名称" width="240">
          </el-table-column>
          <el-table-column prop="province" label="描述"> </el-table-column>
          <el-table-column prop="city" label="操作"> </el-table-column>
        </el-table>
      </el-card>
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