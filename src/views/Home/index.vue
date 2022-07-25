<template>
  <el-container class="container">
    <el-header
      ><img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        alt=""
      /><span class="ht">后台管理系统</span>
      <el-button plain class="ps" @click="$router.push('/login')"
        >退出</el-button
      >
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '100px' : '200px'">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <template><div class="btn" @click="onClick">| | |</div></template>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template #title>用户管理</template>
            <el-menu-item index="1-1" @click="$router.push('/home/user')"
              >用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title>权限管理</template>
            <el-menu-item index="2-1" @click="$router.push('/home/role')"
              >角色列表</el-menu-item
            >
            <el-menu-item index="2-1" @click="$router.push('/home/permission')"
              >权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title>商品管理</template>
            <el-menu-item
              index="3-1"
              @click="$router.push('/home/merchandiseList')"
              >商品列表</el-menu-item
            >
            <el-menu-item index="3-1" @click="$router.push('/home/classify')"
              >分类参数</el-menu-item
            >
            <el-menu-item
              index="3-1"
              @click="$router.push('/home/commodityClassification')"
              >商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title>订单管理</template>
            <el-menu-item index="4-1" @click="$router.push('/home/order')"
              >订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template #title>数据统计</template>
            <el-menu-item index="5-1">数据列表</el-menu-item>
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    onClick () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
    font-size: 40px;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.ht {
  color: #fff;
}
img {
  width: 100px;
}
.ps {
  position: absolute;
  right: 10px;
  top: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.btn {
  color: #fff;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
