<template>
  <div style="margin: 0 12%">
    <div>
      <el-card shadow="hover" v-for="(item,index) in camps" :key="index" style="margin-bottom: 10px">
        <div style="display: flex;flex-direction: row">
          <el-image style="width: 20%;margin-right: 10px" :src="item.image" fit="cover"></el-image>
          <div style="width:80%;display: flex;flex-direction: column">
            <span class="title">{{item.title}}</span>
            <span>{{item.content}}</span>
            <span class="date">{{item.date}}</span>
            <el-link type="primary" :href="item.link" target="_blank">新闻链接</el-link>
          </div>
        </div>
      </el-card>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev,pager,next"
          background
          :total=currentTotal
          :page-size=pageSize
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        camps: [],
        currentPage: 1,
        currentTotal: 47,
        pageSize: 4
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页：${val}`);
        this.setCamps(val);
      },
      setCamps(val) {
        const cps = this.$store.state.camps;
        this.camps = [];
        for (let i = val; i < val + 4; i++) {
          this.camps.push({
            content: cps[i].content,
            title: cps[i].title,
            date: cps[i].date,
            image: cps[i].image === null ? 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' : cps[i].image,
            link: cps[i].officialLink
          })
        }
      }
    },
    created() {
      // console.log("len = ",this.$store.state.camps.length===0)
      if (this.$store.state.camps.length === 0) {
        this.$axios.get("/api/base/summer-camp")
          .then(res => {
            console.log("获取夏令营成功" + res.data);
            this.setCamps(0);
          })
      } else {
        this.setCamps(0);
      }
    },
  }
</script>

<style scoped>
  .title {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  .date {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .el-link {
    width: 10%;

  }
</style>
