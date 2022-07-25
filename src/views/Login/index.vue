<template>
  <div class="login-container">
    <!-- 登录的页面布局 -->
    <div class="form-box">
      <el-form :rules="rules" :model="loginForm" ref="loginFormRef">
        <el-form-item prop="username"
          ><el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input
        ></el-form-item>
        <el-form-item prop="password"
          ><el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input
        ></el-form-item>
        <el-form-item class="btn-item"
          ><el-button type="primary" @click="login">登录</el-button
          ><el-button type="info" @click="reset">重置</el-button></el-form-item
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: { username: 'admin', password: '123456' },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3~8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3~8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.loginFormRef.resetFields()
    },
    // 二次校验
    async login () {
      try {
        // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        await this.$refs.loginFormRef.validate()
        try {
          // 接口的使用
          const res = await login(this.loginForm)
          console.log(res)
          this.$store.commit('user/setUser', res.data.data)
          this.$router.push('/home/wolcome')
          this.$message.success('登录成功')
        } catch (err) { console.log(err) }
      } catch (err) { this.$message.error('登录失败') }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
  width: 100vw;
  height: 100vh;
  .form-box {
    width: 450px;
    height: 240px;
    padding: 30px 15px;
    box-sizing: border-box;
    background-color: #fff;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
