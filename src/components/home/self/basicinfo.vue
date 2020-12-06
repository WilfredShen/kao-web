<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">

      <div v-for="(item,index) in items" :key="index"
           style="display: flex;align-items: center;width: 60%" v-bind:class="index%2===0 ? 'change-color' : ''">
        <div style="width: 30%;text-align: right"><p>{{item.label}}</p></div>
        <div style="width: 70%;text-align: left;">
          <p v-if="ismodify || index<2 || index>3">{{item.content}}</p>
          <el-input style="width: 80%" v-if="index===2 && !ismodify" v-model="newphone"></el-input>
          <el-input style="width: 80%" v-if="index===3 && !ismodify" v-model="newemail"></el-input>
        </div>
      </div>

      <el-button class="funcbtn" type="primary" v-show="ismodify" @click="modify()">修改信息</el-button>
      <div class="funcbtn" v-show="!ismodify">
        <el-button type="primary" @click="commitmodify()">确认修改</el-button>
        <el-button @click="canclemodify()">取消修改</el-button>
      </div>

      <el-dropdown v-if="ismodify" style="margin-left: 10px" split-button type="primary" @command="handleCommand">
        {{identity}}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="学生">学生</el-dropdown-item>
          <el-dropdown-item command="研究生秘书">研究生秘书</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button v-if="ismodify" type="primary" style="margin-left: 10px" @click="verifyrn(),verifyid()">实名与身份认证
      </el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {updateUserInfo} from '../../../assets/lib/getSelf'

  export default {
    data() {
      return {
        ismodify: true,
        newphone: '',
        newemail: '',
        hasvfrn: false,//已经验证过实名
        hasvfid: false,//已经验证过身份
        identity: "选择身份",
        uid: '',
        uname: '',
        phone: null,
        email: null,
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
        var postphone, postemail;
        if (this.newphone === '') {
          postphone = this.phone;
        } else {
          postphone = this.newphone;
        }

        if (this.newemail === '') {
          postemail = this.email;
        } else {
          postemail = this.newemail;
        }

        updateUserInfo(postphone, postemail).then(res => {
          console.log(res);
          this.ismodify = !this.ismodify;
          this.newphone = '';
          this.newemail = '';
          this.setSelfInfo();
        })
      },
      canclemodify() {
        this.ismodify = !this.ismodify;
      },
      setSelfInfo() {
        axios.get("/api/user/get_user_info")
          .then(res => {
            let item = res.data.data;
            this.items[0].content = item.uid;
            this.items[1].content = item.username;
            this.$store.commit('setUsername', item.username);
            this.items[2].content = item.phone;
            this.items[3].content = item.email;
            this.items[4].content = this.$store.state.realname;
            this.items[5].content = this.$store.state.identify;
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
          'name': this.uname
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
        if (this.identity === '学生') {
          axios.post("/api/vf/student", {
            'cid': '10010',
            'sid': '2018101'
          })
            .then(res => {
              console.log(res.status)
              if (res.status === 200) {
                this.items[5].content = this.identity;
              }
            })
        } else if (this.identity === '研究生秘书') {
          axios.post("/api/vf/tutor", {
            'cid': '10010',
            'tid': '201820'
          })
            .then(res => {
              console.log(res.status)
              if (res.status === 200) {
                this.items[5].content = this.identity;
              }
            })
        }
        this.$store.commit('setindentify', this.identity);

      }
    },
    created() {
      this.setSelfInfo();
    },
  }
</script>

<style scoped>
  .change-color {
    background-color: #eef1f6;
  }

  .funcbtn {
    margin-top: 30px;
  }
</style>
