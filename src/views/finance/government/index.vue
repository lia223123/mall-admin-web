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
      <el-table-column label="费用申请表编号" align="center" prop="cd_code" />
      <el-table-column label="申请人" align="center" prop="cd_name"/>
      <el-table-column label="申请日期" align="center" prop="cd_applicationDate"/>
      <el-table-column label="应申请金额" align="center" prop="cd_amm_count"/>
      <el-table-column label="实际申请金额" align="center" prop="cd_actual_count"/>
      <el-table-column label="发票类型" align="center" prop="cd_invoice_type"/>
      <el-table-column label="发票编号" align="center" prop="cd_invoice_id"/>
      <el-table-column label="发票号" align="center" prop="cd_invoice_code"/>
      <el-table-column label="实到金额" align="center" prop="cd_actual_amount"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-if="hasAuth('costing_list')"
          >查看明细</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-if="hasAuth('costing_delete')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="补贴详情" :visible.sync="open" width="1000px" append-to-body :before-close="handleClose">
      <el-form :model="form" ref="ZFdynamicForm" label-width="100px" class="demo-dynamic">
        <el-row>
          <el-form-item label="费用申请表编号" label-width="110px">
            <el-input v-model="form.cd_code" disabled/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="应申请金额" prop="cd_amm_count">
              <el-input v-model="form.cd_amm_count" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际申请金额" prop="cd_actual_count">
              <el-input v-model="form.cd_actual_count" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人" prop="cd_amm_count">
              <el-input v-model="form.cd_name" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发票类型" prop="cd_invoice_type">
              <el-select v-model="form.cd_invoice_type" placeholder="请选择发票类型" disabled>
                <el-option v-for="item in cdType" :label="item.name" :key="item.value" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="发票编号" prop="cd_invoice_id">
              <el-input v-model="form.cd_invoice_id" placeholder="请输入发票编号" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="发票号" prop="cd_invoice_code">
              <el-input v-model="form.cd_invoice_code" placeholder="请输入发票号" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="selectList" label-width="100px">
        <div v-for="(domain, index) in selectList.detail" :key="domain.id">
          <el-row>
            <el-col :span="8">
              <el-form-item label="班级编码">
                <el-input v-model="domain.de_bjCode" :value="domain.de_bjCode" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级名称">
                <el-input v-model="domain.de_BClass_name" :value="domain.de_BClass_name" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="政府补贴金额">
                <el-input v-model="domain.de_BGov_fee" :value="domain.de_BGov_fee" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {formatSex, formatUserType} from "../../../utils";
import {deleteCostDetail, editCostDetail, listCostDetail} from "../../../api/finance/costDetail";
import {listCostDetailing} from "../../../api/finance/costDetailing";

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
        {name:'申请人',id: 'cd_name'},
        {name:'费用申请编号',id: 'cd_code'},
        {name:'发票类型',id: 'cd_invoice_type'},
        {name:'发票编号',id: 'cd_invoice_id'},
        {name:'发票号',id: 'cd_invoice_code'},
      ],
      ZFBT: {},
      //发票类型
      cdType: [
        {name: '专票',value: 1},
        {name: '普票',value: 2},
      ],
      selectList: {
        detail: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      let o = {}
      if(this.$store.state.user.department === '财务'){
        o = {}
      }else {
        o['cd_name'] = this.$store.state.user.emName
      }
      listCostDetail(o).then(response =>{
        console.log(response)
        this.dataList = response.data.results
        this.loading = false
      }).catch(err=>{
        this.$notify({
          title: '错误',
          message: '没有查询学员单位权限',
          type: 'error'
        });
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        cd_code: undefined,
        cd_name: undefined,
        cd_amm_count: undefined,
        cd_actual_count: undefined,
        cd_applicationDate: undefined,
        cd_invoice_type: undefined,
        cd_invoice_id: undefined,
        cd_invoice_code: undefined,
        cd_actual_amount: undefined,
      };

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
      let o = {
        de: row.id
      }
      this.form = row
      listCostDetailing(o).then(res =>{
        this.selectList.detail = res.data.results;
        this.open = true;
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除费用申请表编号为' + row.cd_code + "的信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteCostDetail(row.id).then(res =>{
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
    // submitForm(){
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //         editCostDetail(this.form).then(response => {
    //           this.$message({
    //             message: "修改成功",
    //             type: 'success'
    //           });
    //           this.open = false;
    //           this.getList();
    //           this.reset();
    //         }).catch(()=> {
    //           this.$message({
    //             message: "费用申请表编号已存在",
    //             type: 'warning'
    //           });
    //         });
    //     }
    //   });
    // },
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
        listCostDetail(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
