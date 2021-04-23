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
      <el-table-column label="机构编号" align="center" prop="ao_code" />
      <el-table-column label="机构纳税人识别" align="center" prop="ao_ns_code"/>
      <el-table-column label="机构名称" align="center" prop="ao_name"/>
      <el-table-column label="鉴定范围" align="center" prop="ao_fields"/>
      <el-table-column label="鉴定费" align="center" prop="ao_fee"/>
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
        <el-form-item label="机构编号" prop="ao_code">
          <el-input v-model="form.ao_code" placeholder="请输入机构编号" />
        </el-form-item>
        <el-form-item label="机构名称" prop="ao_name">
          <el-input v-model="form.ao_name" placeholder="请输入机构名称" />
        </el-form-item>
        <el-form-item label="机构纳税人识别" prop="ao_ns_code">
          <el-input v-model="form.ao_ns_code" placeholder="请输入机构纳税人识别" />
        </el-form-item>
        <el-form-item label="鉴定范围" prop="ao_fields">
          <el-input v-model="form.ao_fields" placeholder="请输入鉴定范围"/>
        </el-form-item>
        <el-form-item label="鉴定费" prop="ao_fee">
          <el-input v-model="form.ao_fee" placeholder="请输入鉴定费"/>
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
import {addIdentify, deleteIdentify, editIdentify, getIdentify, listIdentify} from "../../../api/companys/identify";

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
        {name:'机构编号',id: 'ao_code'},
        {name:'机构纳税人识别',id: 'ao_ns_code'},
        {name:'机构名称',id: 'ao_name'},
        {name:'鉴定范围',id: 'ao_fields'},
      ],
      rules: {
        ao_code:[
          {required: true, message: "机构编号不能为空", trigger: "blur"}
        ],
        ao_name: [
          {required: true, message: "机构名称不能为空", trigger: "blur"}
        ],
        ao_ns_code: [
          {required: true, message: "机构纳税人识别不能为空", trigger: "blur"}
        ],
        ao_fee: [
          {required: true, message: "鉴定费不能为空", trigger: "blur"}
        ],
        ao_fields: [
          {required: true, message: "鉴定范围不能为空", trigger: "blur"}
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listIdentify().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        ao_code: undefined,
        ao_ns_code: undefined,
        ao_fields: undefined,
        ao_fee: undefined,
        ao_name: undefined,
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
      getIdentify(row.id).then(res =>{
        this.form = res.data;
        this.open = true;
        this.title = '修改人社局信息';
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除机构编号为' + row.ao_code + "的人社局信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteIdentify(row.id).then(res =>{
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
            editIdentify(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(()=> {
              this.$message({
                message: "机构编号已存在",
                type: 'warning'
              });
            });
          } else {
            addIdentify(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(() =>{
              this.$message({
                message: "机构编号已存在",
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
        listIdentify(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
