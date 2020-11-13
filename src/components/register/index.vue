<template>
  <div id="register-wrapper">
    <el-container>
      <el-header>
        <span>注册</span>
      </el-header>
      <el-main>
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              :type="status.showPassword ? '' : 'password'"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                :style="{ color: status.showPassword ? '#409EFF' : '' }"
                class="el-icon-view"
                @click="status.showPassword = !status.showPassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confPass">
            <el-input
              v-model="registerForm.confPass"
              :type="status.showConfPass ? '' : 'password'"
              placeholder="请再次输入密码"
            >
              <i
                slot="suffix"
                :style="{ color: status.showConfPass ? '#409EFF' : '' }"
                class="el-icon-view"
                @click="status.showConfPass = !status.showConfPass"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-row justify="space-between" type="flex">
              <el-col :span="14">
                <el-input
                  v-model="registerForm.phone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button style="width: 100%">
                  <span v-if="status.resend > 0">{{ status.resend }} 秒后</span>
                  <span v-if="status.resend === -1">获取验证码</span>
                  <span v-else>重新获取</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="registerForm.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submit">
              <span>注册</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <div style="text-align: right">
          <span
            style="text-decoration: underline; cursor: pointer"
            @click="$router.push('/login')"
          >前往登录</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        confPass: "",
        phone: "",
        code: "",
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        confPass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
      status: {
        showPassword: false,
        showConfPass: false,
        resend: -1,
      },
      code: "",
    };
  },
  methods: {
    getCode: function () {
    },
    submit: function () {
      this.$refs["registerForm"].validate((res) => {
        console.log(this.$refs["registerForm"])
        console.log(res)
      })
      console.log(this.registerForm)
    },
  },
  computed: {
    verifyCode: function () {
      return this.registerForm.code === this.code;
    },
  },
};
</script>

<style scoped>
#register-wrapper {
  width: 25%;
  margin: auto;
  min-width: 450px;
}

.el-icon-view {
  cursor: pointer;
}
</style>