<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card>
      <el-button type="primary">创建分类</el-button>
      <el-table :data="sortData" border
        ><el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column label="是否有效" prop="cat_deleted"
          ><template v-slot="scope">{{
            scope.row.cat_deleted ? "有效" : "无效"
          }}</template></el-table-column
        >
        <el-table-column label="排序" prop="cat_level"
          ><template v-slot="scope"
            ><el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            ><el-tag type="warning" v-else>三级</el-tag></template
          ></el-table-column
        >
        <el-table-column label="操作"
          ><template
            ><el-button type="primary" icon="el-icon-edit">编辑</el-button
            ><el-button type="danger" icon="el-icon-edit"
              >删除</el-button
            ></template
          ></el-table-column
        ></el-table
      >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="sortForm.pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="sortForm.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getSortData } from '@/api/merchandiseList'
export default {
  created () { this.getSortData() },
  data () {
    return {
      sortData: [], // 商品分类所有的数据
      sortForm: {
        type: 3,
        pagenum: 1, // 当前页码值
        pagesize: 5// 每页显示多少条数据
      },
      total: null

    }
  },
  methods: {
    handleSizeChange (pagesize) {
      this.sortForm.pagesize = pagesize
      this.getSortData()
    },
    handleCurrentChange (pagenum) {
      this.sortForm.pagenum = pagenum
      this.getSortData()
    },
    // 商品分类数据列表
    async getSortData () {
      const res = await getSortData(this.sortForm)
      console.log(res)
      this.sortData = res.data.data.result// 拿到所有的商品分类数据数据
      this.total = res.data.data.total
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
