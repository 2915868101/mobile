<template>
  <div class="chartPublic1 g-hp100 g-wp100">
    <div class="f-fdc g-hp100">
      <div class="f-df1 f-ff0">
        <v-chart :options="chart_options" :autoresize="true"></v-chart>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
export default {
  name: 'chartPublic1',
  props: [],
  components: {
    'v-chart': echarts,
  },
  created() {},
  data() {
    return {
      chart_options: {},
    }
  },
  methods: {
    async setOptions(data) {
      var t = this
      var dataName = [],
        dataValue = [],
        dataLabel = [],
        colors = '#3a9bdc'
      var dataArr = data.data || []
      for (var i = 0; i < dataArr.length; i++) {
        dataName.push(dataArr[i].name);
        dataValue.push(dataArr[i].value);
      }
      dataLabel.push(data.label)
      t.chart_options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          x: 20,
          y: 35,
          x2: 20,
          y2: 50,
          containLabel: true
        },
        legend: { 
          itemGap: 5,
          data: dataLabel
        },
        xAxis: [{
          type: 'category',
          data: dataName
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: function(value) {
              var texts = [];
              if (value > 10000) {
                value = value / 10000
                texts.push(value + '万');
              } else {
                texts.push(value);
              }
              return texts;
            }
          }
        }],
        dataZoom: [{
          type: 'slider',
          height: 10,
          show: true,
          start: Math.round((1 - 10 / dataArr.length) * 10000) / 100 ,
          end: 100,
          showDetail: false,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
        }, {
          type: "inside",
          show: true,
          start:  Math.round((1 - 10 / dataArr.length) * 10000) / 100 ,
          end: 100
        }],
        series: [{
          name: data.label,
          type: data.type,
          stack: data.label,
          data: dataValue,
          itemStyle: {
            normal: {
              color: data.color || colors,
            }
          },
          barWidth : 10,
        }]
      }
    },
  },
  mounted() {}
}
</script>
<style scoped>
.chartPublic1 .echarts {
  width: 100%;
  height: 100%;
}
</style>