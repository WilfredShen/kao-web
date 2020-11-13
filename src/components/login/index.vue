<template>
  <div id="login-wrapper">
    <el-container>
      <el-header>
        <span>登录</span>
      </el-header>
      <el-main>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              aria-placeholder="请输入用户名"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              :type="status.showPassword ? '' : 'password'"
              aria-placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submit">
              <span>登录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <div style="text-align: right">
          <span
            style="
              margin-right: 1.4rem;
              text-decoration: underline;
              cursor: pointer;
            "
            @click="$router.push('/register')"
          >注册账号</span>
          <span
            style="text-decoration: underline; cursor: pointer;"
            @click="$router.push('/forgot')"
          >忘记密码</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            require: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            require: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
      status: {
        showPassword: false,
      },
    };
  },
  methods: {
    submit: function () {
      this.$axios
        .post("/api/Visitor/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#login-wrapper {
  width: 25%;
  margin: auto;
  min-width: 450px;
}
</style>