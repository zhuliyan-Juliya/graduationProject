<template>
  <div id="report">
    <el-card>
      <el-row>
        <el-col :span="8" >
          <section style="height: 230px;">
            <Pie :pieOptions="pieOptions"></Pie>
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
      pieOptions: {
        title: {
          text: '员工性别分布',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          left: 'right',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
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
          this.pieOptions.series[0].data = [
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
