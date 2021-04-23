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
      <el-table-column label="证书编号" align="center" prop="tc_id"/>
      <el-table-column label="获证人" align="center" prop="thb_name"/>
      <el-table-column label="证书等级" align="center" prop="tot_level" :formatter="_level"/>
      <el-table-column label="获证时间" align="center" prop="tissue_date"/>
      <el-table-column label="培训班级" align="center" prop="tr_class"/>
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
        <el-form-item label="证书编号" prop="tc_id">
          <el-input v-model="form.tc_id" placeholder="请输入证书编号" />
        </el-form-item>
        <el-form-item label="证书等级" prop="tot_level">
          <el-select v-model="form.tot_level" placeholder="请选择证书等级">
            <el-option v-for="item in this.level" :value="item.value" :label="item.name" :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="获证人" prop="thb_name">
          <el-input v-model="form.thb_name" placeholder="请输入获证人" />
        </el-form-item>
        <el-form-item label="获证时间" prop="tissue_date">
          <el-input type="date" v-model="form.tissue_date" placeholder="请输入获证时间"/>
        </el-form-item>
        <el-form-item label="培训班级" prop="tr_class">
          <el-input v-model="form.tr_class" placeholder="请输入培训班级"/>
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
import {
  addTrainBook,
  deleteTrainBook,
  editTrainBook,
  getTrainBook,
  listTrainBook
} from "../../../api/studentsInfo/trainBook";
import {level} from "../../../utils";

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
        {name:'证书编号',id: 'tc_id'},
        {name:'获证人',id: 'thb_name'},
        {name:'证书等级',id: 'tot_level'},
        {name:'获证时间',id: 'tissue_date'},
      ],
      rules: {
        tc_id:[
          {required: true, message: "证书编号不能为空", trigger: "blur"}
        ],
        tot_level: [
          {required: true, message: "证书等级不能为空", trigger: "blur"}
        ],
        thb_name: [
          {required: true, message: "获证人不能为空", trigger: "blur"}
        ],
        tr_class: [
          {required: true, message: "培训班级不能为空", trigger: "blur"}
        ],
        tissue_date: [
          {required: true, message: "获证时间不能为空", trigger: "blur"}
        ],
      },
    level: [
      {name: '无（合格证）', value: '1'},
      {name: '专项能力证', value: '2'},
      {name: '初级', value: '3'},
      {name: '中级', value: '4'},
      {name: '高级', value: '5'},
      {name: '技师', value: '6'},
      {name: '高级技师', value: '7'},
    ],
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listTrainBook().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        tc_id: undefined,
        thb_name: undefined,
        tissue_date: undefined,
        tr_class: undefined,
        tot_level: undefined,
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
      getTrainBook(row.id).then(res =>{
        this.form = res.data;
        this.form.tot_level = this.form.tot_level.toString()
        this.open = true;
        this.title = '修改人社局信息';
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除证书编号为' + row.tc_id + "的人社局信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteTrainBook(row.id).then(res =>{
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
            editTrainBook(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(()=> {
              this.$message({
                message: "证书编号已存在",
                type: 'warning'
              });
            });
          } else {
            addTrainBook(this.form).then(response => {
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset();
            }).catch(() =>{
              this.$message({
                message: "证书编号已存在",
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
        listTrainBook(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //数据渲染
    _level(row){
      row.tot_level = row.tot_level.toString()
      return level(row.tot_level)
    }
  }
}
</script>

<style scoped>

</style>
