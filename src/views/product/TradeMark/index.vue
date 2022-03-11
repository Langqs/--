<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="dialog(1)"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column label="品牌LOGO" width="width">
        <!-- eslint-disable-next-line -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; heigth: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="dialog(2, $index)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
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
    <!-- 对话框
    :visible.sync 控制对话框显示与隐藏
     -->
    <el-dialog
      :title="state == 1 ? '添加品牌' : '修改品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" style="width: 80%" ref="formName">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 头像上传 -->
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "TradeMark",
  data() {
    //自定义表单验证
    var validateLogo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传图片"));
      } else {
        callback();
      }
    };
    return {
      page: 1, //当前页码
      limit: 5, //展示条数
      total: 0, //总数据条数
      list: [], //列表展示
      dialogFormVisible: false, //添加对话框是否显示
      formLabelWidth: "120px",
      form: {
        tmName: "",
        logoUrl: "",
      },
      state: 1, //1添加，2修改
      //表单验证规则
      //  required:必须要校验得字段 message:提示信息 trigger:用户事件的设置
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          { validator: validateLogo, required: true, trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    //获取品牌列表
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMark(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //分页器切换页码
    currentChange(pager) {
      this.page = pager;
      this.getPageList();
    },
    //切换页面显示条数
    sizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //添加,修改品牌按钮
    dialog(state, index) {
      this.$nextTick(() => {
        try {
          //重置表单验证，再次打开时不会提示上次的表单验证提示
          this.$refs.formName.resetFields();
        } catch (error) {}
      });
      this.form = { tmName: "", logoUrl: "" };
      this.state = state;
      this.dialogFormVisible = true;

      //1:添加，2：更新
      if (state == 2) {
        const con = this.list[index];
        this.form.tmName = con.tmName;
        this.form.logoUrl = con.logoUrl;
        this.form.id = con.id;
      }
    },
    //删除按钮
    deleteTradeMark(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //用户点击确定触发
          let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message,
            });
            //如果删除当前页最后一条，页码-1
            this.list.length > 1 ? this.page : (this.page -= 1);
            this.list.length < 1 ? (this.page = 1) : this.page;
            this.getPageList();
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
    //添加或修改品牌 提交
    submitTradeMark() {
      this.$refs.formName.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = {};
          try {
            if (this.state == 1) {
              result = await this.$API.tradeMark.reqAddTradeMark(this.form);
              this.page = 1; //新增后页面回到第一页
            } else {
              result = await this.$API.tradeMark.reqUpdateTradeMark(this.form);
            }
            if (result.code == 200) {
              this.$message({
                message: this.state == 1 ? "添加品牌成功" : "修改品牌成功",
                type: "success",
              });
              this.getPageList();
            }
          } catch (error) {
            // return Promise.reject(new Error(result.data));
          }
        } else {
          this.open3();
          return false;
        }
      });
    },

    //图片上传成功会执行方法
    handleAvatarSuccess(res, file) {
      this.form.logoUrl = URL.createObjectURL(file.raw);
      //  validateField 对单个表单元素验证
      this.$refs.formName.validateField("logoUrl");
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
    open3() {
      this.$message({
        showClose: true,
        message: "表单验证未通过",
        type: "warning",
      });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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