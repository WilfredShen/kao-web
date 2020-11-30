<template>
  <div>
    <!--    筛选框-->
    <div class="screen" style="display: flex;flex-direction: column;justify-content: space-around">

      <div id="source_data">
        <p style="margin-right: 20px">生源数据:</p>
        <div style="display:flex;align-items: center">
          <el-button plain size="small" style="height: 30px;">选择文件</el-button>
        </div>
      </div>
      <div id="data_scale">
        <p style="margin-right: 20px">数据范围:</p>
        <div style="display: flex;align-items: center;">
          <el-dropdown size="small" split-button trigger="click" @command="handleCommand">
            1
            <el-dropdown-menu slot="dropdown" id="dropdown_begin">
              <el-dropdown-item command="b_2">2</el-dropdown-item>
              <el-dropdown-item command="b_3" divided>3</el-dropdown-item>
              <el-dropdown-item command="b_4" divided>4</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p style="margin-right: 20px;margin-left: 20px">—</p>
          <el-dropdown size="small" split-button trigger="click" @command="handleCommand">
            1
            <el-dropdown-menu slot="dropdown" id="dropdown_end">
              <el-dropdown-item command="e_2">2</el-dropdown-item>
              <el-dropdown-item command="e_3" divided>3</el-dropdown-item>
              <el-dropdown-item command="e_4" divided>4</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div id="field_map" style="display: flex;align-items: center">
        <p style="margin-right: 20px">字段映射:</p>
        <el-dropdown size="small" split-button trigger="click" @command="handleCommand">
          选择学校名称字段
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">学校</el-dropdown-item>
            <el-dropdown-item command="b" divided>学生</el-dropdown-item>
            <el-dropdown-item command="c" divided>地区</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div id="conditions">
        <el-checkbox-group v-model="checkboxGroup1" size="medium">
          <el-checkbox label="地区" border style="width: 100px;margin-right: 0px"></el-checkbox>
          <el-checkbox label="985" border style="width: 100px;margin-right: 0px"></el-checkbox>
          <el-checkbox label="211" border style="width: 100px"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-button type="primary" size="medium" id="finish" plain>完成</el-button>
      </div>
    </div>
    <!--        地图分析结果-->
    <div class="map" style="width:100%;display: flex">
      <div id="region" style="width:60%;height: 600px">
      </div>
      <div id="show" style="width: 40%;display: flex;flex-direction: column">
        <el-row style="display: flex;justify-content: space-around">
          <el-button size="small">导出为EXCEL</el-button>
          <el-button size="small">导出为CSV</el-button>
          <el-button size="small">打印</el-button>
        </el-row>
        <el-table :data="mapresult" stripe style="width: 100%">
          <el-table-column label="地区" prop="where" align="center"></el-table-column>
          <el-table-column label="人数" prop="count" align="center"></el-table-column>
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
          <el-button style="width: 150px;margin-left: 10px">导出为EXCEL</el-button>
          <el-button style="width: 150px">导出为CSV</el-button>
          <el-button style="width: 100px">打印</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        checkboxGroup1: [],
        mapresult: [{
          where: '北京市',
          count: '10',
        }, {
          where: '上海市',
          count: '12'
        }],
        otherdata: [{
          depend: '985',
          count: '10',
          ratio: '20%'
        }, {
          depend: '211',
          count: '15',
          ratio: '25%'
        }],
      }
    },
    mounted() {
      let echarts = require('echarts/lib/echarts')
      require('echarts/lib/chart/scatter')
      require('echarts/lib/chart/effectScatter')
      require('echarts/lib/chart/map')
      require('echarts/lib/component/legend')
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/geo')
      require('echarts/map/js/china')
      let chinaMap = echarts.init(document.getElementById('region'))
      chinaMap.setOption({
        backgroundColor: '#272D3A',
        // 标题
        title: {
          text: '生源分析结果',
          left: 'center',//距离左侧的距离
          top: 30,
          textStyle: {
            color: '#fff',
            fontSize: 20,
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮 点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度', 'top5'],
          textStyle: {
            color: '#fff'
          }
        },
        // 地理坐标系组件
        geo: {
          map: 'china',
          label: {
            // true会显示城市名
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#465471',
              borderColor: '#282F3C'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '地区热度',
            // 表的类型 这里是散点
            type: 'scatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            // 鼠标悬浮的时候在圆点上显示数值
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              },
              // 鼠标悬浮的时候圆点样式变化
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            name: 'top5',
            // 表的类型 这里是散点
            type: 'effectScatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      })
      let showLoadingDefault = {
        text: '加载中...',
        color: '#23531',
        textColor: '#fff',
        // 地图背景色
        maskColor: '#272D3A',
        zlevel: 0
      }
      chinaMap.showLoading(showLoadingDefault)
      this.$store.commit('openLoading')
      this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
      setInterval(() => {
        this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
      }, 1000)
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
    }
  }
</script>

<style scoped>
  .screen .other_data {
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
