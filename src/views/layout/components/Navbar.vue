<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-tag style="float: right;margin-right: 120px; margin-top: 10px">登陆用户：{{this.$store.state.user.emName}}</el-tag>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/images/logo2.png">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <span @click="changePass">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="open" width="500px" append-to-body :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="原密码" prop="old_password">
          <el-input type="password" v-model="form.old_password" placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password1">
          <el-input type="password" v-model="form.new_password1" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password2">
          <el-input type="password" v-model="form.new_password2" placeholder="请再次输入新密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {setPassword} from "../../../api/login";
import {Message} from "element-ui";
import service from "../../../utils/request";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data(){
    return {
      open: false,
      form: {},
      rules: {
        old_password: [
          {required: true, message: "原密码不能为空", trigger: "blur"}
        ],
        new_password1: [
          {required: true, message: "新密码不能为空", trigger: "blur"}
        ],
        new_password2: [
          {required: true, message: "新密码不能为空", trigger: "blur"}
        ],
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changePass(){
      this.open = true
      this.form.id = this.$store.state.user.id
    },
    submitForm(){
      this.$refs["form"].validate(valid =>{
        if(valid){
          setPassword(this.form).then(res =>{
            Message.success('修改成功')
            this.logout()
            this.cancel()
          }).catch(err =>{
            Message.error('修改失败，请检查密码是否输入正确')
          })
        }
      })
    },
    handleClose(done){
      done()
      this.form = {}
    },
    cancel(){
      this.open = false
      this.form = {}
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

