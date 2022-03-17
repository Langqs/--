<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <CategorySelect
        @getCategory="getCategory"
        :isShow="isShow"
      ></CategorySelect>
    </el-card>
    <el-card class="box-card" style="margin: 10px 0px">
      <div v-show="isShow==0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!formValue.category3Id"
          @click="addUpdateSpu(1)"
          >添加Spu
        </el-button>
        <el-table :data="list" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- eslint-disable-next-line -->
            <template slot-scope="{ row, $index }">
              <el-row>
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    size="mini"
                    title="添加Sku"
                    @click="addSku(row)"
                  ></el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-edit"
                    size="mini"
                    title="修改Spu"
                    @click="addUpdateSpu(2,row)"
                  ></el-button>
                  <el-button
                    type="info"
                    icon="el-icon-info"
                    size="mini"
                    title="查看当前Spu全部Sku列表"
                    @click="seeSku(row)"
                  ></el-button>
                  <el-popconfirm style="margin-left:10px" title="确定删除？" @onConfirm="deleteSpu(row)">
                  <el-button type="danger" icon="el-icon-delete" size="mini" title="删除Sku"
                    slot="reference" ></el-button>
                  </el-popconfirm>
              </el-row>
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
      </div>
      <!-- 添加|编辑SPU -->
      <div v-show="isShow==1">
        <el-form ref="form" :model="spu" label-width="80px">
          <el-form-item label="Spu名称">
            <el-input v-model="spu.spuName"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="spu.tmId" placeholder="请选择品牌">
              <el-option
                v-for="item in tradeMark"
                :key="item.id"
                :label="item.tmName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Spu描述">
            <el-input v-model="spu.description" type="textarea" rows="4" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item label="SPU图片">
            <el-upload
              action="/dev-api/admin/product/fileUpload"
              list-type="picture-card"
              :file-list="spuImageList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="销售属性">
            <el-select v-model="attrId" :placeholder="`还有${unSaleAttrList.length}未选择`">
              <el-option
                v-for="item in unSaleAttrList"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" style="margin-left:5px"
             :disabled="!attrId"
             @click="addSaleAttr">
             添加销售属性</el-button>
            <el-table
              :data="spu.spuSaleAttrList"
              style="width: 100%;margin-top:10px" border>
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="width">
              </el-table-column>
              <el-table-column
                prop="saleAttrName"
                label="属性名"
                width="width">
              </el-table-column>
              <el-table-column label="属性值名称列表" width="width">
                <!-- eslint-disable-next-line -->
                <template slot-scope="{row,$index}">
                  <el-tag v-for="(tag,index) in row.spuSaleAttrValueList" :key="tag.id" closable
                    :disable-transitions="false" @close="handleClose(row,index)">
                    {{tag.saleAttrValueName}}
                  </el-tag>
                  <el-input
                    class="input-new-tag" v-if="row.inputVisible" ref="saveTagInput" size="small"
                    v-model="inputValue"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm(row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">
                    添加</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="width">
                <!-- eslint-disable-next-line -->
                <template slot-scope="{row,$index}">
                  <el-button type="danger" icon="el-icon-delete" @click="deleteAttr($index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitSku">保存</el-button>
            <el-button @click="isShow=0">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加SKU -->
      <div v-show="isShow==2">
        <el-form ref="form" :model="skuInfo" label-width="80px">
          <el-form-item label="SPU名称">
            {{skuInfo.spuName}}
          </el-form-item>
          <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
          </el-form-item>
          <el-form-item label="价格(元)）">
            <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
          </el-form-item>
          <el-form-item label="重量(KG)">
            <el-input placeholder="重量（KG）" v-model="skuInfo.weight"></el-input>
          </el-form-item>
          <el-form-item label="规格描述">
            <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
          </el-form-item>
          <el-form-item label="平台属性">
            <el-form :inline="true" ref="miniform" :model="skuInfo" label-width="80px">
              <el-form-item v-for="item in skuAttrInfoList" :key="item.id" :label="item.attrName" style="margin-bottom:10px">
                <el-select v-model="item.attrIdAndValueId" value-key="id" placeholder="请选择">
                  <el-option v-for="itemMini in item.attrValueList" :key="itemMini.id" :label="itemMini.valueName" :value="itemMini">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item label="销售属性">
            <el-form :inline="true" ref="form" :model="skuInfo" label-width="80px">
              <el-form-item v-for="item in skuSaleAttrList" :key="item.id" :label="item.saleAttrName">
                <el-select v-model="item.attrIdAndValueId" value-key="id" placeholder="请选择">
                  <el-option v-for="itemMini in item.spuSaleAttrValueList" :key="itemMini.id" :label="itemMini.saleAttrValueName" :value="itemMini">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item label="图片列表">
            <el-table :data="skuImageList" ref="selection" style="width: 100%" border>
              <el-table-column :selectable="selection" type="selection" label="" width="80"></el-table-column>
              <el-table-column label="图片" width="width">
                <!-- eslint-disable-next-line -->
                <template slot-scope="{ row, $index }">
                  <img :src="row.imgUrl" alt="" style="width: 100px; heigth: 100px" />
                </template>
              </el-table-column>
              <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
              <el-table-column label="操作" width="width">
                <template slot-scope="{ row, $index }">
                  <el-button :type="row.isDefault==1?'success':'primary'" @click="isDefault(row,$index)">{{row.isDefault==1?'取消默认':'设为默认'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
            <el-form-item label="">
            <el-button type="primary" @click="submitSku">保存</el-button>
            <el-button @click="isShow=0">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog :title="tcTitle + '  的SKU列表'" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border v-loading="loading">
        <el-table-column property="skuName" label="名称" width=""></el-table-column>
        <el-table-column property="price" label="价格" width="100"></el-table-column>
        <el-table-column property="weight" label="重量" width="100"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Sku",
  data() {
    return {
      dialogTableVisible: false,//控制弹窗显示与隐藏
      gridData:{},//弹窗列表数据
      tcTitle:'',//弹窗title
      loading: true,
      isShow: 0, // 显示控制
      page: 1, //当前页码
      limit: 5, //展示条数
      total: 0, // 数据总数
      list: [],// Spu列表数据
      formValue: {}, //一级二级三级分类id
      skuInfo:{
        "category3Id": undefined,
        "isSale": undefined,
        "price": undefined,
        "skuAttrValueList": [],
        "skuDefaultImg": "",
        "skuDesc": "",
        "skuImageList": [],
        "skuName": "",
        "skuSaleAttrValueList": [],
        "spuId": undefined,
        "tmId": undefined,
        "weight": ""//重量
      },
      miniform:{
        screenSize:'',//屏幕尺寸
        wireless:'',//无线通信
      },
      dialogImageUrl: '',
      dialogVisible: false,
      attrId: '',//收集的 添加按钮时的销售属性
      //spu数据
      spu:{
        "category3Id": 0,//3级分类id
        "description": "",//描述
        "id": undefined,
        "tmId": undefined,//品牌的id
        "spuName": "",//spu的名称
        //spu图片
        "spuImageList": [],
        //平台属性与属性值
        "spuSaleAttrList": [
          {
            "baseSaleAttrId": 0,
            "id": 0,
            "saleAttrName": "",
            "spuId": 0,
            "spuSaleAttrValueList": []
          }
        ]
      },
      tradeMark:[], // 品牌信息
      spuImageList:[], //sup图片
      saleAttrList:[], //平台销售属性
      inputVisible: false,//tag标签切换控制
      inputValue:'',//tag输入框的值

      skuImageList:[], //reqSpuImageList 数据
      skuSaleAttrList:[], //reqSpuSaleAttrList 销售属性数据
      skuAttrInfoList:[], //reqAttrInfoList 平台 属性值数据
      sku_Spu:{},
    };
  },
  mounted() {},
  //计算属性
  computed: {
    //计算出还未选择的销售属性
    unSaleAttrList(){
      let result =this.saleAttrList.filter(item=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  },
  methods: {
    //自定义事件回调
    getCategory(formValue) {
      this.formValue = formValue;
      this.getSpuList();
    },
    //添加|修改SPU (id：1新增；2修改)
    async addUpdateSpu(id,row) {
      //初始化数据
      this.spu={
        "category3Id": 0,//3级分类id
        "description": "",//描述
        "id": undefined,
        "tmId": undefined,//品牌的id
        "spuName": "",//spu的名称
        //spu图片
        "spuImageList": [],
        //平台属性与属性值
        "spuSaleAttrList": []
      }
      this.spuImageList=[]
      //获取品牌信息
      let resu = await this.$API.sku.reqTradeMark()
      if (resu.code==200) {
        this.tradeMark = resu.data
      }
      //获取销售属性
      let res = await this.$API.sku.reqBaseSaleAttrList()
      if (res.code == 200) {
        this.saleAttrList = res.data
      }
      if (id==2) {
        //获取spu信息
        let result = await this.$API.sku.reqSpu(row.id)
        if (result.code==200) {
          this.spu = result.data
        }
        //获取spu图标
        let resul =await this.$API.sku.reqSpuImage(row.id)
        if (resul.code==200) {
          let imageList = resul.data
          imageList.forEach(item=>{item.name=item.imgName;item.url=item.imgUrl})
          this.spuImageList = imageList
        }
      }
      this.isShow = 1
      // 如果是新增，新增后应跳到第一页
      if (id==1) {
        this.page =1
      }
    },
    // Spu列表
    async getSpuList() {
      const { page, limit } = this;
      const { category3Id } = this.formValue;
      let result = await this.$API.sku.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    // 添加销售属性按钮
    addSaleAttr(){
      let {id,name}=this.attrId
      let newSaleAttr = {
            "baseSaleAttrId": id,
            "saleAttrName": name,
            "spuSaleAttrValueList": []
          }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrId=""
    },
    //图片上传成功
    handleAvatarSuccess(response, file, fileList){
      this.spuImageList = fileList
    },
    // 图片 删除时触发
    handleRemove(file, fileList) {
      //  file:删除的图片 fileList：所有图片
        this.spuImageList = fileList;
      },
    // 图片预览时的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //分页器切换页码
    currentChange(pager) {
      this.page = pager;
      this.getSpuList();
    },
    //切换页面显示条数
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //tag 标签
    handleClose(row,index) {
        row.spuSaleAttrValueList.splice(index,1)
        
      },
    //删除销售属性
    deleteAttr(index){
      this.spu.spuSaleAttrList.splice(index,1)
    },
    //点击销售属性值的添加按钮
    showInput(row) {
      this.$set(row,'inputVisible',true)
        // this.inputVisible = true;
        //输入框获得焦点
        this.$nextTick(_ => {
          this.$refs.saveTagInput.focus();
        });
      },
    //销售属性值input框失去焦点时
    handleInputConfirm(row) {
      row.inputVisible = false;
        let inputValue = this.inputValue;
        
        if (inputValue) {
          let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
          if (result) {
            let newTag = {
              baseSaleAttrId: row.baseSaleAttrId,
              saleAttrName: row.saleAttrName,
              saleAttrValueName: inputValue
            }
            row.spuSaleAttrValueList.push(newTag);
          }else{
            this.$message.error('已存在此属性');
          }
        }else{
          this.$message({
          message: '内容为空',
          type: 'warning'
        });
        }

        this.inputValue = '';
      },
      //提交Sku 新增|修改
    async submitSku(){
      this.spu.category3Id = this.formValue.category3Id
      let imgList = []
      this.spuImageList.map(item=>{
        let imgageList = {
          "imgName": item.name,
          "imgUrl": (item.response&&item.response.data)||item.url,
        }
        imgList.push(imgageList)
      })
      this.spu.spuImageList = imgList
      let result = await this.$API.sku.reqAddUpdateInfo(this.spu)
      if (result.code = 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }else{
        this.$message.error(result.message)
      }
      this.getSpuList()
      this.isShow = 0
    },
    //图片上传之前会执行方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type ==="image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 删除Sku
    async deleteSpu(row){
      console.log(row);
      let result = await this.$API.sku.reqDeleteSpu(row.id)
      if (result.code ==200) {
        this.page =1
        this.getSpuList()
      }else{
        this.$message.error(result.message)
      }
    },
    // 操作列 添加Sku按钮
    async addSku(row){
      this.skuInfo={
        "category3Id": undefined,
        "isSale": undefined,
        "price": undefined,
        "skuAttrValueList": [],
        "skuDefaultImg": "",
        "skuDesc": "",
        "skuImageList": [],
        "skuName": "",
        "skuSaleAttrValueList": [],
        "spuId": undefined,
        "tmId": undefined,
        "weight": ""//重量
      }
      Object.assign(this.skuInfo,row)
      // 获取spu img数据
      let result = await this.$API.sku.reqSpuImageList(row.id)
      if (result.code == 200) {
        this.skuImageList =result.data
      }
      //获取 销售属性的数据
      let result1 = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (result1.code ==200) {
        this.skuSaleAttrList = result1.data
      }
      // 获取平台 属性值的数据
      const {category1Id,category2Id,category3Id} = this.formValue
      let result2 = await this.$API.sku.reqAttrInfoList(category1Id,category2Id,category3Id)
      if (result2.code== 200) {
        this.skuAttrInfoList =result2.data
      }
      this.$nextTick(()=>{
        this.isShow = 2
      })
      
    },
    // 设为默认 按钮
    isDefault(row){
      console.log(row);
      if (row.isDefault == 1) {
        this.$set(row,'isDefault',0)
        this.$refs.selection.toggleRowSelection(row,false)
      }else{
        this.$set(row,'isDefault',1)
        this.$refs.selection.toggleRowSelection(row,true)
      }
    },
    // table 选择框禁用
    selection(row){
      return false
    },
    // 保存按钮事件
    async submitSku(){
      //skuAttrValueList,skuSaleAttrValueList
      //平台属性
      this.skuAttrInfoList.forEach(item=>{
        if (item.attrIdAndValueId) {
          let attrId=item.attrIdAndValueId.attrId
          let valueId=item.attrIdAndValueId.id
          this.skuInfo.skuAttrValueList.push({attrId,valueId})
        }
      })
      // 销售属性
      this.skuSaleAttrList.forEach(item=>{
        if (item.attrIdAndValueId) {
          let saleAttrId=item.attrIdAndValueId.baseSaleAttrId
          let saleAttrValueId=item.attrIdAndValueId.id
          this.skuInfo.skuSaleAttrValueList.push({saleAttrId,saleAttrValueId})
        }
      })
      // 图片
      this.skuInfo.skuImageList = this.skuImageList.map(item=>{
        return {
          imgName :item.imgName,
          imgUrl :item.imgUrl,
          isDefault :item.isDefault,
          skuId :item.spuId,
          spuImgId :item.id,
        }
      })
      //提交
      let result = await this.$API.sku.reqAddSku(this.skuInfo)
      if (result.code == 200) {
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.isShow =0
      }else{
        this.$message.error(result.message)
      }
      
    },
    // 查看sku数据列表
    async seeSku(row){
      this.loading = true
      
      this.dialogTableVisible = true
      this.tcTitle= row.spuName
      let result= await this.$API.sku.reqSkuList(row.id)
      if (result.code == 200) {
        this.gridData = result.data
      }
      console.log(this.gridData);
      this.loading = false
    }
  },
};
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>