<template>
    <el-row ref="row">
      <el-col :span="19"><div ref="salesCharts" class="charts"></div></el-col>
      <el-col :span="5">
        <div class="rightList">
        <font style="font-size:16px">门店销售额排名</font>
        <el-table :data="list" style="width: 100%;" height="400" :show-header='false'>
            <el-table-column type="index" width="50" >
                <template slot-scope="{$index}">
                    <span :class="($index<3)?'rindex':'none'">{{$index+1}}</span>
                </template>
                </el-table-column>
            <el-table-column prop="name" width="100"></el-table-column>
            <el-table-column prop="address" align="right"></el-table-column>
        </el-table>
      </div></el-col>
      </el-row>
</template>
<script>
export default {
    name:'saleEchart',
    data () {
        return {
            list:[
                {name:'肯德基',address:'123456'},
                {name:'麦当劳',address:'123456'},
                {name:'麦肯基',address:'123456'},
                {name:'必胜客',address:'123456'},
                {name:'莱得快',address:'123456'},
                {name:'莱得快',address:'123456'},
                {name:'莱得快',address:'123456'},  
                {name:'莱得快',address:'123456'},  
                {name:'莱得快',address:'123456'},  
                {name:'莱得快',address:'123456'},  
                {name:'莱得快',address:'123456'},  
            ]
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
                        name: '销售额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220,90,123,332,231,56]
                    }
                ]
            };
            window.onresize = salesCharts.resize;
            salesCharts.setOption(option);
            
        },
    },
}
</script>
<style scoped>
.charts{
    width: 100%;
    height: 100%;
}
/* 去掉中间数据的分割线 */
div /deep/ .el-table__row>td{
  border: none;
}
/* 去掉上面的线 */
.el-table th.is-leaf{
  border: none;
}
/* 去掉最下面的那一条线 */
.el-table::before {
  height: 0px;
}
div /deep/ .el-table td, .el-table th {
    padding: 12px 0 0 0;
    }  
</style>