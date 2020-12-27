<template>
  <el-container class="container">
    <el-header class="header" height="80px">
      <el-row>
        <el-col :span="16" class="header-logo">
          <div class="grid-content bg-purple">
            <img class="img-style" style="float: left" src="@/assets/image/logo11.png">
          </div>
        </el-col>
        <el-col :span="8" class="right-section">
          <div class="grid-content bg-purple-light" style="margin-top: 15px">
            <span style="font-size: 20px;color: black;font-weight: bold">欢迎管理员！</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <div style="width: 15%;height: 100vh;">
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/admin/evaluation/assess">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size: 15px">上传评估结果</span>
          </el-menu-item>
          <el-menu-item index="/admin/evaluation/modify">
            <i class="el-icon-document"></i>
            <span slot="title" style="font-size: 15px">修改评估结果</span>
          </el-menu-item>
          <el-menu-item index="/admin/news/upload">
            <i class="el-icon-folder-opened"></i>
            <span slot="title" style="font-size: 15px">上传新闻列表</span>
          </el-menu-item>
          <el-menu-item index="/admin/news/list">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">更新新闻列表</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title" style="font-size: 15px">返回首页</span>
          </el-menu-item>
        </el-menu>
      </div>

      <el-main class="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Admin',
    data() {
      return {
        selected: 0,
        img: require("@/assets/image/logo11.png")
      }
    },
    methods: {
      clearAll: function(val) {
        this.selected = val;
      },
    },
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    font-size: 15px;
  }

  .header {
    background: #d6e4f0;
    color: #000;
  }

  .main {
    /* height: 100%; */
    width: 100%;
    height: 100vh;
    color: #212121;
  }

  .header-logo {
    line-height: 60px;
    margin-top: 10px;
  }

  .right-section {
    line-height: 60px;
    text-align: center;
  }

  .img-style {
    width: 10%;
    top: 0;
    margin-left: 7%;
  }

</style>
