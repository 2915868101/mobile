<template>
  <div class="zyzb_zyrc g-wrap">
    <div class="aa f-pl12 f-pr12 f-pb5">
      <div class="date-wrap">
        <div class="f-pt12 f-pb12  f-df f-dfj">
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
      <template>
        <div class="f-mb10">
          <van-cell :value="tableData1.NAME1+'人'">
            <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">无偿献血人次(人)</div>
            </template>
          </van-cell>
          <van-cell :value="tableData1.NAME2">
            <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">无偿献血容量(ml)</div>
            </template></van-cell>
          <van-cell :value="tableData1.NAME3"> <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">血液使用容量(ml)</div>
            </template></van-cell>
          <van-cell :value="tableData1.NAME4"> <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">血液库存总容量(ml)</div>
            </template>
          </van-cell>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'zyzb_zyrc',
    computed: {},
    created() {
      var t = this
      t.updateTitle('血液中心')
      t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
      t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
      t.getQyKsZbInfo()
    },
    data() {
      return {
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
        tableData1: [],
        tableData2: [],
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
          t.getQyKsZbInfo()
        }
      },
      //请求数据
      getQyKsZbInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getGWXyzx',
          params: t.searchForm,
          success: function(data) {
            t.tableData1 = data.data2[0]
            t.tableData2 = data.data2
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

  .zyzb_zyrc .icon {
    color: #B8BBC8;
  }

  .zyzb_zyrc .date-wrap .date-input {
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

  .zyzb_zyrc .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .zyzb_zyrc>>>.van-button {
    height: 32px;
  }

  .zyzb_zyrc>>>.el-table__header-wrapper {
    z-index: 30;
  }

  .zyzb_zyrc>>>.el-table__body-wrapper {
    z-index: 21;
    position: relative;
  }

  .zyzb_zyrc>>>.el-table__fixed {
    z-index: 41;
  }

  .zyzb_zyrc>>>.el-table__footer-wrapper {
    z-index: 31;
  }

  @media screen and (max-width: 320px) {}
</style>