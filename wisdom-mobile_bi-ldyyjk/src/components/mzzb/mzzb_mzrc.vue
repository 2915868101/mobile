<template>
  <div class="mzzb_mzrc g-wrap">
    <div class="s-bgcF4F5FA f-pl12 f-pr12 f-pt12">
      <div v-for="(c,i) in tableData1" :key="i" :value="c.value">
        <div class="f-fwb f-fs18">{{tableData1[0].name}}：<span class="ybys">{{tableData1[0].value}}</span>
        </div>
      </div>
    </div>
    <div class="s-bgcF4F5FA" ref="echart1">
      <div class="f-ml12 f-mr12 f-mt10 s-bgcfff">
        <div class="title-icon-wrap f-df f-dfj" @click="doToggle('echart1')">
          <div class="f-fs16"> <i class="wsdfont wsd-zhuzhuangtushujutu f-lh24 f-pr5"></i>{{classid===0?'各机构出院患者医保人数统计':classid===1?'各机构出院患者医保费用统计':classid===2?'各机构出院医保均次费用统计':'各机构出院患者医保自付比例统计'}}</div>
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
          <el-table-column align="center" prop="value3" :label="[classid===0?'出院医保人数(人)':classid===1?'医保费用(万元)':classid===2?'出院医保均次费用(万元)':'医保自付比例(%)']"></el-table-column>
          <el-table-column align="center" prop="value4" :label="[classid===0?'出院总人数(人)':classid===1?'出院总费用(万元)':classid===2?'出院人次数(人次)':'出院自费金额(万元)']"></el-table-column>
          <el-table-column align="center" prop="value5" :label="[classid===0?'出院医保人数占比(%)':classid===1?'医保费用占比(%)':classid===2?'出院医保总费用(万元)':'出院总费用(万元)']"></el-table-column>
        </el-table>
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
      t.startdate = t.$route.query.startdate
      t.enddate = t.$route.query.enddate
      if (t.$route.query.name === "住院医保人次") {
        t.classid = 0
        t.title = "出院患者医保人数"
      } else if (t.$route.query.name === "住院医保报销费用") {
        t.classid = 1
        t.title = "出院患者医保费用"
      } else if (t.$route.query.name === "住院医保均次费用") {
        t.classid = 2
        t.title = "出院医保均次费用"
      } else {
        t.classid = 3
        t.title = "出院患者医保自付比例"
      }
      t.initChart1.label = t.classid === 0 ? '人' : t.classid === 1 ? '万元' : t.classid === 2 ? '%' : '元'
      t.updateTitle(t.title)
      t.getZyMrcFyTbHbTypeInfo()
    },
    data() {
      return {
        classid: 0,
        title: '',
        startdate: '',
        enddate: '',
        tableData1: '',
        tableData2: '',
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
          url: t.WSD.serverPath1 + 'mobile/getYlbzZyyb',
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
  .ybys {
    color: #3B7CC2
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