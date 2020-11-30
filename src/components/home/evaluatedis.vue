<template>
  <div class="demo-wrapper">
    <div style="margin: 20px 10px 30px 20px">
      <span class="title1">
      高校评估结果快捷查询（第四轮）
      </span>
    </div>
    <div style="margin: 10px 10px 10px 10px">
      <el-container style="width: 1000px">
        <el-aside class="bor1" style="padding: 1.6rem; background-color: white;width: 200px">
          <div class="discipline-options">
            <div
              class="discipline-option"
              v-for="(d, index) in discipline"
              :key="index"
              @click="
              selected.dindex = index;
              selected.mindex = 1;
            "
            >
            <span>
              {{ d.dname }}
            </span>
            </div>
          </div>
        </el-aside>
        <el-main style="padding: 0">
          <el-container>
            <el-aside class="bor1" style="padding: 1.6rem; background-color: #e8e8e8 ;width: 200px">
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
                <span style="font-size: 17px;font-weight: bold">
                  {{ `${this.choosemajor[this.selected.mindex].mid} ${this.choosemajor[this.selected.mindex].mname}` }}
                </span><br><br/>
                <span>
                  本一级学科中，全国具有“博士授权”的高校共48所，本次参评38所；部分具有“硕士授权”的高校也参加了评估；参评高校共计84所。<br>(注:评估结果相同的高校排序不分先后，按学校代码排列)
                </span>
                <br><br/>
              </div>
              <el-row >
                <el-col :span="6"><div class="grid-content bg-purple">评估结果</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">学校代码</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">学校名称</div></el-col>
              </el-row>
              <el-scrollbar style="height: 400px">
              <div class="dis" v-for="(item, index) in showEvaluation" :key="index">

                  <el-row >
                    <el-col :span="6"><div class="grid-content bg-purple">{{item.result}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">{{item.cid}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">{{item.cname}}</div></el-col>
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
  import {getdiscipline} from "../../interface/homeserve";
  import {getmajor} from "../../interface/homeserve";
  import {getschool} from "../../interface/homeserve";
  import {getsomeresult} from "../../interface/homeserve";

  export default {
    data() {
      return {
        discipline: [],
        major: [],
        choosemajor:[],
        school: [],
        evaluation: [],
        selected: {
          dindex: 0,
          mindex: 0,
        }
      }
    },
    computed: {
      //获取所选学科的专业
      getmajors:function(){
        var list = []
        for (var index in this.major) {
          if (this.major[index].did ==this.discipline[this.selected.dindex].did) {
            list.push(this.major[index])
          }
        }
        console.log("length",list.length)
        return list
      },
      //获取所选专业的评估结果，学校代码对应的学校名称
      showEvaluation: function () {
        var list = []
        for (var index in this.evaluation) {
          if (
            this.evaluation[index].mid ==
            this.choosemajor[this.selected.mindex].mid
          ) {
            list.push(this.evaluation[index])
          }
        }
        list.forEach(item => {
          this.$set(item, 'cname', "")
        })
        for (var i in list) {
          for (var j in this.school) {
            if (list[i].cid == this.school[j].cid) {
              list[i].cname = this.school[j].cname
            }
          }
        }
        // list.sort();
        // list.sort(function(a,b){
        //   return a.result>b.result;
        // });

        console.log("list", list)
        return list
      }
    },
    watch: {
      selected:function(){
        console.log("selected",this.selected)
      },
      getmajors:{
        deep: true,
        handler: function (newVal) {
          this.choosemajor=newVal
          console.log("choose",this.choosemajor)
          // return this.choosemajor
        }
      }
    },
    created() {
      getdiscipline().then((res) => {
        this.discipline = res.data;
        // console.log("discipline", this.discipline);
      }).catch((err) => {
        console.log(err);
      }),
        getmajor().then((res) => {
          this.major = res.data;
          // console.log("major", this.major);
        }).catch((err) => {
          console.log(err)
        }),
        getschool().then((res) => {
          this.school = res.data;
          // console.log("school", this.school);
        }).catch((err) => {
          console.log(err)
        }),
        getsomeresult().then((res) => {
          this.evaluation = res.data;
          // console.log("evaluation", this.evaluation);
        }).catch((err) => {
          console.log(err)
        })
    },
    methods:{
      // setmaj:function () {
      //   getmajors
      // }
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

  .dis {
    margin: 5px 0px;
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

</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
