<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-form
      label-position="right"
      :model="anaForm"
      :rules="anaRules"
      ref="anaForm"
      class="items"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item
            label="生源数据"
            prop="fileList"
          >
            <div style="display:flex;align-items: center">
              <el-upload
                accept=".xlsx,.xls"
                :auto-upload="false"
                :show-file-list="false"
                ref="upload"
                :on-change="handleChange"
                action
              >
                <el-button
                  plain
                  size="small"
                  style="height: 30px;"
                >选择文件
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <el-form-item
            label="起始行"
            prop="rowBegin"
          >
            <el-input
              v-model="anaForm.rowBegin"
              size="mini"
              style="width: 150px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :label="`终止行（共${dataLen}）行`"
            prop="rowEnd"
          >
            <el-input
              v-model="anaForm.rowEnd"
              size="mini"
              style="width: 150px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item
          label="字段映射"
          prop="fieldMap"
        >
          <el-dropdown
            size="small"
            split-button
            trigger="click"
            @command="handleSchField"
            v-model="anaForm.fieldMap"
          >
            {{anaForm.fieldMap}}
            <el-dropdown-menu
              slot="dropdown"
              id="school-filed"
            >
              <el-dropdown-item
                v-for="(item,index) in schFields"
                :key="index"
                :command="item.field"
              >
                {{item.field}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-row>

      <el-row>
        <el-checkbox-group
          v-model="checkBoxGroup"
          size="medium"
        >
          <el-checkbox
            label="地区"
            border
            style="width: 100px;margin-right: 0"
          ></el-checkbox>
          <el-checkbox
            label="985"
            border
            style="width: 100px;margin-right: 0"
          ></el-checkbox>
          <el-checkbox
            label="211"
            border
            style="width: 100px"
          ></el-checkbox>
        </el-checkbox-group>
      </el-row>


    </el-form>
    <el-row>
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-button
          type="primary"
          size="medium"
          id="finish"
          style="background-color: #1e56a0;color: white"
          plain
          @click="getResult('anaForm')"
        >
          完成
        </el-button>
      </div>
    </el-row>
    <el-divider></el-divider>

    <!--        地图分析结果-->
    <div
      class="map"
      style="width: 100%;display: flex"
    >
      <div
        id="region"
        style="width: 60%;height: 600px;"
      ></div>
      <div
        style="width: 40%;display: flex;flex-direction: column"
      >
        <el-row style="display: flex;justify-content: space-around">
          <el-button
            type="primary"
            size="medium"
            style="background-color: #1e56a0;color: white"
            @click="exportEXCEL('xlsx','region')"
          >
            导出为EXCEL
          </el-button>
          <el-button
            type="primary"
            size="medium"
            style="background-color: #1e56a0;color: white"
            @click="exportEXCEL('csv','region')"
          >
            导出为CSV
          </el-button>
          <el-button
            type="primary"
            size="medium"
            style="background-color: #1e56a0;color: white"
            v-print="'#printRegion'"
          >
            打印
          </el-button>
        </el-row>
        <el-scrollbar style="height: 500px">
          <el-table
            :data="mapResult"
            :header-cell-style="{background:'#1e56a0',color:'#fff'}"
            stripe
            style="width: 100%;margin-top: 20px"
            id="printRegion"
          >
            <el-table-column
              label="地区"
              prop="name"
              align="center"
            ></el-table-column>
            <el-table-column
              label="人数"
              prop="value"
              align="center"
            ></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>

    <el-divider></el-divider>

    <!--其他数据分析-->
    <div class="other_data">
      <div
        id="other_result"
        style="width: 100%;display: flex"
      >
        <div
          style="width: 70%;margin-right: 50px"
        >
          <el-table
            :data="otherData"
            id="printOther"
            :header-cell-style="{background:'#1e56a0',color:'#fff'}"
            stripe
          >
            <el-table-column
              label="字段"
              prop="depend"
              align="center"
            ></el-table-column>
            <el-table-column
              label="人数"
              prop="count"
              align="center"
            ></el-table-column>
            <el-table-column
              label="比例"
              prop="ratio"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div style="width: 20%;display: flex;flex-direction: column;justify-content: space-around">
          <el-button
            style="width: 150px;margin-left: 10px;margin-bottom: 10px;background-color: #1e56a0;color: white"
            type="primary"
            size="medium"
            @click="exportEXCEL('xlsx','other')"
          >
            导出为EXCEL
          </el-button>
          <el-button
            style="width: 150px;margin-left: 10px;margin-bottom: 10px;background-color: #1e56a0;color: white"
            type="primary"
            size="medium"
            @click="exportEXCEL('csv','ohter')"
          >
            导出为CSV
          </el-button>
          <el-button
            style="width: 150px;margin-left: 10px;margin-bottom: 10px;background-color: #1e56a0;color: white"
            type="primary"
            size="medium"
            v-print="'#printOther'"
          >
            打印
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {readFile} from '@/assets/lib/utils'
  import {getMap} from '@/assets/lib/ChinaMapShow'
  import xlsx from 'xlsx';
  import {schoolList, schoolDetail} from "@/assets/lib/getResultLjm";


  export default {
    name: 'Analysis',
    data() {
      const validateFileList = (rule, value, callback) => {
        if (this.$refs.upload.uploadFiles.length > 0) {
          callback();
        } else {
          callback(new Error("请上传文件"));
        }
      };
      const validateRowBegin = (rule, value, callback) => {
        if (value < 1) {
          callback(new Error("起始行应不小于1"));
        } else if (value > this.anaForm.rowEnd) {
          callback(new Error("起始行不应大于终止行"));
        } else {
          callback();
        }
      };
      const validateRowEnd = (rule, value, callback) => {
        if (value > this.dataLen) {
          callback(new Error("不应大于最大值"));
        } else if (value < this.anaForm.rowBegin) {
          callback(new Error("终止行不应小于起始行"));
        } else {
          callback();
        }
      };
      return {
        anaForm: {
          rowBegin: 0,//开始行
          rowEnd: 0,//结束行
          fileList: [],//文件上传列表
          fieldMap: '请选择映射字段',
        },
        anaRules: {
          rowBegin: [
            {required: true, message: "不能为空", trigger: "blur"},
            {validator: validateRowBegin}
          ],
          rowEnd: [
            {required: true, message: "不能为空", trigger: "blur"},
            {validator: validateRowEnd}
          ],
          fileList: [
            {required: true, validator: validateFileList}
          ],
          fieldMap: [
            {required: true, message: "请选择映射字段", trigger: "change"}
          ]
        },
        checkBoxGroup: [],
        dataLen: 0,//表格有多少行数据
        schFields: [],//可能是学校的字段
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
      handleSchField: function(command) {
        this.anaForm.fieldMap = command;
      },
      //根据选项选择展示内容
      contains: function(arr, obj) {
        let i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },

      checkShow: function() {
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

      getResult: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const showWhat = this.checkShow();//判断显示内容
            this.schNames = [];
            this.mapResult = [];
            this.schIDs = [];
            this.otherData = [];

            let index = 0;
            //将选中行区间的学校名加入schNames
            for (let i = this.anaForm.rowBegin - 1; i < this.anaForm.rowEnd; i++) {
              this.schNames.push(this.excelData[i][this.anaForm.fieldMap]);
              this.schIDs.push(this.nameId[this.schNames[index++]]);
            }
            console.log("学校ID数量", this.schIDs.length);
            //将学校ID进行排序 方便后续tempID直接记录上一个ID
            this.schIDs = this.schIDs.sort();
            let tempID = this.schIDs[0];
            const stuCount = new Map();//学校学生人数统计
            let beginIndex = 0;
            const analysisID = [];
            let regionIndex = 0;
            //相同学校名是同个地区
            for (; regionIndex < this.schIDs.length; regionIndex++) {
              if (this.schIDs[regionIndex] !== tempID) {//如果是新ID
                let tid = this.schIDs[beginIndex];//保持老ID
                tempID = this.schIDs[regionIndex]//记录当前的id，即下一个id
                stuCount.set(tid, 0);//初始化学校ID对应人数为0
                analysisID.push(tid);//将之前的加入待分析id中
                stuCount.set(tid, regionIndex - beginIndex);//学校人数统计加入
                beginIndex = regionIndex;//更换新起始坐标
              }
            }
            analysisID.push(this.schIDs[beginIndex]);//处理最后一个
            stuCount.set(this.schIDs[beginIndex], regionIndex - beginIndex);

            console.log("analysisID = ", analysisID);

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
                    ratio: (nine / (this.anaForm.rowEnd - this.anaForm.rowBegin + 1)).toFixed(2)
                  });
                }
                if (showWhat >= 100) {
                  this.otherData.push({
                    depend: '211',
                    count: two,
                    ratio: (two / (this.anaForm.rowEnd - this.anaForm.rowBegin + 1)).toFixed(2)
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("请检查数据是否符合要求！");
                this.mapResult = [];
                this.otherData = [];
                getMap([]);
              });
          } else {
            this.$message.error("请检查输入！");
          }
        });
      },

      exportEXCEL: function(type, isRegion) {
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

      handleChange: async function(ev) {
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

<style>
  #finish {
    width: 120px;
    margin-top: 10px;
  }

  .items .el-form-item__label {
    font-size: 16px;
    font-weight: bold;
  }

</style>
