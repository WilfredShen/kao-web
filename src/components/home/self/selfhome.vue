<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;height: 550px">
      <p>最近消息：</p>
      <div style="width: 100%">
        <table style="width: 100%">
          <tr>
            <th class="myth" style="height: 80px;text-align: center;">关注的高校</th>
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
      </div>
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
            this.tableData.push({
              'focus_school': item[i].cname,
              'info_type': item[i].type,
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
    background-color: #eef1f6;
  }

  .change-color {
    background-color: #eef1f6;
  }

  .tds {
    width: 25%;
    height: 60px;
    text-align: center;
  }
</style>
