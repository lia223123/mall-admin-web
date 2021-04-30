<template>
  <div class="app-container">
<!--    <div>-->
<!--      <el-upload-->
<!--        class="upload-demo"-->
<!--        ref="upload"-->
<!--        accept=".xls,.xlsx"-->
<!--        action="json"-->
<!--        :on-change="handle"-->
<!--        :auto-upload="false">-->
<!--        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--        &lt;!&ndash;      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>&ndash;&gt;-->
<!--        <div slot="tip" class="el-upload__tip">只能上传.xls,.xlsx</div>-->
<!--      </el-upload>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-button @click="daochu">模板导出</el-button>-->
<!--    </div>-->
<!--    <div>-->
<!--      <el-table :data="restaurants" border  @selection-change="handleSelectionChange">-->
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="学员姓名" align="center" prop="STU_name"/>-->
<!--        <el-table-column label="性别" align="center" prop="STU_gender"/>-->
<!--        <el-table-column label="电话" align="center" prop="STU_phone"/>-->
<!--        <el-table-column label="年龄" align="center" prop="STU_age"/>-->
<!--        <el-table-column label="民族" align="center" prop="STU_nation"/>-->
<!--        <el-table-column label="文化程度" align="center" prop="STU_education" />-->
<!--        <el-table-column label="专业" align="center" prop="STU_major"/>-->
<!--        <el-table-column label="政治面貌" align="center" prop="STU_political_affiliation"/>-->
<!--        <el-table-column label="人员类别" align="center" prop="STU_personnel_category"/>-->
<!--        <el-table-column label="健康状况" align="center" prop="STU_health_status"/>-->
<!--        <el-table-column label="归属单位" align="center" prop="STU_employer"/>-->
<!--        <el-table-column label="建档立卡" align="center" prop="STU_filed_account"/>-->
<!--      </el-table>-->
<!--    </div>-->
    <div>
        <el-button @click="exportWord">导出出勤表</el-button>
    </div>
    <div>
        <el-button @click="SeeClass">点击按钮</el-button>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx"
import {ArrayCompare, readFile, stuCharacter, UrlToFile} from "../../utils/index";
import {Message} from "element-ui";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import {saveAs} from 'file-saver';
import PizZipUtils from 'pizzip/utils/index'
import {getAllFile} from "../../api/studentsInfo/allFile";
import {download, DownLoadCos, getDownLoadCos} from "../../utils/cos";
export default {
    name: 'home',
    data() {
      return {
        //上传路径
        activeUrl: '#999',
        dialogImageUrl: '',
        dialogVisible: false,
        form: {},
        Secret: {},
        state1: '',
        restaurants: [],
        selectionList: [],
        tableData: [{
          id: 1,
          name: 'test',
          gender: '男',
          phone: '11111111111',
          ADName: '招生老师',
          ADPhone: '22222222222'
        },{
          id: 2,
          name: 'test',
          gender: '男',
          phone: '11111111111',
          ADName: '招生老师',
          ADPhone: '22222222222'
        },
        ]
      }
    },
    created(){

    },
    methods:{
      async handle(ev){
        let file = ev.raw
        if(!file) return;
        let A = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S']
        let NewArr = []
        // let OldArr = [
        //   '学员姓名',
        //   '身份证号',
        //   '学员类型',
        //   '性别',
        //   '所属民族',
        //   '所属单位',
        //   '文化程度',
        //   '政治面貌',
        //   '现居地址',
        //   '户籍详细地址',
        //   '手机号码',
        //   '就业状态',
        //   '是否属于扶贫建档立卡户',
        //   '年龄',
        //   '专业',
        //   '保险类型',
        //   '健康状态',
        //   '招生老师姓名',
        //   '招生老师身份证号',
        // ]
        //读取file的数据
        let data = await readFile(file);
        let workbook = xlsx.read(data, {type: "binary"}),
          worksheet = workbook.Sheets[workbook.SheetNames[0]];
        A.forEach(item =>{
          NewArr.push(worksheet[item+'1'].v)
        })
        // if(ArrayCompare(NewArr, OldArr)){
          data = xlsx.utils.sheet_to_json(worksheet)
        console.log(data)
          //转换字段
          let arr = [];
          data.forEach(item =>{
            let obj = {};
            for (let key in stuCharacter) {
              if(!stuCharacter.hasOwnProperty(key)) break;
              let v = stuCharacter[key],
                text = v.text,
                type = v.type;
              v = item[text] || '';
              type = "string" ? v = String(v) : null;
              obj[key] = v
            }
            arr.push(obj);
          });
          this.restaurants = arr
        // }else {
        //   Message.warning({
        //     message: '请上传系统下载的模板',
        //     showClose: true
        //   })
        // }

      },
      // handleSelectionChange(){
      //
      // },
      // daochu(){
      //   let arr = [
      //     {
      //       '学员姓名': null,
      //       '身份证号': null,
      //       '学员类型': null,
      //       '性别': null,
      //       '所属民族': null,
      //       '所属单位': null,
      //       '文化程度': null,
      //       '政治面貌': null,
      //       '现居地址': null,
      //       '户籍详细地址': null,
      //       '手机号码': null,
      //       '就业状态': null,
      //       '是否属于扶贫建档立卡户': null,
      //       '年龄': null,
      //       '专业': null,
      //       '保险类型': null,
      //       '健康状态': null,
      //       '招生老师姓名': null,
      //       '招生老师身份证号': null,
      //     }
      //   ]
      //   let sheet = xlsx.utils.json_to_sheet(arr),
      //     book = xlsx.utils.book_new();
      //   xlsx.utils.book_append_sheet(book, sheet, "sheet1");
      //   xlsx.writeFile(book,`学生信息模板.xls`);
      // }
      exportWord(){
        PizZipUtils.getBinaryContent("static/word/roster.docx", (error, content)=> {
          if(error){
            throw error
          }
          let zip = new PizZip(content)
          let doc = new Docxtemplater().loadZip(zip)
          doc.setData({
            title: 'test',
            table: this.tableData
          })
        try{
          doc.render()
        }catch (error) {
          this.$message.error('导出花名册失败')
          console.log(error)
          throw error
        }
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Output the document using Data-URI
        saveAs(out, "output.docx");
        })

        // PizZipUtils.getBinaryContent("static/word/Attendance.docx", (error, content)=>{
        //   if(error){
        //     throw error
        //   }
        //   let zip = new PizZip(content)
        //   let doc = new Docxtemplater().loadZip(zip)
        //
        //   doc.setData({
        //     title: 'test',
        //     table: this.tableData,
        //     loop: [
        //       {
        //         startTime: '3月18日'
        //       },
        //       {
        //         startTime: '3月19日'
        //       }
        //     ],
        //     company: '高创公司',
        //     time: '3月18日-3月19日',
        //     major: '茶艺师',
        //     grade: ''
        //   })
        //   try{
        //     doc.render()
        //   }catch (e) {
        //     console.log(e)
        //     throw e
        //   }
        //   let out = doc.getZip().generate({
        //     type: 'blob',
        //     mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        //   });
        //   saveAs(out, "test.docx")
        // })
      },
      //查看课程表
      SeeClass(){
        getAllFile().then(res =>{
          this.Secret = res.data
        })
        DownLoadCos(this.Secret, "BanJi/d80f66fd1619661774974.xls").then(res =>{
          // this.handle(res)
          console.log(res)
          // console.log(UrlToFile(res, 'banji'));
        }).catch(err=>{
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }


</style>
