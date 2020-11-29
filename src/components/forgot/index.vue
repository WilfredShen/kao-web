<template>
  <div id="forgot-wrapper">
    <el-container>
      <el-header>
        <span>修改密码</span>
      </el-header>
      <el-main>
        <el-form
          ref="forgotForm"
          :model="forgotForm"
          :rules="forgotRules"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="forgotForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="forgotForm.password"
              :type="status.showPassword ? '' : 'password'"
              placeholder="请输入新密码"
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
              v-model="forgotForm.confPass"
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
                  v-model="forgotForm.phone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                  style="width: 100%; padding-left: 0; padding-right: 0; text-align: center"
                  @click="getCode"
                >
                  <span v-if="status.resend > 0">{{ status.resend }} 秒后</span>
                  <span v-if="status.resend === -1">获取验证码</span>
                  <span v-else>重新获取</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="forgotForm.code"
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
          <router-link
            :to="{ path: '/login'}"
            style="text-decoration: underline; cursor: pointer"
          >
            前往登录
          </router-link>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
<<<<<<< HEAD
    export default {
        name: "Forgot",
        data() {
            return {
                forgotForm: {
                    username: "",
                    password: "",
                    confPass: "",
                    phone: "",
                    code: "",
                },
                forgotRules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: "blur",},
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur",},
                    ],
                    confPass: [
                        {required: true, message: "密码不能为空", trigger: "blur",},
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur",},
                    ],
                    code: [
                        {required: true, message: "验证码不能为空", trigger: "blur",},
                    ],
                },
                status: {
                    showPassword: false,
                    showConfPass: false,
                    resend: -1,
                },
            };
        },
        methods: {
            getCode: function () {
                if (this.status.resend > 0)
                    return;
                this.status.resend = 60;
                const timer = setInterval(() => {
                    this.status.resend--;
                    if (this.status.resend === 0) clearInterval(timer);
                }, 1000);

                this.$axios
                    .post("/api/getvfcode", {
                        phoneNumber: this.phone,
                    })
                    .then((res) => {
                        if (res.data.state === 200) {
                            console.log(res.data.message);
                        } else {
                            console.log(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err.data);
                    });
            },
            submit: function () {
                this.$axios
                    .post("/api/visitor/forgetpassword", {
                        username: this.forgotForm.username,
                        password: this.forgotForm.password,
                        phoneNumber: this.forgotForm.phone,
                        verificationCode: this.forgotForm.code,
                    })
                    .then((res) => {
                        if (res.data.state === 200) {
                            this.$router.push("/");
                        } else {
                            console.log(res.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err.data);
                    });
            },
        },
    };
</script>

<style scoped>
  #forgot-wrapper {
    width: 25%;
    margin: auto;
    min-width: 450px;
  }

  .el-icon-view {
    cursor: pointer;
  }
</style>
=======
export default {
  name: "Forgot",
  data() {
    return {
      forgotForm: {
        username: "",
        password: "",
        confPass: "",
        phone: "",
        code: "",
      },
      forgotRules: {
        username: [
          {required: true, message: "用户名不能为空", trigger: "blur",},
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur",},
        ],
        confPass: [
          {required: true, message: "密码不能为空", trigger: "blur",},
        ],
        phone: [
          {required: true, message: "手机号不能为空", trigger: "blur",},
        ],
        code: [
          {required: true, message: "验证码不能为空", trigger: "blur",},
        ],
      },
      status: {
        showPassword: false,
        showConfPass: false,
        resend: -1,
      },
    };
  },
  methods: {
    getCode: function () {
      if (this.status.resend > 0)
        return;
      this.status.resend = 60;
      const timer = setInterval(() => {
        this.status.resend--;
        if (this.status.resend === 0) clearInterval(timer);
      }, 1000);

      this.$axios
        .post("/api/getvfcode", {
          phoneNumber: this.phone,
        })
        .then((res) => {
          if (res.data.state === 200) {
            console.log(res.data.message);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    submit: function () {
      this.$axios
        .post("/api/visitor/forgetpassword", {
          username: this.forgotForm.username,
          password: this.forgotForm.password,
          phoneNumber: this.forgotForm.phone,
          verificationCode: this.forgotForm.code,
        })
        .then((res) => {
          if (res.data.state === 200) {
            this.$router.push("/");
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
};
</script>

<style scoped>
#forgot-wrapper {
  width: 25%;
  margin: auto;
  min-width: 450px;
}

.el-icon-view {
  cursor: pointer;
}
</style>
>>>>>>> 6a11c12626f042e559b9256082a88e24950a12aa
