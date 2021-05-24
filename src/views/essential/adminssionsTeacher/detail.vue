<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>招生老师详细信息</span>
          </div>
          <div>
            <div class="text-center" style="height: 100px">

            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                招生老师编号
                <div class="pull-right">{{ user.ADid }}</div>
              </li>
              <li class="list-group-item">
                姓名
                <div class="pull-right">{{ user.AD_name }}</div>
              </li>
              <li class="list-group-item">
                性别
                <div class="pull-right">{{ user.AD_gender | _sex }}</div>
              </li>
              <li class="list-group-item">
                招生人数
                <div class="pull-right">{{ user.AD_stu }}</div>
              </li>
              <li class="list-group-item">
                电话号码
                <div class="pull-right">{{ user.AD_phone }}</div>
              </li>
              <li class="list-group-item">
                身份证
                <div class="pull-right">{{ user.AD_cid }}</div>
              </li>
              <li class="list-group-item">
                银行开户行
                <div class="pull-right">{{ user.AD_bankName }}</div>
              </li>
              <li class="list-group-item">
                银行卡号
                <div class="pull-right">{{ user.AD_bankCode }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>招生老师信息资料</span>
          </div>
          <el-tabs v-model="active">
            <el-tab-pane label="基本资料" name="userinfo">
              <el-form>
                <el-form-item>
                  <el-button @click="()=>{this.updateOpen = true}" type="warning">招生老师图片资料上传</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="DidCard" type="primary">身份证正面资料下载</el-button>
                  <el-button @click="DAgreement" type="primary">协议合同资料下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>

            </el-tab-pane>
            <el-tab-pane label="修改信息" name="resetInfo">
              <el-form ref="form" :model="user" :rules="rules" label-width="100px">
                <el-form-item label="招生老师编号" prop="ADid" >
                  <el-input v-model="user.ADid" placeholder="请输入招生老师编号"  :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="身份证" prop="AD_cid" >
                  <el-input v-model="user.AD_cid" placeholder="请输入身份证" :disabled="isDes" maxlength="18"/>
                </el-form-item>
                <el-form-item label="招生老师姓名" prop="AD_name">
                  <el-input v-model="user.AD_name" placeholder="请输入招生老师姓名" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="招生人数" prop="AD_stu">
                  <el-input v-model="user.AD_stu" placeholder="请输入招生人数" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="性别" prop="AD_gender">
                  <el-select v-model="user.AD_gender" placeholder="请选择员工性别" :disabled="isDes">
                    <el-option value="1" label="男"/>
                    <el-option value="2" label="女"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="AD_phone">
                  <el-input v-model="user.AD_phone" placeholder="请输入手机号码" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="银行开户行" prop="AD_bankName">
                  <el-input v-model="user.AD_bankName" placeholder="请输入银行开户行" :disabled="isDes"/>
                </el-form-item>
                <el-form-item label="银行卡号" prop="AD_bankCode">
                  <el-input v-model="user.AD_bankCode" placeholder="请输入银行卡号" :disabled="isDes" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength='22'/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="update" :disabled="!isDes">修改</el-button>
                  <el-button type="primary" size="mini" @click="submit" :disabled="isDes">保存</el-button>
                  <el-button type="danger" size="mini" @click="back">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="财务提成" name="finance"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="updateOpen" width="500px" append-to-body title="资料修改" :before-close="handleClose">
      <el-form ref="form" :model="user" :rules="rules" label-width="110px">
        <el-form-item label="身份证" prop="AD_idCard01" size="small">
          <el-upload
            action=""
            class="upload-demo"
            list-type="picture"
            ref="AD_idCard01"
            :limit="1"
            :http-request="handleBeforeCard"
            :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.AD_idCard01">身份证已上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="讲课协议合同" prop="AD_contents">
          <el-upload
            action=""
            class="upload-demo"
            ref="AD_contents"
            :limit="1"
            :http-request="handleBeforeCo"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.AD_contents">讲课协议已上传</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFile">上传服务器</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatSex} from "../../../utils";
import {DownLoadCos, LEupload, reLoad} from "../../../utils/cos";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {editAdTeacher, getAdTeacher} from "../../../api/studentsInfo/adTeacher";
import {Message} from "element-ui";
import {getAllFile} from "../../../api/studentsInfo/allFile";

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
      updateOpen: false
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.id = id
    this.getUser(id)
  },
  methods: {
    //获取信息
    getUser(id){
      getAdTeacher(id).then(res =>{
        this.user = res.data
        this.user.AD_gender = this.user.AD_gender.toString()
      })
    },
    //下载文件
    DidCard(){
      this.$confirm('是否下载招生老师编号为' + this.user.ADid + "的招生老师身份证？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
      getAllFile().then(res =>{
        this.Secret = res.data
      }).then(()=>{
          DownLoadCos(this.Secret,this.user.AD_idCard01).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(err=>{
            Message.warning({
              message: '改员工未上传身份证' + err,
              showClose: true
            })
          })
        })
      })
    },
    DAgreement(){
      this.$confirm('是否下载招生老师编号为' + this.user.ADid + "的招生老师协议书？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getAllFile().then(res =>{
          this.Secret = res.data
        }).then(()=>{
          DownLoadCos(this.Secret,this.user.AD_contents).then(res=>{
              window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
            }
          ).catch(err =>{
            Message.warning({
              message: '该员工未上传身份证'+err,
              showClose: true
            })
          })
        })
      })

    },
    //保存
    submit(){
      editAdTeacher(this.user).then(res =>{
        this.$message({
          message: '修改成功',
          type: 'success',
          showClose: true
        });
        this.isDes = true
        this.updateOpen = false
        // this.$refs.AD_idCard01.clearFiles()
        // this.$refs.AD_contents.clearFiles()
        this.getUser(this.id)
      }).catch(error =>{
        this.$message({
          message: '请检查身份证与招生老师编号是否有重复，如果没有重复请联系管理员',
          type: 'warning',
          showClose: true
        });
      })
    },
    update(){
      this.isDes = false
    },
    back(){
      this.$router.go(-1)
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'ADTeacher/'
        if(this.user.AD_idCard01){
          reLoad(Secret, file.file, this.user.AD_idCard01).then(res =>{
            this.$message({
              message: '上传身份证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        }else {
          LEupload(Secret,file.file,key).then(res=>{
            this.user.AD_idCard01 = res
            this.$message({
              message: '上传身份证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身份证失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        }
      })
    },
    handleBeforeCo(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'ADTeacher/'
        if(this.user.AD_contents){
          reLoad(Secret,file.file, this.user.AD_contents).then(res =>{
            this.$message({
              message: '上传协议成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传协议失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        }else {
          LEupload(Secret,file.file,key).then(res=>{
            this.user.AD_contents = res
            this.$message({
              message: '上传协议成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传协议失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        }
      })
    },
    submitFile(){
      this.$confirm('请确定图片是否正确，上传后不能修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.AD_idCard01.submit()
        this.$refs.AD_contents.submit()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '上传失败'
        });
      });
    },
    cancel(){
      this.updateOpen = false
      this.$refs.AD_idCard01.clearFiles()
      this.$refs.AD_contents.clearFiles()
    },
    handleClose(){
      this.updateOpen = false
      this.$refs.AD_idCard01.clearFiles()
      this.$refs.AD_contents.clearFiles()
    }
  },

  filters: {
    //过滤器
    _sex(num){
      num = parseInt(num)
      return formatSex(num)
    }
  }
}
</script>

<style scoped>

</style>
