<template>
  <div style="padding: 40px 10px 10px 10px">


    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;">
      <el-form label-width="100px">
        <el-form-item label="类型：">
          <el-select placeholder="高校新闻">
            <el-option label="高校新闻" value="t1"></el-option>
            <el-option label="夏令营" value="t2"></el-option>
            <el-option label="九月推免" value="t3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="高校名称：">
          <el-input class="input" v-model="school_name" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input class="input" v-model="title" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input class="input" v-model="content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-button>选择图片</el-button>
        </el-form-item>
        <el-form-item label="时间：">
          <el-input class="input" v-model="time" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="官方链接：">
          <el-input class="input" v-model="link" placeholder="单行输入"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" style="min-width: 200px;margin-top: 50px">
        确认上传
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        school_name: '',
        title: '',
        content: '',
        time: '',
        link: ''
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 250px;
  }
</style>
