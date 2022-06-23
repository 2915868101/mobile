<template>
  <div class="srtj_mzfyfx g-wrap">
    <div class="date-wrap">
      <div class="f-pt12 f-pl12 f-pr12 f-pb12 f-df f-dfj">
        <div class="date-input" @click="showDate1 = true">
          <i class="f-ml10 f-mr8"></i><span>{{ $moment(Date1).format("YYYY-MM-DD") }}</span>
        </div>
        <div class="date-input" @click="showDate2 = true">
          <i class="f-ml10 f-mr8"></i><span>{{ $moment(Date2).format("YYYY-MM-DD") }}</span>
        </div>
        <el-button type="primary" @click="doSelect()">查询</el-button>
      </div>
      <van-popup v-model="showDate1" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date1" type="date" title="选择开始时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate1 = false" @confirm="showDate1 = false" />
      </van-popup>
      <van-popup v-model="showDate2" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date2" type="date" title="选择结束时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate2 = false" @confirm="showDate2 = false" />
      </van-popup>
    </div>
    <div style="background: #F4F5FA;height:6px"></div>
    <div v-for="(c,i) in tableData1" :key="i">
      <van-cell class="cellys" v-if="c.name==='住院次均药费本期'||c.name==='住院次均药费同期'" :style="{background:[i%2==0?'':'#FAFAFA']}" :value="c.value">
        <template #title>
          <div>{{c.name}}：</div>
        </template>
      </van-cell>
      <van-cell v-else :style="{background:[i%2==0?'':'#FAFAFA']}" :value="c.value" @click="toPage(c)" is-link>
        <template #title>
          <div>{{c.name}}：</div>
        </template>
      </van-cell>
    </div>
    <!-- <div class="table-wrap s-bgcfff" v-if="tableData1" ref="table1">
      <el-table :data="tableData1" :max-height="isFullPage ? getTableMaxHeight(50) : 600" border>
        <el-table-column align="center" prop="name" label="指标名称"></el-table-column>
        <el-table-column align="center" prop="value" label="值"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <text v-if="scope.row.name==='住院次均药费本期'||scope.row.name==='住院次均药费同期'"></text>
            <el-button @click="toPage(scope.row)" align="center" type="text" size="small" v-else>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>
<script>
  export default {
    name: 'srtj_mzfyfx',
    components: {},
    computed: {},
    created() {
      var t = this
      t.updateTitle('住院概况')
      t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
      t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
      t.getMzrcKsInfo()
    },
    data() {
      return {
        currentdate: '',
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
      //住院概况table
      getMzrcKsInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getJkTable2',
          params: t.searchForm,
          success: function(data) {
            t.tableData1 = data || []
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
        t.linkToPage("yyzb_zyhzfd?name=" + row.name + "&startdate=" + t.searchForm.startdate + "&enddate=" + t.searchForm.enddate);
      },
    },
    mounted() {}
  }
</script>
<style scoped>
  .van-cell__value {
    color: #3B7CC2;
    margin-right: 5px;
  }

  /* .cellys {
    padding-right: 35px;
  } */

  .srtj_mzfyfx .date-wrap .date-input {
    width: 41%;
    border: 1px solid #E1E3F0;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .srtj_mzfyfx .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .srtj_mzfyfx>>>.van-button {
    height: 32px;
  }

  @media screen and (max-width: 320px) {}
</style>