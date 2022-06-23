<template>
  <div class="yyzb_mzhzfd g-wrap">
    <div class="s-bgcF4F5FA f-pl12 f-pr12 f-pt12">
      <van-cell v-for="(c,i) in tableData1" :key="i" :value="c.value">
        <template #title>
          <span class="icon f-fl wsdfont wsd-yuandianf"></span>
          <div>{{c.name}}</div>
        </template>
      </van-cell>
    </div>
    <div class="s-bgcF4F5FA" ref="echart1">
      <div class="f-ml12 f-mr12 f-mt10 s-bgcfff">
        <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
          <div class="f-fs16">
            <i class="wsdfont wsd-zhuzhuangtushujutu f-lh24 f-pr5"></i>{{classid===0?'各机构门急诊人次数据':classid===1?'各机构门急诊费用统计':classid===2?'各机构门急诊次均费用统计':classid===3?'各机构门急诊次均药费统计':classid===4?'各机构门急诊手术量统计':'各机构门诊药费占比统计'}}</div>
          <i class="wsdfont wsd-quanping f-fs24 f-lh24" style="color:#70AEFF"></i>
        </div>
        <div :style="{height:getTableMaxWidth(60)+'px'}">
          <chart-public1 ref="chart1"></chart-public1>
        </div>
      </div>
    </div>
    <div class="s-bgcF4F5FA" ref="table2">
      <div class="f-ml12 f-mr12 f-mt10 s-bgcfff">
        <div class="f-fl f-fs16 f-lh24 f-ml15 f-pt10 f-pb10"> <span class="wsdfont wsd-liebiao" style="color:#283142"></span>详细数据</div>
        <div class="f-df f-dfe" @click="toggleFullPage($refs['table2'],'v')"><i class="wsdfont wsd-quanping f-mr15 f-mt10 f-fs24 f-lh24" style="color:#70AEFF"></i></div>
        <el-table :data="tableData2" :max-height="isFullPage?350:getTableMaxWidth(50)" stripe :header-cell-style="{background:'#FAFAFA',color:'#283142'}">
          <el-table-column align="center" prop="value" label="序号"></el-table-column>
          <el-table-column align="center" prop="value1" label="机构类型"></el-table-column>
          <el-table-column align="center" prop="value2" label="机构名称"></el-table-column>
          <el-table-column align="center" prop="value3" :label="[classid===0?'门诊人次':classid===3?'门急诊次均药品费用(元)':classid===4?'门急诊手术例数':'门急诊人次(人次)']"></el-table-column>
          <el-table-column align="center" prop="value4" :label="[classid===0?'急诊人次':classid===1?'门急诊挂号费(万元)':classid===3?'门急诊人次':classid===4?'门急诊手术费用总额(万元)':'门急诊总费用(万元)']"></el-table-column>
          <el-table-column align="center" prop="value5" :label="[classid===0?'总人次':classid===1?'门急诊药品费用(万元)':classid===2?'次均费用(万元)':classid===3?'门急诊药品总费用(万元)':'药品总费用(万元)']" v-if="classid!=4"></el-table-column>
          <el-table-column align="center" prop="value6" :label="[classid===0?'门诊费用总额(万元)':classid===1?'门急诊检查费用(万元)':'药占比(%)']" v-if="classid===0||classid===1||classid===5"></el-table-column>
          <el-table-column align="center" prop="value7" label="门急诊检验费用(万元)" v-if="classid===1"></el-table-column>
          <el-table-column align="center" prop="value8" label="门急诊其他费用(万元)" v-if="classid===1"></el-table-column>
          <el-table-column align="center" prop="value9" label="门急诊总费用(万元)" v-if="classid===1"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import chartPublic1 from '../util/chartPublic1' //echart1   

  export default {
    name: 'yyzb_mzhzfd',
    components: {
      chartPublic1,
    },
    computed: {},
    created() {
      var t = this
      t.startdate = t.$route.query.startdate
      t.enddate = t.$route.query.enddate
      if (t.$route.query.name === "门急诊总人次本期" || t.$route.query.name === "门急诊总人次同期") {
        t.classid = 0
        t.title = "门急诊总人次"
      } else if (t.$route.query.name === "门急诊总费用本期" || t.$route.query.name === "门急诊总费用同期") {
        t.classid = 1
        t.title = "门急诊总费用"
      } else if (t.$route.query.name === "门急诊次均费用本期" || t.$route.query.name === "门急诊次均费用同期") {
        t.classid = 2
        t.title = "门急诊次均费用"
      } else if (t.$route.query.name === "门急诊次均药费本期" || t.$route.query.name === "门急诊次均药费同期") {
        t.classid = 3
        t.title = "门急诊次均药费"
      } else if (t.$route.query.name === "门急诊手术例数本期" || t.$route.query.name === "门急诊手术例数同期") {
        t.classid = 4
        t.title = "门急诊手术例数"
      } else {
        t.classid = 5
        t.title = "门急诊药占比"
      }
      t.initChart1.label = t.classid === 0 ? '人' : t.classid === 1 ? '万元' : t.classid === 4 ? '例数' : t.classid === 5 ? '%' : '元'
      t.updateTitle(t.title)
      t.getZyMrcFyTbHbTypeInfo()
    },
    data() {
      return {
        classid: 0,
        title: '',
        startdate: '',
        enddate: '',
        tableData1: [],
        tableData2: [],
        initChart1: {
          data: [],
          type: 'bar',
          label: ''
        },
      }
    },
    methods: {
      // 查询点击
      doSelect() {
        var t = this
        t.getZyMrcFyTbHbTypeInfo()
      },
      //住院患者负担分析
      getZyMrcFyTbHbTypeInfo() {
        var t = this
        t.ajax({
          methods: 'post',
          url: t.WSD.serverPath1 + 'mobile/getMzkkRjcd',
          params: {
            TableId: t.classid,
            startdate: t.startdate,
            enddate: t.enddate
          },
          success: function(data) {
            t.tableData1 = data.Table1 || []
            t.tableData2 = data.Data1 || []
            t.initChart1.data = data.Table2 || []
            t.$refs.chart1.setOptions(t.initChart1)
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

  .yyzb_mzhzfd {
    background: #F4F5FA;
  }

  .yyzb_mzhzfd .icon {
    color: #B8BBC8;
  }

  .yyzb_mzhzfd .date-wrap .date-input {
    width: 41%;
    border: 1px solid #E1E3F0;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .yyzb_mzhzfd .date-wrap .date-input i {
    background: url(../../assets/img/util/calendar.svg) no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 15px;
    height: 15px;
  }

  .yyzb_mzhzfd>>>.van-button {
    height: 32px;
  }


  @media screen and (max-width: 320px) {}
</style>