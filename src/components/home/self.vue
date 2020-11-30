<template>
  <div style="height: 800px">
    <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">
      <!--            头像和用户名-->
      <div class="userinfo">
        <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>
        <p>个人用户名</p>
      </div>

      <div class="index" style="display: flex;flex-direction: column;align-items: start">
        <router-link :to="{path:'/Self/selfHome'}">
          <el-link id="self_home">主页</el-link>
        </router-link>
        <router-link :to="{path:'/Self/basicInfo'}">
          <el-link id="basic_info">基本信息</el-link>
        </router-link>
        <router-link :to="{path:'/Self/Collect'}">
          <el-link id="collect">收藏夹</el-link>
        </router-link>
        <router-link :to="{path:'/Self/StuInfo'}">
          <el-link id="stu_info">学生信息</el-link>
        </router-link>
        <router-link :to="{path:'/self/TeaInfo'}">
          <el-link id="tea_info">导师信息</el-link>
        </router-link>
        <router-link :to="{path:'/Self/QueryStu'}">
          <el-link id="query_stu">查询学生</el-link>
        </router-link>
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

  #self_home, #basic_info, #collect, #stu_info, #tea_info, #query_stu {
    margin: 20px 0px 0px 25px;
  }
</style>
