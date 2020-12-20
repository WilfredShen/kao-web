<template>
  <div>
    <div class="choose" style="display: flex;flex-direction: column;justify-content: space-around">
      <p style="margin-right: 10px;padding-left: 0;font-weight: bold;font-size: 17px">筛选条件：</p>
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;padding-left: 0">模糊查找 : </p>
        <el-input size="mini" style="width: 200px;" v-model="input" placeholder="请输入" @change="fuzzySearcher()"
                  @focus="cleanSearch()" clearable></el-input>
      </div>
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;padding-left: 0">评价体系 : </p>
        <el-dropdown style="margin-right: 10px" size="mini" split-button trigger="click"
                     @command="handleCommand()">
          {{rankSys}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="学科评估">学科评估</el-dropdown-item>
            <el-dropdown-item command="软科" divided disabled>软科</el-dropdown-item>
            <el-dropdown-item command="QS" divided disabled>QS</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        {{rank}}
        <el-select v-model="level" multiple placeholder="请选择" size="mini" style="width: 40%">
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
        <el-button size="small" style="width: 150px;margin-top: 10px;margin-bottom: 0;right: 0" @click="getSearch()">查询
        </el-button>
      </div>

    </div>

    <div class="result" style="margin-top: 50px;text-align: center">
      <el-row style="margin-bottom: 0;font-weight: bold">
        <el-col :span="8">
          <div class="grid-content bg-purple">学校代码及名称</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">专业代码及名称</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">评估等级</div>
        </el-col>
      </el-row>
      <el-scrollbar style="height: 400px">
        <div class="dis" v-for="(item, index) in afterFilter" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" @click="schoolClick(item.cid)">{{item.cid+item.cname}}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">{{item.mid+item.mname}}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">{{item.result}}</div>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import {majorList, schoolList, getSomeResult} from "@/assets/lib/getResultLjm";

  export default {
    name: 'CollegeDetail',
    data: function () {
      return {
        input: '',
        rankSys: '请选择评价体系',
        rank: '等级：',
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
        fsResult: [], //模糊查询的学校名
        afterFilter: [], //筛选后的结果
      }
    },
    methods: {
      //评选方法
      handleCommand(command) {
        this.rankSys = command;
      },
      //模糊查询
      fuzzySearcher() {
        let fsInput = this.input.trim().split(/\s+/);
        console.log("fsinput", fsInput);
        this.fsResult = [];
        let flag = 1;
        for (let i = 0; i < this.school.length; i++) {
          let temp = this.school[i].cname;
          for (let j = 0; j < fsInput.length; j++) {
            flag = 1;
            if (temp.match(fsInput[j]) == null) {
              flag = 0;
              break;
            }
          }
          if (flag) {
            this.fsResult.push(this.school[i]);
          }
        }
      },
      //查询按钮
      getSearch() {
        //sort函数
        let compare = function (obj1, obj2) {
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

        if (this.input === "undefined" || this.input === null || this.input === "") {//没有进行模糊查询
          this.$confirm('没有进行模糊查询，此操作将导致在所有参评学校中查询！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.afterFilter = this.evalResult;
              //筛选等级
              console.log("level", this.level);

              if (this.level.length > 0) {
                let list = [];
                for (let i = 0; i < this.level.length; i++) {
                  list = list.concat(this.afterFilter.filter(item => item.result === this.level[i]));
                }
                this.afterFilter = list;
              }

              //增加学校名称属性
              this.afterFilter.forEach(item => {
                this.$set(item, 'cname', "");
              });
              for (let i = 0; i < this.afterFilter.length; i++) {
                this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
              }
              //增加专业名称
              this.afterFilter.forEach(item => {
                this.$set(item, 'mname', "");
              });
              for (let i = 0; i < this.afterFilter.length; i++) {
                this.afterFilter[i].mname = this.major[this.afterFilter[i].mid].mname;
              }
              this.afterFilter = this.afterFilter.sort(compare);
              console.log("after", this.afterFilter);
            })
            .catch(() => {
            });
        } else {//进行了模糊查询
          this.afterFilter = [];
          for (let i = 0; i < this.fsResult.length; i++) {
            this.afterFilter = this.afterFilter.concat(this.evalResult.filter(item => item.cid === this.fsResult[i].cid));
          }

          //筛选等级
          if (this.level.length > 0) {
            let list = [];
            for (let i = 0; i < this.level.length; i++) {
              list = list.concat(this.afterFilter.filter(item => item.result === this.level[i]));
            }
            this.afterFilter = list;
          }

          //增加学校名称属性
          this.afterFilter.forEach(item => {
            this.$set(item, 'cname', "")
          });
          for (let i = 0; i < this.afterFilter.length; i++) {
            this.afterFilter[i].cname = this.schoolMap[this.afterFilter[i].cid].cname;
          }
          //增加专业名称
          this.afterFilter.forEach(item => {
            this.$set(item, 'mname', "")
          });
          for (let i = 0; i < this.afterFilter.length; i++) {
            this.afterFilter[i].mname = this.major[this.afterFilter[i].mid].mname;
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
      cleanSearch() {
        this.fsResult = this.school;
        this.input = '';
      },
      schoolClick(cid) {
        this.$store.commit('setcid', cid);
        this.$router.push({path: '/college'});
      },
    },
    created() {
      majorList()
        .then((res) => {
          //this.major = res.data;
          res.forEach(row => {
            this.major[row.mid] = {mname: row.mname, did: row.did}
          })
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err);
        });
      schoolList()
        .then((res) => {
          this.school = res;
          this.fsResult = res;
          res.forEach(row => {
            this.schoolMap[row.cid] = {cname: row.cname}
          });
        })
        .catch((err) => {
          console.log(err);
        });
      getSomeResult()
        .then((res) => {
          this.evalResult = res.data;
          // console.log("evaluation", this.evaluation);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
</script>

<style scoped>
  .choose, .result {
    border: solid 1px darkgrey;
    padding: 5px 20px 5px 20px;
  }

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

</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
