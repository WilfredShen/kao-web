<template>
  <div>
    <div class="bor2">
      <div class="marg">
        <span style="font-weight:bold;font-size:16px">
        筛选条件
        </span>
      </div>
      <!--      轮次-->
      <div class="marg">
        <span style="font-size:14px">
          轮次 :
        </span>
        <el-select v-model="sround" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <!--      学类-->
      <div class="marg">
        <span style="font-size:14px">
          学类 :
        </span>
        <el-select v-model="disciplineCode" placeholder="请选择" size="mini" @change="getMajorlist">
          <el-option
            v-for="item in disciplines"
            :key="item.did"
            :label="item.dname"
            :value="item.did">
          </el-option>
        </el-select>
      </div>
      <!--      学科-->
      <div class="marg">
        <span style="font-size:14px">
          学科 :
        </span>
        <el-select v-model="majorCode" placeholder="请选择" size="mini">
          <el-option
            v-for="item in majors"
            :key="item.mid"
            :label="item.mid+item.mname"
            :value="item.mid">
          </el-option>
        </el-select>
      </div>
      <!--      等级-->
      <div class="marg">
        <span style="font-size:14px">
          等级 :
        </span>
        <el-select v-model="level" multiple placeholder="请选择" size="mini">
          <el-option
            v-for="item in option4"
            :key="item.value4"
            :label="item.value4"
            :value="item.label4"
          >
          </el-option>
        </el-select>
        <el-button size="medium" round @click="getTmpResults" style="margin-left:10px">确定</el-button>
      </div>
    </div>
    <br>
    <div class="bor2">
      <div class="marg">
        <div style="margin: 20px 10px 30px 20px">
          <span style="font-weight:bold;font-size:16px;">
          筛选结果
        </span>
        </div>
        <el-main>
          <el-scrollbar style="height: 350px">
            <table width="1000px">
              <tr>
                <th>学科名称及代码</th>
                <th>高校名称及代码</th>
                <th>评估等级</th>
              </tr>
              <tr v-for="(item, index) in tmplist" :key="index"
                  style="text-align:center;line-height:50px">
                <td>{{item.mid+getMajorname(item.mid)}}</td>
                <td @click="schoolclik(item.cid)">{{item.cid+getSchoolname(item.cid)}}</td>
                <td>{{item.result}}</td>
              </tr>
            </table>
          </el-scrollbar>
        </el-main>
      </div>
      <div>
      </div>
    </div>
    <div style="float:right;margin-top: 10px">
      <el-button size="medium" round>一键收藏</el-button>
    </div>
    <div style="float:right;margin-right:5px;margin-top:10px">
      <el-button size="medium" round>打印</el-button>
    </div>
  </div>

</template>

<script>
  import {disciplineList, majorList, schoolList, getEvaluationList} from '../../assets/lib/getResultLjm'


  export default {
    name: "evaluateresult",
    data() {
      return {
        options: [
            {
            value: "1",
            label: "第一轮",
              disabled: true
          }, {
            value: "2",
            label: "第二轮",
            disabled: true
          },
          {
            value: "3",
            label: "第三轮"
          }, {
            value: "4",
            label: "第四轮"
          }],
        value: "",
        option4: [{
          value4: "A+ / 95-100",
          label4: "A+"
        }, {
          value4: "A / 90-95",
          label4: "A"
        }, {
          value4: "A- / 85-90",
          label4: "A-"
        }, {
          value4: "B+ / 80-85",
          label4: "B+"
        }, {
          value4: "B / 75-80",
          label4: "B"
        }, {
          value4: "B- / 70-75",
          label4: "B-"
        }, {
          value4: "C+ / 68-70",
          label4: "C+"
        }, {
          value4: "C / 65-68",
          label4: "C"
        }, {
          value4: "C- / 60-65",
          label4: "C-"
        }],
        value4: "",
        selected: {
          dindex: 0
        },
        loading: true,
        sround: "4",//轮次
        disciplines: [],//学类
        majors: [],//学科
        schools: [],
        allmajors: [],
        disciplineCode: "",//学类代码
        majorCode: "",//学科代码
        level: [], //等级数组
        tmplist: [],
        /*
       evaluation:
      {    mid:"",
             mname:"",
             cid:"",
             cname:"",
             level:""
      }
      evaluations:[

       ] //查询出的评估结果
     */
      }
    },
    methods: {
      getSchoollist() {
        schoolList().then(res => {
          this.schools = res;
        });
      },
      getDisciplinelist() {
        disciplineList().then(res => {
          this.disciplines = res;
          // console.log(this.disciplines)
        });
      },
      getMajorListall() {
        majorList().then(res => {
          this.allmajors = res;
          // console.log(this.disciplines)
        });
      },
      getMajorlist(id) {
        this.majors = [];
        majorList().then(res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].did === id) {
              this.majors.push(res[i]);
            }
          }
        });
      },
      getSchoolname(cid) {
        for (let i = 0; i < this.schools.length; i++) {
          if (this.schools[i].cid === cid) {
            return this.schools[i].cname;
          }
        }
      },
      getMajorname(mid) {
        for (let i = 0; i < this.allmajors.length; i++) {
          if (this.allmajors[i].mid === mid) {
            return this.allmajors[i].mname;
          }
        }
      },
      getTmpResults() {
        getEvaluationList(this.sround).then(res => {
          this.tmplist = [];
          for (let i = 0; i < res.length; i++) {
            //         console.log("majorcode"+this.majorCode);
            //        console.log("resmid"+res[i].mid);
            if (res[i].mid === this.majorCode) {
              console.log("C查询结果" + res[i].mid + " " + parseInt(res[i].result));
              for (let j = 0; j < this.level.length; j++) {
                if (this.level[j] === "A+") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 95 && parseInt(res[i].result) <= 100) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "A") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 90 && parseInt(res[i].result) <= 95) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "A-") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 85 && parseInt(res[i].result) <= 90) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "B+") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 80 && parseInt(res[i].result) <= 85) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "B") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 75 && parseInt(res[i].result) <= 80) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "B-") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 70 && parseInt(res[i].result) <= 75) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "C+") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 68 && parseInt(res[i].result) <= 70) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "C") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) > 65 && parseInt(res[i].result) <= 68) {
                    this.tmplist.push(res[i]);
                  }
                } else if (this.level[j] === "C-") {
                  if (res[i].result === this.level[j]) {
                    this.tmplist.push(res[i]);
                  } else if (parseInt(res[i].result) >= 60 && parseInt(res[i].result) <= 65) {
                    this.tmplist.push(res[i]);
                  }
                }
              }
            }
          }
          console.log("tmplist" + this.tmplist);
        });
      },
      schoolclik(cid) {
        localStorage.setItem('schoolcid', cid);
        this.$router.push({path: '/school'})
      },
    },
    mounted() {
      this.getDisciplinelist();
      this.getSchoollist();
      this.getMajorListall();
    },
  }
</script>

<style>
  .bor2 {
    border: 1px solid black;
  }

  .marg {
    margin: 10px 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }
</style>
