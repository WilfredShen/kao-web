<template>
  <div>
    <div>
      <el-carousel style="float: left" height="330px" indicator-position="outside" :interval="3000" arrow="always">
        <el-carousel-item>
          <img src="@/assets/111.jpeg" alt="">
          <h3>中国数学会再设专业分会 医学数学交叉助力健康中国——中国数学会医学数学专业委员会成立仪式在北大举行</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/222.jpg" alt="">
          <h3>【致辞讲话】习近平向清华大学经济管理学院顾问委员会2020年会议致辞祝贺委员会成立20周年</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/333.png" alt="">
          <h3>第四届全球华人国学大典在京举行 许倬云、陈来获终身成就奖</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/444.jpg" alt="">
          <h3>助推湖南自由贸易试验区建设专家座谈会召开</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/555.jpg" alt="">
          <h3>《千年学府 其命惟新》系列专题片研讨会在岳麓书院举行</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="b2">
      <p>{{ msg }}</p>
      <ul style="font-size: 13px">
        <div class="li_style">
          <a
            href="https://news.pku.edu.cn/xwzh/4caa9d0a4c1e4b1b8bce77be841ec12e.htm"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;中国数学会再设专业分会
            医学数学交叉助力健康中国——中国数学会医学数学专业委员会成立仪式在北大举行
            <br/><span style="float: right">2020/12/03</span><br/>
          </a>
        </div>
        <br/>
        <div class="li_style">
          <a
            href="http://2021.tsinghua.edu.cn/info/1002/1051.htm"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;【致辞讲话】习近平向清华大学经济管理学院顾问委员会2020年会议致辞祝贺委员会成立20周年
            <br/><span style="float: right">2020/12/04</span><br/>
          </a>
        </div>
        <br/>
        <div class="li_style">
          <a
            href="http://news.hnu.edu.cn/info/1102/24077.htm"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;第四届全球华人国学大典在京举行 许倬云、陈来获终身成就奖
            <br/><span style="float: right">2020/11/30</span><br/>
          </a>
        </div>
        <br/>
        <div class="li_style">
          <a
            href="http://news.hnu.edu.cn/info/1102/24039.htm"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;助推湖南自由贸易试验区建设专家座谈会召开
            <br/><span style="float: right">2020/11/26</span><br/>
          </a>
        </div>
        <br/>
        <div class="li_style">
          <a
            href="http://news.hnu.edu.cn/info/1102/24040.htm"
            target="_Blank" style="text-decoration: none;display: block">&nbsp;《千年学府 其命惟新》系列专题片研讨会在岳麓书院举行
            <br/><span style="float: right">2020/11/26</span><br/>
          </a>
        </div>
      </ul>
    </div>
    <div style="padding-top: 400px">
      <homeevaluatedis/>
    </div>
  </div>
</template>

<script>
  import homeevaluatedis from '@/components/home/homeevaluatedis.vue';

  export default {
    name: 'home',
    components: {
      homeevaluatedis
    },
    data() {
      return {
        msg: '最新消息'
      }
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

  .li_style {
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
