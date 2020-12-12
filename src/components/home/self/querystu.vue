<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
      <div>
        <div class="selection">
          <p>毕业时间：</p>
          <el-date-picker class="DatePick" type="year" placeholder="起" v-model="BeginY"></el-date-picker>
          <p style="margin-left: 10px;margin-right: 10px">—</p>
          <el-date-picker class="DatePick" type="year" placeholder="止" v-model="EndY"></el-date-picker>
        </div>
        <div class="selection">
          <p>本科高校：</p>
          <el-select placeholder="985">
            <el-option label="985" value="t1"></el-option>
            <el-option label="211" value="t2"></el-option>
            <el-option label="双一流" value="t3"></el-option>
          </el-select>
        </div>
        <div class="selection">
          <p>本科专业：</p>
          <el-select placeholder="选择本科专业">
            <el-option label="软件工程" value="t1"></el-option>
            <el-option label="通信工程" value="t2"></el-option>
            <el-option label="信息安全" value="t3"></el-option>
          </el-select>
        </div>
        <div class="selection">
          <p>预期专业：</p>
          <el-select placeholder="选择预期专业">
            <el-option label="软件工程" value="t1"></el-option>
            <el-option label="通信工程" value="t2"></el-option>
            <el-option label="信息安全" value="t3"></el-option>
          </el-select>
        </div>
        <div class="selection">
          <div style="width: 75%">
            <el-button type="primary" style="min-width: 100px;margin-top: 20px">筛选</el-button>
          </div>
          <div class="selection" style="width: 20%">
            <el-button>导出为EXCEL</el-button>
            <el-button>导出为CSV</el-button>
            <el-button @click="test()">打印</el-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table :data="Stu_info" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
          <el-table-column prop="school_id_name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="teacher_name" label="本科高校" align="center"></el-table-column>
          <el-table-column prop="tel" label="本科专业" align="center"></el-table-column>
          <el-table-column prop="address" label="预期专业" align="center"></el-table-column>
          <el-table-column prop="address" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="address" label="邮箱地址" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        BeginY: '',
        EndY: '',
      }
    },
    methods: {
      test() {
        console.log(this.BeginY + " " + this.EndY);
      }
    }
  }
</script>

<style scoped>
  .DatePick {
    width: 150px;
  }

  .selection {
    display: flex;
    align-items: center;
  }
</style>
