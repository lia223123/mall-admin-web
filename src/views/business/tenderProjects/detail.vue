<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>中标项目详细信息</span>
          </div>
          <div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                项目编号
                <div class="pull-right">{{ Class.tp_projectCode }}</div>
              </li>
              <li class="list-group-item">
                项目名称
                <div class="pull-right">{{ Class.tp_projectName }}</div>
              </li>
              <li class="list-group-item">
                招标单位
                <div class="pull-right">{{ Class.tp_tenderCompany | tenderCom}}</div>
              </li>
              <li class="list-group-item">
                中标单位
                <div class="pull-right">{{ Class.tp_tCompany }}</div>
              </li>
              <li class="list-group-item">
                部门
                <div class="pull-right">{{ Class.tp_part}}</div>
              </li>
              <li class="list-group-item">
                所开班级
                <div class="pull-right">{{ Class.tp_tenderClass}}</div>
              </li>
              <li class="list-group-item">
                负责人
                <div class="pull-right">{{ Class.tp_tPerson }}</div>
              </li>
              <li class="list-group-item">
                负责人联系电话
                <div class="pull-right">{{ Class.tp_tPPhone }}</div>
              </li>
              <li class="list-group-item">
                单位联系电话
                <div class="pull-right">{{ Class.tp_tCPhone }}</div>
              </li>
              <li class="list-group-item">
                联系地址
                <div class="pull-right">{{ Class.tp_address }}</div>
              </li>
              <li class="list-group-item">
                中标金额
                <div class="pull-right">{{ Class.tp_tenderAmount }} 元</div>
              </li>
              <li class="list-group-item">
                项目状态
                <div class="pull-right">{{ Class.tp_status | _status }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>项目信息资料</span>
          </div>
          <el-tabs v-model="active">
            <el-tab-pane label="中标项目基本资料" name="Classinfo">
              <el-form>
                <el-form-item>
                  <el-button @click="()=>{ this.open = true}" type="warning" v-if="hasAuth('tender_edit')">标书上传</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="DidCard" type="primary">标书下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
              <el-dialog title="标书上传" :visible.sync="open" width="600px" append-to-body :before-close="handleClose">
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                  <el-form-item label="标书" prop="tp_url">
                    <el-upload
                      action=""
                      ref="BClass_photo"
                      class="upload-demo"
                      list-type="text"
                      :limit="1"
                      :auto-upload="false"
                      :http-request="DidLoad">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" v-if="this.Class.tp_url">标书已上传</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submitFile">上传服务器</el-button>
                  <el-button type="primary" @click="submit">确 定</el-button>
                  <el-button @click="cancel">取 消</el-button>
                </div>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="修改信息" name="resetInfo">
              <el-form ref="form" :model="Class" :rules="rules" label-width="150px" >
                <el-form-item label="项目编号" prop="tp_projectCode">
                  <el-input v-model="Class.tp_projectCode" placeholder="请输入项目编号" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="项目名称" prop="tp_projectName">
                  <el-input v-model="Class.tp_projectName" placeholder="请输入项目名称" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="招标单位" prop="tp_tenderCompany">
                  <el-select v-model="Class.tp_tenderCompany" placeholder="请输入招标单位" :disabled="isDes">
                    <el-option v-for="item in this.tenderCompany" :label="item.name" :value="item.id" :key="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="中标单位" prop="tp_tCompany">
                  <el-input v-model="Class.tp_tCompany" placeholder="请输入中标单位" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="部门" prop="tp_part">
                  <el-select v-model="Class.tp_part" placeholder="请输入部门" :disabled="isDes">
                    <el-option v-for="item in dept" :key="item.name" :label="item.name" :value="item.name"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="负责人" prop="tp_tPerson">
                  <el-input v-model="Class.tp_tPerson" placeholder="请输入负责人" :disabled="isDes">
                  </el-input>
                </el-form-item>
                <el-form-item label="所开班级" prop="tp_tenderClass">
                  <el-input v-model="Class.tp_tenderClass" placeholder="请输入所开班级" :disabled="isDes">
                  </el-input>
                </el-form-item>
                <el-form-item label="单位联系电话" prop="tp_tCPhone">
                  <el-input v-model="Class.tp_tCPhone" placeholder="请输入单位联系电话" :disabled="isDes" onkeyup="value=value.replace(/[^\d]/g,'')"/>
                </el-form-item>
                <el-form-item label="单位联系地址" prop="tp_address">
                  <el-input v-model="Class.tp_address" placeholder="请输入联系地址" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="中标金额" prop="tp_tenderAmount">
                  <el-input v-model="Class.tp_tenderAmount" placeholder="请输入中标金额" :disabled="isDes">
                  </el-input>
                </el-form-item>
                <el-form-item label="项目状态" prop="tp_tenderAmount">
                  <el-select v-model="Class.tp_status" placeholder="请选择项目状态" :disabled="isDes">
                    <el-option v-for="item in status" :label="item.name" :value="item.value" :key="item.value"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="update" :disabled="!isDes" v-if="hasAuth('tender_edit')">修改</el-button>
                  <el-button type="primary" size="mini" @click="submit" :disabled="isDes" v-if="hasAuth('tender_edit')">保存</el-button>
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
import {DownLoadCos, LEupload, reLoad} from "../../../utils/cos";
import {Message} from "element-ui";
import {getBanFile} from "../../../api/studentsInfo/banFile"
import {editTenderProject, getTenderProject} from "../../../api/tenderproject/tenderProject";
import {tenderCompany} from "../../../utils";
import {getAllFile} from "../../../api/studentsInfo/allFile";

export default {
  name: "detail",
  data(){
    return {
      //表单
      form: {},
      //规则
      rules: {
        tp_projectCode:[
          {required: true, message: "项目编号不能为空", trigger: "blur"}
        ],
        tp_tenderCompany   : [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        tp_tCompany: [
          {required: true, message: "中标单位不能为空", trigger: "blur"}
        ],
        tp_part: [
          {required: true, message: "单位电话不能为空", trigger: "blur"}
        ],
        tp_tCPhone: [
          {required: true, message: "单位联系电话不能为空", trigger: "blur"}
        ],
        tp_tPerson: [
          {required: true, message: "负责人不能为空", trigger: "blur"}
        ],
        tp_tenderAmount: [
          {required: true, message: "中标金额不能为空", trigger: "blur"}
        ],
        tp_address: [
          {required: true, message: "联系地址不能为空", trigger: "blur"}
        ],
        tp_projectName: [
          {required: true, message: "负责人联系电话不能为空", trigger: "blur"}
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
      //需要的参数
      open: false,
      tenderCompany: [
        {name: '人社局',id: 1},
        {name: '公共就业和人才服务中心',id: 2}
      ],
      //部门选择
      dept: [
        {name: '培训一部'},
        {name: '培训二部'},
        {name: '培训三部'},
        {name: '培训四部'},
        {name: '培训五部'},
      ],
      status: [
        {name: '中标', value: 1},
        {name: '投标', value: 2}
      ]
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.id = id
    this.getClass(id)
  },
  methods: {
    //获取信息
    getClass(id){
      getTenderProject(id).then(res =>{
        this.Class = res.data
        console.log(this.Class)
      })
    },
    //下载文件
    DidCard(){
      getAllFile().then(res =>{
        this.Secret = res.data
      })
      this.$confirm('是否下载项目编号为' + this.Class.tp_projectCode + "的标书？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        DownLoadCos(this.Secret,this.Class.tp_url).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch(err =>{
          Message.warning({
            message: '该项目未上传标书',
            showClose: true
          })
        })
      })
    },
    //保存
    submit(){
      editTenderProject(this.Class).then(res =>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.isDes = true
        this.getClass(this.id)
      }).catch(error =>{
        this.$message({
          message: '请检查项目编号是否有重复，如果没有重复请联系管理员',
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
      })
      this.$confirm("是否上传标书？已有标书再上传会覆盖上一个标书",'警告',{
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(()=>{
        if(!this.Class.tp_url){
          LEupload(this.Secret,file.file,"tender/").then(res=>{
            this.Class.tp_url = res
            this.$message({
              message: '上传标书成功',
              type: 'success',
              showClose: true
            })
            this.open = false
          }).catch(error=>{
            this.$message({
              message: '上传标书失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
          })
        }else {
          reLoad(this.Secret, file.file, this.Class.tp_url).then(res =>{
            this.$message({
              message: '上传标书成功',
              type: 'success',
              showClose: true
            })
          }).catch(error=>{
            this.$message({
              message: '上传标书失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
          })
        }
      })
    },
    //关闭弹窗
    handleClose(done){
      this.$confirm('此操作将清空之前填写的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.BClass_photo.clearFiles()
        done()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    submitFile(){
      this.$refs.BClass_photo.submit()
    },
    cancel(){
      this.open = false
      this.$refs.BClass_photo.clearFiles()
    }
  },
  //过滤器
  filters: {
    tenderCom(num){
      return tenderCompany(num)
    },
    _status(row){
      if(row === 1){
        return '中标'
      }else return '投标'
    }
  }
}
</script>

<style scoped>

</style>
