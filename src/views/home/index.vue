<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="讲师编号" prop="LE_idCard">
        <el-upload
          ref="le"
          :action="activeUrl"
          list-type="picture-card"
          :limit="1"
          :auto-upload="false"
          :before-upload="handleBe"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button @click="upload">上传</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="Down">下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {LEDownLoad, LEupload,} from "../../utils/cos";
import {getLeFile} from "../../api/studentsInfo/leFile";
  export default {
    name: 'home',
    data() {
      return {
        //上传路径
        activeUrl: '#999',
        dialogImageUrl: '',
        dialogVisible: false,
        form: {},
        Secret: {}
      }
    },
    created(){

    },
    methods:{
      //预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        getLeFile().then(response =>{
          this.Secret = response.data
          let key = 'LETeacher/'
          LEupload(this.Secret,file,key).then(res=>{
            console.log(res)
          })
        })
      },
      handleBe(file){
        console.log(file)
      },
      handleSuccess(){

      },
      upload(){
        this.$refs.le.submit()
      },
      Down(){

      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }


</style>
