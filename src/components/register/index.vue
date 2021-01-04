<template>
  <div>
    <body>
    <div
      class="container"
      id="container"
    >
      <div id="register-wrapper">
        <el-container>
          <el-main style="width: 80%;margin-left: 20px;margin-top: 60px">
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="registerRules"
              label-position="left"
              label-width="80px"
            >
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
              ></el-input>
              <el-form-item
                class="myLogin"
                label="密码"
                prop="password"
                style="margin-top: 25px"
              >
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
              <el-form-item
                class="myLogin"
                label="确认密码"
                prop="confPass"
                style="margin-top: 28px"
              >
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
              <el-form-item
                class="myLogin"
                label="手机号"
                prop="phone"
                style="margin-top: 25px"
              >
                <el-col :span="14">
                  <el-input
                    v-model="registerForm.phone"
                    placeholder="请输入手机号码"
                  ></el-input>
                </el-col>
                <el-col :span="9">
                  <el-button
                    style="width: 100%; padding-left: 0; padding-right: 0; margin-left:8px;text-align: center"
                    @click="getCode()"
                  >
                    <span v-if="status.resend > 0">{{ status.resend }} 秒后</span>
                    <span v-if="status.resend === -1">获取验证码</span>
                    <span v-else>重新获取</span>
                  </el-button>
                </el-col>
              </el-form-item>
              <el-form-item
                class="myLogin"
                label="验证码"
                prop="code"
              >
                <el-input
                  v-model="registerForm.code"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%;background-color: #1e56a0"
                  type="primary"
                  @click="submit()"
                >
                  <span>注册</span>
                </el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer style="margin-bottom: 25px">
            <div style="text-align: right;">
              <router-link
                class="link"
                :to="{ path: '/login'}"
                style="cursor: pointer"
              >
                前往登录
              </router-link>
            </div>
          </el-footer>
        </el-container>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <h1>Hello Friend!</h1>
          <br>
          <p>
            Enter your personal details and start journey with us!
          </p>
        </div>
      </div>
    </div>
    </body>
    <div style="display: block;bottom: 0;background-color: #f6f5f7; ">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

  import '@/assets/css/login.css';
  import Footer from "@/components/home/footer";

  export default {
    name: "Register",
    components: {
      Footer,
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
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
            {required: true, message: "用户名不能为空", trigger: "blur",},
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur",},
            {pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,10}$/, message: "密码必须由字母、数字组成，区分大小写，长度为6-10"}
          ],
          confPass: [
            {required: true, message: "密码不能为空", trigger: "blur",},
            {validator: validatePass, trigger: "blur"}
          ],
          phone: [
            {required: true, message: "手机号不能为空", trigger: "blur",},
            {pattern: /^1[0-9]{10}$/, message: "请输入格式正确的手机号", trigger: "blur",}
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
      getCode: function() {
        if (this.registerForm.phone == null || this.registerForm.phone === "") {
          this.$alert('请输入手机号！', '提示', {
            confirmButtonText: '确定',
          });
          return;
        }
        var regu = /^1[0-9]{10}$/;
        if (!regu.test(this.registerForm.phone)) {
          this.$alert('请输入格式正确的手机号！', '提示', {
            confirmButtonText: '确定',
          });
          return;
        }
        if (this.status.resend > 0) {
          return;
        }
        this.status.resend = 60;
        const timer = setInterval(() => {
          this.status.resend--;
          if (this.status.resend === 0) {
            clearInterval(timer);
          }
        }, 1000);

        this.$axios
          .post("/api/visitor/getvfcode", {
            phoneNumber: this.registerForm.phone,
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
      submit: function() {
        console.log(this.registerForm);
        this.$axios
          .post("/api/visitor/register", {
            username: this.registerForm.username,
            password: this.registerForm.password,
            phoneNumber: this.registerForm.phone,
            verificationCode: this.registerForm.code,
          })
          .then((res) => {
            if (res.data.status === 200) {
              this.$message.success("注册成功！即将跳转至登录界面...");
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            } else if (res.data.status === 421) {
              this.$message.error("注册失败！该手机号已经注册过");
            } else if (res.data.status === 413) {
              this.$message.error("注册失败！该用户名已经存在")
            } else if (res.data.status === 425) {
              this.$message.error("注册失败！验证码错误")
            } else {
              this.$message.error("注册失败！")
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
  #register-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 100%;
    width: 50%;
    padding: 0 40px;
    transform: translateX(-5%);
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #F6F5F7;
  }

  .container {
    position: relative;
    width: 900px;
    max-width: 100%;
    min-height: 480px;
    background-color: white;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    border-radius: 10px;
    overflow: hidden;
  }

  .link {
    height: 20px;
    color: #9AA9B7;
    text-decoration: none;
    margin: 5px 0 15px;
    font-size: 15px;
    text-transform: capitalize;
  }

  h1 {
    text-transform: capitalize;
    font-size: 40px;
    text-align: center;
  }

  p {
    margin: 10px 0 30px;
  }

  .overlay-container {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #163172;
    overflow: hidden;
    transform: translateX(0%);
  }

  .overlay {
    position: absolute;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    text-align: center;
    color: white;
    font-size: 15px;
  }

  .el-icon-view {
    cursor: pointer;
  }
</style>
