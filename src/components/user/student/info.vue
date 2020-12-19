<template>
  <div>
    <div v-for="(item,index) in items" :key="index"
         style="display: flex;align-items: center;width: 50%;height: 60px"
         v-bind:class="index%2===0 ? 'change-color' : ''">
      <div style="width: 35%;text-align: right;"><span class="info">{{item.label}}</span></div>
      <div style="width: 65%;text-align: left">
        <span class="info" style="padding-left: 15px" v-if="isModify || (index<5 && index>1)">{{item.content}}</span>
        <el-input class="new-info" v-if="index===0 && !isModify" v-model="newPhone"></el-input>
        <el-input class="new-info" v-if="index===1 && !isModify" v-model="newEmail"></el-input>
        <el-input class="new-info" v-if="index===5 && !isModify" v-model="newCollege"></el-input>
        <el-input class="new-info" v-if="index===6 && !isModify" v-model="newMajor"></el-input>
        <el-input class="new-info" v-if="index===7 && !isModify" v-model="newGraduate"></el-input>
        <el-input class="new-info" v-if="index===8 && !isModify" v-model="newExpect"></el-input>
      </div>
    </div>

    <el-button class="func-btn" style="background-color: #1e56a0;color: white" type="primary" v-show="isModify"
               @click="modify()">修改信息
    </el-button>
    <div class="func-btn" v-show="!isModify">
      <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify()">确认修改</el-button>
      <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
    </div>
  </div>
</template>

<script>

  import {updateStuInfo, updateUserInfo} from '@/assets/lib/getAndSetSelf'
  import {checkEmail, checkMobile} from "@/assets/lib/utils";

  export default {
    name: 'StudentInfo',
    data() {
      return {
        isModify: true,
        newPhone: '',
        newEmail: '',
        newCollege: '',
        newMajor: '',
        newGraduate: '',
        newExpect: '',
        items: [
          {label: '联系电话：', content: ''},
          {label: '邮箱地址：', content: ''},
          {label: '姓名：', content: ''},
          {label: '年龄：', content: ''},
          {label: '性别：', content: ''},
          {label: '本科就读高校：', content: ''},
          {label: '本科就读专业：', content: ''},
          {label: '本科毕业时间：', content: ''},
          {label: '预期专业：', content: ''},
        ]
      }
    },
    methods: {
      modify() {
        this.isModify = !this.isModify;
      },
      cancelModify() {
        this.isModify = !this.isModify;
      },
      commitModify() {
        let pPhone, pEmail, pCollege, pMajor, pGraduate, pExpectMajor;
        pPhone = this.newPhone === '' ? this.items[0].content : this.newPhone;
        if (!checkMobile(pPhone)) {
          this.$message("手机号验证错误");
          return;
        }
        pEmail = this.newEmail === '' ? this.items[1].content : this.newEmail;
        if (!checkEmail(pEmail)) {
          this.$message("邮箱验证错误");
          return;
        }
        pCollege = this.newCollege === '' ? this.items[5].content : this.newCollege;
        pMajor = this.newMajor === '' ? this.items[6].content : this.newMajor;
        pGraduate = this.newGraduate === '' ? this.items[7].content : this.newGraduate;
        pExpectMajor = this.newExpect === '' ? this.items[8].content : this.newExpect;
        let uid = this.$store.state.uid;
        updateStuInfo(uid, pPhone, pEmail, pCollege, pMajor, pExpectMajor, pGraduate)
          .then(res => {
            console.log(res);
            this.isModify = !this.isModify;
            this.newPhone = '';
            this.newEmail = '';
            this.newCollege = '';
            this.newMajor = '';
            this.newGraduate = '';
            this.newExpect = '';
            this.setStuInfo();
          })
          .catch(error => {
            console.log("stu info 有问题" + error)
          });

        updateUserInfo(pPhone, pEmail)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log("学生修改基本信息有问题" + err)
          })
      },
      setStuInfo() {
        this.$axios.get("/api/stu/get_stu_info", {
          params: {
            uid: this.$store.state.uid
          }
        })
          .then(res => {
            console.log(res);
            let item = res.data.data;
            this.items[0].content = item.phone;
            this.items[1].content = item.email;
            this.items[2].content = item.name;
            this.items[3].content = item.age;
            this.items[4].content = item.sex ? '男' : '女';
            this.items[5].content = item.college;
            this.items[6].content = item.major;
            this.items[7].content = item.graduationDate;
            this.items[8].content = item.expectedMajor;
          }).catch(error => {
          console.log("学生信息请求失败" + error);
        })
      },
    },
    created() {
      this.setStuInfo();
    }
  }
</script>

<style scoped>
  .change-color {
    background-color: #d6e4f0;
  }

  .func-btn {
    margin-top: 30px;
  }

  .new-info {
    width: 80%;
  }

  .info {
    font-size: 18px;
  }
</style>
