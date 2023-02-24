<template>
  <div class="login-container">
    <!-- model属性（表单对应的数据对象），rules规则（表单的校验规则对象） -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <!-- 校验属性 -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- 需要双向数据绑定（必须绑定model指定的数据对象的属性） -->
        <!-- //el的键盘事件（elment并没有自定义同名的键盘事件，所以native必须添加，要不然不生效） -->
        <!-- @keyup.enter.**`native`** 表示监听组件的原生事件，比如 keyup就是于input的原生事件，
              这里写native表示keyup是一个原生事件 -->
        <!-- //之前vant中的button的click事件，并没有添加native，这是因为vant给button自定义了一个click事件，
        对应的就是原生button的click事件  <van-button type="primary" native-type="button" @click=""/> -->
        <el-input
          @keyup.enter.native="handleLogin"
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="mobile"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- //el的鼠标事件（element 自定义了大多数的鼠标事件，所以鼠标事件很多都不需要添加native）
        //当然添加上去native也肯定没问题 -->
      <el-button
        class="loginBtn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        <!-- //其实element中的button的默认类型不是submit（vant是），所以这个prevent可以不用添加 -->
        登录
      </el-button>

      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { mapActions } from "vuex"; // 1\引入vuex的辅助函数
export default {
  name: "Login",
  data() {
    // 自定义校验函数
    const validateMobile = (rule, value, callback) => {
      //注意校验函数是定义在data函数内部，return前边的外边 *****
      // 校验value
      // if (!validMobile(value)) {
      // 如果通过 直接执行callback
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }
      validMobile(value) ? callback() : callback(new Error("手机号格式不正确"));
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "13800000002", // 修改默认手机号
        password: "123456", //默认密码改为123456
      },
      // 需要注意：loginRules的字段名必须与loginForm的字段名保持一致
      loginRules: {
        //validator是自定义校验器，可以使用正则来校验
        mobile: [
          { required: true, trigger: "blur", message: "手机号不能为空" },
          { validator: validateMobile, trigger: "blur" },
        ],
        // 其实这里完全不用自定义校验函数 , 因为可以使用pattern来代替
        // mobile: [{ required: true, trigger: 'blur', message: '手机号不能为空' }, {
        //   trigger: 'blur', pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'
        // }],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 16,
            message: "密码的长度在6-16位之间 ",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  methods: {
    ...mapActions(["user/login"]),  //2\引入action方法
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // 3\调用登录
      this.$refs.loginForm.validate(async (isOK) => {
        if (isOK) {
          try {
            this.loading = true;
            // this.$store.dispatch('user/login', this.loginForm).then(() => {
              // 3.1\校验通过 调用action
            await this["user/login"](this.loginForm); //调用的是Vuex中子模块的action，该模块我们进行了namespaced: true，
                                                        // 所以引用aciton时需要带上`user/`, 并且在使用该方法时，直接使用 `this['user/login']`  ----使用this.user/login 语法是错误的
            // this.$router.push({ path: this.redirect || '/' })
            // 3.2\登录成功之后
            this.$router.push("/");
            // this.loading = false
            // }).catch(() => {
          } catch (error) {
            this.loading = false;
            console.log(error);
            // })
            // } else {
            //   console.log('error submit!!')
            //   return false
          } finally {
            //  3.3\不论执行try 还是catch  都去关闭转圈
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }
  //修改.el-form-item 表单样式如下：
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  //增加表单错误信息颜色：
  .el-form-item__error {
    color: #fff;
  }

  // 登录按钮的样式
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
// $light_gray:#eee;
//修改变量的值$light_gray：
$light_gray: #68b0fe; // 将输入框颜色改成蓝色

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  // 需要在样式表中使用**`@`**别名的时候，需要在@前面加上一个**`~`**符号，否则不识别
  background-image: url("~@/assets/common/login.jpg"); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
