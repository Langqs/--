<template>
    <div>
        <el-table :data="skuList.records" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="skuName" label="名称" width="width">
            </el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="width">
            </el-table-column>
            <el-table-column label="默认图片" width="150">
                <template slot-scope="{row}">
                    <img :src="row.skuDefaultImg" style="width:120px;height:120px" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" align="center" width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center" width="100">
            </el-table-column>
            <el-table-column label="操作" width="width">
                <template slot-scope="{row}">
                    <el-button v-if="row.isSale==0" type="info" size="mini" @click="onSku(row)">上架</el-button>
                    <el-button v-else type="success" size="mini" @click="offSku(row)">下架</el-button>
                    <el-button type="primary" size="mini" @click="edit">编辑</el-button>
                    <br>
                    <el-button type="warning" size="mini" @click="skuInfo(row)" style="margin-top:10px">详情</el-button>
                    <el-button type="danger" size="mini" @click="deleteSku(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        style="margin-top: 20px; text-align: center"
        :current-page="page"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        :pager-count="7"
        layout="prev, pager, next, jumper, ->,sizes,total "
        :total="total"
        >
        </el-pagination>
        <!-- 抽屉 -->
        <el-drawer :show-close="false" :visible.sync="drawer" size='50%' style="overflow-y:scroll">
            <el-row>
                <el-col :span="5" class="left-column">名称</el-col>
                <el-col :span="16" class="right-column">{{skuInfoList.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5" class="left-column">描述</el-col>
                <el-col :span="16" class="right-column">{{skuInfoList.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5" class="left-column">价格</el-col>
                <el-col :span="16" class="right-column">{{skuInfoList.price}} 元</el-col>
            </el-row>
            <el-row>
                <el-col :span="5" class="left-column">平台属性</el-col>
                <el-col :span="16" class="right-column">
                    <el-tag type="success" v-for="item in skuInfoList.skuAttrValueList" :key="item.id" style="margin:5px">
                        {{item.attrName}}:{{item.valueName}}
                    </el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5" class="left-column">商品图片</el-col>
                <el-col :span="16" class="right-column">
                    <el-carousel height="400px">
                        <el-carousel-item v-for="item in skuInfoList.skuImageList" :key="item.id">
                            <img :src="item.imgUrl" alt="" style="width:100%;height:100%">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>
<script>
export default {
    name:'Spu',
    data() {
        return {
            page: 1, //当前页码
            limit: 5, //展示条数
            total: 0, //总数据条数
            skuList:[],//列表数据
            skuInfoList:{},// 详情
            drawer: false,//抽屉的显示与隐藏
        }
    },
    mounted() {
        this.getSkuList()
    },
    methods: {
        // 获取 Sku列表
        async getSkuList(){
            let result = await this.$API.spu.reqSkuList(this.page,this.limit)
            if (result.code ==200) {
                this.skuList = result.data
            }
            this.total = this.skuList.total
        },
        // 上架
        async onSku(row){
            let result = await this.$API.spu.reqOnSku(row.id)
            if (result.code ==200) {
                row.isSale =1
                this.$message({
                    type:'success',
                    message:'上架成功'
                })
            }
        },
        // 下架
        async offSku(row){
            let result = await this.$API.spu.reqOffSku(row.id)
            if (result.code ==200) {
                row.isSale =0
                this.$message({
                    type:'success',
                    message:'下架成功'
                })
            }
        },
        // 编辑
        edit(){
            this.$message('正在开发中')
        },
        // 详情
        async skuInfo(row){
            let result = await this.$API.spu.reqSkuInfo(row.id)
            if (result.code==200) {
                this.skuInfoList = result.data
            }
            this.drawer=true
        },
        //分页器切换页码
        currentChange(pager) {
            this.page = pager;
            this.getSkuList();
        },
        //切换页面显示条数
        sizeChange(limit) {
            this.limit = limit;
            this.page = 1
            this.getSkuList();
        },
        // 删除
        deleteSku(row){
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$API.spu.reqDeleteSku(row.id)
                if (result.code == 200) {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.page =1
                    this.getSkuList()
                }
            }).catch(() => {});
        }
    },
}
</script>
<style>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
      width: 10px;
      height: 10px;
      background: red;
      border-radius: 100%;
  }
      .left-column{
        font-size: 18px;
        margin: 10px 10px;
        text-align: right;
    }
    .right-column{
        font-size: 18px;
        margin: 10px 10px;
    }
</style>
