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
          @click="handleAddPro"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="项目编号" align="center" prop="tp_projectCode">
        <template slot-scope="scope">
          <router-link :to="'/tender/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.tp_projectCode }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center" prop="tp_projectName"/>
      <el-table-column label="招标单位" align="center" prop="tp_tCompany"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-collection-tag"
            @click="handleAdd(scope.row)"
          >开设班级</el-button>
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
    <el-dialog title="开设班级" :visible.sync="open" width="600px" append-to-body  :before-close="handleClose">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-s-marketing"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 1">
        <el-row>
          <el-col :span="12">
            <el-form-item label="班级编号" prop="BClass_code">
              <el-input v-model="form.BClass_code" placeholder="请输入班级编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人社局编号" prop="BR_code">
              <el-input v-model="form.BR_code" placeholder="请输入人社局编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="班级名称" prop="BClass_name">
          <el-input v-model="form.BClass_name" placeholder="请输入班级"/>
        </el-form-item>
        <el-form-item label="开班地" prop="BClass_address">
          <el-input v-model="form.BClass_address" placeholder="请输入开班地" />
        </el-form-item>
        <el-form-item label="开班部门" prop="BDepartment">
          <el-input v-model="form.BDepartment" placeholder="请输入开班部门" />
        </el-form-item>
        <el-form-item label="开课时间" prop="BCEndTime">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" v-model="form.BCStartTime" style="width: 90%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">=></el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="form.BCEndTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="班级性质" prop="BClass_type">
          <el-select v-model="form.BClass_type" placeholder="请选择班级性质">
            <el-option v-for="item in this.BType" :value="item.value" :label="item.name" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="BHead_teacher">
          <el-input v-model="form.BHead_teacher" placeholder="请输入班主任"/>
        </el-form-item>
        <el-form-item label="工种类型" prop="BOt_name">
          <el-input v-model="form.BOt_name" placeholder="请输入工种类型"/>
        </el-form-item>
        <el-form-item label="证书等级" prop="BLev">
          <el-select v-model="form.BLev" placeholder="请选择证书等级">
            <el-option v-for="item in this.level" :value="item.value" :label="item.name" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="讲课老师" prop="BLecturer">
          <el-select v-model="form.BLecturer" filterable placeholder="请输入讲课">
            <el-option v-for="item in this.lecturers" :key="item.id" :value="item.LEid+':'+item.LE_name" :label="item.LEid+item.LE_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="工作人员" prop="BStaff">
          <el-input v-model="form.BStaff" placeholder="请输入工作人员"/>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules"  v-if="active === 2"  label-width="150px">
        <el-form-item label="管理费用" prop="BManagement_fee">
          <el-input v-model="form.BManagement_fee" placeholder="请输入管理费用"/>
        </el-form-item>
        <el-form-item label="食宿标准" prop="BLiving_fee">
          <el-input v-model="form.BLiving_fee" placeholder="请输入食宿标准"/>
        </el-form-item>
        <el-form-item label="政府补贴费用" prop="BGov_fee">
          <el-input v-model="form.BGov_fee" placeholder="请输入政府补贴费用"/>
        </el-form-item>
        <el-form-item label="提成标准" prop="BCommission">
          <el-input v-model="form.BCommission" placeholder="请输入提成标准"/>
        </el-form-item>
        <el-form-item label="课酬标准" prop="BClass_pay">
          <el-input v-model="form.BClass_pay" placeholder="请输入课酬标准"/>
        </el-form-item>
        <el-form-item label="课时标准" prop="BClass_hour">
          <el-input v-model="form.BClass_hour" placeholder="请输入课时标准"/>
        </el-form-item>
        <el-form-item label="招生提成标准" prop="BAdmissions_commission">
          <el-input v-model="form.BAdmissions_commission" placeholder="请输入招生提成标准"/>
        </el-form-item>
        <el-form-item label="合办单位" prop="BCo_organizer">
          <el-input v-model="form.BCo_organizer" placeholder="请输入合办单位"/>
        </el-form-item>
        <el-form-item label="合办单位分成标准" prop="Bco_organizer_commission">
          <el-input v-model="form.Bco_organizer_commission" placeholder="请输入合办单位分成标准"/>
        </el-form-item>
        <el-form-item label="是否已申请政府补贴" prop="Bis_fee_applied">
          <el-select placeholder="请选择" v-model="form.Bis_fee_applied">
            <el-option v-for="item in isNot" :value="item.value" :label="item.name" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="费用是否到账" prop="Bis_closed">
          <el-select placeholder="请选择" v-model="form.Bis_closed">
            <el-option v-for="item in isNot" :value="item.value" :label="item.name" :key="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="active===2">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-top: 12px;" @click="up" v-if="active > 1">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next" v-if="active < 2">下一步</el-button>
      </div>
    </el-dialog>

    <el-dialog  title="新增中标项目" :visible.sync="ProOpen" width="800px" append-to-body :before-close="handleClose">
      <el-form ref="Proform" :model="Proform" :rules="ProRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号" prop="tp_projectCode" label-width="80px">
              <el-input v-model="Proform.tp_projectCode" placeholder="请输入项目编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="tp_projectName" label-width="80px">
              <el-input v-model="Proform.tp_projectName" placeholder="请输入项目名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="招标单位" prop="tp_tenderCompany" label-width="80px">
              <el-select v-model="Proform.tp_tenderCompany" placeholder="请选择招标单位">
                <el-option v-for="item in this.tenderCompany" :label="item.name" :value="item.id" :key="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中标单位" prop="tp_tCompany" label-width="80px">
              <el-input v-model="Proform.tp_tCompany" placeholder="请输入中标单位"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中标金额" prop="tp_tenderAmount" label-width="80px">
              <el-input v-model="Proform.tp_tenderAmount" placeholder="请输入中标金额"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门" prop="tp_part" label-width="50px">
              <el-input v-model="Proform.tp_part" placeholder="请输入部门"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="tp_tPerson" label-width="70px">
              <el-input v-model="Proform.tp_tPerson" placeholder="请输入负责人"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人电话" prop="tp_tPPhone" label-width="95px">
              <el-input v-model="Proform.tp_tPPhone" placeholder="请输入负责人电话"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位联系电话" prop="tp_tCPhone" label-width="110px">
              <el-input v-model="Proform.tp_tCPhone" placeholder="请输入联系电话" max-length="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="单位联系地址" prop="tp_address" label-width="110px">
              <el-input v-model="Proform.tp_address" placeholder="请输入联系地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所开班级" prop="tp_tenderClass" label-width="80px">
              <el-input v-model="Proform.tp_tenderClass" placeholder="请输入所开班级"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ProSubmit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listLecturers} from "../../../api/studentsInfo/lecturers";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
import {addBanJi, deleteBanJi, getBanJi, listBanJi} from "../../../api/studentsInfo/banji";
import {getBanFile} from "../../../api/studentsInfo/banFile";
import {
  addTenderProject,
  deleteTenderProject,
  getTenderProject,
  listTenderProject
} from "../../../api/tenderproject/tenderProject";

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
      ProOpen: false,
      //传来的数据
      dataList: [],
      //
      find: '',
      form: {},
      Proform: {},
      active: 1,
      //预览路径
      dialogImageUrl: '',
      //是否禁用
      BClass_photo: false,
      //查询参数
      query:[
        {name:'项目编号',id: 'tp_projectCode'},
        {name:'讲师姓名',id: 'tp_projectName'},
      ],
      rules: {
        BClass_code:[
          {required: true, message: "班级编号不能为空", trigger: "blur"}
        ],
        BCEndTime: [
          {required: true, message: "结束时间不能为空", trigger: "blur"}
        ],
        BClass_name: [
          {required: true, message: "班级名称不能为空", trigger: "blur"}
        ],
        BClass_address: [
          {required: true, message: "开班地不能为空", trigger: "blur"}
        ],
        BDepartment: [
          {required: true, message: "电话不能为空", trigger: "blur"}
        ],
        BHead_teacher: [
          {required: true, message: "班主任不能为空", trigger: "blur"}
        ],
        BClass_type: [
          {required: true, message: "班级性质不能为空", trigger: "blur"}
        ],
        BCStartTime: [
          {required: true, message: "开课时间不能为空", trigger: "blur"}
        ],
        BLecturer: [
          {required: true, message: "讲课老师不能为空", trigger: "blur"}
        ],
        BStaff: [
          {required: true, message: "工作人员不能为空", trigger: "blur"}
        ],
        BLiving_fee:[
          {required: true, message: "食宿标准不能为空", trigger: "blur"}
        ],
        BGov_fee:[
          {required: true, message: "政府补贴费用不能为空", trigger: "blur"}
        ],
        BCommission:[
          {required: true, message: "提成标准不能为空", trigger: "blur"}
        ],
        BClass_pay:[
          {required: true, message: "课酬标准不能为空", trigger: "blur"}
        ],
        BClass_hour:[
          {required: true, message: "课时标准不能为空", trigger: "blur"}
        ],
        BAdmissions_commission:[
          {required: true, message: "招生提成不能为空", trigger: "blur"}
        ],
        Bco_organizer:[
          {required: true, message: "合办单位不能为空", trigger: "blur"}
        ],
        Bco_organizer_commission:[
          {required: true, message: "合办单位分成不能为空", trigger: "blur"}
        ],
        Bis_fee_applied:[
          {required: true, message: "是否已申请政府补贴不能为空", trigger: "blur"}
        ],
        BManagement_fee:[
          {required: true, message: "管理费用不能为空", trigger: "blur"}
        ],
        Bis_closed:[
          {required: true, message: "费用是否到账不能为空", trigger: "blur"}
        ],
        BLev: [
          {required: true, message: "证书等级不能为空", trigger: "blur"}
        ],
        BOt_name: [
          {required: true, message: "工种类型不能为空", trigger: "blur"}
        ],
        BR_code: [
          {required: true, message: "人社局编号 不能为空", trigger: "blur"}
        ]
      },
      ProRules: {
        tp_projectCode:[
          {required: true, message: "项目编号不能为空", trigger: "blur"}
        ],
        tp_projectName:[
          {required: true, message: "项目名称不能为空", trigger: "blur"}
        ],
        tp_tenderCompany:[
          {required: true, message: "招标单位不能为空", trigger: "blur"}
        ],
        tp_tCompany:[
          {required: true, message: "中标单位不能为空", trigger: "blur"}
        ],
        tp_tCPhone:[
          {required: true, message: "单位联系电话不能为空", trigger: "blur"}
        ],
        tp_tPerson:[
          {required: true, message: "负责人不能为空", trigger: "blur"}
        ],
        tp_tPPhone:[
          {required: true, message: "负责人电话不能为空", trigger: "blur"}
        ],
        tp_address:[
          {required: true, message: "单位地址 不能为空", trigger: "blur"}
        ],
        tp_part:[
          {required: true, message: "部门不能为空", trigger: "blur"}
        ],
        tp_tenderAmount:[
          {required: true, message: "中标金额不能为空", trigger: "blur"}
        ],
        tp_tenderClass:[
          {required: true, message: "所开班级不能为空", trigger: "blur"}
        ],
      },
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
      lecturers: {},
      tenderCompany: [
        {name: '人社局',id: 1},
        {name: '公共就业和人才服务中心',id: 2}
      ],
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
      listTenderProject().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        tp_tCompany: undefined,
        tp_projectCode: undefined,
        BCEndTime: undefined,
        tp_projectName: undefined,
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
        BT: undefined,
        B_type: 2,
        BT_tp_projectName: undefined
      };
      this.Proform = {
        id: undefined,
        tp_projectCode: undefined,
        tp_projectName: undefined,
        tp_tenderCompany: undefined,
        tp_tCompany: undefined,
        tp_tCPhone: undefined,
        tp_tPerson: undefined,
        tp_tPPhone: undefined,
        tp_address: undefined,
        tp_part: undefined,
        tp_tenderAmount: undefined,
        tp_tenderClass: undefined,
      };
      this.active = 1;
      this.$refs['form'].resetFields();
      // this.$refs['Proform'].resetFields();
    },
    //查询参数重置
    resetQuery(){
      this.select = '';
      this.find = '';
      this.getList()
    },
    //新增班级
    handleAdd(row){
      this.open = true;
      this.form.BT = row.id
      this.form.BT_tp_projectName = row.tp_projectName
    },
    //新增项目
    handleAddPro(){
      this.ProOpen = true;
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除项目编号为' + row.tp_projectCode + "的项目信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getTenderProject(row.id).then(res =>{
          this.resetFW(res.data)
        }).catch(err=>{
          console.log(err)
        })
        deleteTenderProject(row.id).then(res =>{
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
        this.ProOpen = false;
        this.open = false;
        this.reset()
      }).catch((err) => {
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
            this.Proform = false;
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
    ProSubmit(){
      this.$refs["Proform"].validate(valid => {
        if(valid){
          addTenderProject(this.Proform).then(response => {
            this.$message({
              message: "新增成功",
              type: 'success'
            });
            this.open = false;
            this.ProOpen = false;
            this.getList();
            this.reset();
          }).catch(() =>{
            this.$message({
              message: '该项目编号已存在，请修改后再确定',
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
        this.open = false
        this.Proform = false
        this.reset()
        done()
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
    //
    next(){
      this.$refs["form"].validate(valid =>{
        if(valid){
          this.active ++
        }
      });
    },
    up(){
      this.active --
    },
  }
}
</script>

<style scoped>

</style>
