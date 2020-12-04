<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
      <div>
        <p>高校收藏列表：</p>
        <el-table :data="school_collect" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border
                  stripe>
          <el-table-column prop="school_id_name" label="高校名称及代码" align="center"></el-table-column>
          <el-table-column prop="major_id_name" label="专业名称及代码" align="center"></el-table-column>
          <el-table-column label="取消收藏" align="center"></el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
      <div>
        <p>导师收藏列表：</p>
        <el-table :data="teacher_collect" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border
                  stripe>
          <el-table-column prop="school_id_name" label="高校名称及代码" align="center"></el-table-column>
          <el-table-column prop="teacher_name" label="导师姓名" align="center"></el-table-column>
          <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="address" label="邮箱地址" align="center"></el-table-column>
          <el-table-column label="取消收藏" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        school_collect: [{
          school_id_name: '01湖南大学',
          major_id_name: '01软件工程',
        }, {
          school_id_name: '02中南大学',
          major_id_name: '01软件工程',
        }],
        teacher_collect: [{
          school_id_name: '01湖南大学',
          teacher_name: '边耐政',
          tel: '135-12341234',
          address: '湖南省长沙市',
        }, {
          school_id_name: '01湖南大学',
          teacher_name: '戴牡红',
          tel: '135-12341234',
          address: '湖南省长沙市',
        }]
      }
    }
  }
</script>

<style scoped>

</style>
