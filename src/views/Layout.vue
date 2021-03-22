<template>
  <div>
    <el-container>
      <el-header class="hedaer">
        <img src="../assets/images/bg.jpg" @click="preV" alt="" height="60" />
        <div class="z-line-box">
          <div class="line-box fl">
            <section class="menu-box">
              <!-- 在router-link上添加click事件会被拦截无效，需要加.native修饰符 -->
              <router-link :to="item.path" v-for="item in menu" :key="item.name" @click.native="activateMenu" :class="$route.path.indexOf(item.path) > -1 ? 'active' : ''">{{ item.name }}</router-link>
              <a>更多</a>
            </section>
          </div>
          <section class="acount-info fr">
            <el-menu :default-active="$route.meta.type" :mode="'horizontal'" style="background: #fff; padding: 0 10px 0 210px" :show-timeout="0">
              <el-menu-item class="fr acount-info">
                <template slot="title">
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link"> {{ `hello, ${userName}` }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-setting mr5" command="1" v-if="isManager">修改密码</el-dropdown-item>
                      <el-dropdown-item icon="icon aliiconfont el-icon-alituichudenglu mr5" command="2">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-menu-item>
            </el-menu>
          </section>
        </div>
      </el-header>

      <router-view></router-view>
    </el-container>

    <el-dialog :visible.sync="preView" width="60vw" top="5vh" :modal-append-to-body="true" append-to-body @close="closeFnc">
      <img width="100%" src="../assets/images/bg.jpg" alt="" style="object-fit: cover" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { path: '/Home/Main', name: '工作台' },
        { path: '/Home/Organization', name: '组织管理' },
        { path: '/Home/Staff', name: '员工管理' },
        { path: '/Home/Timecard', name: '考勤管理' },
        { path: '/Home/System', name: '系统设置' },
      ],
      preView: false,
    };
  },

  components: {},

  computed: {},

  created() {
    if (!localStorage.getItem('userInfo')) {
      this.$router.push({ path: '/Login' });
      localStorage.clear();
    }
  },

  mounted() {},

  methods: {
    activateMenu(e) {
      let ele = e.target;
      let eles = ele.parentNode.children;
      Array.from(eles).forEach(item => {
        item.classList.remove('active');
      });
      ele.classList.add('active');
    },
    closeFnc() {
      this.preView = false;
    },
    preV() {
      this.preView = true;
    },
    handleCommand(command) {
      if (command == 1) {
        this.$router.replace('/Home/System/Account');
      } else {
        this.logout();
      }
    },
    logout() {
      this.$confirm('确认退出当前账号?').then(() => {
        localStorage.clear();
        this.$store.commit('removeUserInfo', {});
        this.$router.replace('/Login');
      });
    },
  },
};
</script>
<style lang='less' scoped>
@cloor-bg: #366cb3;
@color-text: #f0ffff;
.hedaer {
  background-color: @cloor-bg;
  line-height: 60px;
  position: fixed;
  width: 100vw;
  z-index: 999;
  padding: 0 !important;
  img {
    width: 10%;
    min-width: 150px;
    transition: all 0.3s;
    &:hover {
      // transform: scale(1.3);
    }
  }
  .z-line-box {
    overflow: hidden;
    .line-box {
      width: 500px;
      margin-left: 50px;
      .menu-box {
        display: flex;
        justify-content: space-between;

        a {
          color: @color-text;
          position: relative;
          &::after {
            content: '';
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            bottom: -1px;
            left: 50%;
            margin-left: -10px;
            opacity: 0;
            transition: all 0.3s;
          }
          &.active::after {
            content: '';
            opacity: 1;
            transition: all 0.3s;
            bottom: 0px;
          }
        }
      }
    }
    .acount-info {
      background-color: @cloor-bg!important;
      /deep/ .el-dropdown {
        height: 60px !important;
      }
      /deep/ .el-menu--horizontal {
        background-color: @cloor-bg!important;
        .el-dropdown {
          color: #fff !important;
          &:hover {
            background-color: @cloor-bg!important;
          }
        }
      }
    }
  }
  img {
    vertical-align: top;
    float: left;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>