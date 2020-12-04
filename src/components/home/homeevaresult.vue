<template>
  <div>
    <div class="bor2">
      <div class="marg">
        <span style="font-weight:bold;font-size:16px">
        筛选条件
        </span>
      </div>
      <!--      轮次-->
      <div class="marg">
        <span style="font-size:14px">
          轮次 :
        </span>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--      学类-->
      <div class="marg">
        <span style="font-size:14px">
          学类 :
        </span>
        <el-select v-model="value2" placeholder="请选择" size="mini">
          <el-option
            v-for="item in option2"
            :key="item.value2"
            :label="item.label2"
            :value="item.value2">
          </el-option>
        </el-select>
      </div>
      <!--      学科-->
      <div class="marg">
        <span style="font-size:14px">
          学科 :
        </span>
        <el-select v-model="value2" multiple placeholder="请选择" size="mini">
          <el-option
            v-for="item in option2.majors"
            :key="item.mid"
            :label="item.mid+item.mname"
            :value="item.mname">
          </el-option>
        </el-select>
      </div>
      <!--      等级-->
      <div class="marg">
        <span style="font-size:14px">
          等级 :
        </span>
        <el-select v-model="value4" multiple placeholder="请选择" size="mini">
          <el-option
            v-for="item in option4"
            :key="item.value4"
            :label="item.label4"
            :value="item.value4">
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="text-align:center;margin-top:10px">
      <el-button size="small" round>确定</el-button>
    </div>
    <br>
    <div class="bor2">
      <div class="marg">
        <span style="font-weight:bold;font-size:16px">
          筛选结果
        </span>
        <div style="float:right">
          <el-button size="mini" round>一键收藏</el-button>
        </div>
        <div style="float:right;margin-right:5px">
          <el-button size="mini" round>打印</el-button>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: "选项1",
          label: "第一轮"
        }, {
          value: "选项2",
          label: "第二轮"
        }, {
          value: "选项3",
          label: "第三轮"
        }, {
          value: "选项4",
          label: "第四轮"
        }],
        value: "",
        option2: [{
          value2: "选项1",
          label2: "人文社科类",
          majors: [
            {
              mid: "0101",
              mname: "哲学"
            },
            {
              mid: "0102",
              mname: "理论经济学"
            }
          ]
        }, {
          value2: "选项2",
          label2: "理学",
          majors: [
            {
              mid: "0701",
              mname: "数学"
            },
            {
              mid: "0702",
              mname: "物理学"
            }
          ]
        }, {
          value2: "选项3",
          label2: "工学",
          majors: [
            {
              mid: "0801",
              mname: "力学"
            },
            {
              mid: "0802",
              mname: "机械工程"
            }
          ]
        }, {
          value2: "选项4",
          label2: "农学",
          majors: [
            {
              mid: "0901",
              mname: "作物学"
            },
            {
              mid: "0902",
              mname: "园艺学"
            }
          ]
        }],
        value2: "",
        option4: [{
          value4: "选项1",
          label4: "A+"
        }, {
          value4: "选项2",
          label4: "A"
        }, {
          value4: "选项3",
          label4: "A-"
        }, {
          value4: "选项4",
          label4: "B"
        }],
        value4: "",
        selected: {
          dindex: 0
        }
      }
    }
  }
</script>

<style>
  .bor2 {
    border: 1px solid black;
  }

  .marg {
    margin: 10px 20px;
  }
</style>
