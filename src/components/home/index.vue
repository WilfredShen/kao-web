<template>
  <div>
    <div>
      <el-carousel style="float: left" height="330px" indicator-position="outside" :interval="3000" arrow="always">
        <el-carousel-item>
          <!--          <a href="http://2021.tsinghua.edu.cn/info/1002/1051.htm" target="_Blank">-->
          <img :src="latenews[0].image" alt="">
          <h3>{{latenews[0].title}}</h3>
          <!--          </a>-->
        </el-carousel-item>
        <el-carousel-item>
          <img :src="latenews[1].image" alt="">
          <h3>{{latenews[1].title}}</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img :src="latenews[2].image" alt="">
          <h3>{{latenews[2].title}}</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img :src="latenews[3].image" alt="">
          <h3>{{latenews[3].title}}</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img :src="latenews[4].image" alt="">
          <h3>{{latenews[4].title}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="b2">
      <p>{{ msg }}</p>
      <ul style="font-size: 13px">
        <div class="li-style">
          <a
              href="https://news.pku.edu.cn/xwzh/4caa9d0a4c1e4b1b8bce77be841ec12e.htm"
              target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latenews[0].title}}
            <br/><span style="float: right">{{latenews[0].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
              href="http://2021.tsinghua.edu.cn/info/1002/1051.htm"
              target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latenews[1].title}}
            <br/><span style="float: right">{{latenews[1].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
              href="http://news.hnu.edu.cn/info/1102/24077.htm"
              target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latenews[2].title}}
            <br/><span style="float: right">{{latenews[2].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
              href="http://news.hnu.edu.cn/info/1102/24039.htm"
              target="_Blank" style="text-decoration: none;display: block">&nbsp;{{latenews[3].title}}
            <br/><span style="float: right">{{latenews[3].date}}</span><br/>
          </a>
        </div>
        <br/>
        <div class="li-style">
          <a
              href="http://news.hnu.edu.cn/info/1102/24040.htm"
              target="_Blank" style="text-decoration: none;display: block">{{latenews[4].title}}
            <br/><span style="float: right">{{latenews[4].date}}</span><br/>
          </a>
        </div>
      </ul>
    </div>
    <div style="padding-top: 400px">
      <evaluatedis/>
    </div>
  </div>
</template>

<script>
  import evaluatedis from '@/components/home/evaluatedis.vue';
  import {getLatestNews} from "../../assets/lib/getHomeServe";

  export default {
    name: 'home',
    components: {
      evaluatedis
    },
    data() {
      return {
        msg: '最新消息',
        latenews: [],
      }
    },
    created() {
      getLatestNews().then((res) => {
        this.latenews = res.data;
        // console.log("latenews",this.latenews);
      })
        .catch((err) => {
          console.log(err);
        })
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
