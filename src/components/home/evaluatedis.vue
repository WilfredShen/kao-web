<template>
  <div class="demo-wrapper">
    <div style="margin: 20px 10px 30px 20px">
      <span class="title1">
      高校评估结果快捷查询（第四轮）
      </span>
    </div>
    <div style="margin: 10px 10px 10px 10px">
      <el-container style="width: 100%">
        <el-aside class="bor1" style="padding: 1.6rem; background-color: white;width: 20%">
          <div class="discipline-options">
            <div
              class="discipline-option"
              v-for="(d, index) in discipline"
              :key="index"
              @click="setselected(index)"
            >
            <span>
              {{ d.dname }}
            </span>
            </div>
          </div>
        </el-aside>
        <el-main style="padding: 0">
          <el-container>
            <el-aside class="bor1" style="padding: 1.6rem; background-color: #e8e8e8 ;width: 30%">
              <div class="major-options">
                <div
                  class="major-option"
                  v-for="(m, index) in getmajors"
                  :key="index"
                  @click="selected.mindex = index"
                >
                  <span>
                  {{ `${m.mid} ${m.mname}` }}
                  </span>
                </div>
              </div>
            </el-aside>
            <el-main class="bor1">
              <div style="text-align: center">
                <span style="font-size: 17px;font-weight: bold" v-if="this.getmajors[0]">
                  {{ `${this.getmajors[this.selected.mindex].mid} ${this.getmajors[this.selected.mindex].mname}` }}
                </span><br><br/>
                <span>
                  本一级学科中，全国具有“博士授权”的高校共48所，本次参评38所；部分具有“硕士授权”的高校也参加了评估；参评高校共计84所。<br>(注:评估结果相同的高校排序不分先后，按学校代码排列)
                </span>
                <br><br/>
              </div>
              <el-row style="margin-left: 12%;margin-bottom: 0;font-weight: bold; width: 90%">
                <el-col :span="8">
                  <div class="grid-content bg-purple">评估结果</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">学校代码</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">学校名称</div>
                </el-col>
              </el-row>
              <el-scrollbar style="height: 400px" v-if="showEvaluation">
                <div class="div-style" v-for="(item, index) in showEvaluation" :key="index">
                  <el-row style="margin-left: 13%;width: 90%">
                    <el-col :span="8">
                      <div class="grid-content bg-purple">{{item.result}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">{{item.cid}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">{{item.cname}}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import {getDiscipline, getMajor, getSchool, getSomeResult} from "../../assets/lib/getHomeServe";

  export default {
    data() {
      return {
        discipline: [],
        major: [],
        schoolmap: {},
        evaluation: [],
        selected: {
          did: '1',
          mindex: '0',
        }
      }
    },
    computed: {
      //获取所选学科的专业
      getmajors: function () {
        let list
        list = this.major.filter(item => item.did === this.selected.did);
        return list
      },
      //获取所选专业的评估结果，学校代码对应的学校名称
      showEvaluation: function () {
        let Myeval = this.evaluation.filter(item => item.mid === this.getmajors[this.selected.mindex].mid);
        // console.log("type",Myeval)
        Myeval.forEach(item => {
          this.$set(item, 'cname', "")
        })
        for (let i in Myeval) {
          Myeval[i].cname = this.schoolmap[Myeval[i].cid].cname
        }
        let compare = function (obj1, obj2) {
          let val1 = obj1.result;
          let val2 = obj2.result;
          let result;

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
          return result;
        };
        // console.log(Myeval.sort(compare));
        return Myeval.sort(compare)
      }
    },
    watch: {
      selected: function () {
        console.log("selected", this.selected)
      },
    },
    /*
    discipline:list
    major:list
    schoolmap:map (key:cid)
    evaluation:list
     */
    created() {
      getDiscipline().then((res) => {
        this.discipline = res.data;
        // console.log("discipline", this.discipline);
      }).catch((err) => {
        console.log(err);
      });


      getMajor().then((res) => {
        this.major = res.data;
        // res.data.forEach(row => {
        //   this.majormap[row.mid] = {mname: row.mname, did: row.did}
        // })
        // console.log("majormap",this.major);
      }).catch((err) => {
        console.log(err)
      });

      getSchool().then((res) => {
        res.data.forEach(row => {
          this.schoolmap[row.cid] = {cname: row.cname}
          this.$store.commit("setSchMap", {
            cname: row.cname,
            cid: row.cid
          });
        })
        // console.log("school", this.schoolmap);
      }).catch((err) => {
        console.log(err)
      });

      getSomeResult()
        .then((res) => {
          this.evaluation = res.data;
          // console.log("evaluation", this.evaluation);
        }).catch((err) => {
        console.log(err)
      });
      //显示身份选择
      console.log(this.$store.state.identify);
    },
    methods: {
      setselected(index) {
        this.selected.did = this.discipline[index].did;
        this.selected.mindex = 0;
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .demo-wrapper {
    margin: auto;
    border: 1px solid black;
  }

  .title1 {
    margin: 30px 0 30px 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .div-style {
    margin: 5px 0;
  }

  .bor1 {
    border: 1px solid gray;
  }

  .discipline-option, .major-option {
    cursor: pointer;
    /*光标在当前标签悬浮时显示的内容*/

    &:hover {
      background-color: #ffffff;
    }
    margin: 5px 0;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
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
