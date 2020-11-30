<template>
  <div>
    <div class="choose" style="display: flex;flex-direction: column;justify-content: space-around">
      <div style="width: 60px">
        <el-input size="small" style="width: 200px;" v-model="input" placeholder="模糊查询" clearable></el-input>
      </div>
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;padding-left: 0">排名筛选 : </p>
        <el-dropdown style="margin-right: 10px" size="small" split-button trigger="click"
                     @command="handleCommand">
          {{rank_sys}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="软科">软科</el-dropdown-item>
            <el-dropdown-item command="QS" divided>QS</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="small" split-button trigger="click" @command="handleRank">
          {{rank}}
          <el-dropdown-menu slot="dropdown" style="width: 80px">
            <el-dropdown-item command="全部">全部</el-dropdown-item>
            <el-dropdown-item command="前五名" divided>前五名</el-dropdown-item>
            <el-dropdown-item command="前十名" divided>前十名</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button size="small" style="width: 150px">查询</el-button>
    </div>

    <div class="result" style="margin-top: 50px">
      <el-table :data="tabledata" @row-click="schoolclik"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
        <router-link tag="sep" to="/" class="nav-i">
          <el-table-column prop="school_id_name" label="学校代码及名称" align="center"></el-table-column>
        </router-link>
        <el-table-column prop="major_rank" label="指定专业评级" align="center"></el-table-column>
        <el-table-column prop="rank" label="指定排名" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        rank_sys: '请选择排名体系',
        rank: '全部',
        tabledata: [{
          school_id_name: '01湖南大学',
          major_rank: '计算机科学与技术 B+',
          rank: '40'
        }, {
          school_id_name: '02蓝翔技术学校',
          major_rank: '挖掘机 A+',
          rank: '1'
        }]
      }
    },
    methods: {
      handleCommand(command) {
        this.rank_sys = command
      },
      handleRank(command) {
        this.rank = command
      },
      schoolclik: function () {
        this.$router.push({path: '/school'})
      }
    }
  }
</script>

<style scoped>
  .choose, .result {
    border: solid 1px darkgrey;
    padding: 35px 20px 35px 20px;
  }

  .router-link-active {
    color: $ color-theme;
  }

</style>
