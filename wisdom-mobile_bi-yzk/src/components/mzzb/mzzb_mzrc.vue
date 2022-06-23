<template>
  <div class="mzzb_mzrc g-wrap">
    <div class="aa f-pl12 f-pr12">
      <div class="date-wrap">
        <div class="f-pt12 f-pb12 f-df f-dfj">
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
      <div class=" s-bgcfff" v-if="tableData1" ref="table1">
        <div class="f-fl f-fs16 f-lh24 f-ml15 f-pt10 f-pb10"> <span class="wsdfont wsd-liebiao" style="color:#283142"></span>详细数据</div>
        <div class="f-df f-dfe" @click="toggleFullPage($refs['table1'],'v')"><i class="wsdfont wsd-quanping f-mr15 f-mt10 f-fs24 f-lh24" style="color:#70AEFF"></i></div>
        <el-table :data="tableData1" :max-height="isFullPage?getTableMaxWidth(50):150" stripe :header-cell-style="{background:'#FAFAFA',color:'#283142'}">
          <el-table-column align="center" prop="name" label="区域名称"></el-table-column>
          <el-table-column align="center" prop="value" label="平均住院日(天)"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="s-bgcF4F5FA" ref="echart1">
      <div class="f-ml12 f-mr12 f-mt10 s-bgcfff">
        <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
          <div class="f-fs16">
            <i class="wsdfont wsd-shujuzhexiantu3 f-lh24 f-pr5"></i>所有机构平均住院日</div>
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
    name: 'mzzb_mzrc',
    components: {
      chartPublic1,
    },
    computed: {},
    created() {
      var t = this
      t.updateTitle('平均住院日')
      t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
      t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
      t.getMzrcKsInfo()
    },
    data() {
      var now = new Date(); //当前日期 
      var nowMonth = now.getMonth(); //当前月 
      var nowYear = now.getFullYear(); //当前年 
      return {
        classid: '',
        searchForm: {
          startdate: '',
          enddate: ''
        },
        showDate1: false,
        showDate2: false,
        Date1: new Date(nowYear, nowMonth, 1),
        Date2: new Date(),
        maxDate: new Date(),
        minDate: new Date(2010, 0, 1),
        tableData1: '',
        initChart1: {
          data: [],
          type: 'line',
          label: '天'
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
      //平均住院日table
      getMzrcKsInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getMzGhrcKsInfo',
          params: t.searchForm,
          success: function(data) {
            t.tableData1 = data || []
            t.initChart1.data = data || []
            t.$refs.chartLine1.setOptions(t.initChart1)
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
  .van-cell__value {
    color: #3B7CC2
  }

  .aa {
    background: #F4F5FA;
  }

  .mzzb_mzrc {
    background: #F4F5FA;
  }

  .mzzb_mzrc .icon {
    color: #B8BBC8;
  }

  .mzzb_mzrc .date-wrap .date-input {
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

  .mzzb_mzrc .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .mzzb_mzrc>>>.van-button {
    height: 32px;
  }


  @media screen and (max-width: 320px) {}
</style>