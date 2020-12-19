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
          <assessresult v-if="assessresult"></assessresult>
        </keep-alive>
        <keep-alive>
          <changeresult v-if="changeresult"></changeresult>
        </keep-alive>
        <keep-alive>
          <uploadnews v-if="uploadnews"></uploadnews>
        </keep-alive>
        <keep-alive>
          <newslist v-if="newsupdate"></newslist>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<!--<template>-->
<!--  &lt;!&ndash;    最外侧&ndash;&gt;-->
<!--  <div style="height: 800px">-->
<!--    <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">-->
<!--      &lt;!&ndash;            头像和用户名&ndash;&gt;-->
<!--      <div class="userinfo">-->
<!--        <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>-->
<!--        <p style="font-size: 18px;font-weight: bold">管理员</p>-->
<!--      </div>-->

<!--      <div class="index" style="display: flex;flex-direction: column;text-align: center">-->
<!--        &lt;!&ndash;        <router-link :to="{path:'/manager'}">&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-link id="check" @click="isshow=false">信息审核</el-link>&ndash;&gt;-->
<!--        &lt;!&ndash;          <br>&ndash;&gt;-->
<!--        &lt;!&ndash;        </router-link>&ndash;&gt;-->
<!--        &lt;!&ndash;        <p id="refresh" @click="isshow=true">信息更新</p>&ndash;&gt;-->
<!--        <div id="updates" v-if="isshow" style="display: flex;flex-direction: column;text-decoration: none">-->
<!--          <router-link :to="{path:'/manager/assessresult'}">-->
<!--            <el-link id="assess_result" style="text-decoration: none">上传评估结果</el-link>-->
<!--          </router-link>-->
<!--          <router-link :to="{path:'/manager/changeresult'}">-->
<!--            <el-link id="change_result" style="text-decoration: none">修改评估结果</el-link>-->
<!--          </router-link>-->
<!--          <router-link :to="{path:'/manager/uploadnews/'}">-->
<!--            <el-link id="upload_news" style="text-decoration: none">上传新闻列表</el-link>-->
<!--          </router-link>-->
<!--          <router-link :to="{path:'/manager/newslist'}">-->
<!--            <el-link id="news_list" style="text-decoration: none">修改新闻列表</el-link>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;        右侧&ndash;&gt;-->
<!--    <div class="main" style="float:right;width: 89%;">-->
<!--      <div id="top" style="height: 50px; width: 100%;border-bottom: 1px solid">-->

<!--      </div>-->
<!--      <div>-->
<!--        <keep-alive>-->
<!--          <router-view></router-view>-->
<!--        </keep-alive>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
  import assessresult from "./evaluation/assess";
  import changeresult from "./evaluation/modify";
  import uploadnews from "./news/upload";
  import newslist from "./news/list";

  export default {
    components: {
      assessresult,
      changeresult,
      uploadnews,
      newslist,
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
