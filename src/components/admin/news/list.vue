<template>
  <div style="height: 82%">
    <el-table
      :data="tableData"
      :height="height"
      :header-cell-style="{background:'#1e56a0',color:'white',height:'70px'}"
      style="font-size: 17px;"
    >
      <el-table-column
        prop="upTime"
        label="上传时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="adminId"
        label="管理员ID"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="schoolName"
        label="高校名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="edit"
        label="编辑"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.$index,scope.row)"
            type="primary"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="editNews"
      :width="width"
    >
      <news-update
        :cid="cid"
        :up-time="uploadTime"
        :newsTitle="newsTitle"
        @eIfCommit="ifEdit($event)"
        @hasEdit="hasEdit($event)"
      ></news-update>
    </el-dialog>
  </div>
</template>

<script>

  import {getCookie, getSchMap} from "@/assets/lib/utils";
  import NewsUpdate from "./update"
  import {schoolList} from "@/assets/lib/getResultLjm";

  export default {
    name: 'ShowList',
    props: {
      width: {
        type: String,
        default: '34%'
      },
      height: {
        type: String,
        default: '100%'
      },
    },
    components: {
      NewsUpdate,
    },
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tableData: [],
        editNews: false,
        news: {},//待修改的新闻
        sMap: {},
        schools: [],
        schoolIds: [],
        uploadTime: '',
        newsTitle: '',//标题
        cid: "",
        editIndex: -1,
      }
    },
    methods: {
      ifEdit: function(data) {
        this.editNews = data;
      },

      hasEdit: function(data) {
        if (data) {
          this.queryNewsList();
        }
      },

      edit: function(editIndex, row) {
        this.news = row;
        this.editIndex = editIndex;
        this.editNews = true;
        this.uploadTime = this.news['upTime'];
        this.newsTitle = this.news['title'];
        // NewsUpdate.methods.setTitle(this.newsTitle);
        const schMap = getSchMap(this);
        this.cid = schMap.get(this.news['schoolName']);
      },

      setNewsList: function(items) {
        const adminId = getCookie("adminId");
        let tempData = [];
        console.log("items=", items);
        for (let i = 0; i < items.length; i++) {
          tempData.push({
            upTime: items[i].date,
            adminId: adminId,
            schoolName: this.sMap[items[i].cid],
            title: items[i].title
          });
        }
        this.tableData = tempData;
      },

      queryNewsList: function() {
        this.$axios.get("/api/admin/q/news")
          .then((res) => {
            console.log("获取新闻列表无误", res);
            let items = res.data.data;
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
          })
          .catch((error) => {
            console.log("获取新闻列表有错误", error);
          });
      }
    },
    created() {
      this.queryNewsList();
    },
    watch: {
      "$route": {
        handler(route) {
          console.log(route.name);
          const that = this;
          if (route.name === 'ShowList') {
            that.queryNewsList();
          }
        }
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }
</style>
