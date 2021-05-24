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
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="讲课老师编号" align="center" prop="LEid">
        <template slot-scope="scope">
          <router-link :to="'/lecturesDetail/' + scope.row.id" class="link-type">
            <el-tooltip content="点击查看详细信息" placement="top">
              <span style="color: #1e6abc">{{ scope.row.LEid }}</span>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="讲课老师姓名" align="center" prop="LE_name"/>
      <el-table-column label="性别" align="center" prop="LE_gender" :formatter="_sex"/>
      <el-table-column label="电话" align="center" prop="LE_phone"/>
      <el-table-column label="授课范围" align="center" prop="LE_lev"/>
      <el-table-column label="身份证号" align="center" prop="LE_cid"/>
      <el-table-column label="银行卡开户行" align="center" prop="LE_bankName"/>
      <el-table-column label="银行卡号" align="center" prop="LE_bankCode"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body  :before-close="handleClose">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 1">
        <el-form-item label="讲师编号" prop="LEid">
          <el-input v-model="form.LEid" placeholder="请输入讲师编号" />
        </el-form-item>
        <el-form-item label="身份证" prop="LE_cid">
          <el-input v-model="form.LE_cid" placeholder="请输入身份证" maxlength="18"/>
        </el-form-item>
        <el-form-item label="讲师姓名" prop="LE_name">
          <el-input v-model="form.LE_name" placeholder="请输入讲师姓名" />
        </el-form-item>
        <el-form-item label="授课范围" prop="LE_lev">
          <el-input v-model="form.LE_lev" placeholder="请输入授课范围" />
        </el-form-item>
        <el-form-item label="手机号码" prop="LE_phone">
          <el-input v-model="form.LE_phone" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')"
                    maxlength='11' />
        </el-form-item>
        <el-form-item label="银行卡开户行" prop="LE_bankName">
          <el-input v-model="form.LE_bankName" placeholder="请输入银行卡开户行" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="LE_bankCode">
          <el-input v-model="form.LE_bankCode" placeholder="请输入银行卡号" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength='22'/>
        </el-form-item>
        <el-form-item label="性别" prop="LE_gender">
          <el-select v-model="form.LE_gender" placeholder="请选择讲师性别">
            <el-option value="1" label="男"/>
            <el-option value="2" label="女"/>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" v-if="active === 2" >
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
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.form.LE_idCard01">身份证已上传</div>
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
            <div slot="tip" class="el-upload__tip" v-if="this.form.LE_gc">毕业证已上传</div>
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
            :http-request="handleBeforepqc"
            :on-preview="handlePictureCardPreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="this.form.LE_pqc">职业资格证已上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="讲课协议合同" prop="LE_contents">
          <el-upload
            action=""
            class="upload-demo"
            ref="LE_contents"
            :disabled="contents"
            :limit="1"
            :http-request="handleBeforeCo"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="active===2">
        <el-button type="primary" @click="submitFile">上传服务器</el-button>
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
import {addLecturers, deleteLecturers, getLecturers, listLecturers} from "../../../api/studentsInfo/lecturers";
import {formatSex} from "../../../utils";
import {DeleteCos, LEupload} from "../../../utils/cos";
import {Message} from "element-ui";
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
      //是否禁用
      idcard01: false,
      idcard02: false,
      gc: false,
      pqc: false,
      contents: false,
      //查询参数
      query:[
        {name:'讲师编号',id: 'LEid'},
        {name:'讲师姓名',id: 'LE_name'},
        {name:'身份证',id: 'LE_cid'},
        {name:'银行开户行',id: 'LE_bankName'},
        {name:'银行卡号',id: 'LE_bankCode'},
      ],
      rules: {
        LEid:[
          {required: true, message: "讲师编号不能为空", trigger: "blur"}
        ],
        LE_cid: [
          {required: true, message: "身份证不能为空", trigger: "blur"}
        ],
        LE_name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        LE_gender: [
          {required: true, message: "性别不能为空", trigger: "blur"}
        ],
        LE_phone: [
          {required: true, message: "电话不能为空", trigger: "blur"}
        ],
        LE_bankName: [
          {required: true, message: "银行卡开户行不能为空", trigger: "blur"}
        ],
        LE_bankCode: [
          {required: true, message: "银行卡号不能为空", trigger: "blur"}
        ],
        LE_lev: [
          {required: true, message: "授课范围不能为空", trigger: "blur"}
        ]
      },
      Secret: {}
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      listLecturers().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        LEid: undefined,
        LE_cid: undefined,
        LE_name: undefined,
        LE_gender: undefined,
        LE_phone: undefined,
        LE_bankName: undefined,
        LE_bankCode: undefined,
        LE_idCard01: undefined,
        LE_idCard02: undefined,
        LE_gc: undefined,
        LE_pqc: undefined,
        LE_contents: undefined,
      };
      this.active = 1;
      this.$refs['form'].resetFields();
      this.$refs.LE_idCard01.clearFiles()
      this.$refs.LE_pqc.clearFiles()
      this.$refs.LE_contents.clearFiles()
      this.$refs.LE_gc.clearFiles()
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
      this.$confirm('是否删除讲师编号为' + row.LEid + "的讲师信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        getLecturers(row.id).then(res =>{
          this.resetFW(res.data)
        }).catch(err=>{
          console.log(err)
        })
        deleteLecturers(row.id).then(res =>{
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
      getAllFile().then(res=>{
        this.Secret = res.data
      })
        if(obj.LE_idCard01){
          DeleteCos(this.Secret,obj.LE_idCard01).then(res =>{
            console.log("服务器清理成功")
          }).catch(err=>{
            console.log(err)
          })
        }
        if(obj.LE_idCard02){
          DeleteCos(this.Secret,obj.LE_idCard02).then(res =>{
            console.log("服务器清理成功")
          }).catch(err=>{
            console.log(err)
          })
        }
        if(obj.LE_gc){
          DeleteCos(this.Secret,obj.LE_gc).then(res =>{
            console.log("服务器清理成功")
          }).catch(err=>{
            console.log(err)
          })
        }
        if(obj.LE_contents){
          DeleteCos(this.Secret,obj.LE_contents).then(res =>{
            console.log("服务器清理成功")
          }).catch(err=>{
            console.log(err)
          })
        }
        if(obj.LE_pqc){
          DeleteCos(this.Secret,obj.LE_pqc).then(res =>{
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
      return formatSex(row.LE_gender)
    },
    //提交之前图片上传服务器
    handleBeforeCard(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_idCard01 = res
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
    handleBeforeGc(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_gc = res
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
      })
    },
    handleBeforepqc(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_pqc = res
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
      })
    },
    handleBeforeCo(file){
      getAllFile().then(response =>{
        let Secret = response.data
        let key = 'LETeacher/'
        LEupload(Secret,file.file,key).then(res=>{
          this.form.LE_contents = res
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
  }
}
</script>

<style scoped>

</style>
