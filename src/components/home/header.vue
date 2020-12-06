<template style="margin-left:12%;margin-right: 12%">
  <div class="divstyle">
    <img class="imgsty" style="float: left" src="@/assets/logo11.png">
    <div class="header_sty">
      <span class="spanstyle">教育部学科评估管理系统</span>
      <el-button size="mini" style="float: right" @click="$router.push('/login')"> 登录</el-button>
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
        <router-link to="/" class="nav-i">
          <el-menu-item>九月推免</el-menu-item>
        </router-link>
        <router-link to="/analysis" class="nav-i">
          <el-menu-item>生源分析</el-menu-item>
        </router-link>
        <router-link to="/selfheader" class="nav-i">
          <el-menu-item>个人主页</el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <br>
    <router-view/>
  </div>
</template>

<script>
</script>

<style scoped>
  .imgsty {
    width: 10%;
    top: 0;
  }

  .spanstyle {
    font-weight: bold;
    font-size: 25px;
    position: relative;
    color: black;
  }

  .header_sty {
    margin: 10px 0 0 12%;
  }

  .nav-i {
    display: inline-block;
    justify-content: space-around;
    width: 100px;
    text-align: center;
  }

  .divstyle {
    width: 80%;
    background: white;
    margin: 0 9%;
  }

  .el-menu-item {
    font-size: 15px;
  }
</style>
