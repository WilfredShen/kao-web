<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
      <div v-for="(item,index) in items" :key="index"
           style="display: flex;align-items: center;width: 60%" v-bind:class="{changeColor:index%2==0}">
        <div style="width: 30%;text-align: right;"><p>{{item.label}}</p></div>
        <div style="width: 70%;text-align: left">
          <p v-if="ismodify || (index<5 && index>1)">{{item.content}}</p>
          <el-input class="newinfo" v-if="index===0 && !ismodify" v-model="newphone"></el-input>
          <el-input class="newinfo" v-if="index===1 && !ismodify" v-model="newemail"></el-input>
          <el-input class="newinfo" v-if="index===5 && !ismodify" v-model="newcollege"></el-input>
          <el-input class="newinfo" v-if="index===6 && !ismodify" v-model="newmajor"></el-input>
          <el-input class="newinfo" v-if="index===7 && !ismodify" v-model="newgradt"></el-input>
          <el-input class="newinfo" v-if="index===8 && !ismodify" v-model="newexpect"></el-input>
        </div>
      </div>

      <el-button class="funcbtn" type="primary" v-show="ismodify" @click="modify()">修改信息</el-button>
      <div class="funcbtn" v-show="!ismodify">
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
        ismodify:true,
        test:'',
        newphone:'',
        newemail:'',
        newcollege:'',
        newmajor:'',
        newgradt:'',
        newexpect:'',
        items: [
          {label: '联系电话：',content:''},
          {label: '邮箱地址：',content: ''},
          {label: '姓名：',content: ''},
          {label: '年龄：',content: ''},
          {label: '性别：',content: ''},
          {label: '本科就读高校：',content: ''},
          {label: '本科就读专业：',content: ''},
          {label: '本科毕业时间：',content: ''},
          {label: '预期专业：',content: ''},
        ]
      }
    },
    methods:{
      modify(){
        this.ismodify = !this.ismodify;
      },
      canclemodify(){
        this.ismodify = !this.ismodify;
        console.log(this.$store.state.uid);
      },
      commitmodify(){
        console.log(this.test);
      }
    },
    created() {
      axios.get("/api/stu/get_stu_info",{
        params:{
          uid:this.$store.state.uid
        }
      })
      .then(res=>{
        console.log(res);
      }).catch(error=>{
        console.log(error);
      })
    }
  }
</script>

<style scoped>
  .changeColor {
    background-color: #eef1f6;
  }

  .img {
    width: 25px;
    height: 25px;
    margin-right: 20px
  }

  .funcbtn{
    margin-top: 30px;
  }

  .newinfo{
    width: 80%;
  }
</style>
