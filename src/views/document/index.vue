<template>
  <div class="app-container">
    <div style="margin: 25px 5px">
      <el-button type="primary" round @click="()=>{this.upOpen = true}" v-if="hasAuth('upload')">上传文件</el-button>
      <el-select placeholder="请选择查询的公司"  @change="handleChange" v-model="ooo" filterable clearable>
        <el-option v-for="item in fileCompany" :key="item.id" :label="item.Com_name" :value="item.Com_url"/>
      </el-select>
    </div>
    <el-collapse accordion>
      <el-collapse-item title="公司报表   公司案例   公司资质   其他">
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
                <el-table :data="reportForm.Contents.filter(data => !searchReport || data.Key.toLowerCase().includes(searchReport.toLowerCase()))" border v-loading="loading1"  height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
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
                <el-table :data="this.case.Contents.filter(data => !searchCase || data.Key.toLowerCase().includes(searchCase.toLowerCase()))" border v-loading="loading2" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
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
                <el-table :data="qualifications.Contents.filter(data => !searchQualifications || data.Key.toLowerCase().includes(searchQualifications.toLowerCase()))" border v-loading="loading3" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
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
                <el-table :data="other.Contents.filter(data => !searchOther || data.Key.toLowerCase().includes(searchOther.toLowerCase()))" border v-loading="loading4" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="社保   税收   发票   公司人员资质">
        <el-row :gutter="5">
          <el-col :span="6">
            <el-card class="box-card" style="background-image: linear-gradient(to top,#96f5da,#d3dce6) ">
              <div slot="header" class="clearfix">
                <span>社保凭证</span>
              </div>
              <div class="text item" v-if="security.Contents">
                <div>
                  <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchSecurity">
                  </el-input>
                </div>
                <el-table :data="security.Contents.filter(data => !searchSecurity || data.Key.toLowerCase().includes(searchSecurity.toLowerCase()))" border v-loading="loading5"  height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" style="background-image: linear-gradient(to top,#a7b1ff,#d3dce6) ">
              <div slot="header" class="clearfix">
                <span>税收凭证</span>
              </div>
              <div class="text item" v-if="this.revenue.Contents">
                <div>
                  <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchRevenue">
                  </el-input>
                </div>
                <el-table :data="this.revenue.Contents.filter(data => !searchRevenue || data.Key.toLowerCase().includes(searchRevenue.toLowerCase()))" border v-loading="loading6" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" style="background-image: linear-gradient(to top, #fff2ad,#d3dce6)">
              <div slot="header" class="clearfix" >
                <span>发票</span>
              </div>
              <div class="text item" v-if="invoice.Contents">
                <div>
                  <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchInvoice">
                  </el-input>
                </div>
                <el-table :data="invoice.Contents.filter(data => !searchInvoice || data.Key.toLowerCase().includes(searchInvoice.toLowerCase()))" border v-loading="loading7" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" style="background-image: linear-gradient(to top, #ffd0e5,#d3dce6) ">
              <div slot="header" class="clearfix">
                <span>公司人员资质</span>
              </div>
              <div class="test item" v-if="Cpq.Contents">
                <div>
                  <el-input placeholder="请输入查询名称" class="input-with-select" v-model="searchCpq"/>
                </div>
                <el-table :data="Cpq.Contents.filter(data => !searchCpq || data.Key.toLowerCase().includes(searchCpq.toLowerCase()))" border v-loading="loading8" height="500px">
                  <el-table-column label="名称" prop="Key" width="307px" align="center"/>
                  <el-table-column label="操作" align="center" width="70px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('download')"
                        @click="DownLoad(scope.row)"
                      >下载</el-button><br>
                      <el-button
                        size="mini"
                        type="text"
                        v-if="hasAuth('upload')"
                        @click="deleteFile(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="文件上传"  :visible.sync="upOpen"  width="500px" append-to-body  :before-close="handleClose">
      <el-form ref="docValidate" :rules="rules" :model="form">
        <el-form-item label="公司" label-width="80px" prop="Com">
          <el-select placeholder="请选择公司" v-model="form.Com" filterable>
            <el-option v-for="item in fileCompany" :key="item.id" :label="item.Com_name" :value="item.Com_url"/>
          </el-select>
        </el-form-item>
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
import {DeleteCos, DownLoadCos, getBucket, reLoad} from "../../utils/cos";
import {getAllFile} from "../../api/studentsInfo/allFile";
import {Message} from "element-ui";
import {listFileCompany} from "../../api/fileConpany/filecompany";
import {addFileManage} from "../../api/fileManage/filemanage";
import {getCookie} from "../../utils/support";
import {parseTime} from "../../utils";

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
      loading5: true,
      loading6: true,
      loading7: true,
      loading8: true,
      DisButton: false,
      searchReport: '',
      searchQualifications: '',
      searchCase: '',
      searchOther: '',
      searchSecurity: '',
      searchRevenue: '',
      searchInvoice: '',
      searchCpq: '',
      DocType: [
        {type: '公司资质',value: '公司资质/'},
        {type: '公司报表',value: '公司报表/'},
        {type: '公司案例',value: '公司案例/'},
        {type: '公司人员资质',value: '公司人员资质/'},
        {type: '其他',value: '其他/'},
        {type: '社保凭证',value: '社保/'},
        {type: '税收凭证',value: '税收/'},
        {type: '发票',value: '发票/'},
      ],
      rules: {
        Doc: [
          {required: true, message: '文件类型不能为空', trigger: 'blur'}
        ],
        Com: [
          {required: true, message: '公司选择不能为空', trigger: 'blur'}
        ]
      },
      //财务
      //社保
      security: {},
      //税收
      revenue: {},
      //发票
      invoice: {},
      //公司人员资质
      Cpq: {},
      //判断文件上传个数
      int: 0,
      fileCompany: {},
      //无效参数
      ooo: ''
    };
  },
  created(){
    this.getList()
    console.log(this.$store.state)
    listFileCompany().then(res =>{
      this.fileCompany = res.data.results
    }).catch(err=>{
      Message.error('没有操作权限')
    })
  },
  mounted() {

  },
  methods: {
    getList(key){
      this.loading1 = true
      this.loading2 = true
      this.loading3 = true
      this.loading4 = true
      this.loading5 = true
      this.loading6 = true
      this.loading7 = true
      this.loading8 = true
      getAllFile().then(res =>{
        getBucket(res.data, key+"公司报表/").then(response=>{
          response.Contents.splice(0,1)
          this.reportForm = response
          this.loading1 = false
        });
        getBucket(res.data, key+"公司案例/").then(response=>{
          response.Contents.splice(0,1)
          this.case = response
          this.loading2 = false
        });
        getBucket(res.data, key+"公司资质/").then(response=>{
          response.Contents.splice(0,1)
          this.qualifications = response
          this.loading3 = false
        });
        getBucket(res.data, key+"其他/").then(response=>{
          response.Contents.splice(0,1)
          this.other = response
          this.loading4 = false
        });
        getBucket(res.data, key+"公司人员资质/").then(response=>{
          response.Contents.splice(0,1)
          this.Cpq = response
          this.loading8 = false
        });
        getBucket(res.data, key+"税收/").then(response=>{
          response.Contents.splice(0,1)
          this.revenue = response
          this.loading6 = false
        });
        getBucket(res.data, key+"社保/").then(response=>{
          response.Contents.splice(0,1)
          this.security = response
          this.loading5 = false
        });
        getBucket(res.data, key+"发票/").then(response=>{
          response.Contents.splice(0,1)
          this.invoice = response
          this.loading7 = false
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
        }).then(()=>{
          let data = {
            file_type: row.Key,
            file_name: row.Key,
            file_uptime: parseTime(Date.now()),
            file_person: getCookie('username'),
            file_url: row.Key,
            file_status: 2
          }
          addFileManage(data).then((res)=>{
          }).catch(err=>{
            Message.error(err)
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
        let key = this.form.Com + this.form.Doc + file.file.name
        getBucket(res.data,key).then(response =>{
          if(response.Contents.length < 1){
            reLoad(res.data,file.file,key).then(() =>{
              this.int ++
              file.onSuccess()
            }).then(()=>{
              let data = {
                file_type: this.form.Com + this.form.Doc,
                file_name: file.file.name,
                file_uptime: parseTime(Date.now()),
                file_person: getCookie('username'),
                file_url: this.form.Com + this.form.Doc + file.file.name,
                file_status: 1
              }
              addFileManage(data).then(res =>{

              }).catch(err=>{
                Message.error(err)
              })
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
      this.getList(ooo)
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
    },
    handleChange(value){
      this.getList(value)
    },
    //删除
    deleteFile(row){
      this.$confirm('确定删除'+ row.Key +'文件吗？','警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getAllFile().then(res=>{
          DeleteCos(res.data,row.Key).then(()=>{
            Message.success('删除成功')
            let data = {
              file_type: row.Key,
              file_name: row.Key,
              file_uptime: parseTime(Date.now()),
              file_person: getCookie('username'),
              file_url: row.Key,
              file_status: 3
            }
            addFileManage(data)
          }).catch(err =>{
            Message.error(err + '删除失败')
          })
        })

      })
    }
  }
}
</script>

<style scoped>
.box-card{
  height: 650px;
}
</style>
