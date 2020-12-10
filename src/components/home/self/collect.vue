<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
      <div>
        <p>高校收藏列表：</p>
        <table style="width: 100%">
          <tr>
            <th class="myth">高校名称及代码</th>
            <th class="myth">专业名称及代码</th>
            <th class="myth">取消收藏</th>
          </tr>
          <tr v-for="(item,index) in school_collect" :key="index" v-bind:class="index%2!==0?'change-color':''">
            <td class="tds">{{item.school_id_name}}</td>
            <td class="tds">{{item.major_id_name}}</td>
            <td class="tds">
              <el-button @click="cancle(index)">取消收藏</el-button>
            </td>
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
        school_collect: [],
        cids: [],
        mids: []
      }
    },
    methods: {
      cancle(index) {
        console.log("index = " + index);
        console.log(this.cids[index]);
        console.log(this.mids[index]);
        this.$axios.post("/api/favor/d/major", {
          'majorCid': this.cids[index],
          'majorMid': this.mids[index]
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
                'school_id_name': item[i].cid + " " + item[i].cname,
                'major_id_name': item[i].mid + " " + item[i].mname,
              })
              this.cids.push(item[i].cid);
              this.mids.push(item[i].mid);
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
