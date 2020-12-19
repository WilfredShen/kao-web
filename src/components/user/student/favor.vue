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
          <tr v-for="(item,index) in school_collect" :key="index" v-bind:class="index%2!==0?'':'change-color1'">
            <td class="tds">{{item.school_id}} {{item.school_name}}</td>
            <td class="tds">{{item.major_id}} {{item.major_name}}</td>
            <td class="tds">
              <el-button style="background-color: #1e56a0;color: white" @click="cancle(index)">取消收藏</el-button>
            </td>
          </tr>
        </table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'favor',
    data() {
      return {
        school_collect: [],
      }
    },
    methods: {
      cancle(index) {
        this.$axios.post("/api/favor/d/major", {
          'majorCid': this.school_collect[index].school_id,
          'majorMid': this.school_collect[index].major_id
        })
          .then(res => {
            console.log(res);
            this.school_collect = [];
            this.setCollectInfo();
          })
          .catch(err => {
            console.log("取消收藏有错误" + err)
          })
      },
      setCollectInfo() {
        this.$axios.get("/api/favor/q/major")
          .then(res => {
            console.log(res.data);
            let item = res.data.data;
            for (let i = 0; i < item.length; i++) {
              this.school_collect.push({
                'school_id': item[i].cid,
                'school_name': item[i].cname,
                'major_id': item[i].mid,
                'major_name': item[i].mname
              })
            }
          })
          .catch(error => {
            console.log(error);
          })
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

  .change-color1 {
    background-color: #d6e4f0;
  }

  .tds {
    width: 25%;
    height: 50px;
    text-align: center;
    font-size: 16px;
  }
</style>
