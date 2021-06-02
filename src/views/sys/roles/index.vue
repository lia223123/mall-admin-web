<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="searchForm.name"
          placeholder="名称"
          clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="r_code"
        label="唯一编码"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="r_type"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.r_type === 2" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.r_type === 1" type="danger">禁用</el-tag>
        </template>

      </el-table-column>
      <el-table-column
        prop="icon"
        align="center"
        label="操作">

        <template slot-scope="scope">
          <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="menuHandle(scope.row.id)">分配菜单</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>

    </el-table>


<!--    <el-pagination-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :page-sizes="[10, 20, 50, 100]"-->
<!--      :current-page="current"-->
<!--      :page-size="size"-->
<!--      :total="total">-->
<!--    </el-pagination>-->


    <!--新增对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="r_code" label-width="100px">
          <el-input v-model="editForm.r_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc" label-width="100px">
          <el-input v-model="editForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="r_type" label-width="100px">
          <el-radio-group v-model="editForm.r_type">
            <el-radio :label=1>禁用</el-radio>
            <el-radio :label=2>正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="分配权限"
      :visible.sync="permDialogVisible"
      width="600px">
      <el-form :model="permForm" ref="permForm">
        <el-tree
          :data="permTreeData"
          show-checkbox
          ref="permTree"
          :default-expand-all=true
          node-key="id"
          :check-strictly=true
          :props="defaultProps">
        </el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="permDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
			</span>
    </el-dialog>
    <el-dialog
      title="分配菜单"
      :visible.sync="MenuDialogVisible"
      width="600px">
      <el-form :model="menuForm" ref="menuForm">
        <el-tree
          :data="menuTreeData"
          show-checkbox
          ref="menuTree"
          :default-expand-all=true
          node-key="id"
          :check-strictly=true
          :props="defaultProps">
        </el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="MenuDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitMenuFormHandle('menuForm')">确 定</el-button>
			</span>
    </el-dialog>

  </div>
</template>

<script>
import {addRoles, deleteRoles, editRoles, getRoles, listRoles} from "../../../api/employeeInfo/roles";
import {listMenus} from "../../../api/employeeInfo/menu";
import {listpermissions} from "../../../api/employeeInfo/permissions";
import {buildMenu} from "../../../api/login";

export default {
  name: "roles",
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,
      total: 0,
      size: 10,
      current: 1,
      dialogVisible: false,
      editForm: {

      },
      tableData: [],
      editFormRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        r_code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        r_type: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      multipleSelection: [],
      permDialogVisible: false,
      MenuDialogVisible: false,
      permForm: {},
      menuForm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permTreeData: [],
      menuTreeData: [],
    }
  },
  created() {
    this.getRoleList()
    listpermissions().then(res => {
      this.permTreeData = res.data.results
    })
    listMenus().then(res =>{
      this.menuTreeData = res.data.results
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBtlStatu = val.length === 0
    },

    handleSizeChange(val) {
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getRoleList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.$confirm('是否关闭弹窗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning',
      }).then(()=>{
        this.resetForm('editForm')
      })
    },

    getRoleList() {
      listRoles( {
        params: {
          name: this.searchForm.name,
        }
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.results
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.editForm.id === undefined){
            addRoles(this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success',
                });
                this.getRoleList()
                this.dialogVisible = false
                this.resetForm(formName)
              }).catch(err=>{
                console.log(err)
            })
          }else {
            editRoles(this.editForm).then(res =>{
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success',
              });
              this.getRoleList()
              this.dialogVisible = false
              this.resetForm(formName)
            }).catch(err=>{
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editHandle(id) {
      getRoles(id).then(res => {
        this.editForm = res.data
        this.dialogVisible = true
      })
    },
    delHandle(id) {
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }
      deleteRoles(ids).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
        this.getRoleList()
      })
    },
    menuHandle(id){
      this.MenuDialogVisible = true
      getRoles(id).then(res =>{
        this.$refs.menuTree.setCheckedKeys(res.data.menus)
        this.menuForm = res.data
      })
    },
    submitMenuFormHandle(formName){
      let menuIds = this.$refs.menuTree.getCheckedKeys()
      this.menuForm.menus = menuIds
      editRoles(this.menuForm).then(res => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        });
        this.getRoleList()
        this.MenuDialogVisible = false
        this.resetForm(formName)
      })
    },
    permHandle(id) {
      this.permDialogVisible = true
      getRoles(id).then(res => {
        this.$refs.permTree.setCheckedKeys(res.data.permissions)
        this.permForm = res.data
      })
    },
    submitPermFormHandle(formName) {
      let menuIds = this.$refs.permTree.getCheckedKeys()
      this.permForm.permissions = menuIds
      editRoles(this.permForm).then(res => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        });
        this.getRoleList()
        this.permDialogVisible = false
        this.resetForm(formName)
      })
    }
  }
}
</script>

<style scoped>

.el-pagination {
  float: right;
  margin-top: 22px;
}

</style>
