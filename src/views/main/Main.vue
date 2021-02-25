<template>
  <div>
    <main>
      <el-row>
        <ul class="card-box">
          <li v-for="item in cardData" :key="item.title">
            <Card-item :data="item"></Card-item>
          </li>
        </ul>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="16">
          <el-card shadow="hover"> 鼠标悬浮时显示 </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover"> 鼠标悬浮时显示 </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: [
        { title: '总员工', icoClass: 'el-icon-user-solid', msgNum: 2, linkUrl: '/Hm' },
        { title: '正式', icoClass: 'el-icon-user', msgNum: 3, linkUrl: '/Hm' },
        { title: '试用期', icoClass: 'el-icon-help', msgNum: 4, linkUrl: '/Hm' },
        { title: '本月新入职', icoClass: 'el-icon-s-check', msgNum: 5, linkUrl: '/Hm' },
        { title: '本月离职', icoClass: 'el-icon-warning', msgNum: 6, linkUrl: '/Hm' },
        { title: '待入职员工', icoClass: 'el-icon-circle-plus', msgNum: 6, linkUrl: '/Hm' },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.main {
  background-color: pink;
  height: 200px;
  width: 100%;
  .card-box {
    display: flex;
    justify-content: space-between;
    li {
      margin-right: 8px;
      display: flex;
      flex: 1;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>