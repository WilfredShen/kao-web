<template>
  <div>
    <div class="sch_divstyle">
      <el-button size="medium" class="row_style" type="text" @click="$router.push({ path: '/schoolDetail' })" icon="el-icon-back"></el-button>
      <el-input v-model="input" style="float: left;width:18%;margin: 3px 5px" size="small" placeholder="请输入内容"></el-input>
      <el-button size="small" style="margin: 3px 5px" round>查询</el-button>
    </div><br>
    <div class="sch_divstyle" style="padding: 10px 0">
      <span style="margin: 10px 5px"><a target="_blank" href="https://www.pku.edu.cn/" style="text-decoration: none;color: black">
        10001 北京大学（985/211/双一流）
      </a>
      </span>
      <el-button size="small" style="float: right;margin: -4px 4px" round>收藏</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'school',
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.sch_divstyle{
  border: 1px solid black;
}
.row_style{
  color: gray;
  width: 3%;
  float: left;
}
</style>
