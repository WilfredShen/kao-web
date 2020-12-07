<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
      <div v-for="(item,index) in items" :key="index"
           style="display: flex;align-items: center;width: 60%" v-bind:class="index%2===0 ? 'change-color' : ''">
        <div style="width: 30%;text-align: right"><p>{{item.label}}</p></div>
        <div style="width: 70%;text-align: left;">
          <p v-if="ismodify || (index<5 && index>1)">{{item.content}}</p>
          <el-input class="newinfo" v-if="index===0 && !ismodify" v-model="newphone"></el-input>
          <el-input class="newinfo" v-if="index===1 && !ismodify" v-model="newemail"></el-input>
          <el-input class="newinfo" v-if="index===5 && !ismodify" v-model="newcollege"></el-input>
          <el-input class="newinfo" v-if="index===6 && !ismodify" v-model="newmajor"></el-input>
          <el-input class="newinfo" v-if="index===7 && !ismodify" v-model="newresearch"></el-input>
        </div>
      </div>

      <el-button class="funcbtn" type="primary" v-show="ismodify" @click="modify()">修改信息</el-button>
      <div class="funcbtn" v-show="!ismodify">
        <el-button type="primary" @click="commitModify()">确认修改</el-button>
        <el-button @click="cancleModify()">取消修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import {updateTeaInfo} from '../../../assets/lib/getAndSetSelf'

  export default {
    data() {
      return {
        ismodify: true,
        newphone:'',
        newemail:'',
        newcollege:'',
        newmajor:'',
        newresearch:'',
        items: [
          {label: '联系电话：',content:''},
          {label: '邮箱地址：',content:''},
          {label: '姓名：',content:''},
          {label: '年龄：',content:''},
          {label: '性别：',content:''},
          {label: '所属院校：',content:''},
          {label: '所属专业：',content:''},
          {label: '研究方向：',content:''},
        ]
      }
    },
    methods:{
      modify() {
        this.ismodify = !this.ismodify;
      },
      cancleModify() {
        this.ismodify = !this.ismodify;
      },
      commitModify(){
        let pphone,pemail,pcollege,pmajor,presearch;
        pphone = this.newphone === '' ? this.items[0].content : this.newphone;
        pemail = this.newemail === '' ? this.items[1].content : this.newemail;
        pcollege = this.newcollege === '' ? this.items[5].content : this.newcollege;
        pmajor = this.newmajor === '' ? this.items[6].content : this.newmajor;
        presearch = this.newresearch === '' ? this.items[7].content : this.newresearch;
        updateTeaInfo(pphone,pemail,pcollege,pmajor,presearch)
        .then(res=>{
          console.log(res);
          this.ismodify = !this.ismodify;
          this.newphone = '';
          this.newemail = '';
          this.newcollege = '';
          this.newmajor = '';
          this.newresearch = '';
          this.setTeoInfo();
        })
      },
      setTeoInfo(){
        this.$axios.get("/api/tutor/get_tutor_msg")
          .then(res => {
            console.log("teainfo = "+res);
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
    background-color: #eef1f6;
  }

  .funcbtn {
    margin-top: 30px;
  }

  .newinfo {
    width: 80%;
  }
</style>
