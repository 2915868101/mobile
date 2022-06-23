<template>
  <div class="chartBar1 g-hp100 g-wp100">
    <div class="f-fdc g-hp100">
      <div class="f-df1 f-ff0">
        <div class="f-df1 f-ff0" style="height: 280px; overflow-y: scroll">
          <template v-if="chart_options.yAxis">
            <span v-if="chart_options.yAxis.data.length > 7">
              <v-chart
                :style="{ height: chart_options.yAxis.data.length * 25 + 'px' }"
                :options="chart_options"
                :autoresize="true"
              ></v-chart>
            </span>
            <span v-else>
              <v-chart
                :style="{ height: chart_options.yAxis.data.length * 47 + 'px' }"
                :options="chart_options"
                :autoresize="true"
              ></v-chart> </span
          ></template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/dataZoom";
export default {
  name: "chartBar1",
  props: [],
  components: {
    "v-chart": echarts,
  },
  created() {
    this.setOptions();
  },
  data() {
    return {
      chart_options: {},
    };
  },
  methods: {
    async setOptions(data) {
      var t = this;
      var dataName = [],
        dataValue = [],
        dataLabel = [];
      if (data && data.data) {
        var dataArr = data.data || [];
        for (var i = 0; i < dataArr.length; i++) {
          dataName.push(dataArr[i].name);
          dataValue.push(dataArr[i].value);
        }
        dataLabel.push(data.label);
        console.log;
        t.chart_options = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            data: dataLabel,
          },
          grid: {
            x: 20,
            y: 35,
            x2: 20,
            y2: 20,
            containLabel: true,
          },
          xAxis: {
            show: false,
            type: "value",
          },
          yAxis: {
            type: "category",
            data: dataName,
            axisLine: { show: false },
            axisTick: [
              {
                //坐标轴小标记
                show: false,
              },
            ],
          },
          series: [
            {
              name: data.label,
              type: "bar",
              barWidth: 15,
              label: {
                normal: {
                  show: true,
                  position: "right",
                },
              },
              data: dataValue,
            },
          ],
        };
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.chartBar1 .echarts {
  width: 100%;
  height: 100%;
}
</style>