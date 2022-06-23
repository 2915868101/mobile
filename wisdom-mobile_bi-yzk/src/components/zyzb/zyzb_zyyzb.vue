<template>
  <div class="zyzb_zyyzb g-wrap">
    <div class="date-wrap">
      <div class="f-pt10 f-pl10 f-pr10 f-df f-dfj">
        <div class="date-input" @click="showDate1=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date1).format('YYYY-MM-DD')}}</span></div>
        <div class="date-input" @click="showDate2=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date2).format('YYYY-MM-DD')}}</span></div>
        <van-button color="#409EFF" @click="doSelect()">查询</van-button>
      </div>
      <van-popup v-model="showDate1" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date1" type="date" title="选择开始时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate1=false" @confirm="showDate1=false" />
      </van-popup>
      <van-popup v-model="showDate2" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date2" type="date" title="选择结束时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate2=false" @confirm="showDate2=false" />
      </van-popup>
    </div> 
    <div class="s-bgcfff" ref="echart1">
      <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
        <div class="f-fs18 f-fwb">住院药占比情况分析</div>
        <i class="fullscreen"></i>
      </div>
      <div class="s-bgcfff" :style="{height:getTableMaxWidth(60)+'px'}">
        <chart-public3 ref="chart1"></chart-public3>
      </div>
    </div>
    <div class="g-h20 s-bgcf4f9f9"></div>
    <div class="s-bgcfff" ref="echart2">
      <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart2')">
        <div class="f-fs18 f-fwb">住院各科室药占比情况分析</div>
        <i class="fullscreen"></i>
      </div>
      <div class="s-bgcfff" :style="{height:getTableMaxWidth(60)+'px'}">
        <chart-public3 ref="chart2"></chart-public3>
      </div>
    </div>
  </div>
</template>
<script>
import chartPublic3 from '../util/chartPublic3' //echart3    

export default {
  name: 'zyzb_zyyzb',
  components: {
    chartPublic3,
  },
  computed: {},
  created() {
    var t = this
    t.updateTitle('药占比分析')
    t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
    t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
    t.getZyfyzbInfo() 
    t.getZyfyzbKsInfo() 
  },
  data() {
    var t = this
    return {
      classid: '',
      searchForm: {
        startdate: '',
        enddate: ''
      },
      showDate1: false,
      showDate2: false,
      Date1: new Date(t.$moment().add(-7, 'days')),
      Date2: new Date(),
      maxDate: new Date(),
      minDate: new Date(t.$moment().format("YYYY")),
      

      initChart1: {
        data: [],
        label: ['药品费用','总费用','药占比']
      },
      initChart2: {
        data: [],
        label: ['药品费用','总费用','药占比']
      },
    }
  },
  methods: {
    // 查询点击
    doSelect() {
      var t = this
      if (!t.searchForm.startdate) {
        t.$toast('查询开始日期不能为空！')
      } else if (!t.searchForm.startdate) {
        t.$toast('查询结束日期不能为空！')
      } else if (t.Date1 > t.Date2) {
        t.$toast('结束时间要大于开始时间！')
      } else {
        t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
        t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
        t.getZyfyzbInfo() 
        t.getZyfyzbKsInfo() 
      }
    },
    //住院药占比分析
    getZyfyzbInfo() {
      var t = this
      t.ajax({
        methods: 'post',
        url: t.WSD.serverPath1 + 'mobile/getZyfyzbInfo',
        params: t.searchForm,
        success: function(data) {
          t.$nextTick(function() {
            t.initChart1.data = data || []
            t.$refs.chart1.setOptions(t.initChart1)
          })
        }
      })
    },
    //住院各科室药占比分析
    getZyfyzbKsInfo() {
      var t = this
      t.ajax({
        methods: 'post',
        url: t.WSD.serverPath1 + 'mobile/getZyfyzbKsInfo',
        params: t.searchForm,
        success: function(data) {
          t.$nextTick(function() {
            t.initChart2.data = data || []
            t.$refs.chart2.setOptions(t.initChart2)
          })
        }
      })
    },
    // icon绑定切换全屏
    doToggle(dom) {
      var t = this
      t.toggleFullPage(t.$refs[dom])
    }
  },
  mounted() {}
}
</script>
<style scoped>
.zyzb_zyyzb .date-wrap .date-input {
  width: 39%;
  border: 1px solid #c0c4cc;
  border-radius: 3px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
}

.zyzb_zyyzb .date-wrap .date-input i {
  background: url(../../assets/img/util/calendar.svg) no-repeat;
  background-size: 100%;
  display: inline-block;
  width: 15px;
  height: 15px;
}

.zyzb_zyyzb>>>.van-button {
  height: 32px;
}


@media screen and (max-width: 320px) {}
</style>