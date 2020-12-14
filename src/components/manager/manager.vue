<template>
  <!--    最外侧-->
  <div style="height: 800px">
    <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">
      <!--            头像和用户名-->
      <div class="userinfo">
        <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>
        <p style="font-size: 18px;font-weight: bold">管理员</p>
      </div>

      <div class="index" style="display: flex;flex-direction: column;text-align: center">
        <!--        <router-link :to="{path:'/manager'}">-->
        <!--          <el-link id="check" @click="isshow=false">信息审核</el-link>-->
        <!--          <br>-->
        <!--        </router-link>-->
        <!--        <p id="refresh" @click="isshow=true">信息更新</p>-->
        <div id="updates" v-if="isshow" style="display: flex;flex-direction: column;text-decoration: none">
          <router-link :to="{path:'/manager/assessresult'}">
            <el-link id="assess_result" style="text-decoration: none">上传评估结果</el-link>
          </router-link>
          <router-link :to="{path:'/manager/changeresult'}">
            <el-link id="change_result" style="text-decoration: none">修改评估结果</el-link>
          </router-link>
          <router-link :to="{path:'/manager/uploadnews/'}">
            <el-link id="upload_news" style="text-decoration: none">上传新闻列表</el-link>
          </router-link>
          <router-link :to="{path:'/manager/newslist'}">
            <el-link id="news_list" style="text-decoration: none">修改新闻列表</el-link>
          </router-link>
        </div>
      </div>
    </div>
    <!--        右侧-->
    <div class="main" style="float:right;width: 89%;">
      <div id="top" style="height: 50px; width: 100%;border-bottom: 1px solid">

      </div>
      <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        isshow: true
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

  #check, #refresh, #assess_result, #news_list, #upload_news, #change_result {
    margin: 20px 0 0 25px;
  }

</style>
