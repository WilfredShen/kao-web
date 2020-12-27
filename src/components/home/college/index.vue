<template>
  <div>
    <div style="width: 20px">
      <el-button class="row-style" type="text" @click="$router.push({ path: '/college/detail' })"
                 icon="el-icon-back" style="font-size: 15px;">返回
      </el-button>
    </div>
    <br>
    <div class="sch-divstyle" style="padding: 5px 0;">
      <div class="bor1" style="border-bottom: 3px solid #163172;margin: 0">
        <div style="background-color:#163172;height:60px;margin-left: 0;margin-right: 0">
          <p class="schoola">{{this.schoolDetails.cid}}
            {{this.schoolDetails.cname}}
            {{this.schoolDetails.level}}
          </p>
        </div>
        <div class="mess" style="padding: 5px">
          <p style="font-family: 宋体;font-weight:bold;">地区:{{this.schoolDetails.location}}</p>
          <p style="font-family: 宋体;font-weight:bold;">简介:{{this.schoolDetails.introduction}}</p>
        </div>
      </div>
      <el-card class="box-card">
        <div class="title">
          <p class="pstylea">最新排名:</p>
        </div>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;width:50%;margin-top: 10px;">
          <tr style="line-height:50px">
            <th>数据来源</th>
            <th>排名</th>
            <th>更新日期</th>
          </tr>
          <tr v-for="(item, index) in ranks" :key="index"
              style="text-align:center;line-height:30px" :class="{table:index%2===0}">
            <td>{{item.rankFrom||'无数据'}}</td>
            <td>{{item.rank||'无数据'}}</td>
            <td>{{item.date||'无数据'}}</td>
          </tr>
          <tr>
            <td colspan="3" v-show="ranks== undefined || ranks.length <= 0 "
                style="text-align:center;line-height:50px;">暂无数据
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <p class="pstylea">近五年录取率:</p>
        </div>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;width:60%;margin-top: 10px">
          <tr style="line-height:50px">
            <th>年份</th>
            <th>考研人数</th>
            <th>录取人数</th>
            <th>保研人数</th>
            <th>保研率</th>
            <th>录取率</th>
          </tr>
          <tr v-for="(item, index) in rates" :key="index"
              style="text-align:center;line-height:30px" :class="{table:index%2===0}">
            <td>{{item.year}}</td>
            <td>{{item.total}}</td>
            <td>{{item.enrollment}}</td>
            <td>{{item.exemption}}</td>
            <td>{{item.exemptionRate}}</td>
            <td>{{item.enrollmentRate}}</td>
          </tr>
          <tr>
            <td colspan="6" v-show="rates== undefined || rates.length <= 0 " style="text-align:center;line-height:50px">
              暂无数据
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <p class="pstylea">最新学科评估结果:</p>
        </div>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;width:50%;margin-top: 10px">
          <tr style="line-height:50px">
            <th>学科名称及代码</th>
            <th>评估结果</th>
            <th>参评轮次</th>
          </tr>
          <tr v-for="(item, index) in evaluation.slice(0,5)" :key="index"
              style="text-align:center;line-height:30px" :class="{table:index%2===0}">
            <td>{{item.mid+getMajorName(item.mid)}}</td>
            <td>{{item.result}}</td>
            <td>第四轮</td>
          </tr>
          <tr>
            <td colspan="3" v-show="evaluation == undefined || evaluation.length <= 0 "
                style="text-align:center;line-height:50px">暂无数据
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <p class="pstylea">导师信息:</p>
        </div>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;;width:60%;margin-top: 10px">
          <tr>
            <th>导师姓名</th>
            <th>招生专业</th>
            <th>研究方向</th>
            <th>联系电话</th>
            <th>邮箱地址</th>
          </tr>
          <tr v-for="(item, index) in tutors" :key="index"
              style="text-align:center;line-height:30px" :class="{table:index%2===0}">
            <td> {{item.name}}</td>
            <td>{{getMajorName(item.mid)}}</td>
            <td>{{item.research}}</td>
            <td>{{item.contactPhone}}</td>
            <td>{{item.contactEmail}}</td>
          </tr>
          <tr>
            <td colspan="5" v-show="tutors == undefined || tutors.length <= 0 "
                style="text-align:center;line-height:50px">暂无数据
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {
    schoolDetail,
    getEvaluationList,
    majorList,
    rankList,
    rateList,
    tutorList,
  } from '../../../assets/lib/getResultLjm';

  export default {
    name: 'College',
    data() {
      return {
        isidentity: "",
        schoolCid: [],
        schoolDetails: [],
        evaluation: [],
        allMajors: [],
        ranks: [],
        rates: [],
        tutors: [],
        favorTutors: [],
      }
    },
    methods: {
      getSchoolDetail: function(cid) {
        const arr = this;
        schoolDetail(cid)
          .then((res) => {
            console.log("res", res);
            arr.schoolDetails = res[0];
            console.log("schoool_details" + this.schoolDetails.cname);
          });
      },

      getEvaluation: function(cid) {
        const arr = this;
        arr.evaluation = [];
        getEvaluationList(4)
          .then((res) => {
            for (let i = 0; i < res.length; i++) {
              if (res[i].cid === cid) {
                arr.evaluation.push(res[i]);
              }
            }
          });
      },

      getMajorListAll: function() {
        const arr = this;
        majorList()
          .then((res) => {
            arr.allMajors = res;
          });
      },

      getMajorName: function(mid) {
        const arr = this;
        for (let i = 0; i < arr.allMajors.length; i++) {
          if (arr.allMajors[i].mid === mid) {
            return arr.allMajors[i].mname;
          }
        }
      },

      getRank: function(cid) {
        const arr = this;
        rankList(cid)
          .then((res) => {
            arr.ranks = res;
            console.log("rank", this.ranks);
          });
      },

      getRates: function(cid) {
        const arr = this;
        rateList(cid)
          .then((res) => {
            arr.rates = res;
            console.log("rate", this.rates);
          });
      },

      getTutors: function(cid) {
        const arr = this;
        tutorList(cid)
          .then((res) => {
            arr.tutors = res;
          });
      },
      /*
      setFavorTutor(cid, tid) {
        this.favorTutors = [];
        this.favorTutors.push({
          tutCid: cid,
          tutTid: tid,
        });
        setFavouriteTutor(this.favorTutors).then(res => {
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
            this.$message("部分收藏成功！")
          }
        })
      }

       */
    },
    mounted() {
      this.isidentity = this.$store.state.uid;
    },
    activated() {
      const self = this;
      self.schoolCid = [];
      self.schoolCid.push(self.$store.state.cid);
      self.getSchoolDetail(self.schoolCid);
      self.getRank(self.schoolCid[0]);
      self.getRates(self.schoolCid[0]);
      self.getEvaluation(self.schoolCid[0]);
      self.getMajorListAll();
      self.getTutors(self.schoolCid[0]);
      self.isidentity = self.$store.state.uid;
    },
  }
</script>

<style scoped>
  .row-style {
    color: gray;
    width: 3%;
    float: left;
  }

  .schoola {
    line-height: 60px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    margin-left: 10px
  }

  .title {
    margin-left: 0;
    margin-right: 300px;
    height: 40px;
  }

  .pstylea {
    font-weight: bold;
    margin-left: 10px;
  }

  .table {
    background: #d6e4f0;
  }

  .box-card {
    margin-top: 10px;
  }
</style>
