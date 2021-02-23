<template>
  <div>
    <el-header class="hedaer">
      <img src="../assets/images/bg.jpg" alt="" width="200" height="60" />
      <div class="z-line-box">
        <div class="line-box">
          <section class="menu-box">
            <!-- 在router-link上添加click事件会被拦截无效，需要加.native修饰符 -->
            <router-link :to="item.path" v-for="item in menu" :key="item.name" @click.native="activateMenu" :class="$route.path.indexOf(item.path) > -1 ? 'active' : ''">{{ item.name }}</router-link>
            <a>更多</a>
          </section>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
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
    };
  },

  components: {},

  computed: {},

  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ path: '/Login' });
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
  },
};
</script>
<style lang='scss' scoped>
$cloor-bg: #708090;
$color-text: #f0ffff;
.hedaer {
  background-color: $cloor-bg;
  line-height: 60px;
  .z-line-box {
    overflow: hidden;
    .line-box {
      float: left;
      width: 500px;
      margin-left: 50px;
      .menu-box {
        display: flex;
        justify-content: space-between;

        a {
          color: $color-text;
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
  }
  img {
    vertical-align: top;
    float: left;
  }
}
</style>