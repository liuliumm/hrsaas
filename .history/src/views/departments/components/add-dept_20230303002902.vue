<template>
  <!-- //弹窗，需要使用到element的dialog对话框组件 -->
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <!-- //visible：控制是否显示 -->
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      label-width="120px"
      :model="formData"
      :rules="formDataRules"
      ref="deptForm"
    >
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
          @focus="getEmployeeSimple"
        >
          <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
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
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees"
export default {
  name: "add-dept",
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      const isRepeat = depts
        .filter((item) => item.pid === this.treeNode.id)
        .some((item) => item.name === value);
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}部门了`))
        : callback();
    };
    // 检查编码重复
    const checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments();
      const isRepeat = depts.some((item) => item.code === value); // 判断当前输入的部门编码 是否 和已有的部门编码重复
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback();
    };
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
            message: "部门名称要求1-50个字符",
            trigger: "blur",
            validator: "checkNameRepeat",
          },
          { trigger: "blur", validator: checkNameRepeat },
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
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkCodeRepeat, // 自定义函数的形式校验
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
            message: "部门介绍要求1-300个字符",
            trigger: "blur",
          },
        ],
      },
      peoples: []
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
    async getEmployeeSimple() {
      // const peoples = []
      // this.peoples = await getEmployeeSimple()
      const peoples = await getEmployeeSimple()
      // console.log("pp", peoples);
      return peoples
    }
  },
};
</script>

<style>
</style>