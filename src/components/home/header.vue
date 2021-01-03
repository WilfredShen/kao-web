<template>
  <div class="div-style">
    <div
      :style="backgroundImage"
      class="header"
    >
      <img
        class="img-style"
        style="float: left;cursor: pointer"
        src="@/assets/image/logo白(已去底).png"
        @click="toHome()"
      >
      <div class="header-sty">
        <span
          class="span-style"
          style="cursor: pointer"
          @click="toHome()"
        >教育部学科评估管理系统</span>
        <!--        <img src="@/assets/image/登录.png" @click="$router.push('/login')" v-if="!hasLogin" width="3%" style="padding: 0;align-items: center">-->
        <el-button
          size="mini"
          icon="el-icon-user"
          style="float: right;margin:2% 2% 0 0;background-color: transparent;color: #ffffff"
          @click="$router.push('/login')"
          v-if="!hasLogin && !isAdmin"
        >
          登录
        </el-button>
        <el-button
          size="mini"
          icon="el-icon-circle-close"
          style="float: right;margin:2% 2% 0 0;background-color: transparent;color: white"
          @click="logOut()"
          v-if="hasLogin || isAdmin"
        >
          退出登录
        </el-button>
        <el-menu
          :default-active="$route.path"
          :router="true"
          @select="handleSelect()"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#ffffff"
          style="font-weight: bold;width: 60%"
          active-text-color="#E03E36"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/evaluation/result">评估结果</el-menu-item>
          <el-menu-item index="/college/detail">学校详情</el-menu-item>
          <el-menu-item index="/camp"> 夏令营</el-menu-item>
          <el-menu-item
            index="/analysis"
            v-if="isTut"
          >
            生源分析
          </el-menu-item>
          <el-menu-item
            index="/user"
            v-if="hasLogin && !isAdmin"
          >
            个人主页
          </el-menu-item>
          <el-menu-item
            index="/admin"
            v-if="isAdmin"
          >后台管理
          </el-menu-item>
        </el-menu>
      </div>

    </div>
    <br>
    <div class="section">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div style="flex: 0">
      <Footer></Footer>
    </div>
  </div>


</template>

<script>
  import {getLimit} from "@/assets/lib/getAndSetSelf";
  import {setCookie, getCookie} from "@/assets/lib/utils";
  import Footer from "@/components/home/footer";

  export default {
    name: 'Header',
    components: {
      Footer,
    },
    data() {
      return {
        isStu: false,
        isTut: false,
        hasLogin: false,
        isAdmin: false,
        backgroundImage: {
          backgroundImage: 'url(' + require('@/assets/image/header.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
      }
    },
    created() {
      this.hasLogin = getCookie('uid');
      this.isAdmin = getCookie('adminId');
      getLimit()
        .then((res) => {
          console.log("首页获得的权限" + res);
          if (res === 'student') {
            this.isStu = true;
          } else if (res === 'tutor') {
            this.isTut = true;
          }
        });

    },
    methods: {
      logOut() {
        this.$message("退出登录");
        setCookie("uid", "", 0);
        setCookie("adminId", "", 0);
        setCookie("accessToken", "", 0);
        this.$store.commit('setUid', '');
        this.$router.push("/");
        setTimeout(function() {
          location.reload();
        }, 1000);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toHome() {
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>
  .img-style {
    width: 9%;
    top: 0;
    padding: 10px 0 0 5px;
  }

  .span-style {
    font-weight: bold;
    font-size: 25px;
    position: relative;
    color: white;
  }

  .header-sty {
    padding: 10px 0 0 12%;
  }

  .nav-i {
    display: inline-block;
    justify-content: space-around;
    width: 100px;
    text-align: center;
  }

  .div-style {
    width: 80%;
    background: white;
    margin: 0 9%;

    display: flex;
    flex-direction: column;
    min-height: 100%;

  }

  .el-menu-item {
    font-size: 15px;
  }

  .el-submenu__title:hover {
    background-color: #2057a1 !important;
  }

  .el-menu-item:hover {
    background-color: #2057a1 !important;
  }

  .el-menu {
    background-color: transparent !important;
  }

  .el-menu-item.is-active {
    background-color: transparent !important;
    font-size: 17px;
  }

  html, body {
    height: 100%;
  }

  .header {
    flex: 0;
  }

  .section {
    flex: 1;
    margin-bottom: 20px
  }


</style>
