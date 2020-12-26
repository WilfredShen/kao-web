<template>
  <div>
    <div style="border-bottom: 3px solid #163172;display: flex;flex-direction: column;justify-content: space-around">
      <div style="background-color:#163172;height:50px;margin-left: 0;margin-right: 0">
        <span class="spana">
        筛选条件
        </span>
      </div>
      <div style="display: flex;align-items: center;margin: 3px 15px">
        <p class="spanb">模糊查找学校 : </p>
        <el-input size="mini" style="width: 200px;" v-model="input" placeholder="请输入" @change="fuzzySearcher()"
                  @focus="cleanSearch()" clearable></el-input>
      </div>
      <div style="display: flex;align-items: center;margin: 3px 15px">
        <p class="spanb">评价体系 : </p>
        <el-dropdown style="margin-left: 28px;margin-right: 10px;" split-button size="mini"
                     @command="handleCommand">
          {{rankSys}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="学科评估">学科评估</el-dropdown-item>
            <el-dropdown-item command="软科" divided>软科</el-dropdown-item>
            <el-dropdown-item command="QS" divided>QS</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if="isNormal" style="display: flex;align-items: center;margin: 3px 15px">
        <p class="spanb">评估结果 : </p>
        <el-select v-model="level" multiple placeholder="请选择" size="mini" style="margin-left: 28px;width: 40%">
          <el-option
            v-for="item in option4"
            :key="item.value4"
            :label="item.value4"
            :value="item.label4"
          >
          </el-option>
        </el-select>
      </div>
      <div style="text-align: right">
        <el-button size="small" style="width: 100px;margin: 10px 20px 10px 0;font-weight: bold;font-size: 13px"
                   @click="getSearch()">查询
        </el-button>
      </div>
    </div>
    <div style="margin-top: 50px">
      <div style="background-color:#163172;height:50px;margin:3px 0">
          <span class="spana">
          筛选结果
        </span>
      </div>
      <el-card style="margin-top: 10px" v-if="afterFilter.length">
        <div style="text-align: center;margin: 0 5%">

          <el-row style="margin: 8px 0;font-weight: bold;font-size: 20px">
            <el-col :span="8">
              <div>学校代码及名称</div>
            </el-col>
            <el-col :span="8" v-if="isNormal">
              <div>专业代码及名称</div>
            </el-col>
            <el-col :span="8">
              <div>评估等级</div>
            </el-col>
          </el-row>

          <el-scrollbar style="height: 600px">
            <div v-for="(item, index) in afterFilter" :key="index">
              <el-card shadow="hover" :class="{table:index%2===0}" :body-style="{ padding: '4px' }"
                       style=" margin: 7px 0">
                <el-row style="margin: 0 4px;padding: 8px 0">
                  <el-col :span="8">
                    <div @click="schoolClick(item.cid)">{{item.cid+item.cname}}</div>
                  </el-col>
                  <el-col :span="8" v-if="isNormal">
                    <div>{{item.mid+item.mname}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div>{{item.result}}</div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
  import {majorList, schoolList} from "@/assets/lib/getResultLjm";
  import {getSomeResult} from "@/assets/lib/getResultLjm";
  import {getLastestCollegeRank} from "@/assets/lib/getResultLjm";

  export default {
    name: 'CollegeDetail',
    data: function() {
      return {
        input: '',
        rankSys: '请选择评价体系',
        isQS: false,//是否是QS
        isARWU: false,//是否是软科
        isNormal: false,//教育部学科评估
        tableData: [],
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
        major: {},
        school: [],
        schoolMap: {},
        level: [],
        evalResult: [],
        otherEvalResult: [],//软科和qs的评估结果
        fsResult: [], //模糊查询的学校名
        afterFilter: [], //筛选后的结果
        test: {
          "111": 1,
          "222": 2,
          "333": 3
        }
      }
    },
    methods: {
      //评选方法
      handleCommand: function(command) {
        this.rankSys = command;
        if (command === '软科') {
          this.isARWU = true;
          this.isNormal = false;
          this.isQS = false;
        } else if (command === 'QS') {
          this.isARWU = false;
          this.isNormal = false;
          this.isQS = true;
        } else {
          this.isARWU = false;
          this.isNormal = true;
          this.isQS = false;
        }
        this.afterFilter = [];
      },
      //修改对象的key
      changeKeys(arr, key) {
        let newArr = [];
        arr.forEach(item => {
          let obj = {};
          for (var i = 0; i < key.length; i++) {
            obj[key[i]] = item[Object.keys(item)[i]]
          }
          newArr.push(obj);
        })
        return newArr;
      },
      //模糊查询
      fuzzySearcher: function() {
        let fsInput = this.input.trim().split(/\s+/);
        // console.log("fsinput", fsInput);
        this.fsResult = [];
        let flag = 1;
        for (let i = 0; i < this.school.length; i++) {
          let temp = this.school[i].cname;
          let temp2 = this.school[i].cid;
          for (let j = 0; j < fsInput.length; j++) {
            flag = 1;
            if (temp.match(fsInput[j]) == null && temp2.match(fsInput[j]) == null) {
              flag = 0;
              break;
            }
          }
          if (flag) {
            this.fsResult.push(this.school[i]);
          }
        }
        // console.log("fz",this.fsResult);
      },

      //查询按钮
      getSearch: async function() {
        //sort函数
        let compare = function(obj1, obj2) {
          let val1 = obj1.result;
          let val2 = obj2.result;
          let result;

          if (obj1.cid < obj2.cid) {
            result = -1;
          } else if (obj1.cid > obj2.cid) {
            return 1;
          } else {
            if (val1[0] < val2[0]) {
              result = -1;
            } else if (val1[0] > val2[0]) {
              result = 1;
            } else {//字母相同，判断加减号
              if (val1.length < val2.length) {
                if (val2[1] === "+") result = 1;
                else result = -1;
              } else if (val1.length > val2.length) {
                if (val1[1] === "+") result = -1;
                else result = 1;
              } else {
                if (val1[1] < val2[1]) {
                  result = -1;
                } else if (val1[1] > val2[1]) {
                  result = 1;
                } else {
                  result = 0;
                }
              }
            }
          }
          return result;
        };
        //没有进行模糊查询
        if (this.input === "undefined" || this.input === null || this.input.length === 0) {
          this.$confirm('没有进行模糊查询，此操作将导致在所有参评学校中查询！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              //学科评估筛选等级、增加专业名称
              if (this.isNormal) {
                console.log("Normal");
                this.afterFilter = this.evalResult;

                //筛选等级
                console.log("level", this.level);

                if (this.level.length > 0) {
                  let list = [];
                  for (let i = 0; i < this.level.length; i++) {
                    list = list.concat(this.afterFilter.filter((item) => {
                      return item.result === this.level[i];
                    }));
                  }
                  this.afterFilter = list;
                }

                //增加学校名称属性
                this.afterFilter.forEach((item) => {
                  this.$set(item, 'cname', "");
                });
                for (let i = 0; i < this.afterFilter.length; i++) {
                  this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
                }

                //增加专业名字段
                this.afterFilter.forEach((item) => {
                  this.$set(item, 'mname', "");
                });
                for (let i = 0; i < this.afterFilter.length; i++) {
                  this.afterFilter[i].mname = this.major[this.afterFilter[i].mid].mname;
                }
              }
              //QS增加学校排名
              if (this.isQS) {
                console.log("QS");
                this.afterFilter = this.otherEvalResult.filter((item) => {
                  return item.rid === '2';
                });
                //增加学校名称属性
                // this.afterFilter.forEach((item) => {
                //   this.$set(item, 'cname', "");
                // });
                for (let i = 0; i < this.afterFilter.length; i++) {
                  this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
                }
                //增加result字段
                this.afterFilter.forEach((item) => {
                  item.result = item.rank;
                });
                // console.log("re",this.afterFilter);
              }
              //软科增加学校排名
              if (this.isARWU) {
                console.log("软科");
                this.afterFilter = this.otherEvalResult.filter((item) => {
                  return item.rid === '3';
                });
                //增加学校名称属性
                // this.afterFilter.forEach((item) => {
                //   this.$set(item, 'cname', "");
                // });
                for (let i = 0; i < this.afterFilter.length; i++) {
                  this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
                }
                //增加result字段
                this.afterFilter.forEach((item) => {
                  item.result = item.rank;
                });
                // console.log("re",this.afterFilter);
              }
              //排序
              this.afterFilter = this.afterFilter.sort(compare);
              // console.log("after", this.afterFilter);
            })
        }
        //进行了模糊查询
        else {
          this.afterFilter = [];
          //学科评估
          if (this.isNormal) {
            console.log("fzNormal");
            for (let i = 0; i < this.fsResult.length; i++) {
              this.afterFilter = this.afterFilter.concat(this.evalResult.filter((item) => {
                return item.cid === this.fsResult[i].cid;
              }));
            }
            console.log("firstafter", this.afterFilter);
            //筛选等级
            if (this.level.length > 0) {
              let list = [];
              for (let i = 0; i < this.level.length; i++) {
                list = list.concat(this.afterFilter.filter((item) => {
                  return item.result === this.level[i];
                }));
              }
              this.afterFilter = list;
            }
            //增加学校名称属性
            this.afterFilter.forEach((item) => {
              this.$set(item, 'cname', "");
            });
            for (let i = 0; i < this.afterFilter.length; i++) {
              this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
            }
            //增加专业名字段
            this.afterFilter.forEach((item) => {
              this.$set(item, 'mname', "");
            });
            for (let i = 0; i < this.afterFilter.length; i++) {
              this.afterFilter[i].mname = this.major[this.afterFilter[i].mid].mname;
            }
          }
          //QS
          if (this.isQS) {
            let list = this.otherEvalResult.filter((item) => {
              return item.rid === '2';
            });
            console.log("fzQS");
            for (let i = 0; i < this.fsResult.length; i++) {
              this.afterFilter = this.afterFilter.concat(list.filter((item) => {
                  return item.cid === this.fsResult[i].cid;
                })
              )
            }
            //增加学校名称属性
            this.afterFilter.forEach((item) => {
              this.$set(item, 'cname', "");
            });
            for (let i = 0; i < this.afterFilter.length; i++) {
              this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
            }
            //增加result字段
            this.afterFilter.forEach((item) => {
              item.result = item.rank;
            });
            console.log("fzre", this.afterFilter);
          }
          //软科
          if (this.isARWU) {
            let list = this.otherEvalResult.filter((item) => {
              return item.rid === '3';
            });
            console.log("fzARWU");
            for (let i = 0; i < this.fsResult.length; i++) {
              this.afterFilter = this.afterFilter.concat(list.filter((item) => {
                  return item.cid === this.fsResult[i].cid;
                })
              )
            }
            //增加学校名称属性
            this.afterFilter.forEach((item) => {
              this.$set(item, 'cname', "");
            });
            for (let i = 0; i < this.afterFilter.length; i++) {
              this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
            }
            //增加result字段
            this.afterFilter.forEach((item) => {
              item.result = item.rank;
            });
            console.log("fzre", this.afterFilter);
          }

          if (this.afterFilter.length === 0) {
            this.$alert('无符合筛选条件的学校！', '提示', {
              confirmButtonText: '确定',
            });
          } else {
            this.afterFilter = this.afterFilter.sort(compare);
          }
        }
      },
      cleanSearch: function() {
        this.fsResult = this.school;
        this.input = '';
      },
      schoolClick: function(cid) {
        this.$store.commit('setcid', cid);
        this.$router.push({path: '/college'});
      },
    },
    created() {
      majorList()
        .then((res) => {
          //this.major = res.data;
          res.forEach((row) => {
            this.major[row.mid] = {mname: row.mname, did: row.did};
          });
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err);
        });

      schoolList()
        .then((res) => {
          this.school = res;
          this.fsResult = res;
          res.forEach((row) => {
            this.schoolMap[row.cid] = {cname: row.cname}
          });
          // console.log("school",this.school);
        })
        .catch((err) => {
          console.log(err);
        });

      getSomeResult()
        .then((res) => {
          this.evalResult = res.data;
        });

      getLastestCollegeRank()
        .then((res) => {
          this.otherEvalResult = res;
          // console.log("other",this.otherEvalResult);
        })
    }
  }
</script>

<style scoped>

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .filter-style {
    padding: 5px 0;
    font-weight: bold;
    font-size: 19px;
    background: #d6e4f0;
    text-align: center;
  }

  .spana {
    line-height: 50px;
    font-weight: bold;
    font-size: 20px;
    color: white;
    margin-left: 10px
  }

  .spanb {
    font-size: 14px;
    font-family: 宋体;
    font-weight: bold;
    margin-right: 10px;
    padding-left: 0;
  }

  .table {
    background: #d6e4f0;
  }
</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
