<template>
  <el-container class="container">
    <el-menu
      :router="true"
      style="background-color: #163172;"
    >
      <el-menu-item index="/user/info">
        <i class="el-icon-document"></i>
        <span
          class="itemContent"
          slot="title"
        >基本信息</span>
      </el-menu-item>
      <el-menu-item
        index="/user/student/info"
        v-if="isStu"
      >
        <i class="el-icon-reading"></i>
        <span
          class="itemContent"
          slot="title"
        >学生信息</span>
      </el-menu-item>
      <el-menu-item
        index="/user/tutor/info"
        v-if="isTut"
      >
        <i class="el-icon-reading"></i>
        <span
          class="itemContent"
          slot="title"
        >导师信息</span>
      </el-menu-item>
      <el-menu-item
        index="/user/student/focus-news"
        v-if="isStu"
      >
        <i class="el-icon-menu"></i>
        <span
          class="itemContent"
          slot="title"
        >最近消息</span>
      </el-menu-item>
      <el-menu-item
        index="/user/student/favor"
        v-if="isStu"
      >
        <i class="el-icon-folder-opened"></i>
        <span
          class="itemContent"
          slot="title"
        >收藏夹</span>
      </el-menu-item>
      <el-menu-item
        index="/user/tutor/query-student"
        v-if="isTut"
      >
        <i class="el-icon-search"></i>
        <span
          class="itemContent"
          slot="title"
        >查询学生</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span
          class="itemContent"
          slot="title"
        >返回首页</span>
      </el-menu-item>
    </el-menu>
    <div style="width: 100%;height: 100vh;">
      <div style="height: 100%;width: 100%">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </el-container>
</template>

<script>

  import {getLimit, getUsername} from "@/assets/lib/getAndSetSelf";

  export default {
    name: 'User',
    data() {
      return {
        selected: 2,
        isStu: false,
        isTut: false,
        username: '',
      }
    },
    methods: {},
    created() {
      getLimit()
        .then((res) => {
          console.log("获得的权限" + res);
          if (res === 'student') {
            this.isStu = true;
          } else if (res === 'tutor') {
            this.isTut = true;
          }
        });

      getUsername()
        .then((res) => {
          console.log("获得的用户名" + res);
          this.username = res;
        });
    },
  };
</script>
<style scoped>
  .container {
    height: 100vh;
    font-size: 15px;
  }

  .itemContent {
    font-size: 16px;
  }

  .el-menu-item {
    background-color: #163172;
    color: white;
    height: 70px;
  }

  .el-menu-item:hover {
    background-color: #3282B8;
  }

  .el-menu-item.is-active {
    background-color: #3282B8;
    color: #ffffff;
    border-right: 6px solid #409EFF;
  }

  .el-icon-folder-opened, .el-icon-reading, .el-icon-search, .el-icon-document, .el-icon-menu, .el-icon-s-home {
    color: white;
  }


</style>
