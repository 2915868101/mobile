<template>
  <div class="chartPie g-hp100 g-wp100">
    <div class="f-fdc g-hp100">
      <div class="f-df1 f-ff0">
        <v-chart :options="chart_options" :autoresize="true"></v-chart>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts'
import 'echarts/lib/chart/pie' 
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
export default {
  name: 'chartPie',
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
        dataValue = []
      var dataArr = data.data || []
      for (var i = 0; i < dataArr.length; i++) {
        dataName.push(dataArr[i].name)
        dataValue.push(dataArr[i].value)
      }
      t.chart_options = { 
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        }, 
        legend: {
          bottom: 10,
          left: 'center',
          data: dataName
        },
        series: [{
          name: data.label,
          type: 'pie',
          radius: '55%',
          center: ['50%', '35%'],
          data: dataArr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    },
  },
  mounted() {}
}
</script>
<style scoped>
.chartPie .echarts {
  width: 100%;
  height: 100%;
}
</style>