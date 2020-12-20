<template>
  <el-container class="container">
    <el-header class="header" height="80px" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="16" class="header-logo">
          <div class="grid-content bg-purple">
            <img class="img-style" style="float: left" src="@/assets/image/logo11.png">
          </div>
        </el-col>
        <el-col :span="8" class="right-section">
          <div class="grid-content bg-purple-light">
            <span class="el-dropdown-link userinfo-inner" style="margin-top: 20px;font-size: 20px;color: black">欢迎您,{{userName}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu class="el-menu-vertical-demo" router>
          <el-menu-item @click="clearAll(2)">
            <i class="el-icon-document"></i>
            <span slot="title" style="font-size: 15px">基本信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(1)" v-if="isStu">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size: 15px">最近消息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(3)" v-if="isStu">
            <i class="el-icon-folder-opened"></i>
            <span slot="title" style="font-size: 15px">收藏夹</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(4)" v-if="isStu">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">学生信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(5)" v-if="isTut">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">导师信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(6)" v-if="isTut">
            <i class="el-icon-search"></i>
            <span slot="title" style="font-size: 15px">查询学生</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title" style="font-size: 15px">返回首页</span>
          </el-menu-item>
        </el-menu>
        <!--        <el-image :src="img" style="width: 200px;height: 150px;margin-top: 50px"></el-image>-->
      </el-aside>
      <el-main class="main">
        <keep-alive>
          <focus-news v-if="selfHome"></focus-news>
        </keep-alive>
        <keep-alive>
          <favor v-if="collect"></favor>
        </keep-alive>
        <keep-alive>
          <info v-if="basicInfo"></info>
        </keep-alive>
        <keep-alive>
          <query-student v-if="queryStu"></query-student>
        </keep-alive>
        <keep-alive>
          <student-info v-if="stuInfo"></student-info>
        </keep-alive>
        <keep-alive>
          <tutor-info v-if="tutInfo"></tutor-info>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import FocusNews from "./student/focus-news";
  import Favor from "./student/favor";
  import QueryStudent from "./tutor/query-student";
  import StudentInfo from "./student/info";
  import TutorInfo from "./tutor/info";
  import Info from "./info";
  import {getLimit, getUserName} from "@/assets/lib/getAndSetSelf";

  export default {
    name: 'User',
    components: {
      FocusNews,
      Favor,
      QueryStudent,
      StudentInfo,
      TutorInfo,
      Info
    },
    data() {
      return {
        selected: 2,
        isStu: false,
        isTut: false,
        userName: '',
        img: require("@/assets/image/logo11.png")
      }
    },
    computed: {
      selfHome: function () {
        return this.selected === 1;
      },
      basicInfo: function () {
        return this.selected === 2;
      },
      collect: function () {
        return this.selected === 3;
      },
      stuInfo: function () {
        return this.selected === 4;
      },
      tutInfo: function () {
        return this.selected === 5;
      },
      queryStu: function () {
        return this.selected === 6;
      },
    },
    methods: {
      clearAll(val) {
        this.selected = val;
      },
    },
    created() {
      getLimit()
        .then(res => {
          console.log("获得的权限" + res);
          if (res === 'student') {
            this.isStu = true;
          } else if (res === 'tutor') {
            this.isTut = true;
          }
        });
      getUserName()
        .then(res => {
          console.log("获得的用户名" + res);
          this.userName = res;
        });
    }
  };
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

  .aside {
    color: #fff;
    width: 50px;
    height: 600px;
    text-align: center;
  }

  .main {
    /* height: 100%; */
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
