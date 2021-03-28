<template>
  <div class="employeeInfo">
    <el-avatar :size="120" :src="staffInfo.avtor ? staffInfo.avtor : require('../../assets/images/staff/pic_1.png')"></el-avatar>
    <p>{{ staffInfo.name }}</p>
    <!-- <el-divider></el-divider> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本档案" name="first">
        <BaseFile
          :staffInfo="staffInfo"
          :s_companyList="s_companyList"
          :s_categoryList="s_categoryList"
          :s_cityList="s_cityList"
          :s_departmentList="s_departmentList"
          @finishEdit="finishEdit"
        ></BaseFile>
      </el-tab-pane>
      <el-tab-pane label="个人信息" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="证件管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="劳动关系" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="账号信息" name="five">定时任务补偿</el-tab-pane>
      <el-tab-pane label="自定义信息" name="six">定时任务补偿</el-tab-pane>
      <el-tab-pane label="个人动态" name="serven">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseFile from './editPage/BaseFile';
export default {
  data() {
    return {
      flag: false,
      activeName: 'first',
    };
  },
  props: ['staffInfo', 's_companyList', 's_departmentList', 's_categoryList', 's_cityList'],
  components: {
    BaseFile,
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    finishEdit() {
      this.$emit('finishEdit');
    },
  },
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
/deep/.el-tabs__nav {
  transform: translateX(-50%) !important;
  left: 50%;
}
</style>
