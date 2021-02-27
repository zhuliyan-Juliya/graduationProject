<template>
  <div style="padding-top: 60px">
    <section>
      <nav>
        <el-menu default-active="1" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" background-color="#F2F6F8" text-color="#2F3647 " active-text-color="#06397c">
          <el-submenu index="1">
            <template slot="title">
              <img src="../../assets/images/organization.svg" width="14" style="margin-right: 5px" />
              <span class="menu-title">组织管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/Organization/CompanyList">单位设置</el-menu-item>
              <el-menu-item index="department">部门设置</el-menu-item>
              <el-menu-item index="workcity">工作城市</el-menu-item>
              <el-menu-item index="structure/1">组织架构图</el-menu-item>
              <el-menu-item index="structure/2">组织汇报图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <img src="../../assets/images/job.svg" width="14" style="margin-right: 5px" />
              <span class="menu-title">职位管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="category">职类管理</el-menu-item>
              <el-menu-item index="designation">职位管理</el-menu-item>
              <el-menu-item index="position_system">职位体系</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <img src="../../assets/images/authorized.svg" width="14" style="margin-right: 5px" />
              <span class="menu-title">编制管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="establishment">编制管理</el-menu-item>
              <el-menu-item index="structure/3">组织编制图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </nav>
    </section>
    <div class="right">
      <aside>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang='less' scoped>
div {
  section {
    position: relative;
    float: left;
    width: 10%;
    min-width: 150px;
    height: 500px;
    nav {
      float: left;
      width: 10%;
      min-width: 150px;
      position: fixed;
      .el-menu-vertical-demo {
        height: 100vh;
      }
    }
  }
  .right {
    overflow: hidden;
    aside {
      float: left;
      width: 88%;
      // margin-left: 10%;
    }
  }
}
/deep/ .el-submenu .el-menu-item {
  min-width: 0 !important;
}
.menu-title {
  color: #000;
  font-size: 16px;
}
</style>