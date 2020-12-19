<template>
  <div>
    <span style="font-size: 20px;font-weight: bold">最近消息</span>
    <div style="width: 100%">
      <el-scrollbar style="height: 500px">
        <table style="width: 100%;margin-top: 25px">
          <tr>
            <th class="myth" style="height: 60px;text-align: center;">关注的高校</th>
            <th class="myth">信息类型</th>
            <th class="myth">新闻链接</th>
            <th class="myth">更新日期</th>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index" v-bind:class="index%2!==0 ? 'change-color' : ''">
            <td class="tds">{{item.focus_school}}</td>
            <td class="tds">{{item.info_type}}</td>
            <td class="tds"><a :href="item.link_to" target="_blank">链接</a></td>
            <td class="tds">{{item.up_date}}</td>
          </tr>
        </table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.$axios.get("/api/favor/q/news")
        .then(res => {
          console.log(res)
          let item = res.data.data;
          for (let i = 0; i < item.length; i++) {
            let type = item[i].type;
            if (type === 'summer_camp') type = "夏令营";
            else type = "新闻";
            this.tableData.push({
              'focus_school': item[i].cname,
              'info_type': type,
              'link_to': item[i].officialLink,
              'up_date': item[i].updateTime.substring(0, 10)
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
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
