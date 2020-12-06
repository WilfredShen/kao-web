<template>
  <div>
    <div class="choose" style="display: flex;flex-direction: column;justify-content: space-around">
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;padding-left: 0">模糊查找 : </p>
        <el-input size="small" style="width: 200px;" v-model="input" placeholder="请输入" @change="fuzzySearcher"
                  @focus="cleansearch" clearable></el-input>
      </div>
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;padding-left: 0">专业筛选 : </p>
        <el-dropdown style="margin-right: 10px" size="small" split-button trigger="click"
                     @command="handleCommand">
          {{rank_sys}}
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
        <el-button size="small" style="width: 150px;margin-top: 10px;margin-bottom: 0;right: 0" @click="getsearch">查询
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
        <div class="dis" v-for="(item, index) in afterfilter" :key="index">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" @click="schoolclik(item.cid)">{{item.cid+item.cname}}</div>
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
  import {getmajor, getschool, getsomeresult} from "../../assets/lib/getHomeServe";

  export default {
    name: "",
    data: function () {
      return {
        input: '',
        rank_sys: '请选择排名体系',
        rank: '等级：',
        tabledata: [],
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
        schoolmap: {},
        level: [],
        evalresult: [],
        fsresult: [], //模糊查询的学校名
        afterfilter: [], //筛选后的结果
      }
    },
    methods: {
      //评选方法
      handleCommand(command) {
        this.rank_sys = command
      },
      //模糊查询
      fuzzySearcher() {
        this.fsresult = [];
        for (let i = 0; i < this.school.length; i++) {
          let temp = this.school[i].cname;
          if (temp.match(this.input)) {
            this.fsresult.push(this.school[i]);
          }
        }
        // console.log('schoolfilter',this.fsresult);
      },
      //查询按钮
      getsearch() {
        if (this.input === "undefined" || this.input === null || this.input === "") {
          this.$confirm('没有进行模糊查询，此操作将在所有参评学校中查询！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.afterfilter = this.evalresult;
              //筛选等级
              console.log(this.level);
              let list = [];
              for (let i = 0; i < this.level.length; i++) {
                list = list.concat(this.afterfilter.filter(item => item.result === this.level[i]));
              }
              this.afterfilter = list;
              //增加学校名称属性
              this.afterfilter.forEach(item => {
                this.$set(item, 'cname', "")
              });
              for (let i = 0; i < this.afterfilter.length; i++) {
                this.afterfilter[i].cname = this.schoolmap[this.afterfilter[i].cid].cname;
              }
              //增加专业名称
              this.afterfilter.forEach(item => {
                this.$set(item, 'mname', "")
              });
              for (let i = 0; i < this.afterfilter.length; i++) {
                this.afterfilter[i].mname = this.major[this.afterfilter[i].mid].mname;
              }
              // console.log("after",this.afterfilter);
            })
            .catch(() => {
            })
        } else {
          this.afterfilter = [];
          for (let i = 0; i < this.fsresult.length; i++) {
            this.afterfilter = this.afterfilter.concat(this.evalresult.filter(item => item.cid === this.fsresult[i].cid));
          }

          //筛选等级
          if (this.level.length > 0) {
            let list = [];
            for (let i = 0; i < this.level.length; i++) {
              list = list.concat(this.afterfilter.filter(item => item.result === this.level[i]));
            }
            this.afterfilter = list;
          }

          //增加学校名称属性
          this.afterfilter.forEach(item => {
            this.$set(item, 'cname', "")
          });
          for (let i = 0; i < this.afterfilter.length; i++) {
            this.afterfilter[i].cname = this.schoolmap[this.afterfilter[i].cid].cname;
          }
          //增加专业名称
          this.afterfilter.forEach(item => {
            this.$set(item, 'mname', "")
          });
          for (let i = 0; i < this.afterfilter.length; i++) {
            this.afterfilter[i].mname = this.major[this.afterfilter[i].mid].mname;
          }
          // console.log("after",this.afterfilter);
        }
      },
      cleansearch() {
        this.fsresult = this.school;
        this.input = '';
      },
      schoolclik(cid) {
        localStorage.setItem('schoolcid', cid);
        this.$router.push({path: '/school'})
      },
    },
    created() {
      getmajor()
        .then((res) => {
          //this.major = res.data;
          res.data.forEach(row => {
            this.major[row.mid] = {mname: row.mname, did: row.did}
          })
          // console.log("majormap",this.major);
        })
        .catch((err) => {
          console.log(err)
        });
      getschool()
        .then((res) => {
          this.school = res.data;
          this.fsresult = res.data;
          res.data.forEach(row => {
            this.schoolmap[row.cid] = {cname: row.cname}
          })
          // console.log("school", this.school);
        })
        .catch((err) => {
          console.log(err)
        });
      getsomeresult()
        .then((res) => {
          this.evalresult = res.data;
          // console.log("evaluation", this.evaluation);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
</script>

<style scoped>
  .choose, .result {
    border: solid 1px darkgrey;
    padding: 35px 20px 35px 20px;
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
