<template>
  <div id="admin-login-wrapper">
    <el-container>
      <el-header>
        <span>管理员登录</span>
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
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "AdminLogin",
    data() {
      return {
        loginForm: {
          username: "",
          password: "",
        },
        loginRules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: "blur",},
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur",},
          ],
        },
        status: {
          showPassword: false,
        },
      };
    },
    methods: {
      submit: function () {
      },
    },
  }
</script>

<style scoped>
  #admin-login-wrapper {
    width: 25%;
    margin: auto;
    min-width: 450px;
  }
</style>
