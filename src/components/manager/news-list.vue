<template>
  <div>
    <el-scrollbar style="height: 550px">
      <el-table :data="tableData" :header-cell-style="{background:'#1e56a0',color:'white'}" border stripe>
        <el-table-column prop="up_time" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="admin_id" label="管理员ID" align="center"></el-table-column>
        <el-table-column prop="school_name" label="高校名称" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="edit" label="编辑" align="center">
          <el-button size="small" @click="edit()">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-dialog :visible.sync="editNews" :width="width">
      <newsupdate @eIfCommit="ifEdit($event)"></newsupdate>
    </el-dialog>
  </div>
</template>

<script>

  import {getCookie} from "../../assets/lib/utils";
  import {getSchool} from "../../assets/lib/getHomeServe";
  import newsupdate from "./news-update"

  export default {
    props: {
      width: {
        type: String,
        default: '34%'
      }
    },
    components: {
      newsupdate
    },
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tableData: [],
        editNews: false
      }
    },
    methods: {
      ifEdit(data) {
        this.editNews = data;
      },
      edit() {
        this.editNews = true;
      },
      getSchMaps() {
        if (JSON.stringify(this.$store.state.schoolMap) !== '{}') {
          let sMap = this.$store.state.schoolMap;
          for (const key in sMap) {
            this.schoolIds.push(key);
            this.schools.push(sMap[key])
          }
        } else {
          getSchool().then((res) => {
            res.data.forEach(row => {
              this.schoolIds.push(row.cid);
              this.schools.push(row.cname);
              this.$store.commit("setSchMap", {
                cname: row.cname,
                cid: row.cid
              });
            })
          }).catch((err) => {
            console.log(err)
          });
        }
      }
    },
    created() {
      const uid = getCookie("uid");
      this.$axios.get("/api/admin/q/news")
        .then(res => {
          console.log("获取新闻列表无误", res);
          let items = res.data.data;
          for (let i = 0; i < items.length; i++) {
            this.tableData.push({
              up_time: items[i].date,
              admin_id: uid,
              school_name: items[i].cid,
              title: items[i].title
            })
          }
        })
        .catch(error => {
          console.log("获取新闻列表有错误", error);
        })


    }
  }
</script>

<style scoped>

</style>
