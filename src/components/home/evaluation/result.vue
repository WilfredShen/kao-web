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
        <el-select v-model="round" placeholder="请选择" size="mini">
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
        <el-select v-model="disciplineCode" placeholder="请选择" size="mini" @change="getMajorList(disciplineCode)">
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
        <el-button size="medium" round @click="getTmpResults()" style="margin-left:10px">确定</el-button>
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
              <tr v-for="(item, index) in resultList" :key="index"
                  style="text-align:center;line-height:50px">
                <td>{{item.mid+getMajorName(item.mid)}}</td>
                <td @click="schoolClick(item.cid)">{{item.cid+getSchoolName(item.cid)}}</td>
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
      <el-button v-show="(!(isidentity==null)&&!(isidentity===''))" size="medium" round @click="setFavorMajor()"
                 style="margin-left:10px">一键收藏
      </el-button>
    </div>
    <div style="float:right;margin-right:5px;margin-top:10px">
      <el-button v-show="(!(isidentity==null)&&!(isidentity===''))" size="medium" round @click="exportExcel()">导出
      </el-button>
    </div>
  </div>

</template>

<script>
  import {
    disciplineList,
    majorList,
    schoolList,
    getEvaluationList,
    setFavouriteMajor
  } from '@/assets/lib/getResultLjm'
  import xlsx from "xlsx";

  export default {
    name: "EvaluationResult",
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
        round: "4",//轮次
        disciplines: [],//学类
        majors: [],//学科
        schools: [],
        allMajors: [],
        disciplineCode: "",//学类代码
        majorCode: "",//学科代码
        level: [], //等级数组
        resultList: [],
        isidentity: "",
        favorMajors: [],
      }
    },
    methods: {
      getSchoolList: function() {
        schoolList()
          .then((res) => {
            this.schools = res;
          });
      },

      getDisciplineList: function() {
        disciplineList()
          .then((res) => {
            this.disciplines = res;
            // console.log(this.disciplines)
          });
      },

      getMajorListAll: function() {
        majorList()
          .then((res) => {
            this.allMajors = res;
            // console.log(this.disciplines)
          });
      },

      getMajorList: function(id) {
        this.majors = [];
        majorList()
          .then((res) => {
            for (let i = 0; i < res.length; i++) {
              if (res[i].did === id) {
                this.majors.push(res[i]);
              }
            }
          });
      },

      getSchoolName: function(cid) {
        for (let i = 0; i < this.schools.length; i++) {
          if (this.schools[i].cid === cid) {
            return this.schools[i].cname;
          }
        }
      },

      getMajorName: function(mid) {
        for (let i = 0; i < this.allMajors.length; i++) {
          if (this.allMajors[i].mid === mid) {
            return this.allMajors[i].mname;
          }
        }
      },

      getTmpResults: function() {
        getEvaluationList(this.round)
          .then((res) => {
            this.resultList = [];
            this.favorMajors = [];
            for (let i = 0; i < res.length; i++) {
              //         console.log("majorcode"+this.majorCode);
              //        console.log("resmid"+res[i].mid);
              if (res[i].mid === this.majorCode) {
                // console.log("C查询结果" + res[i].mid + " " + parseInt(res[i].result));
                for (let j = 0; j < this.level.length; j++) {
                  if (this.level[j] === "A+") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 95 && parseInt(res[i].result) <= 100) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "A") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 90 && parseInt(res[i].result) <= 95) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "A-") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 85 && parseInt(res[i].result) <= 90) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "B+") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 80 && parseInt(res[i].result) <= 85) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "B") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 75 && parseInt(res[i].result) <= 80) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "B-") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 70 && parseInt(res[i].result) <= 75) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "C+") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 68 && parseInt(res[i].result) <= 70) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "C") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) > 65 && parseInt(res[i].result) <= 68) {
                      this.resultList.push(res[i]);
                    }
                  } else if (this.level[j] === "C-") {
                    if (res[i].result === this.level[j]) {
                      this.resultList.push(res[i]);
                    } else if (parseInt(res[i].result) >= 60 && parseInt(res[i].result) <= 65) {
                      this.resultList.push(res[i]);
                    }
                  }
                }
              }
            }
            console.log("resultList" + this.resultList);
            if (this.resultList.length <= 0) {
              this.$message("无数据");
            }
            for (let i = 0; i < this.resultList.length; i++) {
              this.favorMajors.push({
                majorCid: this.resultList[i].cid,
                majorMid: this.resultList[i].mid,
              });
            }
          });
      },

      setFavorMajor: function() {
        console.log("进入一键收藏")
        console.log(this.$store.state.uid);
        setFavouriteMajor(this.favorMajors)
          .then((res) => {
            //  console.log(res);
            console.log("状态码" + res.status);
            if (res.status === 200) {
              console.log("全部收藏成功！");
              this.$message("全部收藏成功！");

            } else if (res.status === 400) {
              console.log("收藏失败！");
              this.$message("收藏失败！");
            } else if (res.status === 1090) {
              console.log("部分收藏成功！");
              this.$message("部分收藏成功！");
            }
          });
      },

      schoolClick: function(cid) {
        //localStorage.setItem('schoolcid', cid);
        this.$store.commit('setcid', cid);
        this.$router.push({path: '/college'});
      },

      exportExcel: function() {
        console.log("进入了导出EXCEL函数");
        let arr;
        arr = this.resultList.map((item) => {
          return {
            学科名称及代码: item.mid + this.getMajorName(item.mid),
            高校名称及代码: item.cid + this.getSchoolName(item.cid),
            评估等级: item.result
          };
        });
        let sheet = xlsx.utils.json_to_sheet(arr);
        let book = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book, sheet, "sheet1");
        xlsx.writeFile(book, `user${new Date().getTime()}.xlsx`);
      },
    },
    created() {
      this.getDisciplineList();
      this.getSchoolList();
      this.getMajorListAll();
      this.isidentity = this.$store.state.uid;
    }
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
