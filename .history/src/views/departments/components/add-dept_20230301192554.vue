<template>
  <!-- //弹窗，需要使用到element的dialog对话框组件 -->
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- //visible：控制是否显示 -->
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "add-dept",
  // 需要传入一个props变量来控制 显示或者隐藏
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    // 添加子部门时：标识当前添加的部门的父部门
    treeNode: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>