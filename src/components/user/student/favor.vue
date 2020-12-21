<template>
  <div>
    <div>
      <span style="font-size: 20px;font-weight: bold">高校收藏列表：</span>
      <el-scrollbar style="height: 550px">
        <table style="width: 100%;margin-top: 25px">
          <tr>
            <th class="myth">高校名称及代码</th>
            <th class="myth">专业名称及代码</th>
            <th class="myth">取消收藏</th>
          </tr>
          <tr v-for="(item,index) in schoolCollect" :key="index" v-bind:class="index%2!==0?'':'change-color'">
            <td class="tds">{{item.schoolID}} {{item.schoolName}}</td>
            <td class="tds">{{item.majorID}} {{item.majorName}}</td>
            <td class="tds">
              <el-button style="background-color: #1e56a0;color: white" @click="cancel(index)">取消收藏</el-button>
            </td>
          </tr>
        </table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Favor',
    data() {
      return {
        schoolCollect: [],
      }
    },
    methods: {
      cancel: function(index) {
        this.$axios.post("/api/favor/d/major", {
          'majorCid': this.schoolCollect[index].schoolID,
          'majorMid': this.schoolCollect[index].majorID
        })
          .then((res) => {
            console.log(res);
            this.schoolCollect = [];
            this.setCollectInfo();
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


  .myth {
    height: 80px;
    text-align: center;
    background-color: #1e56a0;
    font-size: 20px;
    color: white;
  }

  .change-color {
    background-color: #d6e4f0;
  }

  .tds {
    width: 25%;
    height: 50px;
    text-align: center;
    font-size: 16px;
  }
</style>
