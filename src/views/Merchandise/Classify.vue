<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <div class="sortGoods">
        选择商品分类：
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first"
          ><el-button type="primary">添加参数</el-button
          ><el-table
            ><el-table-column label="#"></el-table-column>
            <el-table-column label="分类名称"></el-table-column
            ><el-table-column label="操作"></el-table-column></el-table
        ></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"
          ><el-button type="primary">添加属性</el-button
          ><el-table
            ><el-table-column label="#"></el-table-column>
            <el-table-column label="分类名称"></el-table-column
            ><el-table-column label="操作"></el-table-column></el-table
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.sortGoods {
  margin: 30px 0;
}
</style>
