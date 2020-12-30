<template>
  <div>
    <div>
      <el-carousel style="float: left" height="330px" indicator-position="outside" :interval="3000" arrow="always">
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
        <el-carousel-item>
          <a :href="this.latestNews[5].officialLink" style="text-decoration: none" target="_Blank">
            <img :src="latestNews[5].image" alt="">
            <h3>{{latestNews[5].title}}</h3>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="b2">
      <div style="border-bottom: 3px solid #163172;margin: 0">
        <img src="@/assets/image/新闻.png" style="width: 5%;float: left;">
        <p class="p-style">{{ msg }}</p>
      </div>
      <ul style="font-size: 13px;margin-top: 8px;margin-bottom: 0;padding-left: 20px">
        <div class="li-style" style="border-bottom: 1px solid #163172;">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-right: 2px">
          <a
            :href="this.latestNews[0].officialLink"
            target="_Blank" class="news-title">&nbsp;{{latestNews[0].title}}
            <br/><span class="data-style">{{latestNews[0].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style" style="border-bottom: 1px solid #163172;">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-left: 2px">
          <a
            :href="this.latestNews[1].officialLink"
            target="_Blank" class="news-title">&nbsp;{{latestNews[1].title}}
            <br/><span class="data-style">{{latestNews[1].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style" style="border-bottom: 1px solid #163172;">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-left: 2px">
          <a
            :href="this.latestNews[2].officialLink"
            target="_Blank" class="news-title">&nbsp;{{latestNews[2].title}}
            <br/><span class="data-style">{{latestNews[2].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style" style="border-bottom: 1px solid #163172;">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-left: 2px">
          <a
            :href="this.latestNews[3].officialLink"
            target="_Blank" class="news-title">&nbsp;{{latestNews[3].title}}
            <br/><span class="data-style">{{latestNews[3].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style" style="border-bottom: 1px solid #163172;">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-left: 2px">
          <a
            :href="this.latestNews[4].officialLink"
            target="_Blank" class="news-title">{{latestNews[4].title}}
            <br/><span class="data-style">{{latestNews[4].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <img src="@/assets/image/1.png" width="2%" style="float: left;margin-left: 2px">
          <a
            :href="this.latestNews[5].officialLink"
            target="_Blank" class="news-title">{{latestNews[5].title}}
            <br/><span class="data-style">{{latestNews[5].date}}</span><br/>
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
        msg: '最新消息 / NEWS',
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
    margin-top: 0;
    text-align: center;
    font-size: 12px;
    font-family: "SimSun", serif;
    color: dimgray;
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
    float: right;
    border-bottom: 3px solid #163172;
  }

  a {
    target: new;
  }

  .li-style {
    width: 95%;
    display: block;
    text-decoration: none;
    color: black;
    margin: 0 0;
  }

  .p-style {
    font-weight: bold;
    font-size: 18px;
    padding-left: 7%;
    margin-bottom: 10px;
    /*padding-top: 4px;*/
  }

  .data-style {
    color: #3282B8;
    float: right;
    font-weight: bold;
  }

  .news-title {
    text-decoration: none;
    display: block;
    font-family: "SimSun";
    font-size: 15px;
    /*font-weight: bold;*/
  }
</style>
