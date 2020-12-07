<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;">
      <el-form>
        <el-form-item label="选择轮次：">
          <el-select placeholder="1">
            <el-option label="1" value="r1"></el-option>
            <el-option label="2" value="r2"></el-option>
            <el-option label="3" value="r3"></el-option>
            <el-option label="4" value="r4"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 20px">更新界面</el-button>
        </el-form-item>
      </el-form>

      <div style="display: flex;align-items: center">
        <p>{{hint}}</p>
        <el-button style="margin-left: 20px">上传文件</el-button>
      </div>
      <el-divider></el-divider>
      <div>
        <p>数据校验</p>
        <el-table :data="tabledata" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
          <el-table-column prop="subject_id_name" label="学科代码及名称" align="center"></el-table-column>
          <el-table-column prop="school_id_name" label="高校名称及代码" align="center"></el-table-column>
          <el-table-column prop="assess_result" label="评估结果" align="center"></el-table-column>
        </el-table>
      </div>

      <el-button type="primary" style="min-width: 200px;margin-top: 50px">
        确认上传
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tabledata: [{
          subject_id_name: '01计算机科学与技术',
          school_id_name: '湖南大学',
          assess_result: ' B+'
        }, {
          subject_id_name: '02挖掘机',
          school_id_name: '蓝翔技术学校',
          assess_result: 'A+'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
