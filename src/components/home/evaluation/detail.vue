<template>
  <div>
    <div style="padding: 20px 10px 30px 20px;" :style="backgroundDiv">
      <span class="detail-title">
      高校评估结果快捷查询（第四轮）
      </span>
    </div>
    <div style="margin: 0 10px 10px 10px">

      <el-container style="width: 100%">
        <el-aside style="padding: 1.6rem; background-color: white;width: 20%">
          <div class="div-style" v-for="(item, index) in discipline" @click="setSelected(index)" :key="index">
            <el-row class="discipline-option" style="margin-left: 13%;width: 90%">
              <el-col :span="24">
                <img src="@/assets/image/点击.png" v-if="!(index-row)" width="13%" style="float: left;padding-right: 4px">
                <div style="padding: 2px 4px" :class="{on:index===row}">{{item.dname}}</div>
              </el-col>
            </el-row>
          </div>
        </el-aside>
        <el-main style="padding: 0">
          <el-container>
            <el-aside style="padding: 1.6rem; background-color: #D6E4F0 ;width: 30%">
              <div class="major-options" v-for="(item, index) in getMajors" @click="selected.mindex = index;row2=index;"
                   :key="index">
                <el-row class="discipline-option" style="margin-left: 13%;width: 90%">
                  <el-col :span="24">
                    <img src="@/assets/image/点击.png" v-if="!(index-row2)" width="12%"
                         style="float: left;padding-right: 4px">
                    <div style="padding: 2px 4px" :class="{on:index===row2}">{{ `${item.mid} ${item.mname}` }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-aside>
            <el-main>
              <div style="text-align: center;">
                <span style="font-size: 19px;font-weight: bold" v-if="this.getMajors[0]">
                  {{ `${this.getMajors[this.selected.mindex].mid} ${this.getMajors[this.selected.mindex].mname}` }}
                </span><br><br/>
                <span style="font-family: 宋体">
                  本一级学科中，全国具有“博士授权”的高校共48所，本次参评38所；部分具有“硕士授权”的高校也参加了评估；参评高校共计84所。<br>(注:评估结果相同的高校排序不分先后，按学校代码排列)
                </span>
                <el-divider></el-divider>
              </div>
              <el-row style="margin-bottom: 4px;font-weight: bold;text-align: center">
                <el-col :span="8">
                  <div>评估结果</div>
                </el-col>
                <el-col :span="8">
                  <div>学校代码</div>
                </el-col>
                <el-col :span="8">
                  <div>学校名称</div>
                </el-col>
              </el-row>
              <el-scrollbar style="height: 500px" v-if="showEvaluation">
                <div v-for="(item, index) in showEvaluation" :key="index">
                  <el-card shadow="hover" :class="{table:index%2===0}" :body-style="{ padding: '4px' }"
                           style=" margin: 7px 0">
                    <el-row style="margin: 0 8px;padding: 8px 0;text-align: center">
                      <el-col :span="8">
                        <div>{{item.result}}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>{{item.cid}}</div>
                      </el-col>
                      <el-col :span="8">
                        <div>{{item.cname}}</div>
                      </el-col>
                    </el-row>
                  </el-card>
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
  import {disciplineList, majorList, schoolList, getSomeResult} from "@/assets/lib/getResultLjm";

  export default {
    name: 'EvaluationDetail',
    data() {
      return {
        discipline: [],
        major: [],
        schoolMap: {},
        evaluation: [],
        selected: {
          did: '1',
          mindex: '0',
        },
        row: 0,
        row2: 0,
        showIcon: false,
        backgroundDiv: {
          backgroundImage: 'url(' + require('@/assets/image/bg4.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
      }
    },
    computed: {
      //获取所选学科的专业
      getMajors: function() {
        let list
        list = this.major.filter((item) => {
          return item.did === this.selected.did;
        });
        return list
      },

      //获取所选专业的评估结果，学校代码对应的学校名称
      showEvaluation: function() {
        let Myeval = this.evaluation.filter((item) => {
          return item.mid === this.getMajors[this.selected.mindex].mid;
        });
        // console.log("type",Myeval)
        Myeval.forEach((item) => {
          this.$set(item, 'cname', "");
        });
        for (let i in Myeval) {
          Myeval[i].cname = this.schoolMap[Myeval[i].cid].cname;
        }
        let compare = function(obj1, obj2) {
          let val1 = obj1.result;
          let val2 = obj2.result;
          let result;

          if (val1[0] < val2[0]) {
            result = -1;
          } else if (val1[0] > val2[0]) {
            result = 1;
          } else {//字母相同，判断加减号
            if (val1.length < val2.length) {
              if (val2[1] === "+") {
                result = 1;
              } else {
                result = -1;
              }
            } else if (val1.length > val2.length) {
              if (val1[1] === "+") {
                result = -1;
              } else {
                result = 1;
              }
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
        return Myeval.sort(compare);
      }
    },
    watch: {
      selected: function() {
        console.log("selected", this.selected);
      },
    },
    /*
    discipline:list
    major:list
    schoolmap:map (key:cid)
    evaluation:list
     */
    created() {
      disciplineList()
        .then((res) => {
          this.discipline = res;
          // console.log("discipline", this.discipline);
        })
        .catch((err) => {
          console.log(err);
        });

      majorList()
        .then((res) => {
          this.major = res;
        })
        .catch((err) => {
          console.log(err);
        });

      schoolList()
        .then((res) => {
          res.forEach((row) => {
            this.schoolMap[row.cid] = {cname: row.cname};
            this.$store.commit("setSchMap", {
              cname: row.cname,
              cid: row.cid
            });
          });
          // console.log("school", this.schoolmap);
        })
        .catch((err) => {
          console.log(err);
        });

      getSomeResult()
        .then((res) => {
          this.evaluation = res.data;
          // console.log("evaluation", this.evaluation);
        })
        .catch((err) => {
          console.log(err);
        });
      //显示身份选择
      console.log(this.$store.state.identify);
    },
    methods: {
      setSelected(index) {
        this.selected.did = this.discipline[index].did;
        this.selected.mindex = 0;
        this.background = true;
        this.row = index;
        this.showIcon = true;
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .demo-wrapper {
    margin: auto;
    border: 1px solid black;
  }

  .detail-title {
    text-align: center;
    display: block;
    font-size: 25px;
    font-weight: bold;
    font-family: "微软雅黑";
    color white;
  }

  .discipline-option, .major-option {
    cursor: pointer;
    /*光标在当前标签悬浮时显示的内容*/

    &:hover {
      background-color: #D6E4F0;
    }
    margin: 5px 0;
  }

  span:focus {
    background orange;
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

  .on {
    background: #D6E4F0;
  }

  .table {
    background #d6e4f0
  }
</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
