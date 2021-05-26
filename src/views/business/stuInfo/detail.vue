<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>学生详细信息</span>
          </div>
          <div>
            <div class="text-center" style="height: 100px">

            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                学员身份证
                <div class="pull-right">{{ user.STU_sf_id }}</div>
              </li>
              <li class="list-group-item">
                姓名
                <div class="pull-right">{{ user.STU_name }}</div>
              </li>
              <li class="list-group-item">
                性别
                <div class="pull-right">{{ user.STU_gender | _sex }}</div>
              </li>
              <li class="list-group-item">
                年龄
                <div class="pull-right">{{ user.STU_age }}</div>
              </li>
              <li class="list-group-item">
                电话号码
                <div class="pull-right">{{ user.STU_phone }}</div>
              </li>
              <li class="list-group-item">
                民族
                <div class="pull-right">{{ user.STU_nation }}</div>
              </li>
              <li class="list-group-item">
                就业状态
                <div class="pull-right">{{ user.STU_employment_status }}</div>
              </li>
              <li class="list-group-item">
                户籍详细地址
                <div class="pull-right">{{ user.STU_detail_address }}</div>
              </li>
              <li class="list-group-item">
                现住地址
                <div class="pull-right">{{ user.STU_current_address }}</div>
              </li>
              <li class="list-group-item">
                文化程度
                <div class="pull-right">{{ user.STU_education | education}}</div>
              </li>
              <li class="list-group-item">
                专业
                <div class="pull-right">{{ user.STU_major }}</div>
              </li>
              <li class="list-group-item">
                政治面貌
                <div class="pull-right">{{ user.STU_political_affiliation }}</div>
              </li>
              <li class="list-group-item">
                人员类别
                <div class="pull-right">{{ user.STU_personnel_category | personnel}}</div>
              </li>
              <li class="list-group-item">
                健康状态
                <div class="pull-right">{{ user.STU_health_status }}</div>
              </li>
              <li class="list-group-item">
                保险类型
                <div class="pull-right">{{ user.STU_insureType | insure}}</div>
              </li>
              <li class="list-group-item">
                学员归属单位
                <div class="pull-right">{{ user.STU_employer }}</div>
              </li>
<!--              <li class="list-group-item">-->
<!--                招生老师-->
<!--                <div class="pull-right">{{ user.STU_Teacher }}</div>-->
<!--              </li>-->
              <li class="list-group-item">
                是否为建档立卡户
                <div class="pull-right">{{ user.STU_filed_account | isNot }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>学生信息资料</span>
          </div>
          <el-tabs v-model="active">
            <el-tab-pane label="基本资料" name="userinfo">
              <el-form>
                <el-form-item>
                  <el-button @click="DidCardUp" v-if="hasAuth('stu_edit')">图片资料上传</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="DidCard" >身份证正面下载</el-button>
                  <el-button @click="DDiploma" >身份证反面下载</el-button>
                  <el-button @click="DOccupation" >学生图片下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
              <el-dialog title="图片资料上传" :visible.sync="imgOpen" width="500px" append-to-body  :before-close="handleClose">
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                  <el-form-item label="身份证正面" prop="LE_idCard01" size="small">
                    <el-upload
                      action=""
                      class="upload-demo"
                      list-type="picture"
                      ref="LE_idCard01"
                      :limit="1"
                      :http-request="handleBeforeCard"
                      :auto-upload="false"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.user.STU_photoIdz">身份证正面已上传</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="身份证反面" prop="LE_idCard02">
                    <el-upload
                      action=""
                      ref="LE_idCard02"
                      class="upload-demo"
                      list-type="picture"
                      :limit="1"
                      :auto-upload="false"
                      :http-request="handleBeforeCard01"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.user.STU_photoIdf">身份证反面已上传</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="毕业证资料" prop="LE_gc">
                    <el-upload
                      action=""
                      ref="LE_gc"
                      class="upload-demo"
                      list-type="picture"
                      :limit="1"
                      :auto-upload="false"
                      :http-request="handleBeforeGc"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.user.STU_photo">学生图片已上传</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submitFile">上传服务器</el-button>
                  <el-button type="primary" @click="submit">确定</el-button>
                  <el-button @click="cancel" :disabled="cancelIsDes">取 消</el-button>
                </div>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="修改信息" name="resetInfo">
              <el-form ref="form" :model="user" :rules="rules" label-width="100px">
                <el-form-item label="学员身份证" prop="STU_sf_id" >
                  <el-input v-model="user.STU_sf_id" placeholder="请输入学员身份证"  :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="姓名" prop="STU_name">
                  <el-input v-model="user.STU_name" placeholder="请输入姓名" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="年龄" prop="STU_age">
                  <el-input v-model="user.STU_age" placeholder="请输入年龄" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="性别" prop="STU_gender">
                  <el-select v-model="user.STU_gender" placeholder="请选择性别" :disabled="isDes">
                    <el-option value="1" label="男"/>
                    <el-option value="2" label="女"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="STU_phone">
                  <el-input v-model="user.STU_phone" placeholder="请输入手机号码" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="民族" prop="STU_nation" >
                  <el-input v-model="user.STU_nation" placeholder="请输入民族" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="就业状态" prop="STU_employment_status">
                  <el-select v-model="user.STU_employment_status" placeholder="请选择就业状态" :disabled="isDes">
                    <el-option value="失业" label="失业"/>
                    <el-option value="在职" label="在职"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="户籍详细地址" prop="STU_detail_address">
                  <el-input v-model="user.STU_detail_address" placeholder="请输入户籍详细地址" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="现住地址" prop="STU_current_address">
                  <el-input v-model="user.STU_current_address" placeholder="请输入现住地址" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="文化程度" prop="STU_education">
                  <el-select v-model="user.STU_education" placeholder="请选择文化程度" :disabled="isDes">
                    <el-option v-for="item in educations" :value="item.id" :label="item.name" :key="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="STU_major">
                  <el-input v-model="user.STU_major" placeholder="请输入专业" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="政治面貌" prop="STU_political_affiliation">
                  <el-select v-model="user.STU_political_affiliation" placeholder="请选择政治面貌" :disabled="isDes">
                    <el-option label="群众" value="群众"/>
                    <el-option label="团员" value="团员"/>
                    <el-option label="党员" value="党员"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="人员类别" prop="STU_personnel_category">
                  <el-select v-model="user.STU_personnel_category" placeholder="请选择人员类别" :disabled="isDes">
                    <el-option v-for="item in stu_personnel" :value="item.id" :label="item.name" :key="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="健康状态" prop="STU_health_status">
                  <el-input v-model="user.STU_health_status" placeholder="请输入健康状况" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="保险类型" prop="STU_insureType">
                  <el-select v-model="user.STU_insureType" placeholder="请选择保险类型" :disabled="isDes">
                    <el-option v-for="item in insureType" :value="item.id" :label="item.name" :key="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="归属单位" prop="STU_employer">
                  <el-select v-model="user.STU_employer" placeholder="选择归属单位" :disabled="isDes">
                    <el-option value="高创公司" label="高创公司"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="招生老师" prop="STU_Teacher">
                  <el-select v-model="user.STU_Teacher" filterable placeholder="请选择招生老师" :disabled="isDes">
                    <el-option v-for="item in Teacher" :label="item.AD_name+item.ADid" :value="item.ADid" :key="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="建档立卡户" prop="STU_filed_account">
                  <el-select v-model="user.STU_filed_account" placeholder="请选择是或否" :disabled="isDes">
                    <el-option value="1" label="是"/>
                    <el-option value="2" label="否"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="update" :disabled="!isDes" v-if="hasAuth('stu_edit')">修改</el-button>
                  <el-button type="primary" size="mini" @click="submit" :disabled="isDes" v-if="hasAuth('stu_edit')">保存</el-button>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="获取证书" name="booksInfo">
              <el-row>
                <el-col :span="16" v-for="item in this.books" :key="item.id" style="margin: 5px">
                  <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                     证书编号： <span>{{item.tc_id}}</span>
                    </div>
                    <div class="text item">
                      证书名称：{{item.tr_class}}
                    </div>
                    <div class="text item">
                      获得时间：{{item.tissue_date}}
                    </div>
                    <div class="text item">
                      获得人：{{item.thb_name}}
                    </div>
                    <div class="text item">
                      证书等级：{{item.tot_level | level}}
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="所在班级" name="classInfo">
             <el-col :span="16" :xs="24" v-for="item in user.STUBj" :key="item.id">
               <el-card class="box-card" >
                 <div slot="header" class="clearfix">
                   班级编号： <span>{{item.BClass_code}}</span>
                 </div>
                 <div class="text item">
                   班级名称：{{item.BClass_name}}
                 </div>
                 <div class="text item">
                   开班时间：{{item.BCStartTime}}——{{item.BCEndTime}}
                 </div>
                 <div class="text item">
                   班级状态：{{item.B_type | classStatus}}
                 </div>
                 <div class="text item">
                   证书等级：{{item.BLev}}
                 </div>
               </el-card>
             </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ClassStatus, formatSex, InsureType, isNot, level, stu_educations, stu_personnel} from "../../../utils";
import {DownLoadCos, LEupload, reLoad} from "../../../utils/cos";
import {editStudent, getStudent} from "../../../api/studentsInfo/student";
import {getStuFile} from "../../../api/studentsInfo/stuFile";
import {listAdTeacher} from "../../../api/studentsInfo/adTeacher";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {Message} from "element-ui";
import {listTrainBook} from "../../../api/studentsInfo/trainBook";
import {getAllFile} from "../../../api/studentsInfo/allFile";
import {listStuAndBanAndAD} from "../../../api/waijian";

export default {
  name: "detail",
  data(){
    return {
      //表单
      form: {},
      //规则
      rules: {

      },
      //查询参数
      user: {},
      //照片
      src: '',
      //
      active: 'userinfo',
      //是否禁用
      isDes: true,
      id: '',
      Secret: {},
      //额外参数
      insureType:[
        {name: '无', id: 1},
        {name: '养老', id: 2},
        {name: '失业人员', id: 3},
        {name: '医疗', id: 4},
        {name: '失业', id: 5},
        {name: '工伤', id: 6},
      ],
      stu_personnel: [
        {name: '贫困家庭子女', id: 1},
        {name: '贫困劳动力', id: 2},
        {name: '失业人员', id: 3},
        {name: '城乡未继续升学初高中毕业生', id: 4},
        {name: '农村转移就业劳动力', id: 5},
        {name: '转岗职工', id: 6},
        {name: '残疾人', id: 7},
        {name: '退役军人', id: 8},
      ],
      educations: [
        {name: '无', id: 1},
        {name: '小学', id: 2},
        {name: '初中', id: 3},
        {name: '高中', id: 4},
        {name: '专科', id: 5},
        {name: '本科', id: 6},
        {name: '硕士', id: 7},
        {name: '博士', id: 8},
      ],
      Teacher: {},
      imgOpen: false,
      dialogImageUrl: '',
      books: {},
      //取消按钮的禁用
      cancelIsDes: false,
      //其他参数
      banJi: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.id = id;
    this.getUser(id);
    listAdTeacher().then(res =>{
      this.Teacher = res.data.results
    });
    let obj = {
      tr_stu: id,
      student: id
    }
    listStuAndBanAndAD(obj).then(res =>{
      console.log(res.data.results)
    });
    listTrainBook(obj).then(res =>{
      this.books = res.data.results
    });
  },
  methods: {
    //获取信息
    getUser(id){
      getStudent(id).then(res =>{
        this.user = res.data
        this.user.STU_gender = this.user.STU_gender.toString()
        this.user.STU_filed_account = this.user.STU_filed_account.toString()
      })
    },
    //下载文件
    DidCard(){
      this.$confirm('是否下载学员身份证为' + this.user.STU_sf_id + "的学员身份证正面？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
          getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
          DownLoadCos(this.Secret,this.user.STU_photoIdz).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(()=>{
            Message.warning({
              message: '身份证正面未上传',
              showClose: true
            })
          })
        })
      })
    },
    DDiploma(){
      this.$confirm('是否下载学员身份证为' + this.user.STU_sf_id + "的身份证反面？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
          DownLoadCos(this.Secret,this.user.STU_photoIdf).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(()=>{
            Message.warning({
              message: '身份证反面未上传',
              showClose: true
            })
          })
        })
      })
    },
    DOccupation(){
      this.$confirm('是否下载学员身份证为' + this.user.STU_sf_id + "的学生图片？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
          DownLoadCos(this.Secret,this.user.STU_photo).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(()=>{
            Message.warning({
              message: '学生图片未上传',
              showClose: true
            })
          })
        })
      })
    },
    //上传
    DidCardUp(){
      this.imgOpen = true
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      if(!this.user.STU_photoIdz){
        getAllFile().then(response =>{
          let Secret = response.data
          let key = 'Student/'
          LEupload(Secret,file.file,key).then(res=>{
            this.user.STU_photoIdz = res
            this.$message({
              message: '上传身份证正面成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证正面失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        })
      }
      else{
        getAllFile().then(response =>{
          let Secret = response.data
          reLoad(Secret,file.file,this.user.STU_photoIdz).then(res=>{
            this.$message({
              message: '上传身份证正面成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证正面失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        })
      }
    },
    handleBeforeCard01(file){
      if(!this.user.STU_photoIdf){
        getAllFile().then(response =>{
          let Secret = response.data
          let key = 'Student/'
          LEupload(Secret,file.file,key).then(res=>{
            this.user.STU_photoIdf = res
            this.$message({
              message: '上传身份证反面成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证反面失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        })
      }else {
        getAllFile().then(response =>{
          let Secret = response.data
          reLoad(Secret,file.file,this.user.STU_photoIdf).then(res=>{
            this.$message({
              message: '上传身份证反面成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证反面失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        })
      }

    },
    handleBeforeGc(file){
      if(!this.user.STU_photo){
        getAllFile().then(response =>{
          let Secret = response.data
          let key = 'Student/'
          LEupload(Secret,file.file,key).then(res=>{
            this.user.STU_photo = res
            this.$message({
              message: '上传学生图片成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传学生图片失败，请重新上传'+ error,
              type: 'warning'
            })
            file.onError()
          })
        })
      }else{
        getAllFile().then(response =>{
          let Secret = response.data
          reLoad(Secret,file.file,this.user.STU_photo).then(res=>{
            this.$message({
              message: '上传学生图片成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传学生图片失败，请重新上传'+ error,
              type: 'warning'
            })
            file.onError()
          })
        })
      }
    },
    //上传服务器
    submitFile(){
      this.$confirm('请确定图片是否正确，上传后会直覆盖之前的图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.LE_idCard01.submit()
        this.$refs.LE_idCard02.submit()
        this.$refs.LE_gc.submit()
        this.cancelIsDes = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '上传失败'
        });
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
        this.resetFile1()
        })
      },
    cancel(){
      this.imgOpen = false
      this.resetFile1()
    },
    //上传完成后清除预览
    resetFile1(){
      this.$refs.LE_idCard01.clearFiles()
      this.$refs.LE_gc.clearFiles()
      this.$refs.LE_idCard02.clearFiles()
    },
    //保存
    submit(){
      editStudent(this.user).then(res =>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.isDes = true
        this.imgOpen = false
        this.cancelIsDes = false
        this.getUser(this.id)
      }).catch(error =>{
        this.$message({
          message: '请检查身份证与学员身份证是否有重复，如果没有重复请联系管理员',
          type: 'warning'
        });
      })
    },
    update(){
      this.isDes = false
    },
    back(){
      this.$router.go(-1)
    }
  },
  filters: {
    //过滤器
    _sex(num){
      num = parseInt(num)
      return formatSex(num)
    },
    isNot(num){
      num = parseInt(num)
      return isNot(num)
    },
    education(num){
      return stu_educations(num)
    },
    personnel(num){
      return stu_personnel(num)
    },
    insure(num){
      return InsureType(num)
    },
    level(num){
      num = num.toString()
      return level(num)
    },
    classStatus(num){
      return ClassStatus(num)
    }
  }
}
</script>

<style scoped>

</style>
