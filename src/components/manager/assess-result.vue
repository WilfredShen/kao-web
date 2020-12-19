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
                 :on-preview="handlePreview"
                 :show-file-list=showfile
                 :before-remove="beforeRemove"
                 :on-remove="handleRemove"
                 :file-list="fileList"
      >
        <el-button plain style="background-color: #1e56a0;color: white">上传文件</el-button>
        <!--          <a href="@/public/评估结果.xls" download="上传评估结果.xls">点击下载样例文件</a>-->
      </el-upload>

    </div>
    <el-divider></el-divider>
    <div>
      <el-table :data="tabledata"
                :header-cell-style="{background:'#1e56a0',color:'white'}" border
                stripe max-height="400px">
        <el-table-column prop="mid" label="专业代码" align="center"></el-table-column>
        <el-table-column prop="mname" label="专业名称" align="center"></el-table-column>
        <el-table-column prop="cid" label="高校代码" align="center"></el-table-column>
        <el-table-column prop="cname" label="高校名称" align="center"></el-table-column>
        <el-table-column prop="result" label="评估结果" align="center"></el-table-column>
      </el-table>
    </div>
    <el-button style="min-width: 200px;margin-top: 50px;background-color: #456268;color: white" v-if="up"
               @click="upload">
      确认上传
    </el-button>
  </div>
</template>

<script>
  import {readFile} from "../../assets/lib/utils";
  import xlsx from "xlsx";
  import {getMajor, getSchool} from "../../assets/lib/getHomeServe";
  import {uploadEvaluation} from "../../assets/lib/setManager";

  export default {
    data() {
      return {
        hint: '当前轮次没有数据，请上传',
        tabledata: [],//最后显示的数据
        round: '',//选择更新第几轮的数据
        excelDatas: [],//表格内拿到的所有数据
        exclength: '',
        fileList: [],
        school: {},
        major: {},
        showfile: true,//显示文件列表
        up: false
      }
    },
    methods: {
      async handleChange(ev) {
        let file = ev.raw;
        if (!file) return;

        this.sch_fields = [];

        let data = await readFile(file);
        let workbook = xlsx.read(data, {type: 'binary'});

        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data);

        const range = xlsx.utils.decode_range(worksheet['!ref']);
        let C, R = range.s.r;
        for (C = range.s.c; C <= range.e.c; ++C) {
          const cell = worksheet[xlsx.utils.encode_cell({c: C, r: R})]
          let hdr = "UNKNOWN" + C;
          if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
          this.sch_fields.push({'field': hdr});
        }
        this.exclength = data.length;
        this.excelDatas = data;
        this.getexcel();
      },
      handleRemove(file) {
        this.excelDatas = [];
        this.tabledata = [];
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      getexcel() {
        this.excelDatas.forEach(item => {
          this.$set(item, 'cname', "");
          this.$set(item, 'mname', "");
        });
        let flag = true;
        this.tabledata = this.excelDatas;
        for (let i = 0; i < this.tabledata.length; i++) {
          // console.log(i,this.major[this.tabledata[i].mid]);
          if (this.school[this.tabledata[i].cid].cname && this.major[this.tabledata[i].mid]) {
            this.tabledata[i].cname = this.school[this.tabledata[i].cid].cname;
            this.tabledata[i].mname = this.major[this.tabledata[i].mid].mname;
          } else {
            flag = false;
            break;
          }
        }
        if (!flag) {
          this.$confirm(`上传信息有误，学校代码或专业代码不匹配`, '提示')
            .then((res) => {
              console.log(res);
              this.tabledata = [];
              this.showfile = false;
              this.round = '';
              flag = true;
            })
            .catch((err) => {
              console.log(err);
            })
        }
        this.up = true;
      },
      upload() {
        if (this.round === null || this.round === '' || this.round === "undefined") {
          console.log("round", this.round);
          this.$confirm(`请选择轮次！`, '提示')
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          this.$confirm(`确定上传以上信息？`, '提示')
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.tabledata.length; i++) {
                console.log(this.tabledata[i].cid + '', this.tabledata[i].mid, this.tabledata[i].result, parseInt(this.round));
                uploadEvaluation(this.tabledata[i].cid, this.tabledata[i].mid, this.tabledata[i].result, parseInt(this.round))
                  .then((res) => {
                    console.log("上传成功", res);
                    this.$message({
                      showClose: true,
                      message: '上传成功！',
                      type: 'success'
                    });
                    this.tabledata = [];
                    this.showfile = false;
                    this.round = '';
                  })
                  .catch((err) => {
                    this.$message({
                      showClose: true,
                      message: '上传失败！',
                      type: 'error'
                    });
                    console.log(err);
                  })
              }
            })
            .catch((err) => {
              console.log(err);
            })
        }
      },
      // tableRowClassName({row,rowIndex}) {
      //   console.log("roe",row);
      //   if (rowIndex%2 === 0) {
      //     return 'warning-row';
      //   } else if (rowIndex%2 === 1) {
      //     return 'success-row';
      //   }
      //   return '';
      // }
    },
    created() {
      getSchool()
        .then((res) => {
          res.data.forEach(row => {
            this.school[row.cid] = {cname: row.cname}
          })
          // console.log("school", this.school);
        })
        .catch((err) => {
          console.log(err)
        });
      getMajor()
        .then((res) => {
          res.data.forEach(row => {
            this.major[row.mid] = {mname: row.mname, did: row.did}
          })
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err)
        });
      this.$axios.post("/api/admin/upload_evaluation", {
        cid: "10010",
        mid: "1010",
        result: "B",
        round: "1"
      })
        .then(res => {
          console.log("请求成功" + res)
        })
        .catch(error => {
          console.log("请求失败" + error)
        })
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

  /*.el-table .warning-row {*/
  /*  background: white;*/
  /*}*/

  /*.el-table .success-row {*/
  /*  background: #D0E8F2;*/
  /*}*/
</style>
