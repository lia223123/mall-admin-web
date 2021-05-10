<template>
  <div class="app-container">
    <div style="margin: 15px 0; width: 700px;display: flex">
      <el-input placeholder="请输入查询内容" v-model="find" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 120px">
          <el-option v-for="item in this.query" :label="item.name" :value="item.id" :key="item.id"/>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleFind"></el-button>
      </el-input>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      <el-button icon="el-icon-export" size="mini" @click="stuInfo_export" type="primary">学员信息模板导出</el-button>
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
<!--        <el-table-column label="人社局编号" align="center" prop="BR_code"/>-->
      <el-table-column label="开班地" align="center" prop="BClass_address"/>
      <el-table-column label="部门" align="center" prop="BDepartment"/>
<!--      <el-table-column label="开班时间·" align="center" prop="BCStartTime"/>-->
<!--      <el-table-column label="开班结束时间" align="center" prop="BCEndTime"/>-->
      <el-table-column label="班主任" align="center" prop="BHead_teacher"/>
<!--      <el-table-column label="讲师" align="center" prop="BLecturer"/>-->
      <el-table-column label="工种类型" align="center" prop="BOt_name"/>
<!--      <el-table-column label="证书等级" align="center" prop="BLev" :formatter="_BLev"/>-->
      <el-table-column label="班级性质" align="center" prop="BClass_type" :formatter="_BClass_type"/>
      <el-table-column label="是否申请费用" align="center" prop="Bis_fee_applied" :formatter="_Bis_fee_applied"/>
      <el-table-column label="是否结算" align="center" prop="Bis_closed" :formatter="_Bis_fee_applied"/>
      <el-table-column label="班级状态" align="center" prop="B_type" :formatter="_classStatus" />
      <el-table-column label="学员导入导出" align="center" width="140px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="buttonClick(scope.row)"
          >学员信息导入</el-button><br>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet">学员信息导出</el-button>
        </template>
      </el-table-column>
      <el-table-column label="财务登记">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handleDJ(scope.row)"
          >基本费用登记
          </el-button><br>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handleYHDJ(scope.row)"
          >员工费用登记
          </el-button><br>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handleJSDJ(scope.row)"
          >教师费用登记
          </el-button><br>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handleKBDJ(scope.row)"
          >开班费用登记
          </el-button><br>

        </template>
      </el-table-column>
      <el-table-column label="财务查看" align="center" class-name="small-padding fixed-width" width="140px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handledetail(scope.row)"
          >班级财务报表查看</el-button><br>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-collection-tag"-->
          <!--            @click="handleHeSuan(scope.row)"-->
          <!--          >招生明细</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-wallet"
            @click="handleDR(scope.row)"
          >财务费用确认
          </el-button>
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
          </el-button><br>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--学院导入-->
    <el-dialog title="学员导入" :visible.sync="ImOpen" width="1600px" append-to-body :before-close="handleClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="json"
        accept=".xls,.xlsx"
        :on-change="stuInfo_import"
        :show-file-list="false"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="importDB">导入数据库</el-button>
        <div slot="tip" class="el-upload__tip">请检查下列表格是否正确，如果正确请点击导入数据库</div>
      </el-upload>
      <el-table :data="importInfo" border width="800px" height="700px">
        <el-table-column label="学生姓名" align="center" prop="STU_name"/>
        <el-table-column label="身份证号" align="center" prop="STU_sf_id"/>
        <el-table-column label="学员类型" align="center" prop="STU_personnel_category"/>
        <el-table-column label="性别" align="center" prop="STU_gender"/>
        <el-table-column label="所属民族" align="center" prop="STU_nation"/>
        <el-table-column label="所属单位" align="center" prop="STU_employer"/>
        <el-table-column label="文化程度" align="center" prop="STU_education"/>
        <el-table-column label="政治面貌" align="center" prop="STU_political_affiliation"/>
        <el-table-column label="现居地址" align="center" prop="STU_current_address"/>
        <el-table-column label="户籍详细地址" align="center" prop="STU_detail_address"/>
        <el-table-column label="手机号码" align="center" prop="STU_phone"/>
        <el-table-column label="就业状态" align="center" prop="STU_employment_status"/>
        <el-table-column label="是否属于扶贫建档立卡户" align="center" prop="STU_filed_account"/>
        <el-table-column label="年龄" align="center" prop="STU_age"/>
        <el-table-column label="专业" align="center" prop="STU_major"/>
        <el-table-column label="保险类型" align="center" prop="STU_insureType"/>
        <el-table-column label="健康状态" align="center" prop="STU_health_status"/>
        <el-table-column label="招生老师姓名" align="center" prop="AD_name"/>
        <el-table-column label="招生老师身份证号" align="center" prop="AD_cid"/>
      </el-table>
    </el-dialog>
<!--财务详情-->
    <el-dialog title="班级财务详情" :visible.sync="CwOpen" width="1000px" append-to-body :before-close="handleClose">

    </el-dialog>
    <el-dialog title="基本费用登记" :visible.sync="FYOpen" width="600px" append-to-body :before-close="handleClose">
        <el-form :model="CWform" ref="JBdynamicForm" label-width="60px" class="demo-dynamic">
          <el-form-item prop="type" label="费用行" v-for="(domain, index) in CWform.detail" :key="domain.key" >
            <el-row>
              <el-col :span="8">
                <el-select v-model="domain.se_types" placeholder="请先选择费用类型">
                  <el-option v-for="item in CWinfo" :key="item.value" :label="item.name" :value="item.value"/>
                </el-select>
              </el-col>
              <el-col :span="10">
                <el-input v-model="domain.se_pay" placeholder="请输入金额" type="number"/>
              </el-col>
              <el-col :span="4">
                <el-button @click.prevent="removeDomain(domain)" type="danger">删除</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="CwSubmit">提交</el-button>
            <el-button @click="addDomain">新增费用行</el-button>
            <el-button @click="resetForm" type="warning">重置</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog title="员工费用登记" :visible.sync="YHOpen" width="1000px" append-to-body :before-close="handleClose">
        <el-form :model="YHform" ref="YGdynamicForm" label-width="60px" class="demo-dynamic">
          <div v-for="(domain, index) in YHform.detail" :key="domain.key">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名">
                  <el-input placeholder="请输入姓名" v-model="domain.em_name"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话">
                  <el-input placeholder="请输入电话" v-model="domain.em_phone" max-length="11"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证">
                  <el-input placeholder="请输入身份证" v-model="domain.em_cid"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="带班费用" label-width="80px">
                  <el-input type="number" placeholder="请输入带班费用" v-model="domain.em_dbCost"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="出差补贴" label-width="80px">
                  <el-input type="number" placeholder="请输入出差补贴" v-model="domain.em_cxCost"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="加班费用" label-width="80px">
                  <el-input type="number" placeholder="请输入加班费用" v-model="domain.em_jbCost"/>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-button @click.prevent="removeYHDomain(domain)" type="danger">删除</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="开户银行" label-width="80px">
                  <el-input placeholder="请输入开户行" v-model="domain.em_bank"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡号" label-width="80px">
                  <el-input placeholder="请输入银行卡号" v-model="domain.em_bankCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" label-width="80px">
                  <el-input type="textarea" placeholder="请输入备注" v-model="domain.em_text"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
          <el-form-item>
            <el-button type="primary" @click="CwYHSubmit">提交</el-button>
            <el-button @click="addDomainYH">新增费用行</el-button>
            <el-button @click="resetYHForm" type="warning">重置</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog title="教师费用登记" :visible.sync="JSOpen" width="1000px" append-to-body :before-close="handleClose">
      <el-form :model="JSform" ref="JSdynamicForm" label-width="60px" class="demo-dynamic">
        <div v-for="(domain, index) in JSform.detail" :key="domain.key">
          <el-row>
            <el-col :span="5">
              <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="domain.te_name"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input placeholder="请输入电话" v-model="domain.te_phone" max-length="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input placeholder="请输入身份证" v-model="domain.te_cid"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开户银行" label-width="80px">
                <el-input placeholder="请输入开户行" v-model="domain.te_bank"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="银行卡号" label-width="80px">
                <el-input placeholder="请输入银行卡号" v-model="domain.te_bankCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" label-width="60px">
                <el-input type="textarea" placeholder="请输入备注" v-model="domain.te_text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="补贴金额" label-width="80px">
                <el-input type="number" placeholder="请输入补贴金额" v-model="domain.te_pay"/>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-button @click.prevent="removeJSDomain(domain)" type="danger" style="float: right">删除</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
        <el-form-item>
          <el-button type="primary" @click="CwJSSubmit">提交</el-button>
          <el-button @click="addDomainJS">新增费用行</el-button>
          <el-button @click="resetJSForm" type="warning">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="开班费用登记" :visible.sync="KBOpen" width="1000px" append-to-body :before-close="handleClose">
      <el-form :model="KBform" ref="JSdynamicForm" label-width="60px" class="demo-dynamic">
        <div v-for="(domain, index) in KBform.detail" :key="domain.key">
          <el-row>
            <el-col :span="5">
              <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="domain.ad_name"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input placeholder="请输入电话" v-model="domain.ad_phone" max-length="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input placeholder="请输入身份证" v-model="domain.ad_cid"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开户银行" label-width="80px">
                <el-input placeholder="请输入开户行" v-model="domain.ad_bank"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="银行卡号" label-width="80px">
                <el-input placeholder="请输入银行卡号" v-model="domain.ad_bankCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" label-width="60px">
                <el-input type="textarea" placeholder="请输入备注" v-model="domain.ad_text"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="招生人数" label-width="80px">
                <el-input type="number" placeholder="请输入补贴金额" v-model="domain.ad_count"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="补贴金额" label-width="80px">
                <el-input type="number" placeholder="请输入补贴金额" v-model="domain.ad_pay"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-button @click.prevent="removeKBDomain(domain)" type="danger" style="float: right">删除</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
        <el-form-item>
          <el-button type="primary" @click="CwKBSubmit">提交</el-button>
          <el-button @click="addDomainKB">新增费用行</el-button>
          <el-button @click="resetKBForm" type="warning">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {
  ArrayCompare,
  banjiType,
  ClassStatus, FformatSex, FInsureType, FisNot,
  formatSex,
  Fstu_educations, Fstu_personnel,
  isNot,
  level,
  readFile,
  stuCharacter
} from "../../../utils";
import {Message} from "element-ui";
import {addBanJi, deleteBanJi, editBanJi, getBanJi, listBanJi} from "../../../api/studentsInfo/banji";
import xlsx from "xlsx";
import {listLecturers} from "../../../api/studentsInfo/lecturers";
import {addStudent} from "../../../api/studentsInfo/student";
import {addSettleAccounts} from "../../../api/finance/settleAccounts";
import {addEmDetails} from "../../../api/finance/emDetails";
import {addSubsidyPayment, editSubsidyPayment} from "../../../api/finance/subsidyPayment";
import {addPayDetails} from "../../../api/finance/payDetails";
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
      CWinfo: [
        {name: '耗材费',value: 1},
        {name: '教材费',value: 2},
        {name: '场地费',value: 3},
        {name: '会务费',value: 4},
        {name: '鉴定费',value: 5},
        {name: '接待费',value: 6},
        {name: '交通费',value: 7},
        {name: '汽车费',value: 8},
        {name: '食宿费',value: 9},
        {name: '学员生活补贴',value: 10},
        // {name: '提成费用',value: 11},
        // {name: '授课费用',value: 12},
        // {name: '带班费用',value: 13},
        // {name: '加班费用',value: 14},
        // {name: '出差补贴',value: 15},
      ],
      //需要的参数
      lecturers: {},
      importInfo: [],
      FYInfo: {},
      ImOpen: false,
      CwOpen: false,
      FYOpen: false,
      YHOpen: false,
      JSOpen: false,
      KBOpen: false,
      banji_id : '',
      CWform: {
        detail: [
          {se_types: '', se_pay: 0, key: Date.now(), se_bj: ''}
        ]
      },
      YHform: {
        detail: [
          {em_name: '',em_dbCost: 0, em_jbCost: 0, em_cxCost: 0, em_cid: '', em_phone: '', em_bank:'', em_bankCode: '', em_pay: 0, em_text: '', em_s: '',  key: Date.now()}
        ]
      },
      JSform: {
        detail: [
          {te_name: '', te_cid: '', te_phone: '', te_bank: '', te_bankCode: '', te_pay: 0, te_text: '', key:Date.now(), te_s: ''}
        ]
      },
      KBform: {
        detail: [
          {ad_name: '', ad_count: 0, ad_cid: '', ad_phone: '', ad_bank: '', ad_bankCode: '', ad_pay: 0, ad_text: '', ad_s: '', key: Date.now()}
        ]
      }

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
        this.reset()
        this.$refs.upload.clearFiles()
        this.importInfo = []
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
          cancelButtonText: '取消',
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
    },
    //模板导出
    stuInfo_export(){
      this.$confirm('确定下载学员信息模板？', '模板下载', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(()=>{
        let arr = [
          {
            '学员姓名': null,
            '身份证号': null,
            '学员类型': null,
            '性别': null,
            '所属民族': null,
            '归属单位': null,
            '文化程度': null,
            '政治面貌': null,
            '现居地址': null,
            '户籍详细地址': null,
            '手机号码': null,
            '就业状态': null,
            '是否属于扶贫建档立卡户': null,
            '年龄': null,
            '专业': null,
            '保险类型': null,
            '健康状态': null,
            '招生老师姓名': null,
            '招生老师身份证号': null,
          }
        ]
        let sheet = xlsx.utils.json_to_sheet(arr),
          book = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book, sheet, "sheet1");
        xlsx.writeFile(book,`学生信息模板.xls`);
      })
    },
    //导入
    buttonClick(row){
      this.banji_id = row.id
      this.ImOpen = true
    },
    //采集excel的数据
    async stuInfo_import(ev) {
      let file = ev.raw
      if (!file) return;
      //判断excel的标题
      let A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S']
      let NewArr = []
      //判断字段
      let OldArr = [
        '学员姓名',
        '身份证号',
        '学员类型',
        '性别',
        '所属民族',
        '归属单位',
        '文化程度',
        '政治面貌',
        '现居地址',
        '户籍详细地址',
        '手机号码',
        '就业状态',
        '是否属于扶贫建档立卡户',
        '年龄',
        '专业',
        '保险类型',
        '健康状态',
        '招生老师姓名',
        '招生老师身份证号',
      ]
      //读取file的数据
      let data = await readFile(file);
      let workbook = xlsx.read(data, {type: "binary"}),
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
      A.forEach(item => {
        NewArr.push(worksheet[item + '1'].v)
      })
      if (ArrayCompare(NewArr, OldArr)) {
        data = xlsx.utils.sheet_to_json(worksheet)
        //转换字段
        let arr = [];
        data.forEach(item => {
          let obj = {};
          for (let key in stuCharacter) {
            if (!stuCharacter.hasOwnProperty(key)) break;
            let v = stuCharacter[key],
              text = v.text,
              type = v.type;
            v = item[text] || '';
            type = "string" ? v = String(v) : null;
            obj[key] = v
          }
          obj.STUBJ = this.banji_id
          arr.push(obj);
        });
        this.importInfo = arr
      } else {
        Message.warning({
          message: '请上传系统下载的模板',
          showClose: true
        })
      }
    },
    importDB(){
      if(this.importInfo.length > 0){
        const loading = this.$loading({
          lock: true,
          text: '系统正在努力上传',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.importInfo.forEach(item =>{
          item.STU_education = Fstu_educations(item.STU_education)
          item.STU_insureType = FInsureType(item.STU_insureType)
          item.STU_gender = FformatSex(item.STU_gender)
          item.STU_personnel_category = Fstu_personnel(item.STU_personnel_category)
          item.STU_filed_account = FisNot(item.STU_filed_account)
          addStudent(item).then(res=>{
            loading.close()
            Message.success({
              message: '导入成功',
              showClose: true
            })
          }).catch(err=>{
            Message.error({
              message: err,
              showClose: true
            })
            loading.close()
          })
        })
      }else Message.warning({
        message: '请先选择导入文件',
        showClose: true
      })

    },

    //财务模块
    handleDJ(value){
      this.banji_id = value.id
      this.CWform.detail = [
        {
          se_types: '',
          se_pay: 0,
          key: Date.now(),
          se_bj: this.banji_id,
        }
      ]
      this.FYOpen = true
    },
    CwSubmit(){
      this.CWform.detail.forEach(item =>{
        addSettleAccounts(item).then(res =>{
          Message.success({
            message: '财务登记成功',
            showClose: true
          })
          this.FYOpen = false
        }).catch(err=>{
          Message.error({
            message: err,
            showClose: true
          })
        })
      })
    },
    resetForm() {
      this.CWform.detail = [
        {
          se_types: '',
          se_pay: 0,
          key: Date.now(),
          se_bj: this.banji_id,
        }
      ]
    },
    removeDomain(item) {
      let index = this.CWform.detail.indexOf(item)
      if (index !== -1) {
        this.CWform.detail.splice(index, 1)
      }
    },
    addDomain() {
      this.CWform.detail.push({
        se_types: '',
        se_pay: 0,
        key: Date.now(),
        se_bj: this.banji_id,
      });
    },
    //用户费用登记
    handleYHDJ(value){
      this.banji_id = value.id
      this.YHform.detail = [
        {em_name: '',em_dbCost: 0, em_jbCost: 0, em_cxCost: 0, em_cid: '', em_phone: '', em_bank:'', em_bankCode: '', em_pay: 0, em_text: '', em_s: this.banji_id, key:Date.now()}
      ]
      this.YHOpen = true
    },
    addDomainYH(){
      this.YHform.detail.push(
      {em_name: '',em_dbCost: 0, em_jbCost: 0, em_cxCost: 0, em_cid: '', em_phone: '', em_bank:'', em_bankCode: '', em_pay: 0, em_text: '', em_s: this.banji_id, key:Date.now()}
      )
    },
    removeYHDomain(item){
      let index = this.YHform.detail.indexOf(item)
      if (index !== -1) {
        this.YHform.detail.splice(index, 1)
      }
    },
    resetYHForm(){
      this.YHform.detail = [
        {em_name: '',em_dbCost: 0, em_jbCost: 0, em_cxCost: 0, em_cid: '', em_phone: '', em_bank:'', em_bankCode: '', em_pay: 0, em_text: '', em_s: this.banji_id, key:Date.now()}
      ]
    },
    CwYHSubmit(){
      this.YHform.detail.forEach(item =>{
        item.em_pay = parseFloat(item.em_jbCost) + parseFloat(item.em_cxCost) + parseFloat(item.em_dbCost)
        console.log(item)
        addEmDetails(item).then(res=>{
          Message.success({
            message: '员工费用增加成功',
            showClose: true
          })
          this.YHOpen = false
        }).catch(err=>{
          Message.error({
            message: err,
            showClose: true
          })
        })
      })
    },
    //教师费用登记
    handleJSDJ(value){
      this.JSOpen = true
      this.banji_id = value.id
      this.JSform.detail = [
        {te_name: '', te_cid: '', te_phone: '', te_bank: '', te_bankCode: '', te_pay: 0, te_text: '', key:Date.now(), te_s: this.banji_id}
      ]
    },
    addDomainJS(){
      this.JSform.detail.push(
        {te_name: '', te_cid: '', te_phone: '', te_bank: '', te_bankCode: '', te_pay: 0, te_text: '', key:Date.now(), te_s: this.banji_id}
      )
    },
    removeJSDomain(item){
      let index = this.JSform.detail.indexOf(item)
      if (index !== -1) {
        this.JSform.detail.splice(index, 1)
      }
    },
    resetJSForm(){
      this.JSform.detail = [
        {te_name: '', te_cid: '', te_phone: '', te_bank: '', te_bankCode: '', te_pay: 0, te_text: '', key:Date.now(), te_s: this.banji_id}
      ]
    },
    CwJSSubmit(){
      this.JSform.detail.forEach(item =>{
        addSubsidyPayment(item).then(res=>{
          Message.success({
            message: '教师费用登记成功',
            showClose: true
          })
          this.JSOpen = false
        }).catch(err=>{
          Message.error({
            message: err,
            showClose: true
          })
        })
      })
    },
    //开班费用补贴
    handleKBDJ(value){
      this.banji_id = value.id
      this.KBform.detail = [
        {ad_name: '', ad_count: 0, ad_cid: '', ad_phone: '', ad_bank: '', ad_bankCode: '', ad_pay: 0, ad_text: '', ad_s: this.banji_id, key: Date.now()}
      ]
      this.KBOpen = true
    },
    addDomainKB(){
      this.KBform.detail.push(
        {ad_name: '', ad_count: 0, ad_cid: '', ad_phone: '', ad_bank: '', ad_bankCode: '', ad_pay: 0, ad_text: '', ad_s: this.banji_id, key: Date.now()}
      )
    },
    removeKBDomain(item){
      let index = this.KBform.detail.indexOf(item)
      if (index !== -1) {
        this.KBform.detail.splice(index, 1)
      }
    },
    resetKBForm(){
      this.KBform.detail = [
        {ad_name: '', ad_count: 0, ad_cid: '', ad_phone: '', ad_bank: '', ad_bankCode: '', ad_pay: 0, ad_text: '', ad_s: this.banji_id, key: Date.now()}
      ]
    },
    CwKBSubmit(){
      this.KBform.detail.forEach(item =>{
        addPayDetails(item).then(res=>{
          Message.success({
            message: '开班费用登记成功',
            showClose: true
          })
          this.KBOpen = false
        }).catch(err=>{
          Message.error(err)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
