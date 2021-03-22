<template>
  <div class="employeeInfo">
    <img :src="staffInfo.avtor ? staffInfo.avtor : require('../../assets/images/staff/pic_1.png')" alt="点击更换头像" width="120" height="120" />
    <p>{{ staffInfo.name }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
    };
  },
  props: ['staffInfo'],
  mounted() {
    console.log('this.staffInfo', this.staffInfo);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.employeeInfo {
  text-align: center;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
