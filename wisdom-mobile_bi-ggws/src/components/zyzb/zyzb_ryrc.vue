<template>
  <div class="zyzb_ryrc g-wrap">
    <div class="aa f-pl12 f-pr12 f-pb5">
      <div class="date-wrap">
        <div class="f-pt12 f-pb12 f-pr10 f-df f-dfj">
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
              <div class="f-ml15">应建立预防接种证人数(人)</div>
            </template>
          </van-cell>
          <van-cell :value="tableData1.NAME2">
            <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">预防接种建证率(%)</div>
            </template></van-cell>
          <van-cell :value="tableData1.NAME3+'次'"> <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">疫苗接种总人次数(次)</div>
            </template></van-cell>
          <van-cell :value="tableData1.NAME4+'次'"> <template #title>
              <span class="icon f-fl wsdfont wsd-yuandianf"></span>
              <div class="f-ml15">疫苗接种反应不良次数(次)</div>
            </template>
          </van-cell>
        </div>
        <!-- <div class="g-h20 s-bgcf4f9f9"></div> -->
        <div class="screen-wrap" v-if="tableData" ref="table1">
          <div class="f-fl f-fs16 f-lh24 f-ml15 f-pt10 f-pb10"> <span class="wsdfont wsd-liebiao" style="color:#283142"></span>详细数据</div>
          <div class="f-df f-dfe" @click="toggleFullPage($refs['table1'],'v')"><i class="wsdfont wsd-quanping f-mr15 f-mt10 f-fs24 f-lh24" style="color:#70AEFF"></i></div>
          <div class="f-mt8 f-mb8 f-pr">
            <el-table :data="tableData" ref="tableData" max-width="100%" :max-height="isFullPage?getTableMaxWidth(50):getTableMaxHeight(50)" stripe :header-cell-style="{background:'#FAFAFA',color:'#283142'}">
              <el-table-column align="center" prop="VALUE1" fixed label="区域"></el-table-column>
              <el-table-column align="center" prop="VALUE2" label="应建立预防接种证人数(人)"></el-table-column>
              <el-table-column align="center" prop="VALUE3" label="预防接种建证人数(人)"></el-table-column>
              <el-table-column align="center" prop="VALUE4" label="建证率(%)"></el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'zyzb_ryrc',
    computed: {},
    created() {
      var t = this
      t.updateTitle('预防接种')
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
        tableData: [],
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
          url: t.WSD.serverPath1 + 'mobile/getGWYfjz1',
          params: t.searchForm,
          success: function(data) {
            t.tableData = data.data1
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

  .zyzb_ryrc .icon {
    color: #B8BBC8;
  }

  .zyzb_ryrc .date-wrap .date-input {
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

  .zyzb_ryrc .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .zyzb_ryrc>>>.van-button {
    height: 32px;
  }

  .zyzb_ryrc>>>.el-table__header-wrapper {
    z-index: 30;
  }

  .zyzb_ryrc>>>.el-table__body-wrapper {
    z-index: 21;
    position: relative;
  }

  .zyzb_ryrc>>>.el-table__fixed {
    z-index: 41;
  }

  .zyzb_ryrc>>>.el-table__footer-wrapper {
    z-index: 31;
  }

  @media screen and (max-width: 320px) {}
</style>