<template>
  <div>
    <!--    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">-->
    <div v-for="(item,index) in items" :key="index"
         style="display: flex;align-items: center;width: 50%;height: 60px"
         v-bind:class="index%2===0 ? 'change-color' : ''">
      <div style="width: 30%;text-align: right"><span class="info">{{item.label}}</span></div>
      <div style="width: 70%;text-align: left;">
        <span class="info" v-if="ismodify || (index<5 && index>1)">{{item.content}}</span>
        <el-input class="newinfo" v-if="index===0 && !ismodify" v-model="newphone"></el-input>
        <el-input class="newinfo" v-if="index===1 && !ismodify" v-model="newemail"></el-input>
        <el-input class="newinfo" v-if="index===5 && !ismodify" v-model="newcollege"></el-input>
        <el-input class="newinfo" v-if="index===6 && !ismodify" v-model="newmajor"></el-input>
        <el-input class="newinfo" v-if="index===7 && !ismodify" v-model="newresearch"></el-input>
      </div>
    </div>

    <el-button style="background-color: #1e56a0;color: white" class="funcbtn" type="primary" v-show="ismodify"
               @click="modify()">修改信息
    </el-button>
    <div class="funcbtn" v-show="!ismodify">
      <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify()">确认修改</el-button>
      <el-button style="background-color: #1e56a0;color: white" @click="cancleModify()">取消修改</el-button>
    </div>
    <!--    </div>-->
  </div>
</template>

<script>

  import {updateTeaInfo, updateUserInfo} from '../../../assets/lib/getAndSetSelf'

  export default {
    data() {
      return {
        ismodify: true,
        newphone: '',
        newemail: '',
        newcollege: '',
        newmajor: '',
        newresearch: '',
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
      modify() {
        this.ismodify = !this.ismodify;
      },
      cancleModify() {
        this.ismodify = !this.ismodify;
      },
      commitModify() {
        let pphone, pemail, pcollege, pmajor, presearch;
        pphone = this.newphone === '' ? this.items[0].content : this.newphone;
        pemail = this.newemail === '' ? this.items[1].content : this.newemail;
        pcollege = this.newcollege === '' ? this.items[5].content : this.newcollege;
        pmajor = this.newmajor === '' ? this.items[6].content : this.newmajor;
        presearch = this.newresearch === '' ? this.items[7].content : this.newresearch;
        updateTeaInfo(pphone, pemail, pcollege, pmajor, presearch)
          .then(res => {
            console.log(res);
            this.ismodify = !this.ismodify;
            this.newphone = '';
            this.newemail = '';
            this.newcollege = '';
            this.newmajor = '';
            this.newresearch = '';
            this.setTeoInfo();
          })
        updateUserInfo(pphone, pemail)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log("研究生秘书修改基本信息有问题" + err);
          })
      },
      setTeoInfo() {
        this.$axios.get("/api/tutor/get_tutor_msg")
          .then(res => {
            console.log("teainfo = " + res);
            let item = res.data.data;
            this.items[0].content = item.phone;
            this.items[1].content = item.email;
            this.items[2].content = item.name;
            this.items[3].content = item.age;
            this.items[4].content = item.sex ? '男' : '女';
            this.items[5].content = item.college;
            this.items[6].content = item.major;
            this.items[7].content = item.research;
          }).catch(error => {
          console.log(error);
        })
      }
    },
    created() {
      this.setTeoInfo();
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
