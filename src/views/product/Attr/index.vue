<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <CategorySelect
        @getCategory="getCategory"
        :isShow="!isShow"
      ></CategorySelect>
    </el-card>
    <el-card class="box-card" style="margin: 10px 0px">
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!formValue.category3Id"
          @click="addUpdeteAttr(1)"
          >添加属性</el-button
        >
        <!-- 表格 -->
        <el-table :data="list" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" label="序号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="200">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
              <!-- eslint-disable-next-line -->
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin-right: 10px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
              <!-- eslint-disable-next-line -->
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="addUpdeteAttr(2, row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改属性 -->
      <div v-show="!isShow">
        <el-form
          :inline="true"
          :rules="rules"
          ref="baseAttrInfo"
          :model="baseAttrInfo"
          label-width="80px"
          style="margin-top: 20px"
        >
          <el-form-item label="属性名" prop="attrName">
            <el-input
              v-model.trim="baseAttrInfo.attrName"
              placeholder="请输入属性名"
              :disabled="addType"
              ref="inputType"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!baseAttrInfo.attrName"
          @click="addAttribute"
          >添加属性值</el-button
        >
        <el-button type="primary" @click="isShow = true">取消</el-button>
        <el-table
          :data="baseAttrInfo.attrValueList"
          style="width: 100%; margin-top: 20px"
          border
        >
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="valueName" label="属性值名称" width="width">
              <!-- eslint-disable-next-line -->
            <template slot-scope="{ row, $index }">
              <el-form
                :model="row"
                ref="row"
                :rules="rules"
                label-width="width"
              >
                <el-form-item prop="valueName">
                  <el-input autocomplete="off"
                    v-model.trim="row.valueName"
                    placeholder="请输入属性名称"
                    :ref="$index"
                  ></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteTradeMark(row, $index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 20px" @click="submitform"
          >保存</el-button
        >
        <el-button type="primary" @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入 lodash 下的cloneDeep 深拷贝
import cloneDeep from "lodash/cloneDeep";
import { Alert } from 'element-ui';
// this.$set(对象名,添加的属性名，添加的属性值) 添加响应式数据
export default {
  name: "Attr",
  data() {
    var validateLogo = (rule, value, callback) => {
        let a= 1
        this.baseAttrInfo.attrValueList.some((item)=>{
            if (item.valueName == value) {
                a+=1
            }
            //会与自己比一次，也就是说 a至少=2
            if (a==3) {
                return callback(new Error("数据重复"));
            }
        })
      if (value.length < 2 || value.length > 8) {
        return callback(new Error("输入无效"));
      } else {
        callback();
      }
    };
    return {
      list: [],
      formValue: {}, //接收到的categoryId
      isShow: true, //table显示状态
      addType: false, //输入属性名 输入框状态
      valueList: [],
      //收集新增|修改属性
      baseAttrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0,
        id: undefined,
      },
      rules: {
        attrName: [
          { required: true, message: "请输入属性名", trigger: "change" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "change",
          },
        ],
        valueName: [
          { validator: validateLogo, required: true, trigger: "change" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    //自定义事件回调
    getCategory(formValue) {
      this.formValue = formValue;
      this.getAttr();
    },
    //获取平台属性
    async getAttr() {
      let result = await this.$API.attr.reqTrademarkList(this.formValue);
      if (result.code == 200) {
        this.list = result.data;
      }
    },
    //添加属性值 按钮
    addAttribute() {
      this.$refs.baseAttrInfo.validate((valid) => {
        if (valid) {
          this.baseAttrInfo.attrValueList.push({
            attrId: this.baseAttrInfo.id,
            valueName: "",
          });
        } else {
          return false;
        }
      });
      this.$nextTick(()=>{
        this.$refs[this.baseAttrInfo.attrValueList.length-1].focus()
      })
    },
    //添加 修改 按钮
    addUpdeteAttr(id, row) {
      this.$nextTick(() => {
          try {
          //重置表单验证，再次打开时不会提示上次的表单验证提示
          this.$refs.baseAttrInfo.resetFields();
          } catch (error) {}
      });
      //重置数据
      this.baseAttrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.formValue.category3Id,
        categoryLevel: 3,
        id: undefined,
      },
        //切换table显示与隐藏
        (this.isShow = false);
      //  1:添加 2:编辑
      if (id == 2) {
        // console.log('编辑属性',row);
        this.addType = true;
        //由于数据结构存在对象里套数组，数组有套对象，因此需要深拷贝解决这类问题
        this.baseAttrInfo = cloneDeep(row);
      } else {
        this.addType = false;
      }
      // 属性名 输入框获得焦点
      this.$nextTick(()=>{
            console.log(this.$refs.inputType,'111');
            this.$refs.inputType.focus()
      })
    },
    //保存按钮
    submitform() {
      this.$nextTick(()=>{
          console.log(this.$refs.row || 'row为undefined');
      })
      try {
        this.$refs.row.validate(async (valid) => {
          if (valid) {
            let result = await this.$API.attr.reqAddAttr(this.baseAttrInfo);
            if (result.code == 200) {
              this.$message({
                type: "success",
                message: result.message,
              });
            } else {
              this.$message({
                type: "error",
                message: result.message,
              });
            }
            this.getAttr();
            this.isShow = true;
          } else {
            return false;
          }
        });
      } catch (error) {
          if (this.$refs.row===undefined) {
              this.$message({type:'error',message:'至少添加一个属性值'})
          }else{
            this.$message({
            type: "error",
            message: error,
            });
          }

      }
    },
    //删除按钮
    deleteAttr(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //用户点击确定触发
          let result = await this.$API.attr.reqDeleteAttr(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message,
            });
            //如果删除当前页最后一条，页码-1
            //   this.list.length>1?this.page:this.page-=1
            //   this.list.length<1?this.page=1:this.page
            this.getAttr();
          } else {
            this.$message({
              type: "info",
              message: result.message,
            });
          }
        })
        .catch(() => {
          //用户点击取消触发
        });
    },
    //添加|修改页 删除按钮
    deleteTradeMark(row, index) {
      this.$confirm(`确认删除:${row.valueName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.baseAttrInfo.attrValueList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          //取消删除
        });
    },
  },
};
</script>
<style lang="">
</style>