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
                  <el-button @click="DidCard"  >身份证正面资料下载</el-button>
                  <el-button @click="DAgreement" >协议合同资料下载</el-button>
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
                  <el-input v-model="user.AD_cid" placeholder="请输入身份证" :disabled="isDes"/>
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
                  <el-input v-model="user.AD_bankCode" placeholder="请输入银行卡号" :disabled="isDes"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="update" :disabled="!isDes">修改</el-button>
                  <el-button type="primary" size="mini" @click="submit" :disabled="isDes">保存</el-button>
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
import {formatSex} from "../../../utils";
import {DownLoadCos} from "../../../utils/cos";
import {getLeFile} from "../../../api/studentsInfo/leFile";
import {editAdTeacher, getAdTeacher} from "../../../api/studentsInfo/adTeacher";
import {Message} from "element-ui";

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
      Secret: {}
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
      getLeFile().then(res =>{
        this.Secret = res.data
      })
      this.$confirm('是否下载招生老师编号为' + this.user.ADid + "的招生老师身份证正面？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
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
    },
    DAgreement(){
      this.$confirm('是否下载招生老师编号为' + this.user.ADid + "的招生老师协议书？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getLeFile().then(res =>{
          this.Secret = res.data
        })
        DownLoadCos(this.Secret,this.user.AD_contents).then(res=>{
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          }
        ).catch(err =>{
          Message.warning({
            message: '改员工未上传身份证'+err,
            showClose: true
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
