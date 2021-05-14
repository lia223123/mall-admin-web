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

    <div v-html="html1" style="text-align: center; width: 800px">
<!--        <el-button @click="SeeClass">点击按钮</el-button>-->
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
import PizZipUtils from 'pizzip/utils/index';
import {getAllFile} from "../../api/studentsInfo/allFile";
import {download, DownLoadCos, getDownLoadCos} from "../../utils/cos";
import {getBanJi, listBanJi} from "../../api/studentsInfo/banji";
import {listSubsidyPayment} from "../../api/finance/subsidyPayment";
import {listEmDetails} from "../../api/finance/emDetails";
import {listSettleAccounts} from "../../api/finance/settleAccounts";
import {listPayDetails} from "../../api/finance/payDetails";
import mammoth from 'mammoth'
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
        banji: {},
        settleList: {},
        settle: {
          consumables: 0,
          material: 0,
          field: 0,
          conference: 0,
          appraisal: 0,
          reception: 0,
          traffic: 0,
          automobile: 0,
          lodging: 0,
          life: 0,
        },
        src: '',
        data: {
          count: '',
          day: '',
          adCost: 0,
          teCost: 0,
          shift: 0,
          overtime: 0,
          travel: 0,
          costCount: 0,
          empCount: 0,
        },
        emp: {},
        terd: {},
        adrd: {},
        selectionList: [],
        tableData: [
          {
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
        ],
        html1: ''
      }
    },
    created(){
      getBanJi(1).then(res =>{
        this.banji = res.data
      })
      let o = {
        te_s: 1,
        ad_s: 1,
        em_s: 1,
        se_bj: 1,
      }
      listSubsidyPayment(o).then(res =>{
        if(res.data.results.length < 1){
          return
        }
        this.terd = res.data.results
        res.data.results.forEach(item =>{
          this.data.teCost += parseFloat(item.te_pay)
        })
      })
      listEmDetails(o).then(res =>{
        if(res.data.results.length < 1 ){
          return
        }
        this.emp = res.data.results
        res.data.results.forEach(item =>{
          this.data.shift += parseFloat(item.em_dbCost)
          this.data.overtime += parseFloat(item.em_jbCost)
          this.data.travel += parseFloat(item.em_cxCost)
          this.data.empCount += parseFloat(item.em_pay)
        })
      })
      listSettleAccounts(o).then(res =>{
        if(res.data.results.length < 1){
          return
        }
        res.data.results.forEach(item =>{
          if(item.se_types === 1){
            this.settle.consumables += parseFloat(item.se_pay)
          }else if(item.se_types === 2){
            this.settle.material += parseFloat(item.se_pay)
          }else if(item.se_types === 3){
            this.settle.field += parseFloat(item.se_pay)
          }else if(item.se_types === 4){
            this.settle.conference += parseFloat(item.se_pay)
          }else if(item.se_types === 5){
            this.settle.appraisal += parseFloat(item.se_pay)
          }else if(item.se_types === 6){
            this.settle.reception += parseFloat(item.se_pay)
          }else if(item.se_types === 7){
            this.settle.traffic += parseFloat(item.se_pay)
          }else if(item.se_types === 8){
            this.settle.automobile += parseFloat(item.se_pay)
          }else if(item.se_types === 9){
            this.settle.lodging += parseFloat(item.se_pay)
          }else if(item.se_types === 10){
            this.settle.life += parseFloat(item.se_pay)
          }
        })
      })
      listPayDetails(o).then(res =>{
        if(res.data.results.length < 1){
          return
        }
        this.adrd = res.data.results
        res.data.results.forEach(item =>{
          this.data.adCost += parseFloat(item.ad_pay)
        })
      })
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
        PizZipUtils.getBinaryContent("static/word/financial.docx", (error, content)=> {
          if(error){
            throw error
          }
          let zip = new PizZip(content)
          let doc = new Docxtemplater().loadZip(zip)
          doc.setData({
            product: this.banji.BT.tp_projectName,
            banName: this.banji.BClass_name,
            address: this.banji.BClass_address,
            count: 50,
            day: '',
            teName: this.banji.BLecturer,
            BanZR: this.banji.BHead_teacher,
            startYear: this.banji.BCStartTime.split('-')[0],
            startmonth: this.banji.BCStartTime.split('-')[1],
            startDay: this.banji.BCStartTime.split('-')[2],
            endYear: this.banji.BCEndTime.split('-')[0],
            endMonth: this.banji.BCEndTime.split('-')[1],
            endDay: this.banji.BCEndTime.split('-')[2],
            preIncome: parseFloat(this.banji.BGov_fee)*50,
            profit: this.settle.profit,
            consumables: this.settle.consumables,
            material: this.settle.material,
            field: this.settle.field,
            conference: this.settle.conference,
            appraisal: this.settle.appraisal,
            reception: this.settle.reception,
            traffic: this.settle.traffic,
            automobile: this.settle.automobile,
            lodging: this.settle.lodging,
            life: this.settle.life,
            dept: this.banji.BDepartment,
            adCost: this.data.adCost,
            teCost: this.data.teCost,
            shift: this.data.shift,
            overtime: this.data.overtime,
            travel: this.data.travel,
            costCount: this.data.costCount,
            emp: this.emp,
            empCount: this.data.empCount,
            terd: this.terd,
            adrd: this.adrd,
          })
        try {
          doc.render()
        }catch (error) {
          this.$message.error('导出花名册失败')
          throw error
        }
        let out = doc.getZip().generate({
          type: "nodebuffer",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Output the document using Data-URI
          // this.src = out
          // console.log(out)
          // let file = new window.File([out], 'file',{type: 'file'})
          // window.URL = window.URL ||  window.webkitURL;
          // let blobUrl = window.URL.createObjectURL(out);
          mammoth.convertToHtml({arrayBuffer: out}).then(result =>{
            this.html1 = result.value.replaceAll('<table>','<table border="1" style="margin-top:20px; width: 800px; background-color: LightGray">').replaceAll('undefined','');
          }).done()
          // saveAs(out, "开办费用结算表.docx");
        })

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
