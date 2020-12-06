import echarts from 'echarts';

require('echarts/map/js/china');

export function getMap(region_value) {
  console.log("传入了地图和数据为" + region_value.length);
  // 初始化echarts实例
  let chinachart = echarts.init(document.getElementById('region'))
  // 进行相关配置
  let chartOption = {
    tooltip: { // 鼠标移到图里面的浮动提示框
      // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
      formatter(params) {
        // params.data 就是series配置项中的data数据遍历
        let pcount
        if (params.data) {
          pcount = params.data.value
        } else { // 为了防止没有定义数据的时候报错写的
          pcount = 0
        }
        return `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:-10px;'>
	          人数：${pcount}<br/>
          </p>
        `
      }
      // backgroundColor:"#ff7f50",//提示标签背景颜色
      // textStyle:{color:"#fff"} //提示标签字体颜色
    },
    // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
    visualMap: { // 左下角的颜色区域
      type: 'piecewise', // 定义为分段型 visualMap
      min: 0,
      max: 1000,
      itemWidth: 40,
      bottom: 60,
      left: 20,
      pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
        {gt: 0, lte: 10, label: '1-10人', color: '#6ad86e'},
        {gt: 10, lte: 50, label: '11-50人', color: '#ffeb3b'},
        {gt: 50, lte: 100, label: '51-100人', color: '#ff9800'},
        {gt: 100, lte: 1000, label: '101人以上', color: 'orangered'},
      ]
    },
    // geo配置详解： https://echarts.baidu.com/option.html#geo
    geo: { // 地理坐标系组件用于地图的绘制
      map: 'china', // 表示中国地图
      // roam: true, // 是否开启鼠标缩放和平移漫游
      zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
      label: {
        show: true
      },
      itemStyle: { // 地图区域的多边形 图形样式。
        borderColor: 'rgba(0, 0, 0, 0.2)',
        emphasis: { // 高亮状态下的多边形和标签样式
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    series: [
      {
        name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
        type: 'map',
        geoIndex: 0,
        label: {
          show: true
        },
        // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
        data: region_value
      }
    ]
  }
  // 使用刚指定的配置项和数据显示地图数据
  // this.chinachart.setOption(this.chartOption)
  chinachart.setOption(chartOption);
  return chinachart;
}
