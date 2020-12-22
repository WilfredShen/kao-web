<template>
  <div>
    <!--    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">-->
    <div v-for="(item,index) in items" :key="index"
         style="display: flex;align-items: center;width: 50%;height: 60px"
         v-bind:class="index%2===0 ? 'change-color' : ''">
      <div style="width: 30%;text-align: right"><span class="info">{{item.label}}</span></div>
      <div style="width: 70%;text-align: left;">
        <span class="info" v-if="isModify || (index<5 && index>1)">{{item.content}}</span>
        <el-input class="new-info" v-if="index===0 && !isModify" v-model="newPhone"></el-input>
        <el-input class="new-info" v-if="index===1 && !isModify" v-model="newEmail"></el-input>
        <el-input class="new-info" v-if="index===5 && !isModify" v-model="newCollege"></el-input>
        <el-input class="new-info" v-if="index===6 && !isModify" v-model="newMajor"></el-input>
        <el-input class="new-info" v-if="index===7 && !isModify" v-model="newResearch"></el-input>
      </div>
    </div>

    <el-button style="background-color: #1e56a0;color: white" class="funcbtn" type="primary" v-show="isModify"
               @click="modify()">修改信息
    </el-button>
    <div class="func-btn" v-show="!isModify">
      <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify()">确认修改</el-button>
      <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
    </div>
    <!--    </div>-->
  </div>
</template>

<script>

  import {updateTeaInfo, updateUserInfo} from '@/assets/lib/getAndSetSelf'

  export default {
    name: 'TutorInfo',
    data() {
      return {
        isModify: true,
        newPhone: '',
        newEmail: '',
        newCollege: '',
        newMajor: '',
        newResearch: '',
        items: [
          {label: '联系电话：', content: ''},
          {label: '邮箱地址：', content: ''},
          {label: '姓名：', content: ''},
          {label: '年龄：', content: ''},
          {label: '性别：', content: ''},
          {label: '所属院校：', content: ''},
          {label: '所属专业：', content: ''},
          {label: '研究方向：', content: ''},
        ]
      }
    },
    methods: {
      modify: function () {
        this.isModify = !this.isModify;
      },

      cancelModify: function () {
        this.isModify = !this.isModify;
      },

      commitModify: function () {
        let pPhone, pEmail, pCollege, pMajor, pResearch;
        pPhone = this.newPhone === '' ? this.items[0].content : this.newPhone;
        pEmail = this.newEmail === '' ? this.items[1].content : this.newEmail;
        pCollege = this.newCollege === '' ? this.items[5].content : this.newCollege;
        pMajor = this.newMajor === '' ? this.items[6].content : this.newMajor;
        pResearch = this.newResearch === '' ? this.items[7].content : this.newResearch;
        updateTeaInfo(pPhone, pEmail, pCollege, pMajor, pResearch)
          .then((res) => {
            console.log(res);
            this.isModify = !this.isModify;
            this.newPhone = '';
            this.newEmail = '';
            this.newCollege = '';
            this.newMajor = '';
            this.newResearch = '';
            this.setTutorInfo();
          });

        updateUserInfo(pPhone, pEmail)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("研究生秘书修改基本信息有问题" + err);
          });
      },

      setTutorInfo: function () {
        this.$axios.get("/api/tutor/q/tutor-info")
          .then((res) => {
            let item = res.data.data;
            this.items[0].content = item.phone;
            this.items[1].content = item.email;
            this.items[2].content = item.name;
            this.items[3].content = item.age;
            this.items[4].content = item.sex ? '男' : '女';
            this.items[5].content = item.college;
            this.items[6].content = item.major;
            this.items[7].content = item.research;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created() {
      this.setTutorInfo();
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
