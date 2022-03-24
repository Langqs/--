<template>
  <div class="Echarts">
    <el-row :gutter="10">
      <el-col :span="6" class="box">
        <el-card>
          <Card title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span>
                周同比 56.67%<svg
                  t="1647591014555"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2190"
                  data-spm-anchor-id="a313x.7781069.0.i1"
                  width="16"
                  height="16"
                >
                  <path
                    d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
                    p-id="2191"
                    data-spm-anchor-id="a313x.7781069.0.i0"
                    class="selected"
                    fill="#d81e06"
                  ></path>
                </svg> </span
              ><span
                v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"
              ></span>
              <span
                >日同比 19.96%<svg
                  t="1647591136522"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3169"
                  width="16"
                  height="16"
                >
                  <path
                    d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
                    p-id="3170"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥ 12423</span>
            </template>
          </Card>
        </el-card>
      </el-col>

      <el-col :span="6" class="box">
        <el-card>
          <Card title="访问量" count="88460">
            <template slot="charts">
              <div ref="charts" class="charts"></div>
            </template>

            <template slot="footer">
              <span>日访问量 1243</span>
            </template>
          </Card>
        </el-card>
      </el-col>

      <el-col :span="6" class="box">
        <el-card>
          <Card title="支付笔数" count="88460">
            <template slot="charts">
              <div ref="chartsTwo" class="charts"></div>
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Card>
        </el-card>
      </el-col>

      <el-col :span="6" class="box">
        <el-card>
          <Card title="运营活动效果" count="78%">
            <template slot="charts">
              <div ref="chartsThr" class="charts"></div>
            </template>
            <template slot="footer">
              <span>周同比 56.67%<svg
                  t="1647591014555"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2190"
                  data-spm-anchor-id="a313x.7781069.0.i1"
                  width="16"
                  height="16"
                >
                  <path
                    d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
                    p-id="2191"
                    data-spm-anchor-id="a313x.7781069.0.i0"
                    class="selected"
                    fill="#d81e06"
                  ></path>
                </svg> </span
              ><span
                v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"
              ></span>
              <span>日同比 19.96%<svg
                  t="1647591136522"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3169"
                  width="16"
                  height="16"
                >
                  <path
                    d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
                    p-id="3170"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
          </Card>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" ref="card">
      <div class="clearfix padi">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="table">
          <el-tab-pane label="销售额" name="first" :lazy="true">
            <div style="width:100%;height:100%" ref="row">
              <saleEcharts v-if="activeName=='first'"></saleEcharts>
            </div>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="second" :lazy="true">
            <visitEchart v-if="activeName=='second'"></visitEchart>
          </el-tab-pane>
        </el-tabs>
        <div class="right">
          <a @click="setDay">今日</a>
          <a @click="setWeek">本周</a>
          <a @click="setMonth">本月</a>
          <a @click="setYear">本年</a>
          <el-date-picker
            v-model="dateValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px">
          </el-date-picker>
        </div>
    </div>
  </el-card>
  <doubleTable></doubleTable>
  </div>
</template>

<script>
import Card from "./Card";
import saleEcharts from './saleEchart'
import visitEchart from './visitEchart';
import doubleTable from './doubleTable';
import dayjs from 'dayjs'
export default {
  name: "Dashboard",
  data() {
    return {
      activeName:'first',
      dateValue:[],
      };
  },
  components: {
    Card,saleEcharts,visitEchart,doubleTable
  },
  mounted() {
      this.myEcharts()
      this.myChartTwo()
      this.myChartThr()
  },
  methods: {
    myEcharts() {
      //获取DOM初始化echarts实例
      var myChart = this.$echarts.init(this.$refs.charts);
      //配置图表
      var option = {
        // x轴配置项
        xAxis: {
          show: false, //隐藏x轴
          type: "category", // 均分
          boundaryGap: false// x轴两边不留白
        },
        // y轴配置项
        yAxis: {
          show: false, //隐藏y轴
          type: 'value',
          boundaryGap: [0, '20%']
        },
        // 系列设置，如绘制什么样的图表，数据在这里展示
        series: [
          {
            smooth: true,
            type: 'line',
            data: [10, 22, 2, 24, 30, 15, 20], // 图表数据
            itemStyle: {
              //拐点的样式设置
              opacity: 0
            },
            // 线条的颜色
            lineStyle: {
              color: "#DCB1DC"
            },
            //填充颜色设置
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'purple' // 0% 处的颜色
                }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
        ],
        //布局调试
        grid: {
          left: 0,
          // top: 0,
          right: 0,
          buttom: 0,
        },
      };
      myChart.setOption(option);
    },
    myChartTwo(){
      var myChartTwo =this.$echarts.init(this.$refs.chartsTwo)
      let option = {
        xAxis: {
          show: false, //隐藏x轴
          type: 'category',
        },
        yAxis: {
          type: 'value',
          show: false, //隐藏y轴
          boundaryGap: [0, '10%']
        },
        series: [
          {
            data: [10, 52, 200, 334, 390, 330, 220,88,143,67], // 图表数据
            type: 'bar',
            smooth: true,
          }
        ],
        //提示信息
        tooltip:{},
        //布局调试
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
        },
      };

option && myChartTwo.setOption(option);
    },
    myChartThr(){
      var myChartThr =this.$echarts.init(this.$refs.chartsThr)
      let option = {
        xAxis: {
          show: false, //隐藏x轴
          min: 0,
          max: 100,
        },
        yAxis: {
          show: false, //隐藏y轴
          type: 'category',//均分
        },
        series: [
          {
            data: [78], // 图表数据
            type: 'bar',
            barWidth:10, //柱状图的宽度
            color: 'yellowgreen',
            showBackground: true,// 背景颜色
            // 文本
            label: {
              show: true,
              position: 'right', // 改变文本内容，默认data数字
              formatter: '|', //文本标签位置
            },
          }
        ],
        //布局调试
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 10,
        },
      };

option && myChartThr.setOption(option);
    },
    handleClick(tab, event){
      let name=tab.name
      this.activeName = name
    },
    //今日
    setDay(){
      const day = dayjs().format('YYYY-MM-DD')
      this.dateValue= [day,day]
    },
    // 本周
    setWeek(){
      let onedat= dayjs().day()
      let start = ''
      let end = ''
      if (onedat == '0' ) {
        start = dayjs().day(1-7).format('YYYY-MM-DD')
        end = dayjs().day(7-7).format('YYYY-MM-DD')
      }else{
        start = dayjs().day(1).format('YYYY-MM-DD')
        end = dayjs().day(7).format('YYYY-MM-DD')
      }
      
      this.dateValue= [start,end]
    },
    setMonth(){
       let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.dateValue= [start,end]
    },
    setYear(){
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.dateValue= [start,end]
    }
  },
};
</script>

<style scoped>
.box-card {
    min-width: 100%;
    height: 600px;
  }
  .el-row-inline {
    display: flex;
    flex-wrap: wrap;
  }
  .el-col {
    border-radius: 4px;
    height: 100%;
  }
.box {
  min-width: 320px;
  padding: 5px 0px;
}
.icon {
  margin-left: 5px;
  vertical-align: middle;
}
.charts {
  width: 100%;
  height: 100%;
  
}
.clearfix{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
.table{
  width: 100%;
  height: 100%;
}
.right{
  position: absolute;
  right: 0px;
  font-size: 14px;
}
.right a{
  margin: 0px 10px;
}
.padi{
  padding-top: 0px !important;
}
.rightList{
  width:100%;
  height: 100%;
  padding: 10px;
}
.rindex{
  font-size: 16px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  float: left;
  padding-bottom: 3px;
}
.amount{
  float: right;
}
.saleName{
  margin-left: 20px;
}
</style>
