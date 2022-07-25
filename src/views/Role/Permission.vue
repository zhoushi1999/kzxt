<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <div>
        <el-table :data="tableData" style="width: 100%" border
          ><el-table-column
            label="#"
            width="50px"
            type="index"
          ></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column
          ><el-table-column label="权限等级" prop="level">
            <template v-slot="scope">
              <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
              <el-tag type="success" v-else-if="scope.row.level === '1'"
                >等级二</el-tag
              >
              <el-tag type="warning" v-else>等级三</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { roleData } from '@/api/role'
export default {
  created () { this.roleData() },
  data () {
    return {
      tableData: [],
      level: null,
      type: 'list'

    }
  },
  methods: {
    async roleData () {
      const res = await roleData(this.type)
      console.log(res)
      this.tableData = res.data.data
      this.level = res.data.data.level
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
}
</style>
