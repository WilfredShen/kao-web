<template>
  <div>
    <body>
    <div
      class="container"
      id="container"
    >
      <div id="login-wrapper">
        <el-container>
          <el-main style="width: 80%;margin-left: 20px;margin-top: 80px">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              label-position="left"
              label-width="80px"
            >
              <el-form-item
                class="myLogin"
                label="用户名"
                prop="username"
              >
                <el-input
                  v-model="loginForm.username"
                  aria-placeholder="请输入用户名"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                class="myLogin"
                label="密码"
                prop="password"
              >
                <el-input
                  v-model="loginForm.password"
                  :type="status.showPassword ? '' : 'password'"
                  aria-placeholder="请输入密码"
                >
                  <i
                    slot="suffix"
                    :style="{ color: status.showPassword ? '#409EFF' : '' }"
                    class="el-icon-view"
                    @click="status.showPassword = !status.showPassword"
                  ></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%;background-color: #1e56a0"
                  type="primary"
                  @click="submit"
                >
                  <span>登录</span>
                </el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer>
            <div style="text-align: right">
              <!--            <router-link-->
              <!--              class="link"-->
              <!--              :to="{ path: '/admin/login'}"-->
              <!--              style="margin-right: 1.5rem;cursor: pointer;"-->
              <!--            >-->
              <!--              管理员登录-->
              <!--            </router-link>-->
              <router-link
                class="link"
                :to="{ path: '/'}"
                style="margin-right: 1.5rem;cursor: pointer;"
              >
                回到首页
              </router-link>
              <router-link
                class="link"
                :to="{ path: '/register'}"
                style="margin-right: 1.5rem;cursor: pointer;"
              >
                注册账号
              </router-link>
              <router-link
                class="link"
                :to="{ path: '/pwd' }"
                style="margin-right: 1.5rem;cursor: pointer;"
              >
                忘记密码
              </router-link>
            </div>
          </el-footer>
        </el-container>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <h1>welcome back!</h1>
          <br>
          <p>
            To keep connected with us please login with your personal info
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
    name: "Login",
    components: {
      Footer,
    },
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
      submit: function() {
        this.$axios
          .post("/api/visitor/login", {
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
          .then((res) => {
            if (res.data.status === 200) {
              let callback = this.$route.query.callback;
              if (callback) {
                this.$message.success("登陆成功！即将跳转至原界面...");
              } else {
                callback = "/";
                this.$message.success("登陆成功！即将跳转至主页...");
              }

              setTimeout(() => {
                this.$router.push(callback.toString());
              }, 3000);
            } else if (res.data.status === 410) {
              this.$message.error("用户名错误！");
            } else if (res.data.status === 414) {
              this.$message.error("密码错误！");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style scoped>
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

  #login-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 100%;
    width: 50%;
    padding: 0 35px;
    transform: translateX(80%);
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
    font-size: 35px;
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
    transform: translateX(-100%);
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
</style>
