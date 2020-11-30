<template>
  <div class="divstyle">
    <img class="imgsty" src="@/assets/logo11.png">
    <div class="header_sty">
      <span class="spanstyle">教育部学科评估管理系统</span>
      <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal"
               @select="handleSelect">
        <router-link tag="Kao" to="/" class="nav-i">
          <el-menu-item index="1">首页</el-menu-item>
        </router-link>
        <router-link tag="EvaluateResult" to="/evaResult" class="nav-i">
          <el-menu-item index="2">评估结果</el-menu-item>
        </router-link>
        <router-link tag="school" to="/schoolDetail" class="nav-i">
          <el-menu-item index="3">学校详情</el-menu-item>
        </router-link>
        <router-link tag="Sum" to="/campCard" class="nav-i">
          <el-menu-item index="4">夏令营</el-menu-item>
        </router-link>
        <router-link tag="sep" to="/" class="nav-i">
          <el-menu-item index="5">九月推免</el-menu-item>
        </router-link>
        <router-link tag="student" to="/Analysis" class="nav-i">
          <el-menu-item index="6">生源分析</el-menu-item>
        </router-link>
        <router-link tag="self" to="/self" class="nav-i">
          <el-menu-item index="7">个人主页</el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .imgsty {
    width: 17%;
    top: -10px;
    position: absolute;
  }

  .spanstyle {
    font-weight: bold;
    font-size: 25px;
    position: relative;
    color: black;
  }

  .header_sty {
    margin: 10px 0 0 130px;
  }

  .nav-i {
    display: inline-block;
    justify-content: space-around;
    width: 100px;
    text-align: center;
  }

  .divstyle {
    position: absolute;
    /*width:80%;*/
    background: white;
    margin: 0 9%;
  }

  .el-menu-item {
    font-size: 15px;
  }
</style>
