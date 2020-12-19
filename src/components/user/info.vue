<template>
  <div>

    <div v-for="(item,index) in items" :key="index"
         style="display: flex;align-items: center;width: 50%;height: 50px;"
         v-bind:class="index%2===0 ? 'change-color' : ''">
      <div style="width: 35%;text-align: right"><span class="info">{{item.label}}</span></div>
      <div style="width: 65%;text-align: left;">
        <span class="info" style="padding-left: 15px" v-if="isModify || index<2 || index>3">{{item.content}}</span>
        <el-input style="width: 80%" v-if="index===2 && !isModify" v-model="newPhone"></el-input>
        <el-input style="width: 80%" v-if="index===3 && !isModify" v-model="newEmail"></el-input>
      </div>
    </div>

    <el-button class="func-btn" v-show="isModify" style="background-color: #1e56a0;color: white" @click="modify()">修改信息
    </el-button>
    <div class="func-btn" v-show="!isModify">
      <el-button style="background-color: #1e56a0;color: white" @click="commitModify()">确认修改</el-button>
      <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
    </div>

    <el-dropdown v-if="isModify" style="margin-left: 10px;" split-button @command="handleCommand">
      {{identity}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="学生">学生</el-dropdown-item>
        <el-dropdown-item command="研究生秘书">研究生秘书</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-button id="verify" v-if="isModify" style="margin-left: 10px;background-color: #1e56a0;color: white"
               @click="verifyrn(),verifyid()">
      实名与身份认证
    </el-button>
  </div>
</template>

<script>
  import axios from 'axios';
  import {updateUserInfo, getLimit} from '@/assets/lib/getAndSetSelf'

  export default {
    name: 'Info',
    data() {
      return {
        isModify: true,
        newPhone: '',
        newEmail: '',
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
      }
    },
    methods: {
      modify() {
        this.isModify = !this.isModify;
      },
      commitModify() {
        let postPhone, postEmail;
        postPhone = this.newPhone === '' ? null : this.newPhone;
        postEmail = this.newEmail === '' ? null : this.newEmail;

        updateUserInfo(postPhone, postEmail).then(res => {
          console.log("修改成功", res);
          this.isModify = !this.isModify;
          this.newPhone = '';
          this.newEmail = '';
          this.setSelfInfo();
        })

      },
      cancelModify() {
        this.isModify = !this.isModify;
      },
      setSelfInfo() {
        axios.get("/api/user/get_user_info")
          .then(res => {
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
          .catch(err => {
            console.log("错误", err);
          })
      },
      handleCommand(command) {
        this.identity = command;
      },
      //进行实名验证
      verifyrn() {
        axios.post("/api/vf/real", {
          'identity': '330902',
          'name': this.uName
        })
          .then(res => {
            console.log(res.status)
            if (res.status === 200) {
              this.items[4].content = '已实名认证';
            }
          })
        this.$store.commit('setrealname', '已实名认证');
      },
      verifyid() {
        if (this.items[5].content.length !== 4) {
          this.$message("您已认证为" + this.items[5].content + "，不得重复验证");
          return;
        }
        if (this.identity === '学生') {
          axios.post("/api/vf/student", {
            'cid': '10010',
            'sid': this.$store.state.uid,
          })
            .then(res => {
              console.log(res.status)
              if (res.status === 200) {
                this.$message("认证学生成功！")
              }
            })
        } else if (this.identity === '研究生秘书') {
          axios.post("/api/vf/tutor", {
            'cid': '10010',
            'tid': this.$store.state.uid,
          })
            .then(res => {
              console.log(res.status)
              if (res.status === 200) {
                this.$message("认证研究生秘书成功！")
              }
            })
        }

        getLimit().then(res => {
          this.$store.commit("setlimit", res);
        })

        location.reload();
      }
    },
    created() {
      this.setSelfInfo();
    },
  }
</script>

<style scoped>
  .change-color {
    background-color: #d6e4f0;
  }


  .func-btn {
    margin-top: 30px;
  }

  .info {
    font-size: 18px;
  }
</style>

