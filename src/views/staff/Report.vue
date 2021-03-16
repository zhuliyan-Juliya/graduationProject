<template>
  <div id="report">
    <el-card>
      <el-row>
        <el-col :span="8">
          <section>
            <Pie :pieData="pieData"></Pie>
          </section>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Pie from '@src/components/EchartsPie/Pie.vue';
export default {
  name: 'Report',
  data() {
    return {
      pieData: [],
    };
  },
  mounted() {
    this.getEmployeeList();
  },
  methods: {
    getEmployeeList() {
      this.$api.getEmployeeList().then(res => {
        if (res.success) {
          let female = res.data.filter(item => {
            return item.sex == 0;
          }).length;
          let male = res.data.length - female;
          this.pieData = [
            { value: female, name: '女' },
            { value: male, name: '男' },
          ];
        }
      });
    },
  },
  components: {
    Pie,
  },
};
</script>
<style lang='less' scoped>
</style>
