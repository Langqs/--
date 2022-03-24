<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="header">
                    <span style="height:28px">线上热门搜索</span>
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <span>搜索用户数</span>
                            <svg t="1647510863545" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2202" width="25" height="25"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2203"></path></svg>
                            <div class="userValue">
                                <span style="font-size: 24px;margin: 20px">12321</span>
                                <span style="font-size: 15px;">17.1</span>
                                <svg
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
                                    fill="#d81e06"></path>
                                </svg>
                            </div>
                            <div ref="charts" class="charts"></div>
                        </el-col>
                        <el-col :span="12">
                            <span>搜索用户数</span>
                            <div class="userValue">
                                <span style="font-size: 24px;margin: 20px">651</span>
                                <span style="font-size: 15px;">45.6</span>
                                <svg
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
                                >
                            </div>
                            <div ref="chartsTwo" class="charts"></div>
                        </el-col>
                    </el-row>
                    <el-table
                        :data="tableData"
                        style="width: 100%;margin-top:20px"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        border
                        size='mini'
                        >
                        <el-table-column
                        prop="date"
                        label="排名"
                        width="80"
                        type="index">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="搜索关键字"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="用户数"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="周涨幅"
                        sortable>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="1000"
                        style="margin-top:8px;float:right">
                    </el-pagination>
                </div>
                
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="header">
                    <span>销售额类别占比</span>
                    <el-radio-group v-model="choice" size='mini'>
                        <el-radio-button label="全部渠道"></el-radio-button>
                        <el-radio-button label="线上"></el-radio-button>
                        <el-radio-button label="门店"></el-radio-button>
                    </el-radio-group>
                </div>
                <div ref="cakeChart" class="chartsCake"></div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name:'doubleTable',
    data() {
        return {
            choice:'全部渠道',
            tableData: [{}]
        }
    },
    mounted() {
        this.myEcharts()
        this.echartTwo()
        this.echartCake()
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
            },
            // y轴配置项
            yAxis: {
            show: false, //隐藏y轴
            type: 'value'
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
                color: "#409EFF"
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
                        offset: 0, color: '#409EFF' // 0% 处的颜色
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
            x: 0,
            y: 2,
            x2: 0,
            y2: 0,
            },
        };
        myChart.setOption(option);
        },
        echartTwo() {
        //获取DOM初始化echarts实例
        var myChart = this.$echarts.init(this.$refs.chartsTwo);
        //配置图表
        var option = {
            // x轴配置项
            xAxis: {
            show: false, //隐藏x轴
            type: "category", // 均分
            },
            // y轴配置项
            yAxis: {
            show: false, //隐藏y轴
            type: 'value'
            },
            // 系列设置，如绘制什么样的图表，数据在这里展示
            series: [
            {
                smooth: true,
                type: 'line',
                data: [ 30,22,20, 24,  15, 10, 2], // 图表数据
                itemStyle: {
                //拐点的样式设置
                opacity: 0
                },
                // 线条的颜色
                lineStyle: {
                color: "#67C23A"
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
                        offset: 0, color: '#67C23A' // 0% 处的颜色
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
            x: 0,
            y: 2,
            x2: 0,
            y2: 0,
            },
        };
        myChart.setOption(option);
        },
        echartCake() {
        //获取DOM初始化echarts实例
        var myChart = this.$echarts.init(this.$refs.cakeChart);
        //配置图表
        var option = {
            tooltip: {
                trigger: 'item'
            },
            title:{
                    text:'服装',
                    subtext:1024,
                    left:"center",
                    top:"center"
                },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside'
                },
                emphasis: {
                    
                },
                labelLine: {
                    show: true,
                    length: 20
                },
                data: [
                    { value: 1024, name: '服装' },
                    { value: 735, name: '家电' },
                    { value: 580, name: '箱包' },
                    { value: 484, name: '美妆' },
                    { value: 300, name: '户外' }
                ]
                }
            ]
        };
        myChart.setOption(option);
        //鼠标移上事件
        myChart.on('mouseover',(params)=>{
            //获取鼠标移上去的那条数据
            const {name,value}= params.data
            //重新设置标题
            myChart.setOption({
                title:{
                    text:name,
                    subtext:value
                }
            })
        })
        },
    },
}
</script>
<style scoped>
.charts{
    width: 100%;
    height: 70px;
}
.chartsCake{
    width: 100%;
    height: 300px;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.box-card {
    margin-top: 10px;
    width: 100%;
    height: 400px;
  } 
.userValue{
    margin:20px 0px;
}
</style>