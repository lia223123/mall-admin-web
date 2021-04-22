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
    <el-table v-loading="loading" :data="dataList" border >
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="班级编号" align="center" prop="BClass_code">
        <template slot-scope="scope">
          <router-link :to="'/banji/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.BClass_code }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
        <el-table-column label="班级名称" align="center" prop="BClass_name"/>
        <el-table-column label="人社局编号" align="center" prop="BR_code"/>
      <el-table-column label="开班地" align="center" prop="BClass_address"/>
      <el-table-column label="部门" align="center" prop="BDepartment"/>
      <el-table-column label="开班时间·" align="center" prop="BCStartTime"/>
      <el-table-column label="开班结束时间" align="center" prop="BCEndTime"/>
      <el-table-column label="班主任" align="center" prop="BHead_teacher"/>
      <el-table-column label="讲师" align="center" prop="BLecturer"/>
      <el-table-column label="工种类型" align="center" prop="BOt_name"/>
      <el-table-column label="证书等级" align="center" prop="BLev" :formatter="_BLev"/>
      <el-table-column label="班级性质" align="center" prop="BClass_type" :formatter="_BClass_type"/>
      <el-table-column label="是否申请费用" align="center" prop="Bis_fee_applied" :formatter="_Bis_fee_applied"/>
      <el-table-column label="是否结算" align="center" prop="Bis_closed" :formatter="_Bis_fee_applied"/>
      <el-table-column label="班级状态" align="center" prop="B_type" :formatter="_classStatus"/>
      <el-table-column label="财务操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handledetail(scope.row)"
          >财务详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-collection-tag"
            @click="handleHeSuan(scope.row)"
          >金额核算</el-button>
        </template>
      </el-table-column>
      <el-table-column label="流程操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-flag"
            @click="addClassStatus(scope.row)"
            v-if="scope.row.B_type === 1"
          >
            开班
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-flag"
            @click="addClassStatus(scope.row)"
            v-if="scope.row.B_type === 2"
          >
            结束
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addLecturers, deleteLecturers, getLecturers, listLecturers} from "../../../api/studentsInfo/lecturers";
import {banjiType, ClassStatus, formatSex, isNot, level} from "../../../utils";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
import {addBanJi, deleteBanJi, editBanJi, getBanJi, listBanJi} from "../../../api/studentsInfo/banji";
import {getBanFile} from "../../../api/studentsInfo/banFile";

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
      //
      find: '',
      form: {},
      active: 1,
      //预览路径
      dialogImageUrl: '',
      //是否禁用
      BClass_photo: false,
      //查询参数
      query:[
        {name:'班级编号',id: 'BClass_code'},
        {name:'讲师姓名',id: 'BClass_name'},
      ],
      Secret: {},
      BType: [
        {name: "政府补贴班", value: 1},
        {name: '社招班', value: 2}
      ],
      isNot: [
        {name: '是',value: 1},
        {name: '否',value: 2}
      ],
      level: [
        {name: '无（合格证）', value: '1'},
        {name: '专项能力证', value: '2'},
        {name: '初级', value: '3'},
        {name: '中级', value: '4'},
        {name: '高级', value: '5'},
        {name: '技师', value: '6'},
        {name: '高级技师', value: '7'},
      ],
      //需要的参数
      lecturers: {}
    }
  },
  created() {
    this.getList()
    listLecturers().then(res =>{
      this.lecturers = res.data.results
    })
  },
  methods:{
    getList(){
      listBanJi().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        BR_code: undefined,
        BClass_code: undefined,
        BCEndTime: undefined,
        BClass_name: undefined,
        BClass_address: undefined,
        BDepartment: undefined,
        BHead_teacher: undefined,
        BClass_type: undefined,
        BLev: undefined,
        BOt_name: undefined,
        BLecturer: undefined,
        BStaff: undefined,
        BSCount: undefined,
        BManagement_fee: undefined,
        BLiving_fee: undefined,
        BGov_fee: undefined,
        BCommission: undefined,
        BClass_pay: undefined,
        BClass_hour: undefined,
        BAdmissions_commission: undefined,
        BCo_organizer: undefined,
        Bco_organizer_commission: undefined,
        Bis_fee_applied: undefined,
        Bis_closed: undefined,
        BClass_photo: undefined,
        B_type: undefined,
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
      this.title = "新增班级";
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除班级编号为' + row.BClass_code + "的班级信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getBanJi(row.id).then(res =>{
          this.resetFW(res.data)
        }).catch(err=>{
          console.log(err)
        })
        deleteBanJi(row.id).then(res =>{
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
      this.$confirm('此操作将清空之前填写的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetFW(this.form)
        this.reset()
        this.open = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //确定按钮
    submitForm(){
      this.$refs["form"].validate(valid => {
        if(valid){
          addBanJi(this.form).then(response => {
            this.$message({
              message: "新增成功",
              type: 'success'
            });
            this.open = false;
            this.getList();
            this.reset();
          }).catch(() =>{
            this.$message({
              message: '该班级编号已存在，请修改后再确定',
              type: 'warning'
            })
          });
        }
      });
    },
    //关闭弹窗
    handleClose(done){
      this.$confirm('此操作将清空之前填写的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
        this.resetFW(this.form)
        this.reset()
        this.open = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
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
        listLecturers(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //更改状态
    addClassStatus(row){
      if(row.B_type === 1){
        this.$confirm('确定开班编号为' + row.BClass_code + '的班级？', '开班',{
          confirmButtonText: '确定',
          cancelButtonText: '确定',
          type: "warning"
        }).then(()=>{
          this.form = row
          this.form.B_type++
          editBanJi(this.form).then(res=>{
              Message.success({
                message: '班级编号' + this.form.BClass_code + '开班成功',
                showClose: true
              })
            this.reset()
          })
        })
      }else{
        this.$confirm('确定结束编号为' + row.BClass_code + '的班级？', '结束',{
          confirmButtonText: '确定',
          cancelButtonText: '确定',
          type: "warning"
        }).then(()=>{
          this.form = row
          this.form.B_type++
          editBanJi(this.form).then(res=>{
              Message.success({
                message: '班级编号' + this.form.BClass_code + '课程结束',
                showClose: true
              })
            this.reset()
          })
        })
      }

    },
    //表格参数渲染
    _Bis_fee_applied(row){
      return isNot(row.Bis_fee_applied)
    },
    _BClass_type(row){
      return banjiType(row.BClass_type)
    },
    _BLev(row){
      return level(row.BLev)
    },
    _classStatus(row){
      return ClassStatus(row.B_type)
    }
  }
}
</script>

<style scoped>

</style>
