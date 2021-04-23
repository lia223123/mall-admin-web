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
      <el-table-column label="人社局编号" align="center" prop="RenSheJu_code" />
      <el-table-column label="人社局名称" align="center" prop="RenSheJu_name"/>
      <el-table-column label="电话号码" align="center" prop="RenSheJu_tel"/>
      <el-table-column label="人社局统一代码" align="center" prop="RenSheJu_ty_code"/>
      <el-table-column label="地址" align="center" prop="RenSheJu_address"/>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="人社局编号" prop="RenSheJu_code">
          <el-input v-model="form.RenSheJu_code" placeholder="请输入人社局编号" />
        </el-form-item>
        <el-form-item label="电话号码" prop="RenSheJu_tel">
          <el-input v-model="form.RenSheJu_tel" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="人社局名称" prop="RenSheJu_name">
          <el-input v-model="form.RenSheJu_name" placeholder="请输入人社局名称" />
        </el-form-item>
        <el-form-item label="人社局统一代码" prop="RenSheJu_ty_code">
          <el-input v-model="form.RenSheJu_ty_code" placeholder="请输入人社局统一代码"/>
        </el-form-item>
        <el-form-item label="地址" prop="RenSheJu_address">
          <el-input v-model="form.RenSheJu_address" placeholder="请输入地址"/>
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
import {addRsjInfo, deleteRsjInfo, editRsjInfo, getRsjInfo, listRsjInfo} from "../../../api/companys/rsjInfo";

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
        {name:'人社局编号',id: 'RenSheJu_code'},
        {name:'人社局名称',id: 'RenSheJu_name'},
        {name:'电话号码',id: 'RenSheJu_tel'},
        {name:'人社局统一代码',id: 'RenSheJu_ty_code'},
      ],
      rules: {
        RenSheJu_code:[
          {required: true, message: "人社局编号不能为空", trigger: "blur"}
        ],
        RenSheJu_tel: [
          {required: true, message: "电话号码不能为空", trigger: "blur"}
        ],
        RenSheJu_name: [
          {required: true, message: "人社局名称不能为空", trigger: "blur"}
        ],
        RenSheJu_address: [
          {required: true, message: "地址不能为空", trigger: "blur"}
        ],
        RenSheJu_ty_code: [
          {required: true, message: "人社局统一代码不能为空", trigger: "blur"}
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listRsjInfo().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        RenSheJu_code: undefined,
        RenSheJu_name: undefined,
        RenSheJu_ty_code: undefined,
        RenSheJu_address: undefined,
        RenSheJu_tel: undefined,
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
      this.title = "新增人社局";
    },
    //修改数据
    handleUpdate(row){
      getRsjInfo(row.id).then(res =>{
        this.form = res.data;
        this.open = true;
        this.title = '修改人社局信息';
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除人社局编号为' + row.RenSheJu_code + "的人社局信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteRsjInfo(row.id).then(res =>{
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
          if (this.form.id !== undefined) {
            editRsjInfo(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(()=> {
              this.$message({
                message: "人社局编号已存在",
                type: 'warning'
              });
            });
          } else {
            addRsjInfo(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(() =>{
              this.$message({
                message: "人社局编号已存在",
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
        listRsjInfo(json).then(res =>{
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
