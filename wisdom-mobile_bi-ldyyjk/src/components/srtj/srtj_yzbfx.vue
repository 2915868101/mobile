<template>
  <div class="srtj_yzbfx g-wrap">
    <div class="date-wrap">
      <div class="f-mt12 f-ml12 f-mr12 f-mb10 f-df f-dfj">
        <div class="date-input" @click="showDate1=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date1).format('YYYY-MM-DD')}}</span></div>
        <div class="date-input" @click="showDate2=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date2).format('YYYY-MM-DD')}}</span></div>
        <el-button type="primary" @click="doSelect()">查询</el-button>
      </div>
      <van-popup v-model="showDate1" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date1" type="date" title="选择开始时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate1=false" @confirm="showDate1=false" />
      </van-popup>
      <van-popup v-model="showDate2" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date2" type="date" title="选择结束时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate2=false" @confirm="showDate2=false" />
      </van-popup>
    </div>
    <div v-for="(c,i) in tableData1" :key="i" class="f-ml12 f-mr12">
      <van-cell class="cellys" v-if="c.name==='门急诊医保自付比例'" :style="{background:[i%2==0?'':'#FAFAFA']}" :value="c.value">
        <template #title>
          <div> <span class="icon f-fl wsdfont wsd-yuandianf"></span>{{c.name}}：</div>
        </template>
      </van-cell>
      <van-cell v-else :style="{background:[i%2==0?'':'#FAFAFA']}" :value="c.value" @click="toPage(c)" is-link>
        <template #title>
          <div> <span class="icon f-fl wsdfont wsd-yuandianf"></span>{{c.name}}：</div>
        </template>
      </van-cell>
    </div>
    <div class="s-bgcF4F5FA" ref="echart1">
      <div class="f-ml12 f-mr12 f-mt10 s-bgcfff">
        <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
          <div class="f-fs16"><i class="wsdfont wsd-shujuzhexiantu3 f-lh24 f-pr5"></i>医保费用月度曲线</div>
          <i class="wsdfont wsd-quanping f-fs24 f-lh24" style="color:#70AEFF"></i>
        </div>
        <div :style="{height:getTableMaxWidth(60)+'px'}">
          <chart-public1 :title="1" ref="chartLine1"></chart-public1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import chartPublic1 from '../util/chartPublic1' //echart1   

  export default {
    name: 'srtj_yzbfx',
    components: {
      chartPublic1,
    },
    computed: {},
    created() {
      var t = this
      t.updateTitle('门急诊医保')
      t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
      t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
      t.getMzrcKsInfo()
    },
    data() {
      return {
        classid: '',
        searchForm: {
          startdate: '',
          enddate: ''
        },
        showDate1: false,
        showDate2: false,
        Date1: new Date(new Date().getFullYear(), 0, 1),
        Date2: new Date(),
        maxDate: new Date(),
        minDate: new Date(2010, 0, 1),
        tableData1: '',
        initChart1: {
          data: [],
          type: 'line',
          label: '万元'
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
          t.getMzrcKsInfo()
        }
      },
      //医疗服务收入table
      getMzrcKsInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getJkTable4',
          params: t.searchForm,
          success: function(data) {
            t.tableData1 = data.Table || []
            t.initChart1.data = data.Data1 || []
            t.$refs.chartLine1.setOptions(t.initChart1)
          }
        })
      },
      // icon绑定切换全屏
      doToggle(dom) {
        var t = this
        t.toggleFullPage(t.$refs[dom])
      },

      toPage(row) {
        var t = this;
        t.linkToPage("mzzb_jzrc?name=" + row.name + "&startdate=" + t.searchForm.startdate + "&enddate=" + t.searchForm.enddate);
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .van-cell__value {
    color: #3B7CC2
  }

  .srtj_yzbfx {
    background: #F4F5FA;
  }

  /* .cellys {
    padding-right: 35px;
  } */

  .srtj_yzbfx .icon {
    color: #B8BBC8;
  }

  .srtj_yzbfx .date-wrap .date-input {
    width: 41%;
    border: 1px solid #E1E3F0;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    background: #fff;
  }

  .srtj_yzbfx .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .srtj_yzbfx>>>.van-button {
    height: 32px;
  }


  @media screen and (max-width: 320px) {}
</style>