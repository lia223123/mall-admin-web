<template>
  <div class="app-container">
    <div style="margin: 25px 5px">
      <el-button type="primary" round @click="()=>{this.upOpen = true}">上传文件</el-button>
    </div>
    <el-row :gutter="5">
      <el-col :span="6">
        <el-card class="box-card" style="background-image: linear-gradient(to top,#96f5da,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>公司报表</span>
          </div>
          <div class="text item" v-if="reportForm.Contents">
            <div>
              <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchReport">
              </el-input>
            </div>
            <el-table :data="reportForm.Contents.filter(data => !searchReport || data.Key.toLowerCase().includes(searchReport.toLowerCase()))" border v-loading="loading1"  height="570px">
             <el-table-column label="名称" prop="Key" width="307px" align="center"/>
             <el-table-column label="操作" align="center" width="70px">
               <template slot-scope="scope">
                 <el-button
                   size="mini"
                   type="text"
                   @click="DownLoad(scope.row)"
                 >下载</el-button>
               </template>
             </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="background-image: linear-gradient(to top,#a7b1ff,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>公司案例</span>
          </div>
          <div class="text item" v-if="this.case.Contents">
            <div>
              <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchCase">
              </el-input>
            </div>
            <el-table :data="this.case.Contents.filter(data => !searchCase || data.Key.toLowerCase().includes(searchCase.toLowerCase()))" border v-loading="loading2" height="570px">
              <el-table-column label="名称" prop="Key" width="307px" align="center"/>
              <el-table-column label="操作" align="center" width="70px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="DownLoad(scope.row)"
                  >下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="background-image: linear-gradient(to top, #fff2ad,#d3dce6)">
          <div slot="header" class="clearfix" >
            <span>公司资质</span>
          </div>
          <div class="text item" v-if="qualifications.Contents">
            <div>
              <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchQualifications">
              </el-input>
            </div>
            <el-table :data="qualifications.Contents.filter(data => !searchQualifications || data.Key.toLowerCase().includes(searchQualifications.toLowerCase()))" border v-loading="loading3" height="570px">
              <el-table-column label="名称" prop="Key" width="307px" align="center"/>
              <el-table-column label="操作" align="center" width="70px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="DownLoad(scope.row)"
                  >下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="background-image: linear-gradient(to top, #ffd0e5,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>其他</span>
          </div>
          <div class="test item" v-if="other.Contents">
            <div>
              <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchOther"/>
            </div>
            <el-table :data="other.Contents.filter(data => !searchOther || data.Key.toLowerCase().includes(searchOther.toLowerCase()))" border v-loading="loading4" height="570px">
              <el-table-column label="名称" prop="Key" width="307px" align="center"/>
              <el-table-column label="操作" align="center" width="70px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="DownLoad(scope.row)"
                  >下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="文件上传"  :visible.sync="upOpen"  width="500px" append-to-body  :before-close="handleClose">
      <el-form ref="docValidate" :rules="rules" :model="form">
        <el-form-item label="资料类型" label-width="80px" prop="Doc">
          <el-select placeholder="请选择文件类型" v-model="form.Doc">
            <el-option v-for="item in DocType" :key="item.value" :label="item.type" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="upload"
            :on-success="Success"
            :before-upload="Before"
            :http-request="Upload"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="el-dialog__footer">
        <el-button type="danger" @click="cancel" :disabled="DisButton">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {DownLoadCos, getBucket, reLoad} from "../../utils/cos";
import {getAllFile} from "../../api/studentsInfo/allFile";
import {Message} from "element-ui";

export default {
  name: "index",
  data() {
    return {
      reportForm: {},
      qualifications: {},
      case: {},
      other: {},
      form: {},
      upOpen: false,
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      DisButton: false,
      searchReport: '',
      searchQualifications: '',
      searchCase: '',
      searchOther: '',
      DocType: [
        {type: '公司资质',value: '公司资质/'},
        {type: '公司报表',value: '公司报表/'},
        {type: '公司案例',value: '公司案例/'},
        {type: '其他',value: '其他/'},
      ],
      rules: {
        Doc: [
          {required: true, message: '文件类型不能为空', trigger: 'blur'}
        ]
      },
      int: 0,
    };
  },
  created(){
   this.getList()
  },
  mounted() {

  },
  methods: {
    getList(){
      this.loading1 = true
      this.loading2 = true
      this.loading3 = true
      this.loading4 = true
      getAllFile().then(res =>{
        getBucket(res.data, "公司报表/").then(response=>{
          this.reportForm = response
          this.loading1 = false
        });
        getBucket(res.data, "公司案例/").then(response=>{
          this.case = response
          this.loading2 = false
        });
        getBucket(res.data, "公司资质/").then(response=>{
          this.qualifications = response
          this.loading3 = false
        });
        getBucket(res.data, "其他/").then(response=>{
          this.other = response
          this.loading4 = false
        });
      });
    },
    //下载
    DownLoad(row){
      this.$confirm('确定下载名称为'+ row.Key + '的文件？','下载',{
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: "warning"
      }).then(()=>{
        getAllFile().then(res =>{
          DownLoadCos(res.data,row.Key).then(res=> {
            window.open(res, '_blank', 'fullscreen=no,width=500,height=500')
          })
        })
      })
    },
    //上传
    submitUpload(){
      this.$refs.docValidate.validate(valid=>{
        if(valid){
         this.$refs.upload.submit();
        }
      })
    },
    Upload(file){
      getAllFile().then(res=>{
        let key = this.form.Doc+file.file.name
        getBucket(res.data,key).then(response =>{
          if(response.Contents.length < 1){
            reLoad(res.data,file.file,key).then(() =>{
              this.int ++
              file.onSuccess()
            })
          }else {
            this.$confirm('文件名为'+ file.file.name + '已存在，是否覆盖它？','title',{
              confirmButtonText: '确定覆盖',
              cancelButtonText: '不覆盖',
              type: "warning"
            }).then(()=>{
              reLoad(res.data,file.file,key).then(() =>{
                this.int ++
                file.onSuccess()
              })
            }).catch(()=>{
              file.onError()
            })
          }
        })
      })
    },
    Before(){
      this.DisButton = true
    },
    Success(res,file,fileList){
      if(this.int === fileList.length){
        Message.success('上传已完成')
        this.DisButton = false
      }
    },
    handleClose(done){
      this.$confirm('确定关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
        this.resetForm()
      }).catch(() => {

      });
    },
    //重置
    resetForm(){
      this.int = 0
      this.$refs.docValidate.resetFields()
      this.$refs.upload.clearFiles()
      this.getList()
    },
    cancel(){
      this.$confirm('确定关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upOpen = false
        this.resetForm()
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped>
.box-card{
  height: 700px;
}
</style>
