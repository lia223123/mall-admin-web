<template>
  <div class="app-container">
    <div style="margin-top: 15px; width: 700px;display: flex">
      <el-input placeholder="请输入查询内容" v-model="find" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 120px">
          <el-option v-for="item in this.query" :label="item.name" :value="item.id" :key="item.id"/>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleFind"></el-button>
      </el-input>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </div>
    <el-row :gutter="10" style="margin-top: 15px">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="公司编号" align="center" prop="Comp_code" />
      <el-table-column label="公司名称" align="center" prop="Comp_name"/>
      <el-table-column label="公司电话" align="center" prop="Comp_tel"/>
      <el-table-column label="公司联系人" align="center" prop="Comp_ty_code"/>
      <el-table-column label="公司地址" align="center" prop="Comp_address"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body  :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="公司编号" prop="Comp_code">
          <el-input v-model="form.Comp_code" placeholder="请输入公司编号" />
        </el-form-item>
        <el-form-item label="公司电话" prop="Comp_tel">
          <el-input v-model="form.Comp_tel" placeholder="请输入公司电话" />
        </el-form-item>
        <el-form-item label="公司名称" prop="Comp_name">
          <el-input v-model="form.Comp_name" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司联系人" prop="Comp_ty_code">
          <el-input v-model="form.Comp_ty_code" placeholder="请输入公司联系人"/>
        </el-form-item>
        <el-form-item label="公司联系地址" prop="Comp_address">
          <el-input v-model="form.Comp_address" placeholder="请输入公司地址"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatSex, formatUserType} from "../../../utils";
import {addComApi, deleteComApi, editComApi, getComApi, listComApi} from "../../../api/companys/comapi";

export default {
  name: "index",
  data(){
    return {
      //遮罩层
      loading: true,
      //选中数组
      ids: [],
      select: '',
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //传来的数据
      dataList: [],
      find: '',
      form: {},
      //查询参数
      query:[
        {name:'公司编号',id: 'Comp_code'},
        {name:'公司名称',id: 'Comp_name'},
        {name:'公司电话',id: 'Comp_tel'},
        {name:'公司联系人',id: 'Comp_ty_code'},
      ],
      rules: {
        Comp_code:[
          {required: true, message: "公司编号不能为空", trigger: "blur"}
        ],
        Comp_tel: [
          {required: true, message: "公司电话不能为空", trigger: "blur"}
        ],
        Comp_name: [
          {required: true, message: "公司名称不能为空", trigger: "blur"}
        ],
        Comp_address: [
          {required: true, message: "公司地址不能为空", trigger: "blur"}
        ],
        Comp_ty_code: [
          {required: true, message: "公司联系人不能为空", trigger: "blur"}
        ],
      }

    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listComApi().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        Comp_code: undefined,
        Comp_name: undefined,
        Comp_ty_code: undefined,
        Comp_address: undefined,
        Comp_tel: undefined,
      };
      this.$refs['form'].resetFields();
    },
    //查询参数重置
    resetQuery(){
      this.select = '';
      this.find = '';
      this.getList()
    },
    //新增数据
    handleAdd(){
      this.open = true;
      this.title = "新增公司";
    },
    //修改数据
    handleUpdate(row){
      getComApi(row.id).then(res =>{
        this.form = res.data;
        this.open = true;
        this.title = '修改公司信息';
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除公司编号为' + row.Comp_code + "的公司信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteComApi(row.id).then(res =>{
          this.$message({
            message: "删除成功",
            type: 'success',
          });
          this.getList();
        });
      }).catch(() =>{
        this.$message({
          message: "已取消删除",
          type: 'warning',
        });
      })
    },
    //取消按钮
    cancel(){
      this.reset()
      this.open = false
    },
    //确定按钮
    submitForm(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            editComApi(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(()=> {
              this.$message({
                message: "公司编号已存在",
                type: 'warning'
              });
            });
          } else {
            addComApi(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(() =>{
              this.$message({
                message: "公司编号已存在",
                type: 'warning'
              });
            })
          }
        }
      });
    },
    //关闭弹窗
    handleClose(done){
      done()
      this.reset()
    },
    //查询
    handleFind(){
      if(this.select === '') {
        this.$message({
          message: '请先选择查询类型',
          type: 'warning'
        })
      }else if(this.find === '') {
        this.$message({
          message: '请输入查询内容',
          type: 'warning'
        })
      }else {
        let json = {}
        json[this.select] = this.find
        listComApi(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //表格数据转换
    _sex(row){
      return formatSex(row.em_sex)
    },
    _userType(row){
      return formatUserType(row.user_type)
    }
  }
}
</script>

<style scoped>

</style>
