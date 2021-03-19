<template>
  <div>
    <section>
      <nav>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" background-color="#F2F6F8" text-color="#2F3647 " active-text-color="#1270EC">
          <el-menu-item index="/Home/System/Account">
            <template slot="title">
              <img src="../../assets/images/system/account.svg" width="14" style="margin-right: 5px" />

              <span class="menu-title">账号设置</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <img src="../../assets/images/job.svg" width="14" style="margin-right: 5px" />
              <span class="menu-title">人事异动</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/Staff/Category">入职管理</el-menu-item>
              <el-menu-item index="/Home/Staff/Designation">调动管理</el-menu-item>
              <el-menu-item index="/Home/Staff/PositionSystem">离职管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <img src="../../assets/images/authorized.svg" width="14" style="margin-right: 5px" />
              <span class="menu-title">合同管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/Staff/Establishment">合同管理</el-menu-item>
              <el-menu-item index="/Home/Staff/Structure/3">电子签约</el-menu-item>
              <el-menu-item index="/Home/Staff/Structure/3">合同设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </nav>
    </section>
    <div class="right">
      <aside v-if="$route.path === '/Home/Staff'">
        <DefaultPage></DefaultPage>
      </aside>
      <aside v-else>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </aside>
    </div>
  </div>
</template>

<script>
import DefaultPage from './DefaultPage.vue';
export default {
  data() {
    return {};
  },

  components: {
    DefaultPage,
  },

  computed: {},

  mounted() {
    console.log('this.bigScreen', this.screenWidth);
  },

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
      padding-top: 60px;
      .el-menu-vertical-demo {
        height: 100vh;
      }
    }
  }
  .right {
    overflow: hidden;
    background-color: #fff;
    height: 100vh;
    padding-top: 60px;
    aside {
      float: left;
      width: 100%;
      padding: 20px;
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