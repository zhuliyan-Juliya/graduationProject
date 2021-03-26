<template>
  <ul>
    <li v-for="item in showData" :key="item.label">
      <label>
        <span>{{ item.label }}</span>
      </label>
      <p>{{ item.visableName ? item.visableName : item.value }}</p>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['showData'],
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
ul {
  width: 800px;
  margin: 0 auto;
  li {
    float: left;
    width: 50%;
    padding: 3px 0px;
    label {
      width: 120px;
      text-align: right;
      float: left;
      position: relative;
      color: #969799;
      font-size: 14px;
      padding: 0 24px 0 0;
      box-sizing: border-box;
    }
    p {
      margin: 0;
      width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      font-size: 14px;
      text-align: left;
      color: #495060;
    }
  }
}
</style>
