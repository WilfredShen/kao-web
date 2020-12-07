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
        </table>
      </div>
    </div>
    <el-button size="small" style="float: right;margin: -4px 4px" round>收藏</el-button>
  </div>
</template>

<script>
  import {schoolDetail} from '../../assets/lib/getResultLjm';

  export default {
    name: 'school',
    data() {
      return {
        school_cid: [],
        school_details: [],
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
    },
    created() {
      this.school_cid.push(localStorage.getItem('schoolcid'));
      this.getSchooldetail(this.school_cid);
      console.log("school", this.school_details)
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
