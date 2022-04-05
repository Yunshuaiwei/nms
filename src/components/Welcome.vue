<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主页</el-breadcrumb-item>
      <el-breadcrumb-item>设备信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 2. 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div
        id="main"
        style="width: 50%; height: 400px; display: inline; float: left; margin-top: 30px"
      ></div>
      <div
        id="memory"
        style="width: 50%; height: 400px; display: inline; float: left; margin-top: 30px"
      ></div>
      <div
        id="disk"
        style="width: 50%; height: 400px; display: inline; float: left; margin-top: 30px"
      ></div>
      <div
        id="myDiskSize"
        style="width: 50%; height: 400px; display: inline; float: left; margin-top: 30px"
      ></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
import * as echarts from 'echarts'
export default {
  data() {
    return {
      deviceDataList: [],
      memory: 0,
      cpu: 0,
      ip: '127.0.0.1'
    }
  },
  created() {
    this.getCpuAndMemoryData()
  },
  // 此时页面上的元素已经渲染完毕
  mounted() {
    setTimeout(() => {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: 'CPU使用率(%)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left',
          top: 'bottom',
          orient: 'vertical',
          data: ['已使用', '未使用']
        },
        series: [
          {
            name: '127.0.0.1',
            type: 'pie',
            radius: '70%',
            data: [
              { value: this.deviceDataList.cpu, name: '已使用' },
              { value: this.cpu, name: '未使用' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      // 3. 基于准备好的dom，初始化echarts实例
      var myMemory = echarts.init(document.getElementById('memory'))
      // 4. 指定图表的配置项和数据
      var memory = {
        title: {
          text: '内存使用率(%)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left',
          top: 'bottom',
          orient: 'vertical',
          data: ['已使用', '未使用']
        },
        series: [
          {
            name: '127.0.0.1',
            type: 'pie',
            radius: '70%',
            data: [
              { value: this.deviceDataList.memory, name: '已使用' },
              { value: this.memory, name: '未使用' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 5. 使用刚指定的配置项和数据显示图表。
      myMemory.setOption(memory)
      // 磁盘大小
      var myDisk = echarts.init(document.getElementById('disk'))
      var disk = {
        title: {
          text: '磁盘使用率(%)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          left: 'left',
          top: 'bottom',
          orient: 'vertical',
          data: ['C 盘', 'D 盘', 'E 盘', 'F 盘', 'G 盘']
        },
        series: [
          {
            name: '127.0.0.1',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: this.deviceDataList.diskUsed[0], name: 'C 盘' },
              { value: this.deviceDataList.diskUsed[1], name: 'D 盘' },
              { value: this.deviceDataList.diskUsed[2], name: 'E 盘' },
              { value: this.deviceDataList.diskUsed[3], name: 'F 盘' },
              { value: this.deviceDataList.diskUsed[4], name: 'G 盘' }
            ]
          }
        ]
      }
      myDisk.setOption(disk)
      // 磁盘使用数据
      var myDiskSize = echarts.init(document.getElementById('myDiskSize'))
      var diskSize = {
        title: {
          text: '磁盘大小(G)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left',
          top: 'bottom',
          orient: 'vertical',
          data: ['C 盘', 'D 盘', 'E 盘', 'F 盘', 'G 盘']
        },
        series: [
          {
            name: '127.0.0.1',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.deviceDataList.diskTotal[0], name: 'C 盘' },
              { value: this.deviceDataList.diskTotal[1], name: 'D 盘' },
              { value: this.deviceDataList.diskTotal[2], name: 'E 盘' },
              { value: this.deviceDataList.diskTotal[3], name: 'F 盘' },
              { value: this.deviceDataList.diskTotal[4], name: 'G 盘' }
            ]
          }
        ]
      }
      myDiskSize.setOption(diskSize)
    }, 1000)
  },
  methods: {
    async getCpuAndMemoryData() {
      const { data: res } = await this.$http.get('devices', {
        params: this.ip
      })
      if (res.code !== 200) {
        return this.$message.error('获取数据失败')
      }
      this.deviceDataList = res.data
      this.cpu = 100 - this.deviceDataList.cpu
      this.memory = 100 - this.deviceDataList.memory
      this.$message.success('获取数据成功')
    }
  }
}
</script>
