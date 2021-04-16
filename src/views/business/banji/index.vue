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
    <el-table v-loading="loading" :data="dataList" >
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="班级编号" align="center" prop="BClass_code">
        <template slot-scope="scope">
          <router-link :to="'/lecturesDetail/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.BClass_code }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
        <el-table-column label="班级名称" align="center" prop="BClass_name"/>
      <el-table-column label="开班地" align="center" prop="BClass_address"/>
      <el-table-column label="部门" align="center" prop="BDepartment"/>
      <el-table-column label="开班时间·" align="center" prop="BCStartTime"/>
      <el-table-column label="开班结束时间" align="center" prop="BCEndTime"/>
      <el-table-column label="班主任" align="center" prop="BHead_teacher"/>
      <el-table-column label="班级性质" align="center" prop="BClass_type" :formatter="_BClass_type"/>
      <el-table-column label="是否申请费用" align="center" prop="Bis_fee_applied" :formatter="_Bis_fee_applied"/>
      <el-table-column label="是否结算" align="center" prop="Bis_closed" :formatter="_Bis_fee_applied"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body  :before-close="handleClose">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-upload"></el-step>
        <el-step title="步骤 3" icon="el-icon-upload"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" label-width="110px" v-if="active === 1">
        <el-form-item label="班级编号" prop="BClass_code">
          <el-input v-model="form.BClass_code" placeholder="请输入班级编号" />
        </el-form-item>
        <el-form-item label="班级名称" prop="BClass_name">
          <el-input v-model="form.BClass_name" placeholder="请输入班级名称" maxlength="18"/>
        </el-form-item>
        <el-form-item label="开班地" prop="BClass_address">
          <el-input v-model="form.BClass_address" placeholder="请输入开班地" />
        </el-form-item>
        <el-form-item label="开班部门" prop="BDepartment">
          <el-input v-model="form.BDepartment" placeholder="请输入开班部门" />
        </el-form-item>
        <el-form-item label="开课时间" prop="BCEndTime">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.BCStartTime" style="width: 90%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">=></el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.BCEndTime" style="width: 100%;"></el-date-picker>
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
        <el-form-item label="讲课老师" prop="BLecturer">
          <el-input v-model="form.BLecturer" placeholder="请输入讲课"/>
        </el-form-item>
        <el-form-item label="工作人员" prop="BStaff">
          <el-input v-model="form.BStaff" placeholder="请输入工作人员"/>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form"  v-if="active === 2" :inline="true">
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
        <el-form-item label="合办单位" prop="Bco_organizer">
          <el-input v-model="form.Bco_organizer" placeholder="请输入合办单位"/>
        </el-form-item>
        <el-form-item label="合办单位分成标准" prop="Bco_organizer_commission">
          <el-input v-model="form.Bco_organizer_commission" placeholder="请输入合办单位分成标准"/>
        </el-form-item>
        <el-form-item label="合办单位分成标准" prop="Bco_organizer_commission">
          <el-input v-model="form.Bco_organizer_commission" placeholder="请输入合办单位分成标准"/>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="请选择">

          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 3" >
        <el-form-item label="身份证反面" prop="LE_idCard02">
          <el-upload
            action=""
            ref="LE_idCard02"
            class="upload-demo"
            list-type="picture"
            :limit="1"
            :disabled="idcard02"
            :auto-upload="false"
            :http-request="handleBeforeCard01"
            :on-preview="handlePictureCardPreview">
            <el-button size="small" type="primary" @click="pdUpload">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能上传一张图片</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="active===3">
        <el-button type="primary" @click="submitFile">上传服务器</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-top: 12px;" @click="up" v-if="active > 1">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next" v-if="active < 3">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addLecturers, deleteLecturers, getLecturers, listLecturers} from "../../../api/studentsInfo/lecturers";
import {banjiType, formatSex, isNot} from "../../../utils";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
import {deleteBanJi, getBanJi, listBanJi} from "../../../api/studentsInfo/banji";

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
      idcard02: false,
      gc: false,
      pqc: false,
      contents: false,
      //查询参数
      query:[
        {name:'班级编号',id: 'BClass_code'},
        {name:'讲师姓名',id: 'BClass_name'},
      ],
      rules: {
        BClass_code:[
          {required: true, message: "班级编号不能为空", trigger: "blur"}
        ],
        BCEndTime: [
          {required: true, message: "结束时间不能为空", trigger: "blur"}
        ],
        BClass_name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
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
        LE_idCard02: [
          {required: true, message: "班级集体照未上传", trigger: "blur"}
        ]
      },
      Secret: {},
      BType: [
        {name: "政府补贴班", value: 1},
        {name: '社招班', value: 2}
      ],
    }
  },
  created() {
    this.getList()
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
        Bco_organizer: undefined,
        Bco_organizer_commission: undefined,
        Bis_fee_applied: undefined,
        Bis_closed: undefined,
        BClass_photo: undefined,
      };
      this.contents = false
      this.gc = false
      this.contents = false
      this.idcard01 = false
      this.idcard02 = false
      this.active = 1;
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
      this.title = "新增讲师";
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
          addLecturers(this.form).then(response => {
            this.$message({
              message: "新增成功",
              type: 'success'
            });
            this.open = false;
            this.getList();
            this.reset();
          }).catch(() =>{
            this.$message({
              message: '该讲师身份证或编号已存在或身份证与电话号码格式不正确，请修改后再确定',
              type: 'warning'
            })
          });
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
        listLecturers(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //清除之前上传服务器的数据
    resetFW(obj){
      getLeFile().then(res=>{
        this.Secret = res.data
      })
      if(obj.BClass_photo !== '' && obj.BClass_photo !== undefined){
        DeleteCos(this.Secret,obj.BClass_photo).then(res =>{
          console.log("服务器清理成功")
        }).catch(err=>{
          console.log(err)
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
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    },
    //表格参数渲染
    _Bis_fee_applied(row){
      return isNot(row.Bis_fee_applied)
    },
    _BClass_type(row){
      return banjiType(row.BClass_type)
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_idCard01 = res
          this.idcard01 = true
          this.$message({
            message: '上传身份证正面成功',
            type: 'success',
            showClose: true
          })
        }).catch(error=>{
          this.$message({
            message: '上传身份证正面失败，请重新上传'+ error,
            type: 'warning',
            showClose: true
          })
        })
      })
    },
    handleBeforeCard01(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_idCard02 = res
          this.$message({
            message: '上传身份证反面成功',
            type: 'success',
            showClose: true
          })
          this.idcard02 = true
        }).catch(error=>{
          this.$message({
            message: '上传身份证反面失败，请重新上传'+ error,
            type: 'warning',
            showClose: true
          })
        })
      })
    },
    handleBeforeGc(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_gc = res
          this.gc = true
          this.$message({
            message: '上传毕业证成功',
            type: 'success',
            showClose: true
          })
        }).catch(error=>{
          this.$message({
            message: '上传身毕业证失败，请重新上传'+ error,
            type: 'warning'
          })
        })
      })
    },
    handleBeforepqc(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          console.log(res);
          this.form.LE_pqc = res
          this.pqc = true
          this.$message({
            message: '上传资格证成功',
            type: 'success',
            showClose: true
          })
        }).catch(error=>{
          this.$message({
            message: '上传资格证失败，请重新上传'+ error,
            type: 'warning',
            showClose: true
          })
        })
      })
    },
    handleBeforeCo(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_contents = res
          this.contents = true
          this.$message({
            message: '上传协议成功',
            type: 'success',
            showClose: true
          })
        }).catch(error=>{
          this.$message({
            message: '上传协议失败，请重新上传'+ error,
            type: 'warning',
            showClose: true
          })
        })
      })
    },
    //上传
    submitFile(){
      this.$confirm('请确定文件是否正确，上传后不能修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.idcard02 === false){
          this.$refs.LE_idCard02.submit()
        }

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: ''
        // });
      });
    },
    //判断上传
    pdUpload(){
      if (this.idcard02 === true){
        Message.warning("身份证反面已上传")
      }
    }
  }
}
</script>

<style scoped>

</style>
