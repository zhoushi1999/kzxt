<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary">创建角色</el-button>
      </div>
      <div>
        <el-table :data="roleData" style="width: 100%" border>
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template v-slot="scope">
              <!-- 一级权限第一次for循环 -->
              <el-row
                v-for="item in scope.row.children"
                :key="item.id"
                class="borderBottom"
                ><el-col :span="6"
                  ><el-tag>{{ item.authName }}</el-tag
                  ><i class="el-icon-caret-right"></i
                ></el-col>
                <!-- 二级权限第二次for循环 -->
                <el-col :span="18">
                  <el-row
                    v-for="item1 in item.children"
                    :key="item1.id"
                    class="borderBottom"
                    ><el-col :span="6"
                      ><el-tag type="success">{{ item1.authName }}</el-tag
                      ><i class="el-icon-caret-right"></i
                    ></el-col>
                    <!-- 和三级权限第三次for循环 -->
                    <el-col :span="18"
                      ><el-tag
                        class="borderBottom"
                        type="warning"
                        v-for="item2 in item1.children"
                        :key="item2.id"
                        >{{ item2.authName }}</el-tag
                      ></el-col
                    ></el-row
                  ></el-col
                >
              </el-row></template
            ></el-table-column
          >
          <!-- 角色列表 -->
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column
          ><el-table-column label="角色描述" prop="roleDesc"></el-table-column
          ><el-table-column label="操作">
            <template v-slot="scope"
              ><el-button type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" icon="el-icon-share">删除</el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="onDeal(scope.row)"
                >分配权限</el-button
              ></template
            >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onDel"
    >
      <span slot="footer" class="dialog-footer">
        <!-- 树形结构 -->
        <el-tree
          ref="treeRef"
          :data="dealData"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="treeProps"
          :default-checked-keys="defKeys"
        >
        </el-tree>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ondeal">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, roleData, roleIdRight } from '@/api/role'
export default {
  created () { this.roleList() },
  data () {
    return {
      treeProps: {
        id: null, // 角色id全局使用
        children: 'children',
        label: 'authName'
      }, // 树形控件
      roleData: [], // 角色所有的数据
      dialogVisible: false,
      type: 'tree',
      defKeys: [], // 默认勾选所有的id
      dealData: []// 分配权限所有的数据
    }
  },
  methods: {
    // 确定按钮事件
    async ondeal () {
      // 把节点的id和半节点的id用字符串的形式拿到
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]// 分割的权限 ID 列表（获取所有被选中、叶子节点的 key 和半选中节点的 key, 包括 1，2，3 级节点）数组
      const idStr = keys.join(',')// 把权限id的数组转换为一个字符串
      await roleIdRight(this.id, idStr)
      this.roleList()
      this.dialogVisible = false
    },
    // 每点击一个分配按钮，清空原来的权限
    onDel () {
      this.defKeys = []
    },
    // 分配权限
    async onDeal (row) {
      this.id = row.id// 給data的id赋值
      // 点击分配拿到所有的tree权限
      const res = await roleData(this.type)
      this.dealData = res.data.data
      // 拿到所有的id值
      this.getDefKeys(row, this.defKeys)
      this.dialogVisible = true
    },
    // 角色列表
    async roleList () {
      const res = await roleList()
      console.log(res)
      this.roleData = res.data.data
    },
    // 使用递归来获取所有的三级id
    getDefKeys (node, arr) {
      // 如果当前节点不包含children属性就返回，这是三级节点的id
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        // 用递归来得到其他一二级的id
        this.getDefKeys(item, arr)
      })
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
.borderBottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 10px;
}
</style>
