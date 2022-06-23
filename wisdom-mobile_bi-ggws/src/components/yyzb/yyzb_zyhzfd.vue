<template>
  <div class="yyzb_zyhzfd g-wrap">
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
    <div class="table-wrap s-bgcfff" v-if="tableData1" ref="table1">
      <div class="f-df f-dfe" @click="doToggle('table1')"><i class="fullscreen f-mb8"></i></div>
      <el-table :data="tableData1" :max-height="isFullPage?getTableMaxHeight(50):250" border>
        <el-table-column prop="name" align="center" label="人均" min-width="30">
          <template slot-scope="scope">
            <div style="text-align: center;">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value" align="center" label="本期值" min-width="20">
          <template slot-scope="scope">
            <div>{{parseFloat(scope.row.value1)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value2" align="right" label="同比增长率" min-width="25">
          <template slot-scope="scope">
            <div v-if="scope.row.value2> 0" class="s-c00f">
              {{parseFloat(scope.row.value2)+'%↑'}}
            </div>
            <div v-else-if="scope.row.value2==0">
              {{parseFloat(scope.row.value2)+'%'}}
            </div>
            <div v-else class="s-cf00">{{parseFloat(scope.row.value2)+'%↓'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value3" align="right" label="环比增长率" min-width="25">
          <template slot-scope="scope">
            <div v-if="scope.row.value3> 0" class="s-c00f">
              {{parseFloat(scope.row.value3)+'%↑'}}
            </div>
            <div v-else-if="scope.row.value3==0">
              {{parseFloat(scope.row.value3)+'%'}}
            </div>
            <div v-else class="s-cf00">{{parseFloat(scope.row.value3)+'%↓'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="g-h20 s-bgcf4f9f9"></div>
    <div class="s-bgcfff" ref="echart1">
      <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
        <div class="f-fs18 f-fwb">每人次费用</div>
        <i class="fullscreen"></i>
      </div>
      <div class="g-h250 s-bgcfff">
        <chart-pie ref="chart1"></chart-pie>
      </div>
    </div>
    <div class="g-h20 s-bgcf4f9f9"></div>
    <div class="table-wrap s-bgcfff" v-if="tableData2" ref="table2">
      <div class="f-df f-dfe" @click="doToggle('table2')"><i class="fullscreen f-mb8"></i></div>
      <el-table :data="tableData2" :max-height="isFullPage?getTableMaxHeight(50):150" show-summary border>
        <el-table-column align="center" prop="name" label="科室"></el-table-column>
        <el-table-column align="center" prop="value" label="每人次费用">
          <template slot-scope="scope">
            {{scope.row.value||'-'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import chartPie from '../util/chartPie' //饼图  

  export default {
    name: 'yyzb_zyhzfd',
    components: {
      chartPie,
    },
    computed: {},
    created() {
      var t = this
      t.updateTitle('住院患者负担')
      t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
      t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
      t.getZyMrcFyTbHbTypeInfo()
      t.getZYMrcFyTypeInfoTop()
      t.getZYMrcFyTypeInfo()
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

        tableData1: '',
        tableData2: '',
        initChart1: {
          data: [],
          label: '人次'
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
          t.getZyMrcFyTbHbTypeInfo()
          t.getZYMrcFyTypeInfoTop()
          t.getZYMrcFyTypeInfo()
        }
      },
      //住院患者负担分析
      getZyMrcFyTbHbTypeInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getZyMrcFyTbHbTypeInfo',
          params: t.searchForm,
          success: function(data) {
            t.tableData1 = data || []
          }
        })
      },
      //每人次费用
      getZYMrcFyTypeInfoTop() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getZYMrcFyTypeInfoTop',
          params: t.searchForm,
          success: function(data) {
            t.$nextTick(function() {
              t.initChart1.data = data || []
              t.$refs.chart1.setOptions(t.initChart1)
            })
          }
        })
      },
      //每人次费用table
      getZYMrcFyTypeInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getZYMrcFyTypeInfo',
          params: t.searchForm,
          success: function(data) {
            t.tableData2 = data || []
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
  .yyzb_zyhzfd .date-wrap .date-input {
    width: 39%;
    border: 1px solid #c0c4cc;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .yyzb_zyhzfd .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .yyzb_zyhzfd>>>.van-button {
    height: 32px;
  }


  @media screen and (max-width: 320px) {}
</style>