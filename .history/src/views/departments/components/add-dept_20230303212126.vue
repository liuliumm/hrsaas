<template>
  <!-- //弹窗，需要使用到element的dialog对话框组件 -->
  <!-- 新增部门的弹层 -->
  <el-dialog
    :title="formData.id ? '编辑部门' : '新增部门'"
    :visible="showDialog"
    @close="btnCancel"
  >
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
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- 下面的代码没有数据传入时，会提示错误，value？？？？？，解决办法是先给它一个value，随便赋值。 -->
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
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
          v-model="formData.introduce"
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
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
直接声明函数时，该函数是一个全局函数（要区分是否是严格函数），是window.fn

<script>
import {
  getDepartments,
  addDepartments,
  getDepartmentsById,
  editDepartmentById,
} from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";
export default {
  name: "add-dept",
  data() {
    // 检查部门名称是否重复      因为校验规则是层层递减的，当走到此步时，必然有了数据，所以此处不需要再次校验是否有值
    // async function checkNameRepeat(rule, value, callback) {   //直接声明为函数是错误的，因为vue会对函数进行处理，这是一个黑盒，我们不知道它内部是如何处理的，而且声明为函数时，它的this会指向该函数本身，而不再是上下文。
    const checkNameRepeat = async (rule, value, callback) => {
      //静态作用域：在定义的位置  自内向外找  注意：不管它在哪里使用。
      const { depts } = await getDepartments().catch((err) => err); // 动态作用域： this  根据不同的运行条件和环境来决定this的值是谁，
      if (!Array.isArray(depts)) {
        //判断一下获取到的数据是不是数组                              // 这里使用动态作用域虽然也可以，但是这个查找很繁琐，所以我们使用const来声明一个变量，从而指定我们所需要的this指向
        depts = [];
      }
      let isRepeat = [];
      if (this.formData.id) {
        console.log("1",this.formData.id);
        // 只有编辑时才需要排除自己
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.pid) // 该方法会在找到的时候停止遍历，而不是将整个数据遍历完
          .filter((it) => it.id !== this.treeNode.id); // 将当前节点的自己排除掉
      } else {
        isRepeat = depts.filter((item) => item.pid === this.treeNode.id);
      }
      const isRepeats = isRepeat.some((item) => item.name === value); // 判断是否有相同的name
      // console.log("item:", item);  //打印判断了几次
      isRepeats
        ? callback(new Error(`同级部门下已经有${value}了`))
        : callback();
    };
    // 检查编码重复
    const checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments();
      if (!Array.isArray(depts)) {
        depts = [];
      }
      let isRepeat = depts;
      if (this.formData.id) {
        isRepeat = isRepeat.filter((it) => it.id !== this.treeNode.id);
      }
      const isRepeats = isRepeat.some((item) => item.code === value); // 判断当前输入的部门编码 是否 和已有的部门编码重复
      isRepeats
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback();
    };
    return {
      formData: {
        // pid在此处不需要声明为响应式数据，因为并没有用到，相反，如果声明了而不用，反而会浪费性能，因为这会导致该数据被做一次数据拦截。
        name: "", //部门名称
        code: "", //部门编码
        manager: "", //部门管理者
        introduce: "", //部门介绍
      },
      formDataRules: {
        // triggers的值'blur',是默认值?，该值为失去焦点时触发。required只写一次就行了
        name: [
          { required: true, message: "部门名称不能为空", trigger: 'blur'},
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: 'blur',
            validator: "checkNameRepeat",
          },
          { validator: checkNameRepeat },
        ],
        code: [
          {
            required: true,
            message: "部门编码不能为空且不能重复",trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",trigger: 'blur'
          },
          {
            validator: checkCodeRepeat, // 自定义函数的形式校验
            trigger: 'blur'
          },
        ],
        manager: [
          { trigger: "blur", message: "部门负责人不能为空",trigger: 'blur' },
          {
            message: "部门负责人",trigger: 'blur'
          },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空",trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: "部门介绍要求1-300个字符",trigger: 'blur'
          },
        ],
      },
      peoples: [],
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
    async getDepartmentsById(id) {
      this.formData = await getDepartmentsById(id);
    },
    btnCancel() {
      //在点击关闭按钮时，再次打开编辑页面会出现数据没有清空的情况，我们将resetFieleds下移，仍然不能解决问题，所以在此处重新将formdata各字段清空，并将该方法移至最后执行，以确保数据重置
      this.$emit("update:showDialog", false); // 关闭
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs.deptForm.resetFields(); // 重置校验字段+清空表单数据
    },
    // 点击确定时触发
    btnOK() {
      //这里的校验是对表单整体的校验，所以使用ref获取组件实例时，要获取整体的form表单
      this.$refs.deptForm.validate(async (isOK) => {
        if (isOK) {
          //或在此处直接取isok的反值（!isOk），然后return跳出条件
          try {
            // if (this.formData.id) { 
              // await addDepartments({ 
              // await editDepartmentById({
                // ...this.formData,
                // pid: this.treeNode.id,
              // });
            // } else {
              await addDepartments({ ...this.formData, pid: this.treeNode.id });
            // }
            this.$emit("AddDept"); //触发父组件监听的事件，前端主页同步更新数据
            this.$refs.deptForm.resetFields(); //重置整个表单数据 + 清空校验提示
            // TODO 关闭弹窗
            // 子组件 update:固定写法 (update:props名称, 值)
            // update:props名称
            this.$emit("update:showDialog", false);
            this.$message({
              type: "success", // 此处的success是由后台接口文档规定的
              message: "操作成功",
            })
            //  表单数据清空 弹层关闭
            this.$refs.addDeptForm.resetFields() // 重置表单数据 + 清空校验提示
            this.$emit('update:show-dialog', false)
          } catch (error) {
            this.message.error("操作失败，请重试！");
          }
        }
      });
    },
    async getEmployeeSimple() {
      // 新增部门时的负责人一栏的数据列表
      // const peoples = []
      this.peoples = await getEmployeeSimple();
      // const people = await getEmployeeSimple()
      // console.log("pp", people)
      // this.peoples = people
    },
  },
};
</script>

<style>
</style>