<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 80%;">
      <el-form>
        <el-form-item label="选择轮次：">
          <el-select v-model.number="round" placeholder="请选择轮次" size="small" @change="getEvaluation">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-form ref="ruleForm" label-width="80px">
        <el-form-item label="专业查询">
          <el-input v-model="searchmajor" size="small" style="width: 30%" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item label="学校查询">
          <el-input v-model="searchschool" size="small" style="width: 30%" placeholder="模糊查询"></el-input>
          <el-button type="primary" style="float: right;margin:0 20px 10px 10px" @click="getResult">查询</el-button>
        </el-form-item>

      </el-form>
      <div>
        <el-table :data="tabledata" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
          <el-table-column prop="mid" label="专业代码" align="center"></el-table-column>
          <el-table-column prop="mname" label="学科名称" align="center"></el-table-column>
          <el-table-column prop="cid" label="高校代码" align="center"></el-table-column>
          <el-table-column prop="cname" label="高校名称" align="center"></el-table-column>
          <el-table-column prop="result" label="评估结果" align="center"></el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100px">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-button type="primary" style="min-width: 200px;margin-top: 50px">
        确认修改
      </el-button>
    </div>
  </div>
</template>

<script>
  import {getMajor, getSchool} from "../../assets/lib/getHomeServe";
  import axios from "axios";

  export default {
    data() {
      return {
        searchmajor: '',
        searchschool: '',
        round: '',
        tabledata: [],
        evaluation: [],
        school: [],
        major: [],
        schoolmap: {},
        majormap: {},
      }
    },
    methods: {
      getResult() {
        if (this.searchmajor === '' && this.searchschool === '') {//没有进行任何模糊查询
          this.$confirm(`没有进行模糊查询，确定查询所有的学校专业吗？`, '提示')
            .then((res) => {
              console.log(res);
              if (this.round === '') {
                this.$confirm(`请选择轮次！`, '提示')
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
              this.tabledata = this.evaluation;
              console.log("情况1table", this.tabledata);
            })
            .catch((err) => {
              console.log(err);
            })
        } else {//进行了模糊查询
          let list = [];
          if (this.searchmajor !== '' && this.searchschool !== '') {
            let fsmajor = this.searchmajor.trim().split(/\s+/);
            for (let j = 0; j < this.major.length; j++) {//匹配专业模糊查询
              let temp1 = this.major[j].mname;
              let temp2 = this.major[j].mid;
              for (let i = 0; i < fsmajor.length; i++) {
                if (temp1.match(fsmajor[i]) != null || temp2.match(fsmajor[i]) != null) {
                  list = list.concat(this.evaluation.filter(item => item.mid === temp2));
                  break;
                }
              }
            }
            let list2 = [];
            let temp1 = '', temp2 = '';
            let fschool = this.searchschool.trim().split(/\s+/);
            console.log(list);
            for (let j = 0; j < list.length; j++) {
              temp1 = this.list[j].cid;
              console.log(temp1);
              temp2 = this.schoolmap[temp1].cname;
              for (let i = 0; i < fschool.length; i++) {
                if (temp1.match(fschool[i]) != null || temp2.match(fschool[i]) != null)
                  console.log(1, temp2, fschool[i]);
                list2 = list2.concat(list.filter(item => item.cid === temp1));
              }
            }
            this.tabledata = list2;
            console.log("情况2table", list2);
          } else if (this.searchmajor !== '') {
            let fsmajor = this.searchmajor.trim().split(/\s+/);
            console.log("fsm", fsmajor);
            for (let j = 0; j < this.major.length; j++) {//匹配专业模糊查询
              let temp1 = this.major[j].mname;
              let temp2 = this.major[j].mid;
              for (let i = 0; i < fsmajor.length; i++) {
                if (temp1.match(fsmajor[i]) != null || temp2.match(fsmajor[i]) != null) {
                  console.log(1, temp1);
                  list = list.concat(this.evaluation.filter(item => item.mid === temp2));
                  break;
                }
              }
            }
            this.tabledata = list;
            console.log("情况3table", this.tabledata);
          } else if (this.searchschool !== '') {//进行学校模糊查询
            let fschool = this.searchschool.trim().split(/\s+/);
            for (let j = 0; j < this.school.length; j++) {
              let temp1 = this.school[j].cid;
              let temp2 = this.school[j].cname;
              for (let i = 0; i < fschool.length; i++) {
                if (temp1.match(fschool[i]) != null || temp2.match(fschool[i]) != null)
                  list = list.concat(this.evaluation.filter(item => item.cid === temp1));
              }
            }
            this.tabledata = list;
            console.log("情况4table", this.tabledata);
          }
          if (this.round === '') {
            this.$confirm(`请选择轮次！`, '提示')
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              })
          }
          // list=list.filter(item => item.round=this.round);
          this.tabledata = list;
          console.log("table", this.tabledata);
        }
        //添加学校名、专业名字段
        this.tabledata.forEach(item => {
          this.$set(item, 'cname', "");
          this.$set(item, 'mname', "");
        });
        for (let i = 0; i < this.tabledata.length; i++) {
          this.tabledata[i].cname = this.schoolmap[this.tabledata[i].cid].cname;
          this.tabledata[i].mname = this.majormap[this.tabledata[i].mid].mname;
        }
        console.log("all table", this.tabledata);
      },
      //查询评估结果
      getEvaluation() {
        axios.get('/api/base/evaluation', {
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
      }
    },
    created() {
      //获取学校信息
      getSchool()
        .then((res) => {
          this.school = res.data;
          res.data.forEach(row => {
            this.schoolmap[row.cid] = {cname: row.cname}
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
            this.majormap[row.mid] = {mname: row.mname}
          })
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err)
        });

    }
  }
</script>

<style scoped>

</style>
