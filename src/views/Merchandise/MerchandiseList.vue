<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          @change="onChange"
          clearable
          suffix-icon
          placeholder="请输入内容"
          v-model="pageObj.query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="onSearch"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="$router.push('/home/addgoods')"
          >添加商品</el-button
        >
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="#" type="index"> </el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="商品价格（元）" prop="goods_price">
          </el-table-column>
          <el-table-column label="商品重量" prop="goods_weight">
          </el-table-column>
          <el-table-column label="创建时间" prop="add_time"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <!-- 编辑 -->
              <el-button type="primary" icon="el-icon-edit" @click="onEdit"
                >编辑</el-button
              >
              <!-- 删除用户信息 -->
              <el-button type="danger" icon="el-icon-delete"
                >删除</el-button
              ></template
            >
          </el-table-column>
        </el-table>
        <!-- 底部 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj.pagenum"
          :page-sizes="[1, 2, 3, 4, 5]"
          :page-size="pageObj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMerchandiseList } from '@/api/merchandiseList'
export default {
  created () { this.getMerchandiseList() },
  data () {
    return {
      total: null,
      tableData: [],
      pageObj: {
        query: '',
        pagenum: 1, // 当前页码
        pagesize: 5// 每页显示条数

      }
    }
  },
  methods: {
    onChange () { this.getMerchandiseList() },
    // 点击搜素事件
    onSearch () { this.getMerchandiseList() },
    handleSizeChange (pagesize) {
      this.pageObj.pagesize = pagesize
      this.getMerchandiseList()
    }, // 改变时会触发每页条数
    handleCurrentChange (pagenum) {
      this.pageObj.pagenum = pagenum
      this.getMerchandiseList()
    }, // 改变时会触发当前页
    // 商品列表数据
    async getMerchandiseList () {
      const res = await getMerchandiseList(this.pageObj)
      console.log(res)
      this.tableData = res.data.data.goods// 数据
      this.total = res.data.data.total// 全部的数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
