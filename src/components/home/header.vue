<template style="margin-left:12%;margin-right: 12%">
  <div class="div-style">
    <img class="img-style" style="float: left" src="@/assets/logo11.png">
    <div class="header-sty">
      <span class="span-style">教育部学科评估管理系统</span>
      <el-button size="mini" style="float: right" @click="$router.push('/login')" v-if="!istut && !isstu"> 登录
      </el-button>
      <el-menu :router="true" class="el-menu-demo" mode="horizontal">
        <router-link to="/" class="nav-i">
          <el-menu-item>首页</el-menu-item>
        </router-link>
        <router-link to="/evaresult" class="nav-i">
          <el-menu-item>评估结果</el-menu-item>
        </router-link>
        <router-link to="/schooldetail" class="nav-i">
          <el-menu-item>学校详情</el-menu-item>
        </router-link>
        <router-link to="/campcard" class="nav-i">
          <el-menu-item>夏令营</el-menu-item>
        </router-link>
        <router-link to="/analysis" class="nav-i">
          <el-menu-item>生源分析</el-menu-item>
        </router-link>
        <router-link to="/selfheader" class="nav-i" v-if="isstu||istut">
          <el-menu-item>个人主页</el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <br>
    <router-view/>
  </div>
</template>

<script>
  import {getLimit} from "../../assets/lib/getAndSetSelf";

  export default {
    data() {
      return {
        isstu: false,
        istut: false
      }
    },
    created() {
      getLimit().then(res => {
        console.log("首页获得的权限" + res);
        if (res === 'student') {
          this.isstu = true;
        } else if (res === 'tutor') {
          this.istut = true;
        }
      })
      //获取夏令营信息
      this.$store.dispatch('getCamps');
    }
  }
</script>

<style scoped>
  .img-style {
    width: 10%;
    top: 0;
  }

  .span-style {
    font-weight: bold;
    font-size: 25px;
    position: relative;
    color: black;
  }

  .header-sty {
    margin: 10px 0 0 12%;
  }

  .nav-i {
    display: inline-block;
    justify-content: space-around;
    width: 100px;
    text-align: center;
  }

  .div-style {
    width: 80%;
    background: white;
    margin: 0 9%;
  }

  .el-menu-item {
    font-size: 15px;
  }
</style>
