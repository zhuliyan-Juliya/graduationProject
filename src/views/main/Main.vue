<template>
  <div>
    <main>
      <el-row class="card-box">
          <Card-item></Card-item>
          <Card-item></Card-item>
          <Card-item></Card-item>
          <Card-item></Card-item>
          <Card-item></Card-item>
          <Card-item></Card-item>
      </el-row>
    </main>
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

  methods: {},
};
</script>
<style lang='scss' scoped>
main {
  padding: 0 20px;
  background-color: pink;
  height: 200px;
  width: 100%;
  .card-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>