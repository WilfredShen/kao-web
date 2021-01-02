<template>
  <div
    :style="myBackground"
    class="center"
  >
    <div style="width: 40%;">
      <el-card
        style="padding-left: 20px;padding-right: 20px;background-color: #ffffff22"
        shadow="hover"
      >
        <div
          v-for="(item,index) in items"
          :key="index"
          style="display: flex;align-items: center;width: 100%;height: 50px;"
        >
          <div style="width: 35%;text-align: right"><span class="info">{{item.label}}</span></div>
          <div style="width: 65%;text-align: left;">
            <span
              class="info"
              style="padding-left: 15px"
            >{{item.content}}</span>
          </div>
        </div>

        <el-button
          class="func-btn"
          style="background-color: #1e56a0;color: white"
          @click="modify()"
        >
          修改信息
        </el-button>

        <el-button
          v-if="!hasVerifyID"
          class="verify"
          style="margin-left: 10px;background-color: #1e56a0;color: white"
          @click="verifyID()"
        >
          实名认证
        </el-button>

        <el-dropdown
          v-if="!hasVerifyType"
          style="margin-left: 10px;"
          split-button
          @command="handleCommand"
        >
          {{identity}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="学生">学生</el-dropdown-item>
            <el-dropdown-item command="研究生秘书">研究生秘书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          v-if="!hasVerifyType"
          class="verify"
          style="margin-left: 10px;background-color: #1e56a0;color: white"
          @click="verifyType()"
        >
          身份认证
        </el-button>
      </el-card>

      <!--      修改信息-->
      <el-dialog
        :visible.sync="isModify"
        :width="width"
      >
        <el-form
          label-width="20%"
          label-position="right"
          :model="infoForm"
          :rules="infoRules"
          ref="infoForm"
        >
          <el-form-item
            label="手机号:"
            prop="newPhone"
          >
            <el-input v-model="infoForm.newPhone"></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱:"
            prop="newEmail"
          >
            <el-input v-model="infoForm.newEmail"></el-input>
          </el-form-item>
          <div class="func-btn">
            <el-button
              style="background-color: #1e56a0;color: white"
              @click="commitModify('infoForm')"
            >确认修改
            </el-button>
            <el-button
              style="background-color: #1e56a0;color: white"
              @click="cancelModify()"
            >取消修改
            </el-button>
          </div>
        </el-form>
      </el-dialog>

      <!--      实名认证-->
      <el-dialog
        :visible.sync="isVerify"
        :width="idWidth"
      >
        <el-form
          label-position="right"
          label-width="25%"
          :model="idForm"
          :rules="idRules"
          ref="idForm"
        >
          <el-form-item
            label="身份证号："
            prop="idNumber"
          >
            <el-input v-model="idForm.idNumber"></el-input>
          </el-form-item>
          <el-form-item
            label="实名："
            prop="realName"
          >
            <el-input v-model="idForm.realName"></el-input>
          </el-form-item>
          <div class="func-btn">
            <el-button
              style="background-color: #1e56a0;color: white"
              @click="verifyId('idForm')"
            >确认修改
            </el-button>
            <el-button
              style="background-color: #1e56a0;color: white"
              @click="cancelVerify()"
            >取消修改
            </el-button>
          </div>
        </el-form>
      </el-dialog>

      <!--      身份认证-->
      <el-dialog
        :visible.sync="isVerifyType"
        :width="idWidth"
      >
        <el-form
          label-position="right"
          label-width="25%"
          :model="typeForm"
          :rules="typeRules"
          ref="typeForm"
        >
          <el-form-item
            label="学校名："
            prop="collegeName"
          >
            <el-input v-model="typeForm.collegeName"></el-input>
          </el-form-item>
          <el-form-item
            label="工/学号："
            prop="jobNumber"
          >
            <el-input v-model="typeForm.jobNumber"></el-input>
          </el-form-item>
        </el-form>
        <div class="func-btn">
          <el-button
            style="background-color: #1e56a0;color: white"
            @click="verifyACType('typeForm')"
          >确认修改
          </el-button>
          <el-button
            style="background-color: #1e56a0;color: white"
            @click="cancelVerifyType()"
          >取消修改
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {updateUserInfo, getLimit} from '@/assets/lib/getAndSetSelf'
  import {getSchMap} from '@/assets/lib/utils'
  // import {schoolList} from '@/assets/lib/getResultLjm'
  export default {
    name: 'Info',
    props: {
      width: {
        type: String,
        default: '25%'
      },
      idWidth: {
        type: String,
        default: '30%'
      }
    },
    data() {
      return {
        myBackground: {
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        isModify: false,//身份修改弹框
        isVerify: false,//身份验证弹框
        isVerifyType: false,//用户类型弹框
        hasVerifyID: false,//是否已实名验证
        hasVerifyType: false,//是否已验证身份
        infoForm: {
          newPhone: '',
          newEmail: '',
        },
        idForm: {
          idNumber: '',
          realName: '',
        },
        typeForm: {
          collegeName: '',
          jobNumber: ''
        },
        hasVerified: false,//已经验证过身份
        identity: "选择身份",
        verified: '',
        accountType: '',
        items: [
          {label: '用户ID：', content: '',},
          {label: '用户名：', content: '',},
          {label: '手机号码：', content: '',},
          {label: '邮箱地址：', content: '',},
          {label: '实名认证：', content: '',},
          {label: '身份认证：', content: '',},
        ],
        infoRules: {
          newPhone: [
            {pattern: /^1[0-9]{10}$/, message: "请输入格式正确的手机号", trigger: "blur",}
          ],
          newEmail: [
            {
              pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
              message: "请输入格式正确的邮箱",
              trigger: "blur"
            },
          ]
        },
        idRules: {
          idNumber: [
            {required: true, message: "身份证号码不为空！", trigger: "blur"},
          ],
          realName: [
            {required: true, message: "请填写实名！", trigger: "blur"}
          ]
        },
        typeRules: {
          collegeName: [
            {required: true, message: "学校名不为空", trigger: "blur"}
          ],
          jobNumber: [
            {required: true, message: "工/学号不为空", trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      modify: function() {
        this.isModify = !this.isModify;
      },

      verifyID: function() {
        this.isVerify = !this.isVerify;
      },

      verifyType: function() {
        this.isVerifyType = !this.isVerifyType;
      },

      commitModify: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let postPhone, postEmail;
            postPhone = this.infoForm.newPhone === '' ? this.items[2].content : this.infoForm.newPhone;
            postEmail = this.infoForm.newEmail === '' ? this.items[3].content : this.infoForm.newEmail;

            updateUserInfo(postPhone, postEmail)
              .then((res) => {
                console.log("修改成功", res);
                this.$store.commit('setNewPhone', postPhone);
                this.$store.commit('setNewEmail', postEmail);
                this.items[2].content = postPhone;
                this.items[3].content = postEmail;
                this.$refs['infoForm'].resetFields();
                this.isModify = !this.isModify;
              });
          } else {
            this.$message.error("提交失败！请检查输入！");
          }
        });
      },

      cancelModify: function() {
        this.isModify = !this.isModify;
        this.$refs['infoForm'].resetFields();
      },

      cancelVerify: function() {
        this.isVerify = !this.isVerify;
        this.$refs['idForm'].resetFields();
      },

      cancelVerifyType: function() {
        this.isVerifyType = !this.isVerifyType;
        this.$refs['typeForm'].resetFields();
      },

      setSelfInfo: function() {
        this.$axios.get("/api/user/q/user-info")
          .then((res) => {
            let item = res.data.data;
            console.log(item);
            this.items[0].content = item.uid;
            this.items[1].content = item.username;
            this.items[2].content = item.phone;
            this.items[3].content = item.email;
            this.items[4].content = item.verified ? "已实名认证" : "未完成验证";
            this.hasVerifyID = item.verified;
            if (item.accountType === 'tutor') {
              this.items[5].content = '研究生秘书';
              this.hasVerifyType = true;
            } else if (item.accountType === 'student') {
              this.items[5].content = '学生';
              this.hasVerifyType = true;
            } else {
              this.items[5].content = '尚未验证';
            }
          })
          .catch((err) => {
            console.log("错误", err);
          });
      },

      handleCommand: function(command) {
        this.identity = command;
      },

      verifyId: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/vf/real", {
              'identity': this.idForm.idNumber,
              'name': this.idForm.realName
            })
              .then((res) => {
                console.log("认证请求成功了");
                console.log("实名认证返回", res);
                if (res.data.status === 200) {
                  this.$message.success("实名认证成功");
                  this.items[4].content = '已实名认证';
                  this.isVerify = !this.isVerify;
                  this.hasVerifyID = true;
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("实名认证失败，请检查输入信息");
              });
            this.$store.commit('setrealname', '已实名认证');
          }
        })
      },

      verifyACType: function(formName) {
        const schMap = getSchMap(this);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.typeForm.collegeName);
            console.log(this.typeForm.jobNumber);
            if (this.identity === '学生') {
              this.$axios.post("/api/vf/student", {
                cid: schMap.get(this.typeForm.collegeName),
                sid: this.typeForm.jobNumber
              })
                .then((res) => {
                  console.log("认证学生请求成功",res);
                  if (res.data.status === 200) {
                    this.$message.success("认证学生成功!");
                    this.items[5].content = '学生';
                    this.isVerifyType = !this.isVerifyType;
                    this.hasVerifyType = true;
                  }
                })
            }
            if (this.identity === '研究生秘书') {
              this.$axios.post("/api/vf/tutor", {
                cid: '10001',
                tid: this.typeForm.jobNumber
              })
                .then((res) => {
                  if (res.data.status === 200) {
                    this.$message.success("认证研究生秘书成功!");
                    this.items[5].content = '研究生秘书';
                    this.isVerifyType = !this.isVerifyType;
                    this.hasVerifyType = true;
                  }
                })
            }

            getLimit()
              .then((res) => {
                this.$store.commit("setLimit", res);
              });
          }
        })
      },

      fetchData: function() {
        if (this.$store.state.newPhone !== '') {
          this.items[2].content = this.$store.state.newPhone;
        }
        if (this.$store.state.newEmail !== '') {
          this.items[3].content = this.$store.state.newEmail;
        }
      }
    },
    created() {
      this.setSelfInfo();
    },
    watch: {
      "$route": {
        handler(route) {
          console.log(route.name);
          const that = this;
          if (route.name === 'Info') {
            that.fetchData();
          }
        }
      }
    }
  }
</script>

<style scoped>
  .func-btn {
    margin-top: 30px;
  }

  .info {
    font-size: 19px;
    color: #ffffff;
    font-weight: bold;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
</style>

