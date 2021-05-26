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
          v-if="hasAuth('ad_create')"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" border >
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="招生老师编号" align="center" prop="ADid">
        <template slot-scope="scope">
          <router-link :to="'/adminssions/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.ADid }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="招生老师姓名" align="center" prop="AD_name"/>
      <el-table-column label="性别" align="center" prop="AD_gender" :formatter="_sex"/>
      <el-table-column label="电话" align="center" prop="AD_phone"/>
      <el-table-column label="身份证号" align="center" prop="AD_cid"/>
      <el-table-column label="银行卡开户行" align="center" prop="AD_bankName"/>
      <el-table-column label="银行卡号" align="center" prop="AD_bankCode"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-if="hasAuth('ad_delete')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body  :before-close="handleClose">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 1">
        <el-form-item label="招生老师编号" prop="ADid">
          <el-input v-model="form.ADid" placeholder="请输入招生老师编号" />
        </el-form-item>
        <el-form-item label="身份证" prop="AD_cid">
          <el-input v-model="form.AD_cid" placeholder="请输入身份证" maxlength="18"/>
        </el-form-item>
        <el-form-item label="招生老师姓名" prop="AD_name">
          <el-input v-model="form.AD_name" placeholder="请输入招生老师姓名" />
        </el-form-item>
        <el-form-item label="招生人数" prop="AD_stu">
          <el-input v-model="form.AD_stu" placeholder="请输入招生人数" />
        </el-form-item>
        <el-form-item label="手机号码" prop="AD_phone">
          <el-input v-model="form.AD_phone" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')"
                    maxlength='11' />
        </el-form-item>
        <el-form-item label="银行卡开户行" prop="AD_bankName">
          <el-input v-model="form.AD_bankName" placeholder="请输入银行卡开户行" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="AD_bankCode">
          <el-input v-model="form.AD_bankCode" placeholder="请输入银行卡号" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength='22'/>
        </el-form-item>
        <el-form-item label="性别" prop="AD_gender">
          <el-select v-model="form.AD_gender" placeholder="请选择招生老师性别">
            <el-option value="1" label="男"/>
            <el-option value="2" label="女"/>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 2" >
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
            <div slot="tip" class="el-upload__tip" v-if="this.form.AD_idCard01">身份证已上传</div>
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
            <div slot="tip" class="el-upload__tip" v-if="this.form.AD_contents">讲课协议已上传</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="active===2">
        <el-button type="primary" @click="submitfile">上传服务器</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-top: 12px;" @click="up" v-if="active === 2">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next" v-if="active === 1">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatSex} from "../../../utils";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
import {getAdFile} from "../../../api/studentsInfo/adFile";
import {addAdTeacher, deleteAdTeacher, getAdTeacher, listAdTeacher} from "../../../api/studentsInfo/adTeacher";
import {getAllFile} from "../../../api/studentsInfo/allFile";

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
        {name:'招生老师编号',id: 'ADid'},
        {name:'招生老师姓名',id: 'AD_name'},
        {name:'身份证',id: 'AD_cid'},
        {name:'银行开户行',id: 'AD_bankName'},
        {name:'银行卡号',id: 'AD_bankCode'},
      ],
      rules: {
        ADid:[
          {required: true, message: "招生老师编号不能为空", trigger: "blur"}
        ],
        AD_cid: [
          {required: true, message: "身份证不能为空", trigger: "blur"}
        ],
        AD_name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        AD_gender: [
          {required: true, message: "性别不能为空", trigger: "blur"}
        ],
        AD_phone: [
          {required: true, message: "电话不能为空", trigger: "blur"}
        ],
        AD_bankName: [
          {required: true, message: "银行卡开户行不能为空", trigger: "blur"}
        ],
        AD_bankCode: [
          {required: true, message: "银行卡号不能为空", trigger: "blur"}
        ],
        AD_stu: [
          {required: true, message: "招生人数不能为空", trigger: "blur"}
        ],
        // AD_contents: [
        //   {required: true, message: "讲课协议合同未上传", trigger: "blur"}
        // ],
        // AD_idCard01: [
        //   {required: true, message: "身份证正面未上传", trigger: "blur"}
        // ]
      },
      Secret: {}
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listAdTeacher().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      }).catch(err=>{
        this.$notify({
          title: '错误',
          message: '没有查询招生老师信息权限',
          type: 'error'
        });
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        ADid: undefined,
        AD_cid: undefined,
        AD_name: undefined,
        AD_gender: undefined,
        AD_phone: undefined,
        AD_stu: undefined,
        AD_bankName: undefined,
        AD_bankCode: undefined,
        AD_idCard01: undefined,
        AD_contents: undefined,
      };
      this.active = 1;
      this.$refs['form'].resetFields();
      this.$refs.AD_idCard01.clearFiles()
      this.$refs.AD_contents.clearFiles()
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
      this.title = "新增招生老师";
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除招生老师编号为' + row.ADid + "的招生老师信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getAdTeacher(row.id).then(res =>{
          this.resetFW(res.data)
        }).catch(err=>{
          console.log(err)
        })
        deleteAdTeacher(row.id).then(res =>{
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
          message: '已取消',
        });
      });
    },
    //确定按钮
    submitForm(){
      this.$refs["form"].validate(valid => {
        if(valid){
          addAdTeacher(this.form).then(response => {
            this.$message({
              message: "新增成功",
              type: 'success',
              showClose: true
            });
            this.open = false;
            this.getList();
            this.reset();
          }).catch(() =>{
            this.$message({
              message: '该招生老师身份证或编号已存在或身份证与电话号码格式不正确，请修改后再确定',
              type: 'warning',
              showClose: true
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
        this.open = false
        this.resetFW(this.form)
        this.reset()
      }).catch(() => {
      });
    },
    //查询
    handleFind(){
      if(this.select === '') {
        this.$message({
          message: '请先选择查询类型',
          type: 'warning',
          showClose: true
        })
      }else if(this.find === '') {
        this.$message({
          message: '请输入查询内容',
          type: 'warning',
          showClose: true
        })
      }else {
        let json = {}
        json[this.select] = this.find
        listAdTeacher(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    //清除之前上传服务器的数据
    resetFW(obj){
      getAllFile().then(res=>{
        this.Secret = res.data
      })
      if(obj.AD_idCard01){
        DeleteCos(this.Secret,obj.AD_idCard01).then(() =>{
          console.log("服务器清理成功")
        }).catch(err=>{
          console.log(err)
        })
      }
      if(obj.AD_contents){
        DeleteCos(this.Secret,obj.AD_contents).then(() =>{
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
      return formatSex(row.AD_gender)
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'ADTeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.AD_idCard01 = res
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
      })
    },
    handleBeforeCo(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'ADTeacher/'
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
      })
    },
    //上传
    submitfile(){
      this.$confirm('请确定图片是否正确，上传后不能修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$refs.AD_idCard01.submit()
          this.$refs.AD_contents.submit()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: ''
        // });
      });
    },
  }
}
</script>

<style scoped>

</style>
