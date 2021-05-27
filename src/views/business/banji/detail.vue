<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>班级详细信息</span>
          </div>
          <div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                班级编号
                <div class="pull-right">{{ Class.BClass_code }}</div>
              </li>
              <li class="list-group-item">
                人社局编号
                <div class="pull-right">{{ Class.BR_code }}</div>
              </li>
              <li class="list-group-item">
                班级名称
                <div class="pull-right">{{ Class.BClass_name}}</div>
              </li>
              <li class="list-group-item">
                开班地
                <div class="pull-right">{{ Class.BClass_address }}</div>
              </li>
              <li class="list-group-item">
                开班部门
                <div class="pull-right">{{ Class.BDepartment}}</div>
              </li>
              <li class="list-group-item">
                开课时间
                <div class="pull-right">{{Class.BCStartTime}}---{{Class.BCEndTime}}</div>
              </li>
              <li class="list-group-item">
                班级性质
                <div class="pull-right">{{ Class.BClass_type | banjiType}}</div>
              </li>
              <li class="list-group-item">
                项目名
                <div class="pull-right">{{ tenPro.tp_projectName }}</div>
              </li>
              <li class="list-group-item">
                班主任
                <div class="pull-right">{{ Class.BHead_teacher }}</div>
              </li>
              <li class="list-group-item">
                工种类型
                <div class="pull-right">{{ Class.BOt_name }}</div>
              </li>
              <li class="list-group-item">
                证书等级
                <div class="pull-right">{{ Class.BLev | level}}</div>
              </li>
              <li class="list-group-item">
                讲课老师
                <div class="pull-right">{{ Class.BLecturer }}</div>
              </li>
              <li class="list-group-item">
                管理费用
                <div class="pull-right">{{ Class.BManagement_fee }}</div>
              </li>
              <li class="list-group-item">
                食宿标准
                <div class="pull-right">{{ Class.BLiving_fee }}</div>
              </li>
              <li class="list-group-item">
                政府补贴费用
                <div class="pull-right">{{ Class.BGov_fee }}</div>
              </li>
              <li class="list-group-item">
                提成标准
                <div class="pull-right">{{ Class.BCommission }}</div>
              </li>
              <li class="list-group-item">
                课酬标准
                <div class="pull-right">{{ Class.BClass_pay }}</div>
              </li>
              <li class="list-group-item">
                课时标准
                <div class="pull-right">{{ Class.BClass_hour }}</div>
              </li>
              <li class="list-group-item">
                招生提成标准
                <div class="pull-right">{{ Class.BAdmissions_commission }}</div>
              </li>
              <li class="list-group-item">
                合办单位
                <div class="pull-right">{{ Class.BCo_organizer }}</div>
              </li>
              <li class="list-group-item">
                合办单位分成标准
                <div class="pull-right">{{ Class.Bco_organizer_commission }}</div>
              </li>
              <li class="list-group-item">
                是否已申请政府补贴
                <div class="pull-right">{{ Class.Bis_fee_applied | isNot}}</div>
              </li>
              <li class="list-group-item">
                费用是否到账
                <div class="pull-right">{{ Class.Bis_closed | isNot}}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>班级信息资料</span>
          </div>
          <el-tabs v-model="active">
            <el-tab-pane label="班级基本资料" name="Classinfo">
              <el-form>
                <el-form-item>
                  <el-button @click="()=>{ this.open = true }" type="warning" v-if="hasAuth('ban_edit')">班级集体照上传</el-button>
                  <el-button @click="()=>{ this.ClassOpen = true}" type="warning" v-if="hasAuth('ban_edit')">课程表上传</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="DidCard" type="primary">班级集体照下载</el-button>
                  <el-button @click="SeeClass" type="primary">课程表下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
              <el-dialog title="班级照上传" :visible.sync="open" width="600px" append-to-body  :before-close="handleClose">
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                  <el-form-item label="班级集体照" prop="BClass_photo">
                    <el-upload
                      action=""
                      ref="BClass_photo"
                      class="upload-demo"
                      list-type="picture"
                      :limit="1"
                      :auto-upload="false"
                      :http-request="DidLoad">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.Class.BClass_photo">班级照已上传</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div class="el-dialog__footer">
                  <el-button type="primary" @click="submitFile">上传服务器</el-button>
                  <el-button type="primary" @click="submit">确定</el-button>
                  <el-button type="primary" @click="cancel">取消</el-button>
                </div>
              </el-dialog>
              <el-dialog title="课程表上传" :visible.sync="ClassOpen" width="600px" append-to-body  :before-close="handleClose">
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                  <el-form-item label="课程表" prop="BClass_photo">
                    <el-upload
                      action=""
                      ref="BCourseTable"
                      class="upload-demo"
                      list-type="text"
                      :limit="1"
                      :auto-upload="false"
                      :http-request="ClassLoad">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.Class.BCourseTable">课程表已上传</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div class="el-dialog__footer">
                  <el-button type="primary" @click="submitFile1">上传服务器</el-button>
                  <el-button type="primary" @click="submit">确定</el-button>
                  <el-button type="primary" @click="cancel">取消</el-button>
                </div>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="修改信息" name="resetInfo">
              <el-form ref="form" :model="Class" :rules="rules" label-width="150px" >
                <el-form-item label="班级编号" prop="BClass_code">
                  <el-input v-model="Class.BClass_code" placeholder="请输入班级编号" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="人社局编号" prop="BR_code" >
                  <el-input v-model="Class.BR_code" placeholder="请输入班级编号" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="班级名称" prop="BClass_name">
                  <el-input v-model="Class.BClass_name" placeholder="请输入班级名称" maxlength="18":disabled="isDes"/>
                </el-form-item>
                <el-form-item label="开班地" prop="BClass_address">
                  <el-input v-model="Class.BClass_address" placeholder="请输入开班地" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="开班部门" prop="BDepartment">
                  <el-select v-model="Class.BDepartment" placeholder="请开班部门" :disabled="isDes">
                    <el-option v-for="item in dept" :key="item.name" :label="item.name" :value="item.name"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="开课时间" prop="BCEndTime">
                  <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" v-model="Class.BCStartTime" style="width: 90%;" :disabled="isDes"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">=></el-col>
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="Class.BCEndTime" style="width: 100%;" :disabled="isDes"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="班级性质" prop="BClass_type">
                  <el-select v-model="Class.BClass_type" placeholder="请选择班级性质" :disabled="isDes">
                    <el-option v-for="item in this.BType" :value="item.value" :label="item.name" :key="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="班主任" prop="BHead_teacher">
                  <el-input v-model="Class.BHead_teacher" placeholder="请输入班主任" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="工种类型" prop="BOt_name">
                  <el-input v-model="Class.BOt_name" placeholder="请输入工种类型" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="证书等级" prop="BLev">
                  <el-select v-model="Class.BLev" placeholder="请选择证书等级" :disabled="isDes">
                    <el-option v-for="item in this.level" :value="item.value" :label="item.name" :key="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="讲课老师" prop="BLecturer">
                  <el-select v-model="Class.BLecturer" filterable placeholder="请输入讲课" :disabled="isDes">
                    <el-option v-for="item in this.lecturers" :key="item.id" :value="item.LEid+':'+item.LE_name" :label="item.LEid+item.LE_name" />
                  </el-select>
                </el-form-item>
                <el-form-item label="工作人员" prop="BStaff">
                  <el-input v-model="Class.BStaff" placeholder="请输入工作人员" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="管理费用" prop="BManagement_fee">
                  <el-input v-model="Class.BManagement_fee" placeholder="请输入管理费用" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="食宿标准" prop="BLiving_fee">
                  <el-input v-model="Class.BLiving_fee" placeholder="请输入食宿标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="政府补贴费用" prop="BGov_fee">
                  <el-input v-model="Class.BGov_fee" placeholder="请输入政府补贴费用" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="提成标准" prop="BCommission">
                  <el-input v-model="Class.BCommission" placeholder="请输入提成标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="课酬标准" prop="BClass_pay">
                  <el-input v-model="Class.BClass_pay" placeholder="请输入课酬标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="课时标准" prop="BClass_hour">
                  <el-input v-model="Class.BClass_hour" placeholder="请输入课时标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="招生提成标准" prop="BAdmissions_commission">
                  <el-input v-model="Class.BAdmissions_commission" placeholder="请输入招生提成标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="合办单位" prop="BCo_organizer">
                  <el-input v-model="Class.BCo_organizer" placeholder="请输入合办单位" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="合办单位分成标准" prop="Bco_organizer_commission">
                  <el-input v-model="Class.Bco_organizer_commission" placeholder="请输入合办单位分成标准" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="是否已申请政府补贴" prop="Bis_fee_applied">
                  <el-select placeholder="请选择" v-model="Class.Bis_fee_applied" :disabled="isDes">
                    <el-option v-for="item in isNot" :value="item.value" :label="item.name" :key="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="费用是否到账" prop="Bis_closed">
                  <el-select placeholder="请选择" v-model="Class.Bis_closed" :disabled="isDes">
                    <el-option v-for="item in isNot" :value="item.value" :label="item.name" :key="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="update" :disabled="!isDes" v-if="hasAuth('ban_edit')">修改</el-button>
                  <el-button type="primary" size="mini" @click="submit" :disabled="isDes" v-if="hasAuth('ban_edit')">保存</el-button>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {listLecturers} from "../../../api/studentsInfo/lecturers";
import {banjiType, formatSex, isNot, level} from "../../../utils";
import {DownLoadCos, getHead, LEupload, reLoad} from "../../../utils/cos";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {editBanJi, getBanJi} from "../../../api/studentsInfo/banji";
import {Message} from "element-ui";
import {getBanFile} from "../../../api/studentsInfo/banFile";
import {getAllFile} from "../../../api/studentsInfo/allFile";
import {getTenderProject} from "../../../api/tenderproject/tenderProject";

export default {
  name: "detail",
  data(){
    return {
      //表单
      form: {},
      //规则
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
        BClass_photo: [
          {required: true, message: "班级集体照未上传", trigger: "blur"}
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
      //查询参数
      Class: {},
      //照片
      src: '',
      //
      active: 'Classinfo',
      //是否禁用
      isDes: true,
      id: '',
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
      //部门选择
      dept: [
        {name: '培训一部'},
        {name: '培训二部'},
        {name: '培训三部'},
        {name: '培训四部'},
        {name: '培训五部'},
      ],
      //需要的参数
      lecturers: {},
      dialogImageUrl: '',
      open: false,
      ClassOpen: false,
      tenPro: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.id = id
    this.getClass(id)
    listLecturers().then(res =>{
      this.lecturers = res.data.results
    })
  },
  methods: {
    //获取信息
    getClass(id){
      getBanJi(id).then(res =>{
        this.Class = res.data
        this.Class.BClass_name = this.Class.BClass_name.toString()
        getTenderProject(res.data.BT).then(res =>{
          this.tenPro = res.data
        })
      }).catch(()=>{
        this.$notify.error({
          title: '错误',
          message: '没有班级查询权限'
        });
      })
    },
    //下载文件
    DidCard(){
      this.$confirm('是否下载班级编号为' + this.Class.BClass_code + "的班级集体照？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
      const loading = this.$loading({
        lock: true,
        text: '正在获取资源下载，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
        getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
            loading.close()
            DownLoadCos(this.Secret,this.Class.BClass_photo).then(res=>{
                window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
              }
            ).catch(() =>{
              loading.close()
              Message.warning({
                message: '该班级未上传班级集体照',
                showClose: true
              })
            })
          })
        })
    },
    //查看课程表
    SeeClass(){
      this.$confirm('是否下载班级编号为' + this.Class.BClass_code + "的班级课程表？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        const loading = this.$loading({
          lock: true,
          text: '正在获取资源下载，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
          loading.close()
          DownLoadCos(this.Secret,this.Class.BCourseTable).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(() =>{
            loading.close()
            Message.warning({
              message: '该班级未上传班级课程表',
              showClose: true
            })
          })
        })
      })
    },
    //保存
    submit(){
      editBanJi(this.Class).then(() =>{
        this.isDes = true
        this.getClass(this.id)
        this.open = false
        this.ClassOpen = false
        // this.$refs.BClass_photo.clearFiles()
        // this.$refs.BCourseTable.clearFiles()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }).catch(() =>{
        this.$message({
          message: '请检查班级编号是否有重复，如果没有重复请联系管理员',
          type: 'warning'
        });
      })
    },
    update(){
      this.isDes = false
    },
    back(){
      this.$router.go(-1)
    },
    //班级照上传
    DidLoad(file){
      getAllFile().then(res =>{
        this.Secret = res.data
      }).then(()=>{
        this.$confirm("是否上传班级照",'警告',{
          confirmButtonText: '确定',
          cancelButtonText: "取消",
          type: 'warning',
        }).then(()=>{
          if(!this.Class.BClass_photo){
            LEupload(this.Secret,file.file,"BanJi/").then(res=>{
              this.Class.BClass_photo = res
              this.$message({
                message: '上传班级照成功',
                type: 'success',
                showClose: true
              })
              file.onSuccess()
            }).catch(error=>{
              this.$message({
                message: '上传班级照失败，请重新上传'+ error,
                type: 'warning',
                showClose: true
              })
              file.onError()
            })
          }else {
            reLoad(this.Secret,file.file,this.Class.BClass_photo).then(res =>{
              this.$message({
                message: '上传班级照成功',
                type: 'success',
                showClose: true
              })
              file.onSuccess()
            }).catch(error=>{
              this.$message({
                message: '上传班级照失败，请重新上传'+ error,
                type: 'warning',
                showClose: true
              })
              file.onError()
            })
          }
        })
      })
    },
    ClassLoad(file){
      getAllFile().then(res =>{
        this.Secret = res.data
      }).then(()=>{
        this.$confirm("是否上传课程表",'警告',{
          confirmButtonText: '确定',
          cancelButtonText: "取消",
          type: 'warning',
        }).then(() =>{
          if(!this.Class.BCourseTable){
            LEupload(this.Secret,file.file,"BanJi/").then(res=>{
              this.Class.BCourseTable = res
              this.$message({
                message: '上传课程表成功',
                type: 'success',
                showClose: true
              })
              file.onSuccess()
            }).catch(error=>{
              this.$message({
                message: '上传课程表失败，请重新上传'+ error,
                type: 'warning',
                showClose: true
              })
              file.onError()
            })
          }else {
            reLoad(this.Secret,file.file,this.Class.BCourseTable).then(res =>{
              this.$message({
                message: '上传课程表成功',
                type: 'success',
                showClose: true
              })
              file.onSuccess()
            }).catch(error=>{
              this.$message({
                message: '上传课程表失败，请重新上传'+ error,
                type: 'warning',
                showClose: true
              })
              file.onError()
            })
          }
        })
      })
    },
    //关闭弹窗
    handleClose(done){
      this.$confirm('此操作将清空之前填写的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.open = false
        this.ClassOpen = false
        this.$refs.BClass_photo.clearFiles()
        this.$refs.BCourseTable.clearFiles()
        done()
      }).catch(() => {
        console.log('错误')
      });
    },
    submitFile(){
      this.$refs.BClass_photo.submit()
    },
    submitFile1(){
      this.$refs.BCourseTable.submit()
    },
    cancel(){
      this.open = false
      this.ClassOpen = false
      this.$refs.BClass_photo.clearFiles()
      this.$refs.BCourseTable.clearFiles()
    },
  },
  filters: {
    //过滤器
    isNot(num){
      return isNot(num)
    },
    banjiType(num){
      return banjiType(num)
    },
    level(num){
      return level(num)
    }
  }
}
</script>

<style scoped>

</style>
