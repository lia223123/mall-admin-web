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
      <el-table-column label="员工编号" align="center" prop="employee_code" />
      <el-table-column label="身份证" align="center" prop="em_idCard"/>
      <el-table-column label="员工姓名" align="center" prop="em_name"/>
      <el-table-column label="部门" align="center" prop="employee_department"/>
      <el-table-column label="职位" align="center" prop="position"/>
      <el-table-column label="电话" align="center" prop="UPhone"/>
      <el-table-column label="邮箱" align="center" prop="email"/>
      <el-table-column label="角色" align="center" prop="roles">
        <template slot-scope="scope">
          <el-tag size="small" v-for="item in scope.row.roles" :key="item.id">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="员工编号" prop="employee_code">
          <el-input v-model="form.employee_code" placeholder="请输入员工编号" />
        </el-form-item>
        <el-form-item label="身份证" prop="em_idCard">
          <el-input v-model="form.em_idCard" placeholder="请输入身份证" maxlength="18"/>
        </el-form-item>
        <el-form-item label="员工姓名" prop="em_name">
          <el-input v-model="form.em_name" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="手机号码" prop="UPhone">
          <el-input v-model="form.UPhone" placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')"
                    maxlength='11'/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="部门" prop="employee_department">
          <el-select v-model="form.employee_department" placeholder="请选择部门">
            <el-option v-for="item in dept" :key="item.name" :label="item.name" :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" placeholder="请输入职位"/>
        </el-form-item>
        <el-form-item label="用户名账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" :show-password="true" type="password"></el-input>
        </el-form-item>
<!--        <el-form-item label="性别" prop="em_sex">-->
<!--          <el-select v-model="form.em_sex" placeholder="请选择员工性别">-->
<!--            <el-option value="1" label="男"/>-->
<!--            <el-option value="2" label="女"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="角色" prop="roles">
          <el-select v-model="form.roles" multiple  placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addEmployee, deleteEmployee, editEmployee, getEmployee, listEmployee} from "../../../api/employeeInfo/employee";
import {listRoles} from "../../../api/employeeInfo/roles"
import {buildMenu} from "../../../api/login";
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
      find: '',
      form: {},
      //查询参数
      query:[
        {name:'员工编号',id: 'employee_code'},
        {name:'员工姓名',id: 'em_name'},
        {name:'身份证',id: 'em_idCard'},
        {name:'部门',id: 'employee_department'},
      ],
      rules: {
        employee_code:[
          {required: true, message: "员工编号不能为空", trigger: "blur"}
        ],
        em_idCard: [
          {required: true, message: "身份证不能为空", trigger: "blur"}
        ],
        em_name: [
          {required: true, message: "姓名不能为空", trigger: "blur"}
        ],
        UPhone: [
          {required: true, message: "电话不能为空", trigger: "blur"}
        ],
        roles: [
          {required: true, message: "角色不能为空", trigger: "blur"}
        ],
        employee_department: [
          {required: true, message: "部门不能为空", trigger: "blur"}
        ],
        username: [
          {required: true, message: "账号不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"}
        ]
      },
      //部门选择
      dept: [
        {name: '培训一部'},
        {name: '培训二部'},
        {name: '培训三部'},
        {name: '培训四部'},
        {name: '培训五部'},
        {name: '财务'},
        {name: '标书办'},
      ],
      roles: []
    }
  },
  created() {
    this.getList()
    listRoles({
      r_type: 2
    }).then(res =>{
      this.roles = res.data.results
    })
    buildMenu().then(res=>{
      console.log(res)
    })
  },
  methods:{
    getList(){
      listEmployee().then(response =>{
        this.dataList = response.data.results
        this.loading = false
      })
    },
    //重置菜单
    reset(){
      this.form = {
        id: undefined,
        employee_code: undefined,
        em_idCard: undefined,
        em_name: undefined,
        employee_department: undefined,
        em_sex: undefined,
        UPhone: undefined,
        user_type: undefined,
        username: undefined,
        password: undefined,
        position: undefined,
        email: undefined,
        roles: []
      };
      this.$refs['form'].resetFields();
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
      this.title = "新增员工";
    },
    //修改数据
    handleUpdate(row){
      getEmployee(row.id).then(res =>{
        this.form = res.data;
        this.open = true;
        this.title = '修改员工信息';
      })
    },
    //删除数据
    handleDelete(row){
      this.$confirm('是否删除员工编号为' + row.employee_code + "的员工信息？","警告", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(() =>{
        deleteEmployee(row.id).then(res =>{
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
      this.reset()
      this.open = false
    },
    //确定按钮
    submitForm(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.form.em_sex = parseInt(this.form.em_sex)
          // this.form.user_type = parseInt(this.form.user_type)
          if (this.form.id != undefined) {
            editEmployee(this.form).then(response => {
                this.$message({
                  message: "修改成功",
                  type: 'success'
                });
                this.open = false;
                this.getList();
                this.reset();
            }).catch(()=> {
              this.$message({
                message: "身份证或用户名已存在",
                type: 'warning'
              });
            });
          } else {
            addEmployee(this.form).then(response => {
                this.$message({
                  message: "修改成功",
                  type: 'success'
                });
                this.open = false;
                this.getList();
                this.reset();
            }).catch(() =>{
              this.$message({
                message: "身份证或用户名已存在",
                type: 'warning'
              });
            })
          }
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
        listEmployee(json).then(res =>{
          this.dataList = res.data.results
        })
      }
    },
    // //表格数据转换
    // _sex(row){
    //   return formatSex(row.em_sex)
    // },
    // _userType(row){
    //   return formatUserType(row.user_type)
    // }
  }
}
</script>

<style scoped>

</style>
