<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          clearable
          placeholder="请输入内容"
          v-model="pageObj.query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="userData"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="isAddUser = true">添加</el-button>
      </div>
      <div class="text item">
        <el-table :data="users" style="width: 100%" border>
          <el-table-column label="#" type="index"> </el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="电话" prop="mobile"> </el-table-column>
          <el-table-column label="角色" prop="role_name"> </el-table-column>
          <el-table-column label="状态">
            <template v-slot="scope"
              ><el-switch @change="onChange" v-model="scope.row.mg_state">
              </el-switch
            ></template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="onEdit(scope.row.id)"
              ></el-button>
              <!-- 删除用户信息 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="onDelete(scope.row.id)"
              ></el-button>
              <!-- 分配角色 -->
              <el-button
                type="warning"
                icon="el-icon-setting"
                @click="allocate(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pagenum"
        :page-sizes="[1, 2, 3, 4, 5, 6]"
        :page-size="pageObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- //编辑角色框 -->
    <el-dialog title="编辑用户" :visible.sync="isEditShow" width="50%">
      <el-form
        label-width="100px"
        :rules="rules"
        :model="userForm"
        ref="editRef"
        ><el-form-item label="用户名称" prop="username"
          ><el-input disabled v-model="userForm.username"></el-input
        ></el-form-item>
        <el-form-item label="邮箱" prop="email"
          ><el-input v-model="userForm.email"></el-input
        ></el-form-item>
        <el-form-item label="手机号" prop="mobile"
          ><el-input v-model="userForm.mobile"></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditShow = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="isAddUser"
      width="50%"
      @close="resetFields"
    >
      <el-form
        label-width="80px"
        :model="userList"
        :rules="rule"
        ref="addUserRef"
        ><el-form-item label="用户名" prop="username"
          ><el-input v-model="userList.username"></el-input
        ></el-form-item>
        <el-form-item label="密码" prop="password"
          ><el-input v-model="userList.password"></el-input
        ></el-form-item>
        <el-form-item label="邮箱" prop="email"
          ><el-input v-model="userList.email"></el-input
        ></el-form-item>
        <el-form-item label="手机号" prop="mobile"
          ><el-input v-model="userList.mobile"></el-input></el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUserList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="当前角色" :visible.sync="dialogVisible" width="30%">
      <p>当前的用户：{{ row.username }}</p>
      <p>当前的角色：{{ row.role_name }}</p>
      <p>
        分配新角色
        <el-select v-model="row" placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userData, addUser, checkId, editUser, delUser } from '@/api/user'
export default {
  created () { this.userData() },
  data () {
    return {
      dialogVisible: false,
      // id: null, //
      // editUser: {}, // 根据 ID 查询用户信息
      userList: { username: 'admi', password: '123456789', email: '', mobile: '' }, // 添加用户
      rule: {
        username: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
      },
      isAddUser: false, // 添加的对话
      userForm: {}, // 编辑用户
      rules: {
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
      },
      isEditShow: false, // 编辑的对话
      input: '',
      row: {},
      users: [],
      pageObj: {
        query: '', // 搜素需要的
        pagenum: 1, // 当前页码
        pagesize: 5// 每页显示条数
      },
      total: null // 总记录数
    }
  },
  methods: {
    // 分配用户
    async allocate (row) {
      this.dialogVisible = true
      this.row = row
      // const res = await addRole(this.row)
      // console.log(res)
    },
    // 删除用户
    onDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除用户的数据
        await delUser(id)
        this.userData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户事件
    addUserList () {
      this.isAddUser = false
      // 二次校验
      this.$refs.addUserRef.validate(async valid => {
        if (valid) {
          await addUser(this.userList)
          this.userData()
        } else { this.$message.error('添加用户表单校验失败') }
      })
    },
    // 重置对话框
    resetFields () { this.$refs.addUserRef.resetFields() },
    // 编辑用户的操作按钮
    async onEdit (id) {
      // this.id = id// 給id赋值
      this.isEditShow = true
      // 根据id查询信息
      const res = await checkId(id)
      this.userForm = res.data.data
    },
    // 编辑的确定按钮
    edit () {
      this.isEditShow = false
      // 二次校验
      this.$refs.editRef.validate(async valid => {
        if (valid) {
          // 编辑用户成功的请求
          await editUser(this.userForm)
          this.userData()
        } else { this.$message.error('编辑用户表单校验失败') }
      })
    },
    handleSizeChange (pagesize) {
      this.pageObj.pagesize = pagesize
      this.userData()
    },
    handleCurrentChange (pagenum) {
      this.pageObj.pagenum = pagenum
      this.userData()
    },
    // 状态开关的改变
    onChange () {
      this.$message.success('改变成功')
    },
    // 用户数据列表
    async userData () {
      const res = await userData(this.pageObj)
      this.total = res.data.data.total
      this.users = res.data.data.users
    }
  }
}

</script>

<style scoped lang='less'>
.el-card {
  margin-top: 20px;
}
.input-with-select {
  width: 500px;
  padding-right: 20px;
}
</style>
