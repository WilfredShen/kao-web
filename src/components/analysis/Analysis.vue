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
                    <el-dropdown  size="small" split-button trigger="click" @command="handleIndexBegin">
                        {{rowbegin}}
                        <el-dropdown-menu slot="dropdown" id="dropdown_begin">
                            <el-dropdown-item v-for="(item,index) in bcols" :key="index" :command="item.page">{{item.page}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <p style="margin-right: 20px;margin-left: 20px">—</p>
                    <el-dropdown size="small" split-button trigger="click" @command="handleIndexEnd">
                          {{rowend}}
                        <el-dropdown-menu slot="dropdown" id="dropdown_end">
                            <el-dropdown-item v-for="(item,index) in bcols" :key="index" :command="item.page">{{item.page}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div id="field_map" style="display: flex;align-items: center">
                <p style="margin-right: 20px">字段映射:</p>
                <el-dropdown  size="small" split-button trigger="click" @command="handleSchField">
                    {{schfiled}}
                        <el-dropdown-menu slot="dropdown" id="school_filed">
                            <el-dropdown-item v-for="(item,index) in sch_fields" :key="index" :command="item.field">{{item.field}}</el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </div>

            <div id="conditions">
                <el-checkbox-group v-model="checkboxGroup1" size="medium">
                    <el-checkbox label="地区"  border style="width: 100px;margin-right: 0px"></el-checkbox>
                    <el-checkbox label="985"  border style="width: 100px;margin-right: 0px"></el-checkbox>
                    <el-checkbox label="211"  border style="width: 100px"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div style="margin-top: 15px;margin-bottom: 15px">
                <el-button type="primary" size="medium" id="finish" plain @click="getResult()">完成</el-button>
            </div>
        </div>
<!--        地图分析结果-->
        <div class="map" style="width: 100%;display: flex">
            <div id="region" style="width: 60%;height: 600px">
            </div>
            <div id="show" style="width: 40%;display: flex;flex-direction: column">
                <el-row style="display: flex;justify-content: space-around">
                    <el-button size="small">导出为EXCEL</el-button>
                    <el-button size="small">导出为CSV</el-button>
                    <el-button size="small">打印</el-button>
                </el-row>
                <el-table :data="mapresult" stripe style="width: 100%">
                    <el-table-column label="地区"  prop="where" align="center"></el-table-column>
                    <el-table-column label="人数"  prop="count" align="center"></el-table-column>
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
                        <el-table-column label="字段"  prop="depend" align="center"></el-table-column>
                        <el-table-column label="人数"  prop="count" align="center"></el-table-column>
                        <el-table-column label="比例"  prop="ratio" align="center"></el-table-column>
                    </el-table>
                </div>
                <div style="width: 20%;display: flex;flex-direction: column;justify-content: space-around">
                    <el-button style="width: 150px;margin-left: 10px">导出为EXCEL</el-button>
                    <el-button style="width: 150px">导出为CSV</el-button>
                    <el-button style="width: 100px">打印</el-button>
                </div>
            </div>
        </div>
        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
    </div>
</template>

<script>
import { readFile,character } from '../../assets/lib/utils'
import { schoolList,getSchRegion, } from '../../assets/lib/getResult'
import xlsx from 'xlsx';

    export default {
        name: "",
        data(){
            return{
                limitUpload:1,//上传excel时，同时允许上传的最大数
                fileList:[],//excel文件列表
                checkboxGroup1:[],
                bcols:[],//有几行
                sch_fields:[],
                rowbegin:0,
                rowend:0,
                schfiled:'选择学校名称字段',
                mapresult:[],
                otherdata:[],
                schNames:[],
            }
        },
        methods: {
            handleIndexBegin(command){
                this.rowbegin = command;
                this.$message('click on itembegin ' + this.rowbegin);
            },
            handleIndexEnd(command){
                this.rowend = command;
                this.$message('click on itemend ' + this.region_num['湖北']+" "+this.region_num['北京']);
            },
            handleSchField(command){
                this.schfiled = command;
                this.$message('click on schfiled ' + this.schfiled);
            },
            getResult(){
                this.mapresult = [];
                console.log("传入的学校有"+this.schNames);
                schoolList.then(res=>{
                    // console.log("school"+res);
                    var name_id = [];
                    for (let i=0;i<res.length;i++){
                        name_id[res[i].cname] = res[i].cid;
                    }
                    for (let i=0;i<this.schNames.length;i++){
                        getSchRegion(name_id[this.schNames[i]]).then(res=>{
                            var loc = res.location;
                            let i = 0;
                            for (i=0;i<this.mapresult.length;i++){
                                if (this.mapresult[i].where === loc){
                                    this.mapresult[i].count +=1;
                                    break;
                                }
                            }
                            if (i===this.mapresult.length){
                                this.mapresult.push({where: loc,count: 1});
                            }
                        })
                    }
                })
            },
            async handleChange(ev){
              let file = ev.raw;
              if (!file) return;

              this.bcols = [];
              this.sch_fields = [];

              let data = await readFile(file);
              let workbook = xlsx.read(data,{type:'binary'});

              let worksheet = workbook.Sheets[workbook.SheetNames[0]];
              data = xlsx.utils.sheet_to_json(worksheet);
              console.log(data);

              const range = xlsx.utils.decode_range(worksheet['!ref']);
              let C ,R = range.s.r;
              for (C = range.s.c;C<=range.e.c;++C){
                  const cell = worksheet[xlsx.utils.encode_cell({c:C,r:R})]
                  let hdr = "UNKNOWN" + C;
                  if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
                  this.sch_fields.push({'field':hdr});
              }

              var datalen = data.length;
              for (var i = 1;i<=datalen;i++){
                  this.bcols.push({'page':i});
              }


              let arr=[];
              console.log("data = "+data);
              data.forEach(item=>{
                 let obj = {};
                 for (let key in character){
                     // eslint-disable-next-line no-prototype-builtins
                     if (!character.hasOwnProperty(key))break;
                     let v = character[key],
                         text = v.text,
                         type = v.type;
                     v = item[text] || "";
                     type === "string"?(v=String(v)):null;
                     type === "number"?(v=Number(v)):null;
                     obj[key] = v;
                 }
                 arr.push(obj);

              });
              console.log(arr[0].school);
              for (let i=0;i<arr.length;i++){
                  this.schNames.push(arr[i].school);
              }
            },
        },

    }

</script>

<style scoped>
    .screen {
        width: 100%;
        height: 300px;
        border: 1px solid darkgrey;
    }
    #source_data,#data_scale,#field_map,#finish,#conditions{
        display: flex;
        justify-content: start;
        margin-left: 20px;
    }

    #finish{
        width: 120px;
        padding-left: 46px;
    }
</style>
