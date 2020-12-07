<template>
  <!--    最外侧-->
  <div style="height: 800px">
    <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">
      <!--            头像和用户名-->
      <div class="userinfo">
        <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>
        <p>用户名</p>
      </div>

      <div class="index" style="display: flex;flex-direction: column;text-align: center">
        <router-link :to="{path:'/'}">
          <el-link id="check" @click="isshow=false">信息审核</el-link>
          <br>
        </router-link>
        <el-link id="refresh" @click="isshow=true">信息更新</el-link>
        <div id="updates" v-if="isshow" style="display: flex;flex-direction: column;">
          <router-link :to="{path:'/AssessResult'}">
            <el-link id="assess_result">评估结果</el-link>
          </router-link>
          <router-link :to="{path:'/UploadNews'}">
            <el-link id="upload_news">新闻上传</el-link>
          </router-link>
          <router-link :to="{path:'/NewsList'}">
            <el-link id="news_list">新闻列表</el-link>
          </router-link>
        </div>
      </div>
    </div>
    <!--        右侧-->
    <div class="main" style="float:right;width: 89%;height: 100%">
      <div id="top" style="height: 50px; width: 100%;border-bottom: 1px solid">

      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        isshow: false
      }
    },
  }
</script>

<style scoped>
  .userinfo {
    margin-left: 20px;
    margin-top: 20px;
    width: 100px;
  }

  #check, #refresh, #assess_result, #news_list, #upload_news {
    margin: 20px 0px 0px 25px;
  }

</style>
