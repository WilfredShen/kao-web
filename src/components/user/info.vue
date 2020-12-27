<template>
  <div :style="myBackground" class="center">
    <div style="width: 35%;">
      <el-card style="padding-left: 20px;padding-right: 20px;background-color: #ffffff22" shadow="hover">
        <div v-for="(item,index) in items" :key="index"
             style="display: flex;align-items: center;width: 100%;height: 50px;">
          <div style="width: 35%;text-align: right"><span class="info">{{item.label}}</span></div>
          <div style="width: 65%;text-align: left;">
            <span class="info" style="padding-left: 15px">{{item.content}}</span>
          </div>
        </div>

        <el-button class="func-btn" style="background-color: #1e56a0;color: white" @click="modify()">
          修改信息
        </el-button>

        <el-dropdown style="margin-left: 10px;" split-button @command="handleCommand">
          {{identity}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="学生">学生</el-dropdown-item>
            <el-dropdown-item command="研究生秘书">研究生秘书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button id="verify" style="margin-left: 10px;background-color: #1e56a0;color: white"
                   @click="verifyId()">
          实名与身份认证
        </el-button>
      </el-card>
      <el-dialog :visible.sync="isModify" :width="width">
        <el-form label-width="20%"
                 label-position="right"
                 :model="infoForm"
                 :rules="infoRules"
                 ref="infoForm">
          <el-form-item label="手机号:" prop="newPhone">
            <el-input v-model="infoForm.newPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="newEmail">
            <el-input v-model="infoForm.newEmail"></el-input>
          </el-form-item>
          <div class="func-btn">
            <el-button style="background-color: #1e56a0;color: white" @click="commitModify('infoForm')">确认修改</el-button>
            <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {updateUserInfo, getLimit} from '@/assets/lib/getAndSetSelf'
  import {getCookie} from "@/assets/lib/utils";
  export default {
    name: 'Info',
    props: {
      width: {
        type: String,
        default: '25%'
      }
    },
    data() {
      return {
        myBackground:{
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        isModify: false,
        infoForm: {
          newPhone: '',
          newEmail: '',
        },
        hasVerified: false,//已经验证过身份
        identity: "选择身份",
        uid: '',
        uName: '',
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
        }
      }
    },
    methods: {
      modify: function() {
        this.isModify = !this.isModify;
      },

      commitModify: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success("修改成功！");
            let postPhone, postEmail;
            postPhone = this.infoForm.newPhone === '' ? null : this.infoForm.newPhone;
            postEmail = this.infoForm.newEmail === '' ? null : this.infoForm.newEmail;

            updateUserInfo(postPhone, postEmail)
              .then((res) => {
                console.log("修改成功", res);
                this.isModify = !this.isModify;
                this.infoForm.newPhone = '';
                this.infoForm.newEmail = '';
                this.setSelfInfo();
              });
          } else {
            this.$message.error("提交失败！请检查输入！");
          }
        });
      },

      cancelModify: function() {
        this.isModify = !this.isModify;
        this.infoForm.newPhone = '';
        this.infoForm.newEmail = '';
      },

      setSelfInfo: function() {
        this.$axios.get("/api/user/q/user-info")
          .then((res) => {
            let item = res.data.data;
            this.items[0].content = item.uid;
            this.items[1].content = item.username;
            this.items[2].content = item.phone;
            this.items[3].content = item.email;
            this.items[4].content = item.verified ? "已实名认证" : "未完成验证";
            if (item.accountType === 'tutor') {
              this.items[5].content = '研究生秘书';
            } else if (item.accountType === 'student') {
              this.items[5].content = '学生';
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

      verifyId: function() {
        this.$axios.post("/api/vf/real", {
          'identity': '330902',
          'name': this.uName
        })
          .then((res) => {
            console.log(res.status)
            if (res.status === 200) {
              this.items[4].content = '已实名认证';
            }
          });
        this.$store.commit('setrealname', '已实名认证');
        if (this.items[5].content.length !== 4) {
          this.$message("您已认证为" + this.items[5].content + "，不得重复验证");
          return;
        }
        if (this.identity === '学生') {
          this.$axios.post("/api/vf/student", {
            'cid': '10010',
            'sid': getCookie('uid')
          })
            .then((res) => {
              console.log(res.status)
              if (res.status === 200) {
                this.$message("认证学生成功！")
              }
            });
        } else if (this.identity === '研究生秘书') {
          this.$axios.post("/api/vf/tutor", {
            'cid': '10010',
            'tid': getCookie('uid'),
          })
            .then((res) => {
              console.log(res.status)
              if (res.status === 200) {
                this.$message("认证研究生秘书成功！")
              }
            });
        }

        getLimit()
          .then((res) => {
            this.$store.commit("setLimit", res);
          });

        location.reload();
      }
    },
    created() {
      this.setSelfInfo();
    },
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

  .center{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
</style>

