<template xmlns:el-table="http://www.w3.org/1999/html">
  <div
    :style="myBackground"
    class="center"
  >
    <div
      class="tableTransparent"
      style="width: 70%;height: 80%"
    >
      <el-table
        :data="schoolCollect"
        :height="height"
        :header-cell-style="{background:'#163172',color:'#ffffff',height:'70px'}"
        style="font-size: 18px;font-weight: bold;color: #ffffff"
      >
        <el-table-column
          sortable
          prop="schoolID"
          align="center"
          label="高校代码"
        ></el-table-column>
        <el-table-column
          prop="schoolName"
          align="center"
          label="高校名称"
        ></el-table-column>
        <el-table-column
          sortable
          prop="majorID"
          align="center"
          label="专业代码"
        ></el-table-column>
        <el-table-column
          prop="majorName"
          align="center"
          label="专业名称"
        ></el-table-column>
        <el-table-column
          align="center"
          label="取消收藏"
        >
          <template slot-scope="scope">
            <el-button
              style="background-color: #1e56a0;color: white"
              @click="cancel(scope.$index,scope.row['schoolID'],scope.row['majorID'])"
            >取消收藏
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Favor',
    props: {
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        schoolCollect: [],
        myBackground: {
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
      }
    },
    methods: {
      cancel: function(index, schoolID, majorID) {
        console.log("取消", schoolID, " ", majorID);
        this.$axios.post("/api/favor/d/major", {
          'majorCid': schoolID,
          'majorMid': majorID
        })
          .then((res) => {
            if (res.data.status === 200) {
              this.$message.success("取消成功");
              this.schoolCollect.splice(index, 1);
            }
          })
          .catch((err) => {
            console.log("取消收藏有错误" + err);
          });
      },

      setCollectInfo: function() {
        this.$axios.get("/api/favor/q/major")
          .then((res) => {
            console.log(res.data);
            let item = res.data.data;
            for (let i = 0; i < item.length; i++) {
              this.schoolCollect.push({
                'schoolID': item[i].cid,
                'schoolName': item[i].cname,
                'majorID': item[i].mid,
                'majorName': item[i].mname
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    created() {
      this.setCollectInfo();
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
