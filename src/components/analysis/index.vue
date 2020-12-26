<template>

  <div>
    <!--    筛选框-->
    <div class="screen" style="display: flex;flex-direction: column;justify-content: space-around">

      <div id="source-data">
        <p style="margin-right: 20px">生源数据:</p>
        <div style="display:flex;align-items: center">
          <el-upload accept=".xlsx,.xls" :auto-upload="false" :show-file-list="false"
                     :on-change="handleChange" action>
            <el-button plain size="small" style="height: 30px;">选择文件</el-button>
          </el-upload>
        </div>
      </div>
      <div id="data-scale">
        <p style="margin-right: 20px">数据范围:</p>
        <div style="display: flex;align-items: center;">
          <el-input v-model="rowBegin" size="mini" style="width: 150px"></el-input>
          <p style="margin-right: 20px;margin-left: 20px">—</p>
          <el-input v-model="rowEnd" size="mini" style="width: 150px"></el-input>
          <p style="margin-left: 20px">请输入 1-{{dataLen}} 之间的数字</p>
        </div>
      </div>
      <div id="field-map" style="display: flex;align-items: center">
        <p style="margin-right: 20px">字段映射:</p>
        <el-dropdown size="small" split-button trigger="click" @command="handleSchField">
          {{schFiled}}
          <el-dropdown-menu slot="dropdown" id="school-filed">
            <el-dropdown-item v-for="(item,index) in schFields" :key="index" :command="item.field">{{item.field}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div id="conditions">
        <el-checkbox-group v-model="checkBoxGroup" size="medium">
          <el-checkbox label="地区" border style="width: 100px;margin-right: 0"></el-checkbox>
          <el-checkbox label="985" border style="width: 100px;margin-right: 0"></el-checkbox>
          <el-checkbox label="211" border style="width: 100px"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-button type="primary" size="medium" id="finish" plain @click="getResult()">完成</el-button>
      </div>
    </div>
    <!--        地图分析结果-->
    <div class="map" style="width: 100%;display: flex">
      <div id="region" style="width: 60%;height: 600px;">
      </div>
      <div id="show" style="width: 40%;display: flex;flex-direction: column">
        <el-row style="display: flex;justify-content: space-around">
          <el-button size="small" @click="exportEXCEL('xlsx','region')">导出为EXCEL</el-button>
          <el-button size="small" @click="exportEXCEL('csv','region')">导出为CSV</el-button>
          <el-button size="small" @click="printTest()">打印</el-button>
        </el-row>
        <el-scrollbar style="height: 500px">
          <el-table :data="mapResult" stripe style="width: 100%">
            <el-table-column label="地区" prop="name" align="center"></el-table-column>
            <el-table-column label="人数" prop="value" align="center"></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
    <!--其他数据分析-->
    <div class="other_data">
      <div id="title">
        <p>其他数据</p>
      </div>
      <div id="other_result" style="width: 100%;display: flex">
        <div style="width: 70%;margin-right: 50px">
          <el-table :data="otherData" stripe>
            <el-table-column label="字段" prop="depend" align="center"></el-table-column>
            <el-table-column label="人数" prop="count" align="center"></el-table-column>
            <el-table-column label="比例" prop="ratio" align="center"></el-table-column>
          </el-table>
        </div>
        <div style="width: 20%;display: flex;flex-direction: column;justify-content: space-around">
          <el-button style="width: 150px;margin-left: 10px" @click="exportEXCEL('xlsx','other')">导出为EXCEL</el-button>
          <el-button style="width: 150px" @click="exportEXCEL('csv','ohter')">导出为CSV</el-button>
          <el-button style="width: 100px">打印</el-button>
        </div>
      </div>
    </div>
    <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
  </div>
</template>

<script>
  import {readFile} from '@/assets/lib/utils'
  import {getMap} from '@/assets/lib/ChinaMapShow'
  import xlsx from 'xlsx';
  import {schoolList} from "@/assets/lib/getResultLjm";
  import {schoolDetail} from "@/assets/lib/getResultLjm";


  export default {
    name: 'Analysis',
    data() {
      return {
        checkBoxGroup: [],
        dataLen: 1,//表格有多少行数据
        schFields: [],//可能是学校的字段
        schFiled: '选择学校名称字段',//用户选择的学校字段
        rowBegin: 0,//开始行
        rowEnd: 0,//结束行
        mapResult: [],//地图分析结果
        otherData: [],//其他（学校等级）分析结果
        schNames: [],//待分析学校名列表
        schIDs: [],//待分析学校ID列表
        schInfo: [],//待分析的学校详情
        excelData: [],//表格内拿到的所有数据
        collegeId: [],//获取全部的学校代码和名字
        nameId: []//名字和代码对应
      }
    },
    methods: {
      printTest: function () {
        this.$message("test!");
        this.$message("box group" + this.checkBoxGroup);
      },
      handleSchField: function (command) {
        this.schFiled = command;
      },
      //根据选项选择展示内容
      contains: function (arr, obj) {
        let i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      checkShow: function () {
        let sum;
        sum = 0;
        if (this.contains(this.checkBoxGroup, '地区')) {
          sum += 1;
        }
        if (this.contains(this.checkBoxGroup, '985')) {
          sum += 10;
        }
        if (this.contains(this.checkBoxGroup, '211')) {
          sum += 100;
        }
        console.log("sum = " + sum);
        return sum;
      },
      getResult: function () {
        const showWhat = this.checkShow();
        this.schNames = [];
        this.mapResult = [];
        this.schIDs = [];
        this.otherData = [];
        if (this.rowBegin > this.rowEnd || this.rowBegin === 0) {
          this.$message("左侧行数应小于右侧行数");
          return;
        }
        let index = 0;
        for (let i = this.rowBegin - 1; i < this.rowEnd; i++) {
          this.schNames.push(this.excelData[i][this.schFiled]);
          this.schIDs.push(this.nameId[this.schNames[index++]]);
        }

        this.schIDs = this.schIDs.sort();
        let tempID = this.schIDs[0];
        const stuCount = new Map();//学校学生人数统计
        let beginIndex = 0;
        const analysisID = [];
        let regionIndex = 0;

        for (; regionIndex < this.schIDs.length; regionIndex++) {
          if (this.schIDs[regionIndex] !== tempID) {
            let tid = this.schIDs[beginIndex];
            tempID = this.schIDs[regionIndex]//记录当前的id，即下一个id
            stuCount.set(tid, 0);//初始化学校ID对应人数为0
            analysisID.push(tid);//将之前的加入待分析id中
            stuCount.set(tid, regionIndex - beginIndex);//学校人数统计加入
            beginIndex = regionIndex;//更换新起始坐标
          }
        }
        analysisID.push(this.schIDs[beginIndex]);
        stuCount.set(this.schIDs[beginIndex], regionIndex - beginIndex);

        //anaID相同学校已过滤
        schoolDetail(analysisID)
          .then((res) => {
            this.schInfo = res;
            const regionDict = new Map(), regionSet = new Set();

            const schInfoLen = this.schInfo.length;
            for (let i = 0; i < schInfoLen; i++) {//初始化set
              let loc = this.schInfo[i].location;
              regionDict.set(loc, 0)
              regionSet.add(loc);
            }
            for (let i = 0; i < schInfoLen; i++) {//对于每个学校ID对应的地址
              let loc = this.schInfo[i].location;
              regionDict.set(loc, regionDict.get(loc) + stuCount.get(this.schInfo[i].cid));//加上学校人数
            }
            if (showWhat % 2 === 1) {
              for (let s of regionSet) {
                this.mapResult.push({name: s, value: regionDict.get(s)});
              }
              getMap(this.mapResult);
            } else {
              getMap([]);
            }

            let nine = 0, two = 0;//nine为985/211 two为211
            for (let i = 0; i < schInfoLen; i++) {
              if (this.schInfo[i].level != null) {
                if (this.schInfo[i].level.length > 3) {
                  nine += stuCount.get(this.schInfo[i].cid);
                } else {
                  two += stuCount.get(this.schInfo[i].cid);
                }
              }
            }
            if (showWhat >= 10 && showWhat !== 100 && showWhat !== 101) {
              this.otherData.push({
                depend: '985/211',
                count: nine,
                ratio: (nine / (this.rowEnd - this.rowBegin + 1)).toFixed(2)
              });
            }
            if (showWhat >= 100) {
              this.otherData.push({
                depend: '211',
                count: two,
                ratio: (two / (this.rowEnd - this.rowBegin + 1)).toFixed(2)
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      exportEXCEL: function (type, isRegion) {
        console.log("进入了导出EXCEL函数")
        let arr;
        if (isRegion === 'region') {
          arr = this.mapResult.map((item) => {
            return {
              '地区': item.name,
              '人数': item.value,
            };
          });
        } else {
          arr = this.otherData.map((item) => {
            return {
              '等级': item.depend,
              '人数': item.count,
              '比例': item.ratio,
            };
          });
        }

        let sheet = xlsx.utils.json_to_sheet(arr);
        let book = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book, sheet, "sheet1");
        if (type === 'xlsx') {
          xlsx.writeFile(book, `user${new Date().getTime()}.xlsx`);
        } else {
          xlsx.writeFile(book, `user${new Date().getTime()}.csv`);
        }

      },
      handleChange: async function (ev) {
        let file = ev.raw;
        if (!file) {
          return;
        }

        this.schFields = [];

        let data = await readFile(file);
        let workbook = xlsx.read(data, {type: 'binary'});

        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data);

        const range = xlsx.utils.decode_range(worksheet['!ref']);
        let C, R = range.s.r;
        for (C = range.s.c; C <= range.e.c; ++C) {
          const cell = worksheet[xlsx.utils.encode_cell({c: C, r: R})];
          let hdr = "UNKNOWN" + C;
          if (cell && cell.t) {
            hdr = xlsx.utils.format_cell(cell);
          }
          this.schFields.push({'field': hdr});
        }

        this.dataLen = data.length;

        this.excelData = data;
      },
    },
    mounted() {
      getMap([]);
    },
    created() {
      schoolList()
        .then((res) => {
          this.collegeId = res;
          for (let i = 0; i < this.collegeId.length; i++) {
            this.nameId[this.collegeId[i].cname] = this.collegeId[i].cid;
          }
        });
    }
  }

</script>

<style scoped>
  .screen {
    width: 100%;
    height: 300px;
    border: 1px solid darkgrey;
  }

  #source-data, #data-scale, #field-map, #finish, #conditions {
    display: flex;
    justify-content: start;
    margin-left: 20px;
  }

  #finish {
    width: 120px;
    padding-left: 46px;
  }
</style>
