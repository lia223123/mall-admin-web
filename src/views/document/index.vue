<template>
  <div class="app-container">
    <div style="margin: 5px">
      <el-button type="primary" round @click="()=>{this.upOpen = true}">上传文件</el-button>
    </div>
    <el-row>
      <el-col :span="5.1">
        <el-card class="box-card" style="background-image: linear-gradient(to top,#96f5da,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>公司报表</span>
          </div>
          <div class="text item">
            <div>
              <el-input placeholder="请输入查询名称" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <el-table :data="reportForm.Contents" border v-loading="loading" style="background-color:#96f5da">
             <el-table-column label="名称" prop="Key" width="300px" align="center"/>
             <el-table-column label="操作" align="center">
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
      <el-col :span="5.1">
        <el-card class="box-card" style="background-image: linear-gradient(to top,#a7b1ff,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>公司案例</span>
          </div>
          <div>
            <el-input placeholder="请输入查询名称" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
            <el-table :data="this.case.Contents" border v-loading="loading">
              <el-table-column label="名称" prop="Key" width="300px" align="center"/>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="DownLoad(scope.row)"
                  >下载</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
      <el-col :span="5.1">
        <el-card class="box-card" style="background-image: linear-gradient(to top, #fff2ad,#d3dce6)">
          <div slot="header" class="clearfix">
            <span>公司资质</span>
          </div>
          <div>
            <el-input placeholder="请输入查询名称" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table :data="qualifications.Contents" border v-loading="loading">
            <el-table-column label="名称" prop="Key" width="300px" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="DownLoad(scope.row)"
                >下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="5.1">
        <el-card class="box-card" style="background-image: linear-gradient(to top, #ffd0e5,#d3dce6) ">
          <div slot="header" class="clearfix">
            <span>其他</span>
          </div>
          <div>
            <el-input placeholder="请输入查询名称" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table :data="other.Contents" border v-loading="loading">
            <el-table-column label="名称" prop="Key" width="300px" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="DownLoad(scope.row)"
                >下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="文件上传" :visible.sync="upOpen" width="500px" append-to-body  :before-close="handleClose">
      <el-form>
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="upload"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {DownLoadCos, getBucket} from "../../utils/cos";
import {getAllFile} from "../../api/studentsInfo/allFile";

export default {
  name: "index",
  data() {
    return {
      reportForm: {},
      qualifications: {},
      case: {},
      other: {},
      upOpen: false
    };
  },
  created(){
    getAllFile().then(res =>{
      getBucket(res.data, "公司报表/").then(response=>{
        this.reportForm = response
      });
      getBucket(res.data, "公司案例/").then(response=>{
        this.case = response
      });
      getBucket(res.data, "公司资质/").then(response=>{
        this.qualifications = response
      });
      getBucket(res.data, "其他/").then(response=>{
        this.other = response
      });
    });
  },
  methods: {
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

    },
    handleClose(){

    }
  }
}
</script>

<style scoped>
.el-col{
  margin-left: 2px;
}
.box-card{
  height: 700px;
}
</style>
