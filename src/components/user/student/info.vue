<template>
  <div>
    <div v-for="(item,index) in items" :key="index"
         style="display: flex;align-items: center;width: 50%;height: 60px"
         v-bind:class="index%2===0 ? 'change-color' : ''">
      <div style="width: 35%;text-align: right;"><span class="info">{{item.label}}</span></div>
      <div style="width: 65%;text-align: left">
        <span class="info" style="padding-left: 15px" v-if="ismodify || (index<5 && index>1)">{{item.content}}</span>
        <el-input class="newinfo" v-if="index===0 && !ismodify" v-model="newphone"></el-input>
        <el-input class="newinfo" v-if="index===1 && !ismodify" v-model="newemail"></el-input>
        <el-input class="newinfo" v-if="index===5 && !ismodify" v-model="newcollege"></el-input>
        <el-input class="newinfo" v-if="index===6 && !ismodify" v-model="newmajor"></el-input>
        <el-input class="newinfo" v-if="index===7 && !ismodify" v-model="newgradt"></el-input>
        <el-input class="newinfo" v-if="index===8 && !ismodify" v-model="newexpect"></el-input>
      </div>
    </div>

    <el-button class="funcbtn" style="background-color: #1e56a0;color: white" type="primary" v-show="ismodify"
               @click="modify()">修改信息
    </el-button>
    <div class="funcbtn" v-show="!ismodify">
      <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify()">确认修改</el-button>
      <el-button style="background-color: #1e56a0;color: white" @click="cancleModify()">取消修改</el-button>
    </div>
  </div>
</template>

<script>

  import {updateStuInfo, updateUserInfo} from '../../../assets/lib/getAndSetSelf'
  import {checkEmail, checkMobile} from "../../../assets/lib/utils";

  export default {
    name: 'StudentInfo',
    data() {
      return {
        ismodify: true,
        newphone: '',
        newemail: '',
        newcollege: '',
        newmajor: '',
        newgradt: '',
        newexpect: '',
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
        this.ismodify = !this.ismodify;
      },
      cancleModify() {
        this.ismodify = !this.ismodify;
      },
      commitModify() {
        let pphone, pemail, pcollege, pmajor, pgradt, pexpm;
        pphone = this.newphone === '' ? this.items[0].content : this.newphone;
        if (!checkMobile(pphone)) {
          this.$message("手机号验证错误");
          return;
        }
        pemail = this.newemail === '' ? this.items[1].content : this.newemail;
        if (!checkEmail(pemail)) {
          this.$message("邮箱验证错误");
          return;
        }
        pcollege = this.newcollege === '' ? this.items[5].content : this.newcollege;
        pmajor = this.newmajor === '' ? this.items[6].content : this.newmajor;
        pgradt = this.newgradt === '' ? this.items[7].content : this.newgradt;
        pexpm = this.newexpect === '' ? this.items[8].content : this.newexpect;
        let uid = this.$store.state.uid;
        updateStuInfo(uid, pphone, pemail, pcollege, pmajor, pexpm, pgradt)
          .then(res => {
            console.log(res);
            this.ismodify = !this.ismodify;
            this.newphone = '';
            this.newemail = '';
            this.newcollege = '';
            this.newmajor = '';
            this.newgradt = '';
            this.newexpect = '';
            this.setStuInfo();
          })
          .catch(error => {
            console.log("stu info 有问题" + error)
          });

        updateUserInfo(pphone, pemail)
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

  .funcbtn {
    margin-top: 30px;
  }

  .newinfo {
    width: 80%;
  }

  .info {
    font-size: 18px;
  }
</style>
