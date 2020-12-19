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
          <div class="grid-content bg-purple-light" style="margin-top: 15px">
            <span style="font-size: 20px;color: black;font-weight: bold">欢迎管理员！</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu class="el-menu-vertical-demo" router>
          <el-menu-item @click="clearAll(1)">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size: 15px">上传评估结果</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(2)">
            <i class="el-icon-document"></i>
            <span slot="title" style="font-size: 15px">修改评估结果</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(3)">
            <i class="el-icon-folder-opened"></i>
            <span slot="title" style="font-size: 15px">上传新闻列表</span>
          </el-menu-item>
          <el-menu-item @click="clearAll(4)">
            <i class="el-icon-reading"></i>
            <span slot="title" style="font-size: 15px">更新新闻列表</span>
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
          <AssessEval v-if="assessresult"></AssessEval>
        </keep-alive>
        <keep-alive>
          <ModifyEval v-if="changeresult"></ModifyEval>
        </keep-alive>
        <keep-alive>
          <UploadNews v-if="uploadnews"></UploadNews>
        </keep-alive>
        <keep-alive>
          <ShowList v-if="newsupdate"></ShowList>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AssessEval from "./evaluation/assess";
  import ModifyEval from "./evaluation/modify";
  import UploadNews from "./news/upload";
  import ShowList from "./news/list";

  export default {
    name: 'Admin',
    components: {
      AssessEval,
      ModifyEval,
      UploadNews,
      ShowList,
    },
    data() {
      return {
        selected: 0,
        img: require("@/assets/logo11.png")
      }
    },
    methods: {
      clearAll(val) {
        this.selected = val;
      },
    },
    computed: {
      assessresult: function () {
        return this.selected === 1;
      },
      changeresult: function () {
        return this.selected === 2;
      },
      uploadnews: function () {
        return this.selected === 3;
      },
      newsupdate: function () {
        return this.selected === 4;
      }
    }
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
