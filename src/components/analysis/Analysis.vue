<template>

  <div>
    <!--    筛选框-->
    <div class="screen" style="display: flex;flex-direction: column;justify-content: space-around">

      <div id="source_data">
        <p style="margin-right: 20px">生源数据:</p>
        <div style="display:flex;align-items: center">
          <el-upload action accept=".xlsx,.xls" :auto-upload="false" :show-file-list="false"
                     :on-change="handleChange">
            <el-button plain size="small" style="height: 30px;">选择文件</el-button>
          </el-upload>
        </div>
      </div>
      <div id="data_scale">
        <p style="margin-right: 20px">数据范围:</p>
        <div style="display: flex;align-items: center;">
          <el-input v-model="rowbegin" size="mini" style="width: 150px"></el-input>
          <p style="margin-right: 20px;margin-left: 20px">—</p>
          <el-input v-model="rowend" size="mini" style="width: 150px"></el-input>
          <p style="margin-left: 20px">请输入 1-{{datalen}} 之间的数字</p>
        </div>
      </div>
      <div id="field_map" style="display: flex;align-items: center">
        <p style="margin-right: 20px">字段映射:</p>
        <el-dropdown size="small" split-button trigger="click" @command="handleSchField">
          {{schfiled}}
          <el-dropdown-menu slot="dropdown" id="school_filed">
            <el-dropdown-item v-for="(item,index) in sch_fields" :key="index" :command="item.field">{{item.field}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div id="conditions">
        <el-checkbox-group v-model="checkboxGroup" size="medium">
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
          <el-button size="small" @click="printtest()">打印</el-button>
        </el-row>
        <el-table :data="mapresult" stripe style="width: 100%">
          <el-scrollbar style="height: 100px">
          <el-table-column label="地区" prop="name" align="center"></el-table-column>
          <el-table-column label="人数" prop="value" align="center"></el-table-column>
          </el-scrollbar>
        </el-table>
      </div>
    </div>
    <!--其他数据分析-->
    <div class="other_data">
      <div id="title">
        <p>其他数据</p>
      </div>
      <div id="other_result" style="width: 100%;display: flex">
        <div style="width: 70%;margin-right: 50px">
          <el-table :data="otherdata" stripe>
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
  import {readFile} from '../../assets/lib/utils'
  import {getSchRegion} from '../../assets/lib/getSchRegion'
  import {getMap} from '../../assets/lib/ChinaMapShow'
  import {getSchool} from '../../assets/lib/getHomeServe'
  import xlsx from 'xlsx';


  export default {
    name: "",
    data() {
      return {
        checkboxGroup: [],
        datalen: 1,//表格有多少行数据
        sch_fields: [],//可能是学校的字段
        schfiled: '选择学校名称字段',//用户选择的学校字段
        rowbegin: 0,//开始行
        rowend: 0,//结束行
        mapresult: [],//地图分析结果
        otherdata: [],//其他（学校等级）分析结果
        schNames: [],//待分析学校名列表
        schIDs: [],//待分析学校ID列表
        schInfo: [],//待分析的学校详情
        excelDatas: [],//表格内拿到的所有数据
        school_id: [],//获取全部的学校代码和名字
        name_id: []//名字和代码对应
      }
    },
    methods: {
      printtest() {
        this.$message("test!")
        this.$message("box group" + this.checkboxGroup)
      },
      handleIndexBegin(command) {
        this.rowbegin = command;
      },
      handleIndexEnd(command) {
        this.rowend = command;
      },
      handleSchField(command) {
        this.schfiled = command;
        // this.$message('click on schfiled ' + this.schfiled);
      },
      //根据选项选择展示内容
      contains(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      checkshow() {
        console.log("进入！checkshow");
        console.log("进入时 = " + sum);
        var sum = 0;
        if (this.contains(this.checkboxGroup, '地区')) {
          sum += 1;
        }
        if (this.contains(this.checkboxGroup, '985')) {
          sum += 10;
        }
        if (this.contains(this.checkboxGroup, '211')) {
          sum += 100;
        }
        console.log("sum = " + sum);
        return sum;
      },
      getResult() {
        var showwhat = this.checkshow();
        this.schNames = [];
        this.mapresult = [];
        this.schIDs = [];
        this.otherdata = [];
        if (this.rowbegin > this.rowend || this.rowbegin === 0) {
          this.$message("左侧行数应小于右侧行数");
          return;
        }
        let index = 0;
        for (let i = this.rowbegin - 1; i < this.rowend; i++) {
          this.schNames.push(this.excelDatas[i][this.schfiled]);
          this.schIDs.push(this.name_id[this.schNames[index++]]);
        }

        this.schIDs = this.schIDs.sort();
        var tempID = this.schIDs[0];
        var stucount = new Map();//学校学生人数统计
        var beginindex = 0;
        var anaID = [];
        let regini = 0;

        for (; regini < this.schIDs.length; regini++) {
          if (this.schIDs[regini] !== tempID) {
            let tid = this.schIDs[beginindex];
            tempID = this.schIDs[regini]//记录当前的id，即下一个id
            stucount.set(tid, 0);//初始化学校ID对应人数为0
            anaID.push(tid);//将之前的加入待分析id中
            stucount.set(tid, regini - beginindex);//学校人数统计加入
            beginindex = regini;//更换新起始坐标
          }
        }
        anaID.push(this.schIDs[beginindex]);
        stucount.set(this.schIDs[beginindex], regini - beginindex);

        //anaID相同学校已过滤
        getSchRegion(anaID).then(res => {
          this.schInfo = res;
          var regiondict = new Map(), regionset = new Set();

          var schinfolen = this.schInfo.length;
          for (let i = 0; i < schinfolen; i++) {//初始化set
            let loc = this.schInfo[i].location;
            regiondict.set(loc, 0)
            regionset.add(loc);
          }
          for (let i = 0; i < schinfolen; i++) {//对于每个学校ID对应的地址
            let loc = this.schInfo[i].location;
            regiondict.set(loc, regiondict.get(loc) + stucount.get(this.schInfo[i].cid))//加上学校人数
          }
          if (showwhat % 2 === 1) {
            for (let s of regionset) {
              this.mapresult.push({name: s, value: regiondict.get(s)});
            }
            getMap(this.mapresult);
          } else {
            getMap([]);
          }

          var nine = 0, two = 0;//nine为985/211 two为211
          for (let i = 0; i < schinfolen; i++) {
            if (this.schInfo[i].level != null) {
              if (this.schInfo[i].level.length > 3) {
                nine += stucount.get(this.schInfo[i].cid);
              } else {
                two += stucount.get(this.schInfo[i].cid);
              }
            }
          }
          if (showwhat >= 10 && showwhat !== 100 && showwhat !== 101) {
            this.otherdata.push({
              depend: '985/211',
              count: nine,
              ratio: (nine / (this.rowend - this.rowbegin + 1)).toFixed(2)
            });
          }
          if (showwhat >= 100) {
            this.otherdata.push({
              depend: '211',
              count: two,
              ratio: (two / (this.rowend - this.rowbegin + 1)).toFixed(2)
            });
          }
        })
      },
      exportEXCEL(type, isregion) {
        console.log("进入了导出EXCEL函数")
        let arr;
        if (isregion === 'region') {
          arr = this.mapresult.map(item => {
            return {
              地区: item.name,
              人数: item.value,
            };
          });
        } else {
          arr = this.otherdata.map(item => {
            return {
              等级: item.depend,
              人数: item.count,
              比例: item.ratio,
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
      async handleChange(ev) {
        let file = ev.raw;
        if (!file) return;

        this.sch_fields = [];

        let data = await readFile(file);
        let workbook = xlsx.read(data, {type: 'binary'});

        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data);

        const range = xlsx.utils.decode_range(worksheet['!ref']);
        let C, R = range.s.r;
        for (C = range.s.c; C <= range.e.c; ++C) {
          const cell = worksheet[xlsx.utils.encode_cell({c: C, r: R})]
          let hdr = "UNKNOWN" + C;
          if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
          this.sch_fields.push({'field': hdr});
        }

        this.datalen = data.length;

        this.excelDatas = data;
      },
    },
    mounted() {
      getMap([]);
    },
    created() {
      getSchool().then(res => {
        this.school_id = res.data;
        for (let i = 0; i < this.school_id.length; i++) {
          this.name_id[this.school_id[i].cname] = this.school_id[i].cid;
        }
      })
    }
  }

</script>

<style scoped>
  .screen {
    width: 100%;
    height: 300px;
    border: 1px solid darkgrey;
  }

  #source_data, #data_scale, #field_map, #finish, #conditions {
    display: flex;
    justify-content: start;
    margin-left: 20px;
  }

  #finish {
    width: 120px;
    padding-left: 46px;
  }
</style>
