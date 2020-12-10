<template>
  <div>
    <div class="sch-divstyle">
      <el-button size="medium" class="row-style" type="text" @click="$router.push({ path: '/schoolDetail' })"
                 icon="el-icon-back"></el-button>
      <el-input v-model="input" style="float: left;width:18%;margin: 3px 5px" size="small"
                placeholder="请输入内容"></el-input>
      <el-button size="small" style="margin: 3px 5px" round>查询</el-button>
    </div>
    <br>
    <div class="sch-divstyle" style="padding: 5px 0">
      <div>
        <p style="font-weight: 700;">{{this.school_details.cid}}
          {{this.school_details.cname}}
          ({{this.school_details.level}})
        </p>
        <div style="border: 0.5px solid gray;width:700px;height:0;position:absolute;"></div>
      </div>
      <div style="padding: 5px">
        <p>地区:{{this.school_details.location}}</p>
        <p>简介:{{this.school_details.introduction}}</p>
        <p>夏令营信息</p>
        <p>推免信息</p>
        <div style="border: 0.5px solid gray;width:700px;height:0;position:absolute;"></div>
      </div>
      <div>
        <p>最新排名:</p>
        <table width="800px">
          <tr>
            <th>数据来源</th>
            <th>排名</th>
            <th>更新日期</th>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>test1</td>
            <td>1</td>
            <td>2020-12-06</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>test2</td>
            <td>2</td>
            <td>2020-12-05</td>
          </tr>
        </table>
      </div>
      <div style="border: 0.5px solid gray;width:700px;height:0;position:absolute;"></div>
      <div>
        <p>近五年录取率:</p>
        <table width="1000px">
          <tr>
            <th>年份</th>
            <th>考研人数</th>
            <th>录取人数</th>
            <th>保研人数</th>
            <th>保研率</th>
            <th>录取率</th>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>2020</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>2019</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>2018</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>2017</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>2016</td>
          </tr>
        </table>
      </div>
      <div style="border: 0.5px solid gray;width:700px;height:0;position:absolute;"></div>
      <div>
        <p>最新学科评估结果:</p>
        <table width="1000px">
          <tr>
            <th>学科名称及代码</th>
            <th>评估结果</th>
            <th>参评轮次</th>
          </tr>
          <tr v-for="(item, index) in evaluates.slice(0,5)" :key="index"
              style="text-align:center;line-height:50px">
            <td>{{item.mid+getMajorname(item.mid)}}</td>
            <td>{{item.result}}</td>
            <td>第四轮</td>
          </tr>
        </table>
      </div>
      <div style="border: 0.5px solid gray;width:700px;height:0;position:absolute;"></div>
      <div>
        <p>导师信息:</p>
        <table width="1000px">
          <tr>
            <th>导师姓名</th>
            <th>招生专业</th>
            <th>研究方向</th>
            <th>联系电话</th>
            <th>邮箱地址</th>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>边耐政</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>金敏</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>周军海</td>
          </tr>
          <tr style="text-align:center;line-height:50px">
            <td>胡军</td>
          </tr>
        </table>
      </div>
    </div>
    <el-button size="small" style="float: right;margin: -4px 4px" round>收藏</el-button>
  </div>
</template>

<script>
  import {schoolDetail, getEvaluationList, majorList} from '../../assets/lib/getResultLjm';

  export default {
    name: 'school',
    data() {
      return {
        school_cid: [],
        school_details: [],
        evaluates: [],
        allmajors: [],
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
    },
    created() {
      this.school_cid.push(localStorage.getItem('schoolcid'));
      this.getSchooldetail(this.school_cid);
      console.log("school", this.school_details);
      this.getevaluates();
      this.getmajorListall();
    }
  }
</script>

<style scoped>
  .sch-divstyle {
    border: 1px solid black;
  }

  .row-style {
    color: gray;
    width: 3%;
    float: left;
  }
</style>
