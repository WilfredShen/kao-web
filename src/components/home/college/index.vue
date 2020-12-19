<template>
  <div>
    <div style="width: 20px">
      <el-button class="row-style" type="text" @click="$router.push({ path: '/schoolDetail' })"
                 icon="el-icon-back" style="font-size: 15px;">返回
      </el-button>
    </div>
    <br>
    <div class="sch-divstyle" style="padding: 5px 0;margin-top:20px">
      <div class="school">
        <p style="font-weight: 700;">{{this.school_details.cid}}
          {{this.school_details.cname}}
          {{this.school_details.level}}
        </p>
      </div>
      <div class="mess" style="padding: 5px">
        <p>地区:{{this.school_details.location}}</p>
        <p>简介:{{this.school_details.introduction}}</p>
        <p>夏令营信息:</p>
        <p>推免信息:</p>
      </div>
      <div>
        <p style="font-weight: 700;">最新排名:</p>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;border-color:gainsboro;width:50%;word-break:break-all;">
          <tr bgcolor="#dcdcdc">
            <th>数据来源</th>
            <th>排名</th>
            <th>更新日期</th>
          </tr>
          <tr v-for="(item, index) in ranks" :key="index"
              style="text-align:center">
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
      </div>
      <div>
        <p style="font-weight: 700;">近五年录取率:</p>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;border-color:gainsboro;width:60%;word-break:break-all;">
          <tr bgcolor="#dcdcdc">
            <th>年份</th>
            <th>考研人数</th>
            <th>录取人数</th>
            <th>保研人数</th>
            <th>保研率</th>
            <th>录取率</th>
          </tr>
          <tr v-for="(item, index) in rates" :key="index"
              style="text-align:center">
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
      </div>
      <div>
        <p style="font-weight: 700;">最新学科评估结果:</p>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;border-color:gainsboro;width:50%;word-break:break-all;">
          <tr bgcolor="#dcdcdc">
            <th>学科名称及代码</th>
            <th>评估结果</th>
            <th>参评轮次</th>
          </tr>
          <tr v-for="(item, index) in evaluates.slice(0,5)" :key="index"
              style="text-align:center">
            <td>{{item.mid+getMajorname(item.mid)}}</td>
            <td>{{item.result}}</td>
            <td>第四轮</td>
          </tr>
          <tr>
            <td colspan="3" v-show="evaluates== undefined || evaluates.length <= 0 "
                style="text-align:center;line-height:50px">暂无数据
            </td>
          </tr>
        </table>
      </div>
      <div>
        <p>导师信息:</p>
        <table border="1" cellspacing="0"
               style="margin-left: 10px;border-color:gainsboro;width:60%;word-break:break-all;">
          <tr bgcolor="#dcdcdc">
            <th>导师姓名</th>
            <th>招生专业</th>
            <th>研究方向</th>
            <th>联系电话</th>
            <th>邮箱地址</th>
            <th v-show="(!(isidentity==null)&&!(isidentity===''))"></th>
          </tr>
          <tr v-for="(item, index) in tutors" :key="index" style="text-align:center">
            <td> {{item.name}}</td>
            <td>{{getMajorname(item.mid)}}</td>
            <td>{{item.research}}</td>
            <td>{{item.contactPhone}}</td>
            <td>{{item.contactEmail}}</td>
            <td v-show="(!(isidentity==null)&&!(isidentity===''))">
              <el-button size="small" @click="setFavorTutor(item.cid,item.tid)">收藏</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="5" v-show="tutors== undefined || tutors.length <= 0 "
                style="text-align:center;line-height:50px">暂无数据
            </td>
          </tr>
        </table>
      </div>
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
    setFavouriteTutor,
  } from '../../../assets/lib/getResultLjm';

  export default {
    name: 'College',
    data() {
      return {
        isidentity: "",
        school_cid: [],
        school_details: [],
        evaluates: [],
        allmajors: [],
        ranks: [],
        rates: [],
        tutors: [],
        favorTutors: [],
      }
    },
    methods: {
      getSchooldetail(cid) {
        schoolDetail(cid).then(res => {
          console.log("res", res)
          this.school_details = res[0];
          console.log("schoool_details" + this.school_details.cname);
        });
      },
      getevaluates() {
        console.log("在评估结果里的学校代码" + this.school_cid)
        this.evaluates = [];
        getEvaluationList("4").then(res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].cid === this.school_cid[0]) {
              this.evaluates.push(res[i]);
            }
          }
          console.log("评估结果" + this.evaluates);
        })
      },
      getmajorListall() {
        majorList().then(res => {
          this.allmajors = res;
          // console.log(this.disciplines)
        });
      },
      getMajorname(mid) {
        for (let i = 0; i < this.allmajors.length; i++) {
          if (this.allmajors[i].mid === mid) {
            return this.allmajors[i].mname;
          }
        }
      },
      getRank(cid) {
        rankList(cid).then(res => {
          this.ranks = res;
          console.log(this.ranks)
        });
      },
      getRates(cid) {
        rateList(cid).then(res => {
          this.rates = res;
        });
      },
      getTutors(cid) {
        tutorList(cid).then(res => {
          this.tutors = res;
        });
      },
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
    },
    mounted() {
      this.isidentity = this.$store.state.uid;
    },
    created() {
      this.school_cid.push(this.$store.state.cid);
      this.getSchooldetail(this.school_cid);
      console.log("school", this.school_details);
      this.getRank(this.school_cid[0]);
      this.getRates(this.school_cid[0]);
      this.getevaluates();
      this.getmajorListall();
      this.getTutors(this.school_cid[0]);
      this.isidentity = this.$store.state.uid;
    }
  }
</script>

<style scoped>
  .sch-divstyle {
    border: 1px solid black;
  }

  .mess, .school {
    line-height: 10px;
    border-bottom: 1px solid black;
  }

  .row-style {
    color: gray;
    width: 3%;
    float: left;
  }
</style>
