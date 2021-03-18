<template>
  <div :id="dom" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
// echarts api官网：https://echarts.apache.org/zh/option.html#title

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer, GridComponent]);

export default {
  name: 'LineChart',
  props: ['lineOptions', 'dom'],
  watch: {
    lineOptions: {
      handler(options) {
        var chartDom = document.getElementById(this.dom);
        var myChart = echarts.init(chartDom);
        myChart.setOption(options);
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
</style>
