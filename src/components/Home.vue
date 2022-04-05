<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/img/logo.png" alt="" /> -->
        <span class="span">基于SNMP的网络管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu index="0">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-s-home"></i>
              <!-- 一级菜单文本 -->
              <span>主页</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="welcome"
              ><template #title>
                <!-- 二级菜单图标区 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文本 -->
                <span>设备信息</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-user-solid"></i>
              <!-- 一级菜单文本 -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="users"
              ><template #title>
                <!-- 二级菜单图标区 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文本 -->
                <span>用户列表</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="2">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-s-platform"></i>
              <!-- 一级菜单文本 -->
              <span>性能管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="device"
              ><template #title>
                <!-- 二级菜单图标区 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文本 -->
                <span>接口列表</span>
              </template></el-menu-item
            >
            <!-- 二级菜单 -->
            <el-menu-item index="property">
              <template #title>
                <!-- 二级菜单图标区 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文本 -->
                <span>性能监测</span>
              </template></el-menu-item
            >
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="3">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-warning"></i>
              <!-- 一级菜单文本 -->
              <span>故障管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="fault"
              ><template #title>
                <!-- 二级菜单图标区 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文本 -->
                <span>故障监测</span>
              </template></el-menu-item
            >
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="4">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-edit-outline"></i>
              <!-- 一级菜单文本 -->
              <span>计费管理</span>
            </template>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="5">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-message-solid"></i>
              <!-- 一级菜单文本 -->
              <span>安全管理</span>
            </template>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="6">
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 一级菜单图标区 -->
              <i class="el-icon-setting"></i>
              <!-- 一级菜单文本 -->
              <span>配置管理</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 默认为false，不折叠
      isCollapse: false
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$http.get('logout')
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lagn="less" scoped>
.el-header {
  background-color: #4a5e63;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 25px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      left: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-menu {
  border-right: 0;
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.home-container {
  height: 100%;
}

.span {
  margin-left: 30px;
}
</style>
