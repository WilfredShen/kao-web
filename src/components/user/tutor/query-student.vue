<template>
  <div>
    <!--    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">-->
    <div>
      <div class="selection">
        <span>毕业时间：</span>
        <el-date-picker class="date-pick" type="date" placeholder="起" v-model="beginY"></el-date-picker>
        <span style="margin-left: 10px;margin-right: 10px">—</span>
        <el-date-picker class="date-pick" type="date" placeholder="止" v-model="endY"></el-date-picker>
      </div>
      <div class="selection">
        <span>高校类别：</span>
        <el-dropdown size="small" split-button trigger="click" @command="handleSchField()">
          {{schLevel}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'985/211'">985/211</el-dropdown-item>
            <el-dropdown-item :command="'211'">211</el-dropdown-item>
            <el-dropdown-item :command="'双一流'">双一流</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="selection">

        <span>本科学类：</span>
        <el-select v-model="discipline" collapse-tags filterable placeholder="请选择" @change="getMajors()">
          <el-option v-for="item in disciplines" :key="item.did" :value="item.did" :label="item.name"></el-option>
        </el-select>

        <span style="margin-left: 15px">本科专业：</span>
        <el-select v-model="major" filterable placeholder="请选择">
          <el-option v-for="item in majors" :key="item.mid" :value="item.mname"
                     :label="item.mid+item.mname"></el-option>
        </el-select>

      </div>
      <div class="selection">
        <span>预期学类：</span>
        <el-select v-model="exDiscipline" collapse-tags filterable placeholder="请选择" @change="getMajors()">
          <el-option v-for="item in disciplines" :key="item.did" :value="item.did" :label="item.dname"></el-option>
        </el-select>
        <!--          collapse-tags multiple-->
        <span style="margin-left: 15px">预期专业：</span>
        <el-select v-model="exMajor" filterable placeholder="请选择">
          <el-option v-for="item in majors" :key="item.mid" :value="item.mname"
                     :label="item.mid+item.mname"></el-option>
        </el-select>
      </div>
      <div class="selection">
        <div style="width: 75%">
          <el-button @click="myScreen()" type="primary"
                     style="min-width: 100px;margin-top: 20px;background-color: #1e56a0;color: white">筛选
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
    <!--    </div>-->
  </div>
</template>

<script>

  import {majorList, disciplineList} from "@/assets/lib/getResultLjm";
  import xlsx from "xlsx";

  export default {
    name: 'QueryStudent',
    data() {
      return {
        beginY: '',
        endY: '',
        schLevel: '请选择',
        stuInfo: [],
        disciplines: [],//学类
        majors: [],//专业
        discipline: '',//选择的学类
        major: '',
        exDiscipline: '',//预期学类
        exMajor: '',
      }
    },
    methods: {
      handleSchField: function (command) {
        this.schLevel = command;
      },

      getDisciplines: function () {
        disciplineList()
          .then((res) => {
            console.log(res);
            this.disciplines = res;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      getMajors: function (id) {
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

      myScreen: function () {
        this.$axios.get("/api/tutor/q/queryable-stu-info", {
          params: {
            'beginDate': this.beginY,
            'endDate': this.endY,
            'collegeLevel': this.schLevel,
            'major': this.major,
            'expectedMajor': this.exMajor
          }
        })
          .then((res) => {
            console.log(res);
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
          })
          .catch((err) => {
            console.log("查询学生报错" + err);
          });
      },

      exportEXCEL: function (type) {
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

<style scoped>
  .date-pick {
    width: 150px;
  }

  .selection {
    display: flex;
    align-items: center;
    height: 60px;
  }
</style>
