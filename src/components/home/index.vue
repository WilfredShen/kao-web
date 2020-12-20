<template>
  <div>
    <div>
      <el-carousel style="float: left" height="330px" indicator-position="outside" :interval="3000" arrow="always"
                   v-if="latestNews.length">
        <el-carousel-item>
          <a :href="this.latestNews[0].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[0].image" alt="">
            <h3>{{latestNews[0].title}}</h3>
          </a>
        </el-carousel-item>
        <el-carousel-item>
          <a :href="this.latestNews[1].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[1].image" alt="">
            <h3>{{latestNews[1].title}}</h3>
          </a>
        </el-carousel-item>
        <el-carousel-item>
          <a :href="this.latestNews[2].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[2].image" alt="">
            <h3>{{latestNews[2].title}}</h3>
          </a>
        </el-carousel-item>
        <el-carousel-item>
          <a :href="this.latestNews[3].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[3].image" alt="">
            <h3>{{latestNews[3].title}}</h3>
          </a>
        </el-carousel-item>
        <el-carousel-item>
          <a :href="this.latestNews[4].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[4].image" alt="">
            <h3>{{latestNews[4].title}}</h3>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="b2">
      <p>{{ msg }}</p>
      <ul style="font-size: 13px" v-if="latestNews.length">
        <div class="li-style">
          <a
            :href="this.latestNews[0].officialLink"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latestNews[0].title}}
            <br/><span style="float: right">{{latestNews[0].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
            :href="this.latestNews[1].officialLink"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latestNews[1].title}}
            <br/><span style="float: right">{{latestNews[1].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
            :href="this.latestNews[2].officialLink"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latestNews[2].title}}
            <br/><span style="float: right">{{latestNews[2].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
            :href="this.latestNews[3].officialLink"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latestNews[3].title}}
            <br/><span style="float: right">{{latestNews[3].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
            :href="this.latestNews[4].officialLink"
            target="_Blank" style="text-decoration: none;display: block">{{latestNews[4].title}}
            <br/><span style="float: right">{{latestNews[4].date}}</span><br/>
          </a>
        </div>
      </ul>
    </div>
    <div style="padding-top: 400px">
      <evaluation-detail></evaluation-detail>
    </div>
  </div>
</template>

<script>
  import EvaluationDetail from '@/components/home/evaluation/detail';
  import {getLatestNews} from "@/assets/lib/getResultLjm";

  export default {
    name: 'Home',
    components: {
      EvaluationDetail,
    },
    data() {
      return {
        msg: '最新消息',
        latestNews: [],
      }
    },
    created() {
      getLatestNews()
        .then((res) => {
          this.latestNews = res.data;
          // console.log("latenews",this.latenews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
</script>

<style scoped>
  .el-carousel {
    width: 40%;
    margin-right: 0;
    padding-right: 0;
  }

  .el-carousel__item {
    margin-right: 0;
    width: 100%;
  }

  h3 {
    margin-top: -2px;
    text-align: center;
    font-size: 12px;
  }

  .el-carousel__item img {
    position: relative;
    text-align: center;
    width: 100%;
    height: 94%;
    margin-bottom: -2px;
    background: white;
  }

  .b2 {
    width: 55%;
    height: 100%;
    border: 2px solid black;
    float: right;
  }

  a {
    target: new;
  }

  .li-style {
    width: 90%;
    padding: 2px 10px;
    border: 1px solid black;
    display: block;
    text-decoration: none;
    color: black;
  }

  p {
    padding-left: 40px;
    font-size: 15px;
    font-weight: bold;
  }
</style>
