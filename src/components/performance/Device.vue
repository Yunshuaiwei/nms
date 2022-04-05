<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>性能管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input
            placeholder="请输入IP地址"
            v-model="queryInfo.ip"
            clearable="true"
            @clear="getInterfacesList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getInterfacesList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 接口列表 -->
      <el-table :data="interfaceslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="IP" prop="ip"></el-table-column>
        <el-table-column label="索引" prop="ifIndex"></el-table-column>
        <el-table-column label="描述" prop="ifDescr"></el-table-column>
        <el-table-column label="类型" prop="ifTypeDescr"></el-table-column>
        <el-table-column label="MAC地址" prop="ifPhysAddress"></el-table-column>
        <el-table-column label="最大数据单元" prop="ifMtu"></el-table-column>
        <el-table-column label="速率" prop="ifSpeed"></el-table-column>
        <el-table-column label="接口状态" prop="ifInterfaceStatus"></el-table-column>
        <el-table-column label="收到总字节数" prop="ifInOctets"></el-table-column>
        <el-table-column label="发出总字节数" prop="ifOutOctets"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10, 50, 100, 150]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取设备列表参数
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        ip: ''
      },
      interfaceslist: [],
      total: 1
    }
  },
  created() {
    this.getInterfacesList()
  },
  methods: {
    async getInterfacesList() {
      const { data: res } = await this.$http.get('interfaces/', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.interfaceslist = res.data.interfaces
      this.total = res.data.total
      this.$message.success('获取设备信息成功')
    },
    // 监听 pagesize 改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getInterfacesList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getInterfacesList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
