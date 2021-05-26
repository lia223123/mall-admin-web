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
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="文件类型" align="center" prop="file_type" />
      <el-table-column label="文件名" align="center" prop="file_name"/>
      <el-table-column label="上传时间" align="center" prop="file_uptime"/>
      <el-table-column label="操作状态" align="center" prop="file_status" :formatter="_file"/>
      <el-table-column label="上传人" align="center" prop="file_person"/>
      <el-table-column label="文件路径" align="center" prop="file_url"/>
    </el-table>

  </div>
</template>

<script>
import {addIdentify, deleteIdentify, editIdentify, getIdentify, listIdentify} from "../../../api/companys/identify";
import {listFileCompany} from "../../../api/fileConpany/filecompany";
import {listFileManage} from "../../../api/fileManage/filemanage";

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
        {name:'文件类型',id: 'file_type'},
        {name:'文件名',id: 'file_name'},
        {name:'上传时间',id: 'file_uptime'},
        {name:'操作状态',id: 'file_status'},
      ],
      rules: {
        file_type:[
          {required: true, message: "文件类型不能为空", trigger: "blur"}
        ],
        file_uptime: [
          {required: true, message: "上传时间不能为空", trigger: "blur"}
        ],
        file_name: [
          {required: true, message: "文件名不能为空", trigger: "blur"}
        ],
        file_person: [
          {required: true, message: "上传人不能为空", trigger: "blur"}
        ],
        file_status: [
          {required: true, message: "操作状态不能为空", trigger: "blur"}
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listFileManage().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      }).catch(err=>{
        this.$notify({
          title: '错误',
          message: '没有查询文件记录权限',
          type: 'error'
        });
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        file_type: undefined,
        file_name: undefined,
        file_status: undefined,
        file_person: undefined,
        file_uptime: undefined,
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
      this.title = "新增工种鉴定机构";
    },
    //修改数据
    handleUpdate(row){
      this.form = row;
      this.open = true;
      this.title = '修改工种鉴定机构信息';
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除文件类型为' + row.file_type + "的文件信息？","警告", {
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
            }).catch((err)=> {
              console.log(err)
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
                message: "文件类型已存在",
                type: 'warning'
              });
            })
          }
        }
      });
    },
    _file(row){
      if(row.file_status === 1){
        return '上传'
      }else if(row.file_status === 2){
        return '下载'
      }else return '删除'
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
