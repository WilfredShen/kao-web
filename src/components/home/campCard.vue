<template>
  <div style="margin: 0 12%">
    <div class="cards">
      <el-card shadow="hover">
        <div style="display: flex;flex-direction: row">
          <el-image style="width: 30%" :src="url" fit="cover"></el-image>
          <div id="infos" style="display: flex;flex-direction: column">
            <p class="campspan">某某大学夏令营</p>
            <p>简介</p>
            <p id="date">2020-11-12</p>
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination background layout="prev,pager,next" total="1000"
                   style="text-align:center;width: 100%"></el-pagination>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        }
    }
</script>

<style scoped>
  #infos {
    margin-left: 30px;
    position: relative;
  }

  #date {
    /*position: absolute;*/
    bottom: 0;
    margin: 0;
  }

  .campspan {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    display: block;
  }
</style>
