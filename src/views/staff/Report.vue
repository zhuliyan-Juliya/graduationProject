<template>
  <div id="report">
    <el-card>
      <el-row>
        <el-col :span="8">
          <section style="height: 230px" class="p-20 box-border">
            <PieCharts dom="pie1" :pieOptions="pieOptions"></PieCharts>
          </section>
        </el-col>
        <el-col :span="8">
          <section style="height: 230px" class="p-20 box-border">
            <PieCharts dom="pie2" :pieOptions="pieOptions"></PieCharts>
          </section>
        </el-col>
        <el-col :span="8">
          <section style="height: 230px" class="p-20 box-border">
            <BarCharts dom="bar1" :barOptions="barOptions"></BarCharts>
          </section>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <section style="height: 330px" class="p-20 box-border">
            <BarCharts dom="bar2" :barOptions="barOptions2"></BarCharts>
          </section>
        </el-col>
        <el-col :span="12">
          <section style="height: 330px" class="p-20 box-border">
            <LineCharts dom="linechart1" :lineOptions="lineOptions"></LineCharts>
          </section>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import PieCharts from '@src/components/Echarts/Pie.vue';
import BarCharts from '@src/components/Echarts/Bar.vue';
import LineCharts from '@src/components/Echarts/Line.vue';
// import { obj.computedBalanceDay, computedAge, computedTime } from '@src/assets/js/util.js';
import * as obj from '@src/assets/js/util.js';
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
        backgroundColor: '#f9fbfc',
        color: ['#2785df', '#27bea1'],
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
      barOptions: {
        title: {
          text: '员工司龄分布',
          left: 'left',
        },
        backgroundColor: '#f9fbfc',
        color: ['#fea95d', '#27bea1'],
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 45,
          },
          data: ['未知', '3个月内', '3~6个月内', '6个月~1年', '1年~3年', '3年~5年', '5年~10年', '10年以上'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'bar',
          },
        ],
      },
      barOptions2: {
        title: {
          text: '员工年龄分布',
        },
        backgroundColor: '#f9fbfc',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        color: ['#2785df', '#27bea1'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['未知', '18岁以下', '18-25岁', '26-30岁', '31-35岁', '36-40岁', '41-45岁', '46-50岁', '50岁以上'],
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              color: ['#fea95d', '#27bea1'],
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
        ],
      },
      lineOptions: {
        title: {
          text: '员工年代分布',
        },
        backgroundColor: '#f9fbfc',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: ['未知', '00后', '90后', '80后', '70后', '60后', '60前'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
            itemStyle: {
              color: 'pink',
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
          // 处理性别数据
          let female = res.data.filter(item => {
            return item.sex == 0;
          }).length;
          let male = res.data.length - female;
          this.pieOptions.series[0].data = [
            { value: female, name: '女' },
            { value: male, name: '男' },
          ];
          // 处理司龄 年龄 年代数据
          let sectionDay = [0, 3 * 30, 6 * 30, 12 * 30, 3 * 12 * 30, 5 * 12 * 30, 10 * 12 * 30];
          let runTimeSectionNum = new Array(8).fill(0);

          let sectionAge = [0, 18, 25, 30, 35, 40, 45, 50];
          let ageSectionNum = new Array(9).fill(0);

          let sectionTime = ['0', '00', '90', '80', '70', '60', '50'];
          let TimeSectionNum = new Array(7).fill(0);

          res.data.forEach(item => {
            let day = obj.computedBalanceDay(item.join_time);
            let age = obj.computedAge(item.card_num);
            let time = obj.computedTime(item.card_num);
            let runTimeIndex = sectionDay.findIndex(item => {
              return item >= day;
            });

            let ageIndex = sectionAge.findIndex(item => {
              return item >= age;
            });

            let timeIndex = sectionTime.findIndex(item => {
              return item == time;
            });

            runTimeSectionNum[runTimeIndex]++;
            ageSectionNum[ageIndex]++;
            TimeSectionNum[timeIndex]++;
          });
          this.barOptions.series[0].data = runTimeSectionNum;
          this.barOptions2.series[0].data = ageSectionNum;
          this.lineOptions.series[0].data = TimeSectionNum;
        }
      });
    },
  },
  components: {
    PieCharts,
    BarCharts,
    LineCharts,
  },
};
</script>
<style lang='less' scoped>
</style>
