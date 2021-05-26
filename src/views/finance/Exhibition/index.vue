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
      <el-table-column label="部门" align="center" prop="sc_part"/>
      <el-table-column label="班级名" align="center" prop="sc_bName" />
      <el-table-column label="开班时间" align="center" prop="sc_date"/>
      <el-table-column label="耗材费" align="center" prop="sc_hc"/>
      <el-table-column label="教材费" align="center" prop="sc_j"/>
      <el-table-column label="场地费" align="center" prop="sc_c" />
      <el-table-column label="会务费" align="center" prop="sc_hw"/>
      <el-table-column label="鉴定费" align="center" prop="sc_d"/>
      <el-table-column label="接待费" align="center" prop="sc_jd"/>
      <el-table-column label="交通费" align="center" prop="sc_jt"/>
      <el-table-column label="汽车费" align="center" prop="sc_qc"/>
      <el-table-column label="食宿费" align="center" prop="sc_ss"/>
      <el-table-column label="学员生活补贴" align="center" prop="sc_sh"/>
      <el-table-column label="提成费用" align="center" prop="sc_tc"/>
      <el-table-column label="授课费用" align="center" prop="sc_sk"/>
      <el-table-column label="带班费用" align="center" prop="sc_db"/>
      <el-table-column label="加班费用" align="center" prop="sc_jb"/>
      <el-table-column label="出差费用" align="center" prop="sc_cxc"/>
      <el-table-column label="总计费用" align="center" prop="sc_count"/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--      -->
<!--      </el-table-column>-->
    </el-table>

  </div>
</template>

<script>
import {addEmployee, deleteEmployee, editEmployee, getEmployee, listEmployee} from "../../../api/employeeInfo/employee";
import {formatSex, formatUserType} from "../../../utils";
import {listSeCount} from "../../../api/finance/seCount";

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
        {name:'班级名',id: 'sc_bName'},
        {name:'开班时间',id: 'sc_date'},
        {name:'部门',id: 'sc_part'},
      ],
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
        o['sc_part'] = this.$store.state.user.department
      }
      listSeCount(o).then(response =>{
        this.dataList = response.data.results
        this.loading = false
      }).catch(err=>{
        this.$notify({
          title: '错误',
          message: '没有查询财务权限',
          type: 'error'
        });
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        sc_bName: undefined,
        sc_date: undefined,
        sc_hc: undefined,
        sc_part: undefined,
        sc_c: undefined,
        sc_j: undefined,
        sc_hw: undefined,
        username: undefined,
        password: undefined,
      };
      this.$refs['form'].resetFields();
    },
    //查询参数重置
    resetQuery(){
      this.select = '';
      this.find = '';
      this.getList()
    },
    //删除数据
    // handleDelete(row){
    //   this.$confirm('是否删除班级名为' + row.sc_bName + "的员工信息？","警告", {
    //     confirmButtonText: '确定',
    //     cancelButtonText: "取消",
    //     type: 'warning',
    //   }).then(() =>{
    //     deleteEmployee(row.id).then(res =>{
    //       this.$message({
    //         message: "删除成功",
    //         type: 'success',
    //       });
    //       this.getList();
    //     });
    //   }).catch(() =>{
    //     this.$message({
    //       message: "已取消删除",
    //       type: 'warning',
    //     });
    //   })
    // },
    //取消按钮
    cancel(){
      this.reset()
      this.open = false
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
        json['sc_part'] = this.$store.state.user.department
        json[this.select] = this.find
        listSeCount(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
