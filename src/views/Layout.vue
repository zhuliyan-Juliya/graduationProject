<template>
  <div>
    <el-header>
      <router-link to="/Home/Main">工作台</router-link>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ path: '/Login' });
    }
  },

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>