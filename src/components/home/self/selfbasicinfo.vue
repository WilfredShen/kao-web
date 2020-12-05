<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">

      <div v-for="(item,index) in items" :key="index"
           style="display: flex;align-items: center;width: 60%" v-bind:class="{changeColor:index%2===0}">
        <div style="width: 30%;text-align: right"><p>{{item.label}}</p></div>
        <div style="width: 70%;text-align: left;">
          <p v-if="ismodify || index<2">{{item.content}}</p>
          <el-input style="width: 80%" v-if="index===2 && !ismodify" v-model="newphone"></el-input>
          <el-input style="width: 80%" v-if="index===3 && !ismodify" v-model="newemail"></el-input>

        </div>
      </div>

      <el-button type="primary" v-show="ismodify" @click="modify()">修改信息</el-button>
      <div v-show="!ismodify">
        <el-button type="primary" @click="commitmodify()">确认修改</el-button>
        <el-button @click="canclemodify()">取消修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        ismodify: true,
        newphone: '',
        newemail: '',
        hasvf: false,
        uid: '',
        uname: '',
        phone: '',
        email: '',
        varified: '',
        accountType: '',
        items: [
          {
            label: '用户ID：',
            content: '',
          },
          {
            label: '用户名：',
            content: '',
          },
          {
            label: '手机号码：',
            content: '',
          },
          {
            label: '邮箱地址：',
            content: '',
          },
          {
            label: '实名认证：',
            content: '',
          },
          {
            label: '身份认证：',
            content: '',
          },
        ]
      }
    },
    methods: {
      modify() {
        this.ismodify = !this.ismodify;
      },
      commitmodify() {
        console.log("进入了提交");
        console.log("newphone = " + this.newphone);
        console.log("newemail = " + this.newemail);
        axios.post("/api/user/update_user_msg", {
          'phoneNumber': this.newphone,
          'email': this.newemail,
          'accountType': '',
        })
          .then(res => {
            console.log(res.status);
          })
          .catch(error => {
            console.log(error);
          })
        this.ismodify = !this.ismodify;
        this.newphone = '';
        this.newemail = '';
        this.setSelfInfo();
      },
      canclemodify() {
        this.ismodify = !this.ismodify;
      },
      setSelfInfo() {
        axios.get("/api/user/get_user_info")
          .then(res => {
            let item = res.data.data;
            console.log(item);
            this.items[0].content = item.uid;
            this.items[1].content = item.username;
            this.$store.commit('setUsername', item.username);
            this.items[2].content = item.phone;
            this.items[3].content = item.email;
            // this.items[4].content = item.verified;
            this.items[5].content = item.accountType;
          })
          .catch(err => {
            console.log(err);
          })
      },
    },
    created() {
      this.setSelfInfo();
    }
  }
</script>

<style scoped>
  .changeColor {
    background-color: #eef1f6;
  }
</style>
