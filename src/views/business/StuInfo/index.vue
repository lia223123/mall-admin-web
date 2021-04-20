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
      <el-table-column label="id" align="center" prop="id">
        <template slot-scope="scope">
          <router-link :to="'/lecturesDetail/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.id }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="学员姓名" align="center" prop="STU_name"/>
      <el-table-column label="性别" align="center" prop="STU_gender" :formatter="_sex"/>
      <el-table-column label="电话" align="center" prop="STU_phone"/>
      <el-table-column label="年龄" align="center" prop="STU_age"/>
      <el-table-column label="民族" align="center" prop="STU_nation"/>
      <el-table-column label="文化程度" align="center" prop="STU_education" :formatter="_education"/>
      <el-table-column label="专业" align="center" prop="STU_major"/>
      <el-table-column label="政治面貌" align="center" prop="STU_political_affiliation"/>
      <el-table-column label="人员类别" align="center" prop="STU_personnel_category" :formatter="_personnel"/>
      <el-table-column label="健康状况" align="center" prop="STU_health_status"/>
      <el-table-column label="归属单位" align="center" prop="STU_employer"/>
      <el-table-column label="招生老师" align="center" prop="STU_Teacher"/>
      <el-table-column label="建档立卡" align="center" prop="STU_filed_account" :formatter="_filed"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleUpload(scope.row)"
          >图片资料上传</el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body  :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学员姓名" prop="STU_name" label-width="80px">
              <el-input v-model="form.STU_name" placeholder="请输入学员姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年龄" prop="STU_age" label-width="50px">
              <el-input type="number" v-model="form.STU_age" placeholder="请输入年龄" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="民族" prop="STU_nation" label-width="50px">
              <el-input v-model="form.STU_nation" placeholder="请输入民族"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="政治面貌" prop="STU_political_affiliation" label-width="80px">
              <el-select v-model="form.STU_political_affiliation" placeholder="请选择政治面貌">
                <el-option label="群众" value="群众"/>
                <el-option label="团员" value="团员"/>
                <el-option label="党员" value="党员"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="性别" prop="STU_gender" label-width="50px">
              <el-select v-model="form.STU_gender" placeholder="请选择学员性别">
                <el-option value="1" label="男"/>
                <el-option value="2" label="女"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="文化程度" prop="STU_education" label-width="80px">
              <el-select v-model="form.STU_education" placeholder="请选择文化程度">
                <el-option v-for="item in educations" :value="item.id" :label="item.name" :key="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="STU_phone" label-width="80px">
              <el-input v-model="form.STU_phone" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')"
                        maxlength='11' />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证" prop="STU_sf_id" label-width="70px">
              <el-input v-model="form.STU_sf_id" placeholder="请输入身份证" maxlength="18"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="专业" prop="STU_major" label-width="50px">
              <el-input v-model="form.STU_major" placeholder="请输入专业"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="就业状态" prop="STU_employment_status" label-width="80px">
              <el-select v-model="form.STU_employment_status" placeholder="选择就业状态">
                <el-option value="失业" label="失业"/>
                <el-option value="在职" label="在职"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人员类别" prop="STU_personnel_category" label-width="80px">
              <el-select v-model="form.STU_personnel_category" placeholder="请选择人员类别">
                <el-option v-for="item in stu_personnel" :value="item.id" :label="item.name" :key="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="招生老师" prop="STU_Teacher" label-width="80px">
              <el-select v-model="form.STU_Teacher" filterable placeholder="请选择招生老师">
                <el-option v-for="item in Teacher" :label="item.AD_name+item.ADid" :value="item.ADid" :key="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="健康状况" prop="STU_health_status" label-width="80px">
              <el-input v-model="form.STU_health_status" placeholder="请输入健康状况"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保险类型" prop="STU_insureType" label-width="80px">
              <el-select v-model="form.STU_insureType" placeholder="请选择保险类型">
                <el-option v-for="item in insureType" :value="item.id" :label="item.name" :key="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建档立卡户" prop="STU_filed_account" label-width="100px">
              <el-select v-model="form.STU_filed_account" placeholder="请选择是或否">
                <el-option value="1" label="是"/>
                <el-option value="2" label="否"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属单位" prop="STU_employer" label-width="80px">
              <el-select v-model="form.STU_employer" placeholder="选择归属单位">
                <el-option value="高创公司" label="高创公司"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="户籍信息" prop="STU_detail_address" label-width="80px">
              <el-input v-model="form.STU_detail_address" placeholder="请输入户籍信息"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="现住地址" prop="STU_current_address" label-width="80px">
              <el-input v-model="form.STU_current_address" placeholder="请输入现住地址"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
            :on-preview="handlePictureCardPreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能上传一张图片</div>
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
            :on-preview="handlePictureCardPreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能上传一张图片</div>
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
            :on-preview="handlePictureCardPreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能上传一张图片</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFile">上传服务器</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatSex, isNot, stu_educations, stu_personnel} from "../../../utils";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
import {
  addStudent,
  deleteStudent,
  editStudent, getBook,
  getStudent,
  getTrainBook,
  listStudent
} from "../../../api/studentsInfo/student";
import {listAdTeacher} from "../../../api/studentsInfo/adTeacher";
import {getStuFile} from "../../../api/studentsInfo/stuFile";
import axios from "axios";

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
      //查询参数
      query:[
        {name:'学员编号',id: 'LEid'},
        {name:'学员姓名',id: 'STU_name'},
        {name:'身份证',id: 'STU_nation'},
        {name:'银行开户行',id: 'STU_education'},
        {name:'专业',id: 'STU_major'},
      ],
      rules: {
        STU_sf_id:[
          {required: true, message: "身份证不能为空", trigger: "blur"}
        ],
        STU_nation: [
          {required: true, message: "民族不能为空", trigger: "blur"}
        ],
        STU_name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        STU_gender: [
          {required: true, message: "性别不能为空", trigger: "blur"}
        ],
        STU_phone: [
          {required: true, message: "电话不能为空", trigger: "blur"}
        ],
        STU_education: [
          {required: true, message: "文化程度不能为空", trigger: "blur"}
        ],
        STU_age: [
          {required: true, message: "年龄不能为空", trigger: "blur"}
        ],
        STU_personnel_category: [
          {required: true, message: "人员类别不能为空", trigger: "blur"}
        ],
        STU_insureType: [
          {required: true, message: "保险类型不能为空", trigger: "blur"}
        ],
        STU_health_status: [
          {required: true, message: "健康状况不能为空", trigger: "blur"}
        ],
        STU_employment_status: [
          {required: true, message: "就业状态不能为空", trigger: "blur"}
        ],
        STU_filed_account: [
          {required: true, message: "建档立卡不能为空", trigger: "blur"}
        ],
        STU_employer: [
          {required: true, message: "归属单位不能为空", trigger: "blur"}
        ],
        STU_detail_address: [
          {required: true, message: "户籍地址不能为空", trigger: "blur"}
        ],
        STU_current_address: [
          {required: true, message: "现住地址不能为空", trigger: "blur"}
        ],
        LE_pqc: [
          {required: true, message: "学生图片未上传", trigger: "blur"}
        ],
        LE_idCard01: [
          {required: true, message: "身份证正面未上传", trigger: "blur"}
        ],
        LE_idCard02: [
          {required: true, message: "身份证反面未上传", trigger: "blur"}
        ]
      },
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
    }
  },
  created() {
    this.getList()
    listAdTeacher().then(res =>{
      this.Teacher = res.data.results
    })
  },
  methods:{
    getList(){
      listStudent().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        STU_nation: undefined,
        STU_name: undefined,
        STU_gender: undefined,
        STU_phone: undefined,
        STU_education: undefined,
        STU_major: undefined,
        STU_political_affiliation: undefined,
        STU_sf_id: undefined,
        STU_detail_address: undefined,
        STU_employment_status: undefined,
        STU_health_status: undefined,
        STU_age: undefined,
        STU_personnel_category: undefined,
        STU_insureType: undefined,
        STU_employer: undefined,
        STU_books_count: undefined,
        STU_current_address: undefined,
        STU_Teacher: undefined,
        STU_filed_account: undefined,
        SCreate_time: undefined,
        STU_photo: undefined,
        STU_photoIdz: undefined,
        STU_photoIdf: undefined,
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
      this.title = "新增学员";
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除学员身份证为' + row.STU_sf_id + "的学员信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getStudent(row.id).then(res =>{
          this.resetFW(res.data)
        }).catch(err=>{
          console.log(err)
        })
        deleteStudent(row.id).then(res =>{
          this.$message({
            message: "删除成功",
            type: 'success',
            showClose: true
          });
          this.getList();
        }).catch((err)=>{
          this.$message({
            message: "删除失败",
            type: 'success',
            showClose: true
          });
        })
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
        this.open = false
        this.imgOpen = false
        this.resetFW(this.form)
        this.reset()
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
          if(this.form.id !== undefined){
            editStudent(this.form).then(response=>{
              Message.success("图片上传成功")
              this.imgOpen = false
              this.getList();
              this.reset()
            })
          }else{
            addStudent(this.form).then(response => {
              this.$message({
                message: "新增成功",
                type: 'success'
              });
              this.open = false;
              this.getList();
              this.reset()
            }).catch(() =>{
              this.$message({
                message: '该学员身份证已存在或身份证格式不正确，请修改后再确定',
                type: 'warning'
              })
            });
          }
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
        if(this.form.STU_photo !== null && this.form.STU_photo !== undefined){
          this.resetFW(this.form)
        }
        this.reset()
        this.open = false
        this.imgOpen = false
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
        listStudent(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //清除之前上传服务器的数据
    resetFW(obj){
      getStuFile().then(res=>{
        this.Secret = res.data
      })
      if(obj.STU_photo!== '' && obj.STU_photo !== undefined){
        DeleteCos(this.Secret,obj.STU_photo).then(res =>{
          console.log("服务器清理成功")
        }).catch(err=>{
          console.log(err)
        })
      }
      if(obj.STU_photoIdz !== '' && obj.STU_photoIdz !== undefined ){
        DeleteCos(this.Secret,obj.STU_photoIdz).then(res =>{
          console.log("服务器清理成功")
        }).catch(err=>{
          console.log(err)
        })
      }
      if(obj.STU_photoIdf !== '' && obj.STU_photoIdf !== undefined){
        DeleteCos(this.Secret,obj.STU_photoIdf).then(res =>{
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
    _sex(row){
      return formatSex(row.STU_gender)
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      getLeFile().then(response =>{
        let Secret = response.data
        let key = 'Student/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.STU_photoIdz = res
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
      getStuFile().then(response =>{
        let Secret = response.data
        let key = 'Student/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.STU_photoIdf = res
          this.$message({
            message: '上传身份证反面成功',
            type: 'success',
            showClose: true
          })
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
      getStuFile().then(response =>{
        let Secret = response.data
        let key = 'Student/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.STU_photo = res
          this.gc = true
          this.$message({
            message: '上传学生图片成功',
            type: 'success',
            showClose: true
          })
        }).catch(error=>{
          this.$message({
            message: '上传学生图片失败，请重新上传'+ error,
            type: 'warning'
          })
        })
      })
    },
    //上传
    submitFile(){
      this.$confirm('请确定图片是否正确，上传后不能修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$refs.LE_idCard01.submit()
          this.$refs.LE_idCard02.submit()
          this.$refs.LE_gc.submit()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: ''
        // });
      });
    },
    //表单渲染
    _education(row){
      return stu_educations(row.STU_education);
    },
    _personnel(row){
      return stu_personnel(row.STU_personnel_category)
    },
    _filed(row){
      return isNot(row.STU_filed_account)
    },
    //上传表单
    handleUpload(row){
      this.form = row
      this.imgOpen = true
    },
  }
}
</script>

<style scoped>

</style>
