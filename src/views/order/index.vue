<template>
  <div>
    <BreadCrumb></BreadCrumb>

    <el-card>
      <el-input
        style="width: 500px"
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button
      ></el-input>
      <el-table border :data="orderData"
        ><el-table-column label="#" type="index"></el-table-column
        ><el-table-column label="订单编号" prop="order_number"></el-table-column
        ><el-table-column label="订单价格" prop="order_price"></el-table-column
        ><el-table-column label="是否付款"></el-table-column
        ><el-table-column label="是否发货" prop="is_send"></el-table-column
        ><el-table-column label="下单时间"></el-table-column
        ><el-table-column label="操作"></el-table-column
      ></el-table>
    </el-card>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'
export default {
  created () { this.getOrder() },
  data () {
    return {
      input3: '',
      orderData: [],
      total: null,
      parmesObj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  methods: {
    async getOrder () {
      const res = await getOrder(this.parmesObj)
      console.log(res)
      this.total = res.data.data.total
      this.orderData = res.data.data.goods
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
