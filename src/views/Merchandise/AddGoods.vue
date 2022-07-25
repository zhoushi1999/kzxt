<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-alert title="添加商品信息" show-icon center :closable="false">
      </el-alert>
      <!-- 步骤条 -->
      <el-steps :active="active - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 侧边标签 -->
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addFormRef"
        class="demo-ruleForm"
      >
        <el-tabs :tab-position="'left'" v-model="active">
          <el-tab-pane label="基本信息" name="0"
            ><el-form-item label="商品名称" prop="goods_name"
              ><el-input v-model="addForm.goods_name"></el-input
            ></el-form-item>
            <el-form-item label="商品价格" prop="goods_price"
              ><el-input v-model="addForm.goods_price"></el-input></el-form-item
            ><el-form-item label="商品重量" prop="goods_weight"
              ><el-input
                v-model="addForm.goods_weight"
              ></el-input></el-form-item
            ><el-form-item label="商品数量" prop="goods_number"
              ><el-input v-model="addForm.goods_number"></el-input
            ></el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader></el-form-item
          ></el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addGoods } from '@/api/merchandiseList'
export default {
  created () { this.addGoods() },
  data () {
    return {
      active: '0',
      pics: [], // 上传的图片临时路径（对象）
      attrs: [], // 商品的参数（数组），包含 动态参数 和 静态属性
      addForm: {
        goods_name: 1, // 商品名称
        goods_cat: '1,2,3', // 以为','分割的分类列表
        goods_price: 20, // 价格
        goods_number: 30, // 数量
        goods_weight: 40 // 重量
      },
      rules: {
        goods_name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '商品分类不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
        goods_number: [{ required: true, message: '商品数量不能为空', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '商品重量不能为空', trigger: 'blur' }]
      }

    }
  },
  methods: {
    // 添加商品
    async addGoods () {
      const res = await addGoods(this.addForm)
      console.log(res)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
