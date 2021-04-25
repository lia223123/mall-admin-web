<template>
  <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>讲师详细信息</span>
            </div>
            <div>
              <div class="text-center" style="height: 100px">

              </div>
              <ul class="list-group list-group-striped">
                <li class="list-group-item">
                  讲师编号
                  <div class="pull-right">{{ user.LEid }}</div>
                </li>
                <li class="list-group-item">
                  姓名
                  <div class="pull-right">{{ user.LE_name }}</div>
                </li>
                <li class="list-group-item">
                  性别
                  <div class="pull-right">{{ user.LE_gender | _sex }}</div>
                </li>
                <li class="list-group-item">
                  授课范围
                  <div class="pull-right">{{ user.LE_lev }}</div>
                </li>
                <li class="list-group-item">
                  电话号码
                  <div class="pull-right">{{ user.LE_phone }}</div>
                </li>
                <li class="list-group-item">
                  身份证
                  <div class="pull-right">{{ user.LE_cid }}</div>
                </li>
                <li class="list-group-item">
                 银行开户行
                  <div class="pull-right">{{ user.LE_bankName }}</div>
                </li>
                <li class="list-group-item">
                  银行卡号
                  <div class="pull-right">{{ user.LE_bankCode }}</div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>讲师信息资料</span>
            </div>
            <el-tabs v-model="active">
              <el-tab-pane label="基本资料" name="userinfo">
                <el-form>
                  <el-form-item>
                    <el-button @click="updateInfo" type="warning">图片资料修改</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="DidCard"  type="primary">身份证资料下载</el-button>
                    <el-button @click="DDiploma" type="primary">毕业证资料下载</el-button>
                    <el-button @click="DOccupation" type="primary">职业资格证资料下载</el-button>
                    <el-button @click="DAgreement" type="primary">协议合同资料下载</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" size="mini" @click="back">返回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="修改信息" name="resetInfo">
                <el-form ref="form" :model="user" :rules="rules" label-width="100px">
                  <el-form-item label="讲师编号" prop="LEid" >
                    <el-input v-model="user.LEid" placeholder="请输入讲师编号"  :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="身份证" prop="LE_cid" >
                    <el-input v-model="user.LE_cid" placeholder="请输入身份证" :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="讲师姓名" prop="LE_name">
                    <el-input v-model="user.LE_name" placeholder="请输入讲师姓名" :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="授课范围" prop="LE_lev">
                    <el-input v-model="user.LE_lev" placeholder="请输入授课范围" :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="性别" prop="LE_gender">
                    <el-select v-model="user.LE_gender" placeholder="请选择员工性别" :disabled="isDes">
                      <el-option value="1" label="男"/>
                      <el-option value="2" label="女"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="LE_phone">
                    <el-input v-model="user.LE_phone" placeholder="请输入手机号码" :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="银行开户行" prop="LE_bankName">
                    <el-input v-model="user.LE_bankName" placeholder="请输入银行开户行" :disabled="isDes"/>
                  </el-form-item>
                  <el-form-item label="银行卡号" prop="LE_bankCode">
                    <el-input v-model="user.LE_bankCode" placeholder="请输入银行卡号" :disabled="isDes"/>
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
      <el-form ref="form" :model="user" label-width="110px">
        <el-form-item label="身份证正面" prop="LE_idCard01" size="small">
          <el-upload
            action=""
            class="upload-demo"
            list-type="picture"
            ref="LE_idCard01"
            :limit="1"
            :http-request="handleBeforeCard"
            :auto-upload="false">
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.LE_idCard01">身份证已上传</div>
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
            :http-request="handleBeforeGc">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.LE_gc">毕业证已上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="职业资格证" prop="LE_pqc">
          <el-upload
            action=""
            ref="LE_pqc"
            class="upload-demo"
            list-type="picture"
            :limit="1"
            :auto-upload="false"
            :http-request="handleBeforepqc">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.LE_pqc">职业资格证已上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="讲课协议合同" prop="LE_contents">
          <el-upload
            action=""
            class="upload-demo"
            ref="LE_contents"
            :limit="1"
            :http-request="handleBeforeCo"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.user.LE_contents">讲课协议合同已上传</div>
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
import {editLecturers, getLecturers} from "../../../api/studentsInfo/lecturers";
import {formatSex} from "../../../utils";
import {DownLoadCos, LEupload, reLoad} from "../../../utils/cos";
import {getLeFile} from "../../../api/studentsInfo/leFile";
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
      getLecturers(id).then(res =>{
        this.user = res.data
        this.user.LE_gender = this.user.LE_gender.toString()
      })
    },
    //下载文件
    DidCard(){
      getAllFile().then(res =>{
        this.Secret = res.data
      })
      this.$confirm('是否下载讲师编号为' + this.user.LEid + "的讲师身份证？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        DownLoadCos(this.Secret,this.user.LE_idCard01).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch((err)=> {
          console.log(err)
          Message.warning({
            message: '该讲师未上传职业资格证'
          })
        })
      })
    },
    DDiploma(){
      this.$confirm('是否下载讲师编号为' + this.user.LEid + "的讲师毕业证？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getAllFile().then(res =>{
          this.Secret = res.data
        })
        DownLoadCos(this.Secret,this.user.LE_gc).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch(()=> {
          Message.warning({
            message: '该讲师未上传毕业证'
          })
        })
      })
    },
    DOccupation(){
      this.$confirm('是否下载讲师编号为' + this.user.LEid + "的讲师职业资格证？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getLeFile().then(res =>{
          this.Secret = res.data
        })
        DownLoadCos(this.Secret,this.user.LE_pqc).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch(()=> {
          Message.warning({
            message: '该讲师未上传职业资格证'
          })
        })
      })
    },
    DAgreement(){
      this.$confirm('是否下载讲师编号为' + this.user.LEid + "的讲师协议书？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getLeFile().then(res =>{
          this.Secret = res.data
        })
        DownLoadCos(this.Secret,this.user.LE_contents).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch(()=>{
          Message.warning({
            message: '该讲师未上传协议书'
          })
      })
      })
    },
    //保存
    submit(){
      editLecturers(this.user).then(res =>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.isDes = true
        this.updateOpen = false
        this.reset()
        this.getUser(this.id)
      }).catch(error =>{
        this.$message({
          message: '请检查身份证与讲师编号是否有重复，如果没有重复请联系管理员',
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
    updateInfo(){
      this.updateOpen = true
    },
    submitFile(){
      this.$confirm('请确定图片是否正确，上传后不能修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.LE_idCard01.submit()
        this.$refs.LE_pqc.submit()
        this.$refs.LE_contents.submit()
        this.$refs.LE_gc.submit()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: ''
        // });
      });
    },
    //上传
    handleBeforeCard(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        if(this.user.LE_idCard01){
          reLoad(Secret, file.file, this.user.LE_idCard01).then(res =>{
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
            this.user.LE_idCard01 = res
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
    handleBeforeGc(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        if(this.user.LE_gc){
          reLoad(Secret,file.file,this.user.LE_gc).then(res=>{
            this.$message({
              message: '上传毕业证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身毕业证失败，请重新上传'+ error,
              type: 'warning'
            })
            file.onError()
          })
        }else {
          LEupload(Secret,file.file,key).then(res=>{
            this.user.LE_gc = res
            this.$message({
              message: '上传毕业证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传身毕业证失败，请重新上传'+ error,
              type: 'warning'
            })
            file.onError()
          })
        }
      })
    },
    handleBeforepqc(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        if(this.user.LE_pqc){
          reLoad(Secret, file.file, this.user.LE_pqc).then(res=>{
            this.$message({
              message: '上传资格证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传资格证失败，请重新上传'+ error,
              type: 'warning',
              showClose: true
            })
            file.onError()
          })
        }else {
          LEupload(Secret,file.file,key).then(res=>{
            this.user.LE_pqc = res
            this.$message({
              message: '上传资格证成功',
              type: 'success',
              showClose: true
            })
            file.onSuccess()
          }).catch(error=>{
            this.$message({
              message: '上传资格证失败，请重新上传'+ error,
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
        let key = 'LETeacher/'
        if(this.user.LE_contents){
          reLoad(Secret, file.file, this.user.LE_contents).then(res =>{
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
            this.user.LE_contents = res
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
    handleClose(done){
      done()
      this.reset()
    },
    cancel(){
      this.updateOpen = false
      this.reset()
    },
    reset(){
      this.$refs.LE_idCard01.clearFiles()
      this.$refs.LE_pqc.clearFiles()
      this.$refs.LE_contents.clearFiles()
      this.$refs.LE_gc.clearFiles()
    },
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
