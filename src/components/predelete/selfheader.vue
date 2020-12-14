<template style="margin-left:12%;margin-right: 12%">
  <div style="height: 800px">
    <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">
      <!--            头像和用户名-->
      <div class="user-info">
        <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>
        <p>{{username}}</p>
      </div>

      <div class="index" style="display: flex;flex-direction: column;align-items: start">
        <router-link :to="{path:'/selfheader'}">
          <el-link id="selfhome">主页</el-link>
        </router-link>
        <router-link :to="{path:'/selfheader/basicinfo'}">
          <el-link id="basicinfo">基本信息</el-link>
        </router-link>
        <router-link :to="{path:'/selfheader/collect'}" v-if="isstu">
          <el-link id="collect">收藏夹</el-link>
        </router-link>
        <router-link :to="{path:'/selfheader/stuinfo'}" v-if="isstu">
          <el-link id="stuinfo">学生信息</el-link>
        </router-link>
        <router-link :to="{path:'/selfheader/teaInfo'}" v-if="istut">
          <el-link id="teainfo">导师信息</el-link>
        </router-link>
        <router-link :to="{path:'/selfheader/querystu'}" v-if="istut">
          <el-link id="querystu">查询学生</el-link>
        </router-link>
        <router-link :to="{path:'/'}">
          <el-link id="tohome">返回首页</el-link>
        </router-link>
      </div>
    </div>
    <!--        右侧-->
    <div class="main" style="float:right;width: 89%;height: 100%">
      <div id="top" style="height: 50px; width: 100%;border-bottom: 1px solid">
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

  import {getUserName, getLimit} from '../../assets/lib/getAndSetSelf'

  export default {
    data() {
      return {
        username: '',
        isstu: false,
        istut: false,
        imgurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
      getUserName().then(res => {
        console.log("获得的用户名" + res);
        this.username = res;
      });
      getLimit().then(res => {
        console.log("获得的权限" + res);
        if (res === 'student') {
          this.isstu = true;
        } else if (res === 'tutor') {
          this.istut = true;
        }
      })
    }
  }
</script>

<style scoped>
  .user-info {
    margin-left: 20px;
    margin-top: 20px;
    width: 100px;
  }

  #selfhome, #basicinfo, #collect, #stuinfo, #teainfo, #querystu, #tohome {
    margin: 20px 0 0 25px;
  }
</style>
