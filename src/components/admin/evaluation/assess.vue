<template>
  <div style="padding: 10px 20px 40px 20px;width: 90%;">
    <el-form>
      <el-form-item label="选择轮次：">
        <el-select v-model="round" placeholder="请选择轮次">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-upload action accept=".xlsx,.xls"
                 :auto-upload="false"
                 :on-change="handleChange"
                 :show-file-list=showFile
                 :before-remove="beforeRemove"
                 :on-remove="handleRemove"
                 :file-list="fileList"
                 limit=1
                 :on-exceed="overLimit"
      >
        <el-button plain style="background-color: #1e56a0;color: white">上传文件</el-button>
        <!--          <a href="@/public/评估结果.xls" download="上传评估结果.xls">点击下载样例文件</a>-->
      </el-upload>

    </div>
    <el-divider></el-divider>
    <div>
      <el-table :data="tableData"
                :header-cell-style="{background:'#1e56a0',color:'white'}" border
                stripe max-height="400px">
        <el-table-column prop="mid" label="专业代码" align="center"></el-table-column>
        <el-table-column prop="mname" label="专业名称" align="center"></el-table-column>
        <el-table-column prop="cid" label="高校代码" align="center"></el-table-column>
        <el-table-column prop="cname" label="高校名称" align="center"></el-table-column>
        <el-table-column prop="result" label="评估结果" align="center"></el-table-column>
      </el-table>
    </div>
    <el-button style="min-width: 200px;margin-top: 50px;background-color: #2057a1;color: white" v-if="up"
               @click="upLoad()">
      确认上传
    </el-button>
  </div>
</template>

<script>
  import {readFile} from "@/assets/lib/utils";
  import xlsx from "xlsx";
  import {uploadEvaluation} from "@/assets/lib/setManager";
  import {majorList, schoolList} from "@/assets/lib/getResultLjm";

  export default {
    name: 'AssessEval',
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tableData: [],//最后显示的数据
        round: '',//选择更新第几轮的数据
        excelDatas: [],//表格内拿到的所有数据
        excelLength: '',
        school: {},
        major: {},
        showFile: true,//显示文件列表
        up: false
      }
    },
    methods: {
      handleChange: async function(ev) {
        let file = ev.raw;
        if (!file) {
          return;
        }

        this.schFields = [];

        let data = await readFile(file);
        let workBook = xlsx.read(data, {type: 'binary'});

        let workSheet = workBook.Sheets[workBook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(workSheet);
        console.log(data);

        const range = xlsx.utils.decode_range(workSheet['!ref']);
        let column, row = range.s.r;
        for (column = range.s.c; column <= range.e.c; ++column) {
          const cell = workSheet[xlsx.utils.encode_cell({c: column, r: row})];
          let notification = "UNKNOWN" + column;
          if (cell && cell.t) {
            notification = xlsx.utils.format_cell(cell);
          }
          this.schFields.push({'field': notification});
        }
        this.excelLength = data.length;
        this.excelDatas = data;
        this.fileList = true;
        this.getExcel();
      },
      handleRemove: function(file) {
        this.excelDatas = [];
        this.tableData = [];
        this.fileList = false;
        console.log(file);
      },

      beforeRemove: function(file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      overLimit: function() {
        console.log(this.fileList);
        this.$message.warning("只能选择一个文件，请先删除当前文件！");
      },
      getExcel: function() {
        this.excelDatas.forEach((item) => {
          this.$set(item, 'cname', "");
          this.$set(item, 'mname', "");
        });
        let flag = true;
        this.tableData = this.excelDatas;
        for (let i = 0; i < this.tableData.length; i++) {
          // console.log(i,this.major[this.tableData[i].mid]);
          if (this.school[this.tableData[i].cid].cname && this.major[this.tableData[i].mid]) {
            this.tableData[i].cname = this.school[this.tableData[i].cid].cname;
            this.tableData[i].mname = this.major[this.tableData[i].mid].mname;
          } else {
            flag = false;
            break;
          }
        }
        if (!flag) {
          this.$confirm(`上传信息有误，学校代码或专业代码不匹配`, '提示')
            .then((res) => {
              console.log(res);
              this.tableData = [];
              this.showFile = false;
              this.round = '';
              flag = true;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.up = true;
        }
      },

      upLoad: function() {
        if (this.round === null || this.round === '' || this.round === "undefined") {
          console.log("round", this.round);
          this.$confirm(`请选择轮次！`, '提示')
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$confirm(`确定上传以上信息？`, '提示')
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.tableData.length; i++) {
                console.log(this.tableData[i].cid + '', this.tableData[i].mid, this.tableData[i].result, parseInt(this.round));
                uploadEvaluation(this.tableData[i].cid, this.tableData[i].mid, this.tableData[i].result, parseInt(this.round))
                  .then((res) => {
                    console.log("上传成功", res);
                    this.$message({
                      showClose: true,
                      message: '上传成功！',
                      type: 'success'
                    });
                    this.tableData = [];
                    this.showFile = false;
                    this.round = '';
                  })
                  .catch((err) => {
                    this.$message({
                      showClose: true,
                      message: '上传失败！',
                      type: 'error'
                    });
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });

        }
      },
    },
    created() {
      schoolList()
        .then((res) => {
          res.forEach((row) => {
            this.school[row.cid] = {cname: row.cname}
          })
          // console.log("school", this.school);
        })
        .catch((err) => {
          console.log(err);
        });

      majorList()
        .then((res) => {
          res.forEach(row => {
            this.major[row.mid] = {mname: row.mname, did: row.did}
          })
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
</script>

<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-form-item__label {
    font-size: 17px;
    font-weight: bold;
    color: black;
  }

  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    overflow: scroll !important;
  }
</style>
