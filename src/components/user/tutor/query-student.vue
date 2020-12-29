<template>
  <div style="width: 100%;height: 100%;margin-top: 10px">
    <div style="margin-left: 10px;margin-right: 10px;">
      <el-form :model="queryFrom"
               ref="queryForm"
               :rules="queryRules"
               class="items">
        <el-row>
          <el-col :span="6">
            <el-form-item label="入学时间" prop="beginY">
              <el-date-picker type="date" placeholder="起" v-model="queryFrom.beginY"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毕业时间" prop="endY">
              <el-date-picker type="date" placeholder="止" v-model="queryFrom.endY"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="高校类别" prop="schLevel">
            <el-dropdown size="small" split-button trigger="click" @command="handleSchField">
              {{queryFrom.schLevel}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="'985/211'">985/211</el-dropdown-item>
                <el-dropdown-item :command="'211'">211</el-dropdown-item>
                <el-dropdown-item :command="'双一流'">双一流</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="本科学类" prop="discipline">
              <el-select v-model="queryFrom.discipline" collapse-tags filterable placeholder="请选择" @change="getMajors">
                <el-option v-for="item in disciplines" :key="item.did" :value="item.did"
                           :label="item.dname"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="本科专业" prop="major">
              <el-select v-model="queryFrom.major" filterable placeholder="请选择">
                <el-option v-for="item in majors" :key="item.mid" :value="item.mname"
                           :label="item.mid+item.mname"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="预期学类" prop="exDiscipline">
              <el-select v-model="queryFrom.exDiscipline" collapse-tags filterable placeholder="请选择"
                         @change="getMajors">
                <el-option v-for="item in disciplines" :key="item.did" :value="item.did"
                           :label="item.dname"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预期专业" prop="exMajor">
              <el-select v-model="queryFrom.exMajor" filterable placeholder="请选择">
                <el-option v-for="item in majors" :key="item.mid" :value="item.mname"
                           :label="item.mid+item.mname"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>


      <div class="selection">
        <div style="width: 75%">
          <el-button @click="myScreen('queryForm')" type="primary"
                     style="min-width: 100px;margin-left: 20px;background-color: #1e56a0;color: white">筛选
          </el-button>
        </div>
        <div class="selection" style="width: 20%">
          <el-button style="background-color: #1e56a0;color: white" @click="exportEXCEL('xlsx','region')">导出为EXCEL
          </el-button>
          <el-button style="background-color: #1e56a0;color: white" @click="exportEXCEL('csv','region')">导出为CSV
          </el-button>
          <el-button style="background-color: #1e56a0;color: white">打印</el-button>
        </div>
      </div>
    </div>

    <el-divider></el-divider>
    <div>
      <el-table :data="stuInfo" :header-cell-style="{background:'#1e56a0',color:'#fff'}" border stripe>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="school" label="本科高校" align="center"></el-table-column>
        <el-table-column prop="major" label="本科专业" align="center"></el-table-column>
        <el-table-column prop="exMajor" label="预期专业" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱地址" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  import {majorList, disciplineList} from "@/assets/lib/getResultLjm";
  import xlsx from "xlsx";

  export default {
    name: 'QueryStudent',

    data() {
      return {
        myBackground: {
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        queryFrom: {
          beginY: '',
          endY: '',
          schLevel: '985/211',
          discipline: '',//选择的学类
          major: '',
          exDiscipline: '',//预期学类
          exMajor: '',
        },
        stuInfo: [],
        disciplines: [],//学类
        majors: [],//专业
        queryRules: {
          beginY: [
            {required: true, message: "请选择入学时间", trigger: "blur"}
          ],
          endY: [
            {required: true, message: "请选择毕业时间", trigger: "blur"}
          ],
          schLevel: [
            {required: true, message: "请选择学校类别", trigger: "blur"}
          ],
          discipline: [
            {required: true, message: "请选择毕业学类", trigger: "blur"}
          ],
          major: [
            {required: true, message: "请选择毕业专业", trigger: "blur"}
          ],
          exDiscipline: [
            {required: true, message: "请选择预期学类", trigger: "blur"}
          ],
          exMajor: [
            {required: true, message: "请选择预期专业", trigger: "blur"}
          ],
        }
      }
    },
    methods: {
      handleSchField: function(command) {
        this.queryFrom.schLevel = command;
      },

      getDisciplines: function() {
        disciplineList()
          .then((res) => {
            console.log(res);
            this.disciplines = res;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      getMajors: function(id) {
        this.majors = [];
        majorList()
          .then((res) => {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
              if (res[i].did === id) {
                this.majors.push(res[i]);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      myScreen: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get("/api/tutor/q/queryable-stu-info", {
              params: {
                'beginDate': this.queryFrom.beginY,
                'endDate': this.queryFrom.endY,
                'collegeLevel': this.queryFrom.schLevel,
                'major': this.queryFrom.major,
                'expectedMajor': this.queryFrom.exMajor
              }
            })
              .then((res) => {
                if (res.data.status === 200) {
                  this.$message.success("查询成功！");
                  let items = res.data.data;
                  for (let i = 0; i < items.length; i++) {
                    this.stuInfo.push({
                      'name': items[i].name,
                      'school': items[i].college,
                      'major': items[i].major,
                      'exMajor': items[i].expectedMajor,
                      'tel': items[i].phone,
                      'email': items[i].email
                    })
                  }
                }
                this.$refs['queryForm'].resetFields();
              })
              .catch((err) => {
                console.log("查询学生报错" + err);
              });
          } else {
            this.$message.error("请检查输入！");
          }
        });
      },

      exportEXCEL: function(type) {
        console.log("进入了导出EXCEL函数");
        let arr;
        arr = this.stuInfo.map((item) => {
          return {
            "姓名": item.name,
            "学校": item.school,
            "本科专业": item.major,
            "预期专业": item.exMajor,
            "联系电话": item.tel,
            "邮箱地址": item.email
          };
        })

        let sheet = xlsx.utils.json_to_sheet(arr);
        let book = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book, sheet, "sheet1");
        if (type === 'xlsx') {
          xlsx.writeFile(book, `user${new Date().getTime()}.xlsx`);
        } else {
          xlsx.writeFile(book, `user${new Date().getTime()}.csv`);
        }

      },
    },
    created() {
      this.getDisciplines();
    }
  }
</script>

<style>
  .date-pick {
    width: 150px;
  }

  .selection {
    display: flex;
    align-items: center;
    height: 60px;
  }

  .items .el-form-item__label {
    font-size: 16px;
    font-weight: bold;
  }
</style>
