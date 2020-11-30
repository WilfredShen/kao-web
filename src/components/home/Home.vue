<template>
  <div>
    <div>
      <el-carousel style="float: left" height="330px" indicator-position="outside" :interval="3000"
                   arrow="always">
        <el-carousel-item>
          <img src="@/assets/1.jpg" alt="">
          <h3>第X届教育大会在长沙顺利召开</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/2.jpg" alt="">
          <h3>第X届教育大会在长沙顺利召开</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/3.jpg" alt="">
          <h3>第X届教育大会在长沙顺利召开</h3>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/3.jpg" alt="">
          <h3>第XX届教育大会在长沙顺利召开</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="b2">
      <p>{{ msg }}</p>
      <ul style="font-size: 13px">
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;新闻sdfdfsdgggxd几十块的回复就看电视gggggggggggggggggggggggdfsdfsdfsdfsdfsdfsdfsdfd1</a>
        <br><br/>
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;message2</a>

        <br><br/>
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;message3</a>
        <br><br/>
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;message3</a>
        <br><br/>
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;message3</a>
        <br><br/>
        <a
          href="https://modao.cc/app/424578a5c577decb6c7c6e51e2ae5e76353a23b2?simulator_type=device&sticky#screen=skgazkc2c5k1mke"
          target="_Blank" class="li_style">&nbsp;sssssssssssssssssssssssssssssssssssssdfs的v是的vsssssssssssssssssssssssssssssssmessage3</a>
      </ul>
    </div>
    <div style="padding-top: 400px">
      <evaluatedis/>
    </div>
  </div>
</template>

<script>
  import evaluatedis from "@/components/home/evaluatedis";

  export default {
    name: 'home',
    components: {
      evaluatedis
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
    margin-right: 0px;
    padding-right: 0px;
  }

  .el-carousel__item {
    margin-right: 0px;
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
    /*margin: 0 12% 0 -10px;*/
    width: 45%;
    height: 100%;
    border: 2px solid black;
    float: right;
  }

  a {
    target: new;
  }

  .li_style {
    width: 80%;
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
