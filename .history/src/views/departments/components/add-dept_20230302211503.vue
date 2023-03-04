<template>
  <!-- //弹窗，需要使用到element的dialog对话框组件 -->
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <!-- //visible：控制是否显示 -->
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="formDataRules" ref="deptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
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
  data() {
    return {
      formData: {
        name: "", //部门名称
        code: "", //部门编码
        manager: "", //部门管理者
        introduce: "", //部门介绍
      },
      formDataRules: {
        name: [
          { required: true, trigger: "blur", message: "部门名称不能为空" },
          {
            min: 1,
            max: 50,
            message: "部门名称不允许重复",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: "部门编码不能为空且不能重复",
          },
          {
            min: 1,
            max: 50,
            message: "部门编码不允许重复",
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, trigger: "blur", message: "部门负责人不能为空" },
          {
            message: "部门负责人",
          },
        ],
        introduce: [
          { required: true, trigger: "blur", message: "部门介绍不能为空" },
          {
            min: 1,
            max: 300,
            message: "部门介绍",
            trigger: "blur",
          },
        ],
      },
    };
  },
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
  methods: {
    btnCancel() {
      this.$refs.deptForm.resetFields(); // 重置校验字段
      this.$emit("update:showDialog", false); // 关闭
    },
    // 点击确定时触发
    btnOK() {
      this.$refs.deptForm.validate(async (isOK) => {
        if (isOK) {
          // await addDepartments({ ...this.formData, pid: this.treeNode.id });
          // this.$emit("addDepts");
          // update:props名称
          this.$emit("update:showDialog", false);
        }
      });
    },
  },
};
</script>

<style>
</style>