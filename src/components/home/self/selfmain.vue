<template>
  <el-container class="container">
    <el-header class="header" height="80px" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="16" class="headerlogo">
          <div class="grid-content bg-purple">
            <img class="img-style" style="float: left" src="@/assets/logo11.png">
          </div>
        </el-col>
        <el-col :span="8" class="rightsection">
          <div class="grid-content bg-purple-light">
            <span class="el-dropdown-link userinfo-inner" style="font-size: 20px;color: white">欢迎您,{{username}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu class="el-menu-vertical-demo" router>
          <el-menu-item @click="clearAll(1)">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size: 15px">主页</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(2)">
            <i class="el-icon-document"></i>
            <span slot="title" style="font-size: 15px">基本信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(3)" v-if="isstu">
            <i class="el-icon-folder-opened"></i>
            <span slot="title" style="font-size: 15px">收藏夹</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(4)" v-if="isstu">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">学生信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(5)" v-if="istut">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">导师信息</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(6)" v-if="istut">
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
          <selfhome v-if="selfhome"></selfhome>
        </keep-alive>
        <keep-alive>
          <collect v-if="collect"></collect>
        </keep-alive>
        <keep-alive>
          <basicinfo v-if="basicinfo"></basicinfo>
        </keep-alive>
        <keep-alive>
          <querystu v-if="querystu"></querystu>
        </keep-alive>
        <keep-alive>
          <stuinfo v-if="stuinfo"></stuinfo>
        </keep-alive>
        <keep-alive>
          <teainfo v-if="teainfo"></teainfo>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import selfhome from "./selfhome";
  import collect from "./collect";
  import querystu from "./querystu";
  import stuinfo from "./stuinfo";
  import teainfo from "./teainfo";
  import basicinfo from "./basicinfo";
  import {getLimit, getUserName} from "../../../assets/lib/getAndSetSelf";

  export default {
    components: {
      selfhome,
      collect,
      querystu,
      stuinfo,
      teainfo,
      basicinfo
    },
    data() {
      return {
        selected: 1,
        isstu: false,
        istut: false,
        username: '',
        img: require("@/assets/logo11.png")
      }
    },
    computed: {
      selfhome: function () {
        return this.selected === 1;
      },
      basicinfo: function () {
        return this.selected === 2;
      },
      collect: function () {
        return this.selected === 3;
      },
      stuinfo: function () {
        return this.selected === 4;
      },
      teainfo: function () {
        return this.selected === 5;
      },
      querystu: function () {
        return this.selected === 6;
      },
    },
    methods: {
      clearAll(val) {
        this.selected = val;
      },
    },
    created() {
      getLimit().then(res => {
        console.log("获得的权限" + res);
        if (res === 'student') {
          this.isstu = true;
        } else if (res === 'tutor') {
          this.istut = true;
        }
      });
      getUserName().then(res => {
        console.log("获得的用户名" + res);
        this.username = res;
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
    background: #456268;
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

  .headerlogo {
    line-height: 60px;
    margin-top: 10px;
  }

  .rightsection {
    line-height: 60px;
    text-align: center;
  }

  .img-style {
    width: 10%;
    top: 0;
    margin-left: 7%;
  }
</style>
