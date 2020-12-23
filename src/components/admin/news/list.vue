<template>
  <div>
    <el-scrollbar style="height: 550px">
      <el-table :data="tableData" :header-cell-style="{background:'#1e56a0',color:'white'}" border stripe>
        <el-table-column prop="upTime" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="adminId" label="管理员ID" align="center"></el-table-column>
        <el-table-column prop="schoolName" label="高校名称" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="edit" label="编辑" align="center">
          <el-button size="small" @click="edit()">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-dialog :visible.sync="editNews" :width="width">
      <news-update @eIfCommit="ifEdit($event)"></news-update>
    </el-dialog>
  </div>
</template>

<script>

  import {getCookie} from "@/assets/lib/utils";
  import NewsUpdate from "./update"
  import {schoolList} from "@/assets/lib/getResultLjm";

  export default {
    name: 'ShowList',
    props: {
      width: {
        type: String,
        default: '34%'
      }
    },
    components: {
      NewsUpdate,
    },
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tableData: [],
        editNews: false,
        sMap: {},
      }
    },
    methods: {
      ifEdit: function (data) {
        this.editNews = data;
      },

      edit: function () {
        this.editNews = true;
      },
      setNewsList: function(items) {
        const adminId = getCookie("adminId");
        for (let i = 0; i < items.length; i++) {
          this.tableData.push({
            upTime: items[i].date,
            adminId: adminId,
            schoolName: this.sMap[items[i].cid],
            title: items[i].title
          })
        }
      }
    },
    created() {
      this.$axios.get("/api/admin/q/news")
        .then((res) => {
          console.log("获取新闻列表无误", res);
          let items = res.data.data;
          if (JSON.stringify(this.$store.state.schoolMap) !== '{}') {
            this.sMap = this.$store.state.schoolMap;
            this.setNewsList(items);
          } else {
            schoolList()
              .then((res) => {
                res.forEach((row) => {
                  this.$store.commit("setSchMap", {
                    cname: row.cname,
                    cid: row.cid
                  });
                  this.sMap[row.cid] = row.cname;
                });
                this.setNewsList(items);
              })
              .catch((err) => {
                console.log(err);
              });
          }


        })
        .catch((error) => {
          console.log("获取新闻列表有错误", error);
        });
    }
  }
</script>

<style scoped>

</style>
