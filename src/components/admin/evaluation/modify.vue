<template>
  <div>
    <div style="padding: 10px 20px 40px 20px;width: 90%;">
      <el-form>
        <el-form-item label="选择轮次:" style="margin-left: 12px">
          <el-select v-model.number="round" placeholder="请选择轮次" size="small" @change="getEvaluation()">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-form label-width="100px" style="margin-bottom: 60px">
        <el-form-item label="专业查询:">
          <el-input v-model="searchMajor" size="small" style="width: 30%" placeholder="模糊查询" clearable></el-input>
          <span style="margin-left: 10px;color: dimgray">(多个专业查询，以空格相隔)</span>
        </el-form-item>
        <el-form-item label="学校查询:">
          <el-input v-model="searchSchool" size="small" style="width: 30%" placeholder="模糊查询" clearable></el-input>
          <el-button style="float: right;margin:0 20px 10px 10px;background-color: #1e56a0;color: white"
                     @click="getResult()">查询
          </el-button>
          <span style="margin-left: 10px;color: dimgray">(多个学校模糊查询关键字，以空格相隔，查找同时存在这些关键字的学校)</span>
        </el-form-item>

      </el-form>
      <div>
        <el-table :data="tableData" :header-cell-style="{background:'#1e56a0',color:'white'}" border stripe
                  style="font-size: 16px">
          <el-table-column prop="mid" label="专业代码" align="center"></el-table-column>
          <el-table-column prop="mname" label="专业名称" align="center"></el-table-column>
          <el-table-column prop="cid" label="高校代码" align="center"></el-table-column>
          <el-table-column prop="cname" label="高校名称" align="center"></el-table-column>
          <el-table-column prop="result" label="评估结果" align="center"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100px"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-button style="min-width: 200px;margin-top: 50px;background-color: #1e56a0;color: white">
        确认修改
      </el-button>
    </div>
    <el-dialog title="修改评估结果" :visible.sync="dialogFormVisible" style="font-size: 20px;font-weight: bold">
      <el-form>
        <el-form-item label="专业代码">
          <el-input v-model="row.mid"></el-input>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="row.mname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学校代码">
          <el-input v-model="row.cid"></el-input>
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="row.cname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="评估结果">
          <el-input v-model="row.result"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="confirmUpdate()" style="background-color: #456268;color: white">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getMajor, getSchool} from "@/assets/lib/getHomeServe";
  import {updateEvaluation} from "@/assets/lib/setManager";

  export default {
    name: 'Modify',
    data() {
      return {
        searchMajor: '',
        searchSchool: '',
        round: '',
        tableData: [],
        evaluation: [],
        school: [],
        major: [],
        schoolMap: {},
        majorMap: {},
        dialogFormVisible: false,
        row: [],
      }
    },
    methods: {
      getResult() {
        this.tableData = [];
        if (this.round === '') {
          this.$confirm(`请选择轮次！`, '提示')
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          if (this.searchMajor === '' && this.searchSchool === '') {//没有进行任何模糊查询
            this.$confirm(`没有进行模糊查询，确定查询所有的学校专业吗？`, '提示')
              .then((res) => {
                console.log(res);
                this.tableData = this.evaluation;
                console.log("情况1table", this.tableData);
                this.tableData.forEach(item => {
                  this.$set(item, 'cname', "");
                  this.$set(item, 'mname', "");
                });
                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].cname = this.schoolMap[this.tableData[i].cid].cname;
                  this.tableData[i].mname = this.majorMap[this.tableData[i].mid].mname;
                }
              })
          } else {//进行了模糊查询
            let list = [];
            if (this.searchMajor !== '' && this.searchSchool !== '') {//两个模糊查询都进行了
              let fsMajor = this.searchMajor.trim().split(/\s+/);
              for (let j = 0; j < this.major.length; j++) {//匹配专业模糊查询
                let temp1 = this.major[j].mname;
                let temp2 = this.major[j].mid;
                for (let i = 0; i < fsMajor.length; i++) {
                  if (temp1.match(fsMajor[i]) != null || temp2.match(fsMajor[i]) != null) {
                    list = list.concat(this.evaluation.filter(item => item.mid === temp2));
                    break;
                  }
                }
              }
              console.log("lll", list)
              let fsSchool = this.searchSchool.trim().split(/\s+/);
              let flag = 1;
              for (let j = 0; j < list.length; j++) {
                let temp1 = list[j].cid;
                let temp2 = this.schoolMap[list[j].cid].cname;
                flag = 1;
                for (let i = 0; i < fsSchool.length; i++) {
                  if (temp1.match(fsSchool[i]) == null && temp2.match(fsSchool[i]) == null) {
                    flag = 0;
                    break;
                  }
                }
                if (flag) {
                  this.tableData.push(list[j]);
                }
              }
              console.log("情况2table", this.tableData);
            } else if (this.searchMajor !== '') {//进行专业模糊查询
              let fsMajor = this.searchMajor.trim().split(/\s+/);
              console.log("fsm", fsMajor);
              for (let j = 0; j < this.major.length; j++) {//匹配专业模糊查询
                let temp1 = this.major[j].mname;
                let temp2 = this.major[j].mid;
                for (let i = 0; i < fsMajor.length; i++) {
                  if (temp1.match(fsMajor[i]) != null || temp2.match(fsMajor[i]) != null) {
                    console.log(1, temp1);
                    list = list.concat(this.evaluation.filter(item => item.mid === temp2));
                    break;
                  }
                }
              }
              this.tableData = list;
              console.log("情况3table", this.tableData);
            } else if (this.searchSchool !== '') {//进行学校模糊查询
              let fsSchool = this.searchSchool.trim().split(/\s+/);
              let flag = 1;
              for (let j = 0; j < this.evaluation.length; j++) {
                let temp1 = this.evaluation[j].cid;
                let temp2 = this.schoolMap[this.evaluation[j].cid].cname;
                flag = 1;
                for (let i = 0; i < fsSchool.length; i++) {
                  if (temp1.match(fsSchool[i]) == null && temp2.match(fsSchool[i]) == null) {
                    flag = 0;
                    break;
                  }
                }
                if (flag) {
                  this.tableData.push(this.evaluation[j]);
                }
              }
              console.log("情况4table", this.tableData);
            }
            if (this.tableData.length === 0) {
              this.$message('该查询无结果！');
            } else { //添加学校名、专业名字段
              this.tableData.forEach(item => {
                this.$set(item, 'cname', "");
                this.$set(item, 'mname', "");
              });
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].cname = this.schoolMap[this.tableData[i].cid].cname;
                this.tableData[i].mname = this.majorMap[this.tableData[i].mid].mname;
              }
            }
          }
        }
      },
      //查询评估结果
      getEvaluation() {
        this.$axios.get('/api/base/evaluation', {
          params: {
            round: parseInt(this.round)
          }
        })
          .then((res) => {
            this.evaluation = res.data.data;
            // console.log(this.evaluation);
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //编辑
      handleClick(index, row) {
        this.row = row;
        this.tableData[index] = row;
        this.dialogFormVisible = true;
      },
      confirmUpdate() {
        this.dialogFormVisible = false;
        updateEvaluation(this.row.cid, this.row.mid, this.row.result, this.round)
          .then((res) => {
            console.log(res);
            this.$message({
              showClose: true,
              message: '修改成功！',
              type: 'success'
            });
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              showClose: true,
              message: '修改失败！',
              type: 'error'
            });
          })
      }
    },
    created() {
      //获取学校信息
      getSchool()
        .then((res) => {
          this.school = res.data;
          res.data.forEach(row => {
            this.schoolMap[row.cid] = {cname: row.cname}
          })
          // console.log("school", this.school);
        })
        .catch((err) => {
          console.log(err)
        });
      //获取专业信息
      getMajor()
        .then((res) => {
          this.major = res.data;
          res.data.forEach(row => {
            this.majorMap[row.mid] = {mname: row.mname}
          })
          // console.log("majorMap",this.major);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
</style>
