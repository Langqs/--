<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      
    }
  },
  mounted(){
    this.myEcharts();
  },
  methods: {
    myEcharts(){
      //获取DOM初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      //配置图表
      var option = {
        // 图表的标题
        title: {
          // 主标题
          text: 'echarts入门示例',
          // 子标题
          subtext:"echarts基本使用"
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        // x轴配置项
        xAxis: {
          data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'] // 数据
        },
        // y轴配置项
        yAxis: {
          axisLine:{
            show:true
          }
        },
        // 系列设置，如绘制什么样的图表，数据在这里展示
        series: [{
          name: '销量',
          type: 'bar', //图表的类型
          data: [5,20,36,10,10,20], // 图表数据
          color:'#006400',
        },
        {
          name: '销量',
          type: 'line', //图表的类型
          data: [5,20,36,10,10,20], // 图表数据
          color:blur,
        }
        ]
      };
      myChart.setOption(option);
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
canvas{
  border: 1px solid black;
}
</style>
