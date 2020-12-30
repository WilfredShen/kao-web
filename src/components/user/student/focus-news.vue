<template>
  <div :style="myBackground" class="center">
    <!--    <div style="width: 70%;height: 80%">-->
    <div class="tableTransparent" style="width: 70%;height: 80%">
      <el-table :data="tableData" :height="height"
                :header-cell-style="{background:'#163172',color:'#ffffff',height:'70px'}"
                :row-style="{height:'60px'}"
                style="font-size: 18px;font-weight: bold;color: #ffffff">
        <el-table-column prop="focusSchool" align="center" label="关注高校"></el-table-column>
        <el-table-column prop="infoType" align="center" label="新闻类型"></el-table-column>
        <el-table-column sortable prop="upDate" align="center" label="更新时间"></el-table-column>
        <el-table-column align="center" label="链接">
          <template slot-scope="scope">
            <span @click="skip(scope.row['linkTo'])" style="width: 50px;height: 20px;">链接</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
  export default {
    name: 'FocusNews',
    props: {
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        tableData: [],
        myBackground: {
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
      }
    },
    created() {
      this.$axios.get("/api/favor/q/news")
        .then((res) => {
          let item = res.data.data;
          for (let i = 0; i < item.length; i++) {
            let type = item[i].type;
            if (type === 'summer_camp') {
              type = "夏令营";
            } else {
              type = "新闻";
            }
            this.tableData.push({
              'focusSchool': item[i].cname,
              'infoType': type,
              'linkTo': item[i].officialLink,
              'upDate': item[i].updateTime.substring(0, 10)
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
      skip(e) {
        window.open(e);
      },
    }
  }
</script>

<style scoped>
  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }

  .tableTransparent /deep/ .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  .tableTransparent /deep/ .el-table tr {
    background-color: rgba(255, 255, 255, 0.25) !important;
  }

  .tableTransparent >>> .el-table tr:hover {
    background: rgba(245, 247, 250, 0.1) !important;
    color: black;
  }
</style>
