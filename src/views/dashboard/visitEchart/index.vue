<template>
    <el-row ref="row">
      <el-col :span="19"><div ref="salesCharts" class="charts"></div></el-col>
      <el-col :span="5">
        <div class="rightList">
        <font style="font-size:16px">门店访问量排名</font>
        <ul>
          <li><span class="rindex">1</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span class="rindex">2</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span class="rindex">3</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>4</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>5</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>6</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>7</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>8</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>9</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
          <li><span>10</span><span class="saleName">肯德基</span><span class="amount">12345</span></li>
        </ul>
      </div></el-col>
      </el-row>
</template>
<script>
export default {
    name:'saleEchart',
    data () {
        return {

        }
    },
    mounted() {
        this.salesCharts()
    },
    methods: {
        salesCharts(){
             let myChart=this.$refs.salesCharts
             myChart.style.height = window.innerHeight-450+'px'
            let salesCharts =this.$echarts.init(this.$refs.salesCharts)
            let option = {
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '5%',
                    // containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisTick: {
                        alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                {
                    type: 'value'
                }
                ],
                series: [
                    {
                        name: '访问量',
                        type: 'bar',
                        barWidth: '60%',
                        data: [220,90,123,332,231,56,10, 52, 200, 334, 390, 330]
                    }
                ]
            };
            window.onresize = salesCharts.resize;
            salesCharts.setOption(option);
            
        },
    },
}
</script>
<style>
.charts{
    width: 100%;
    height: 100%;
}    
</style>