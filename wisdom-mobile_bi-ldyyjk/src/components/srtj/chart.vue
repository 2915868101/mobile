<template>
  <div class="srtj_fyfx g-wrap">
    <div class="date-wrap">
      <div class="f-pt10 f-pl10 f-pr10 f-df f-dfj">
        <div class="date-input" @click="showDate1=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date1).format('YYYY-MM-DD')}}</span></div>
        <div class="date-input" @click="showDate2=true"><i class="f-ml10 f-mr8"></i><span>{{$moment(Date2).format('YYYY-MM-DD')}}</span></div>
        <van-button color="#409EFF">查询</van-button>
      </div>
      <van-popup v-model="showDate1" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date1" type="date" title="选择开始时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate1=false" @confirm="showDate1=false" />
      </van-popup>
      <van-popup v-model="showDate2" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker v-model="Date2" type="date" title="选择结束时间" :min-date="minDate" :max-date="maxDate" @cancel="showDate2=false" @confirm="showDate2=false" />
      </van-popup>
    </div> 
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-bar1 :title="1" ref="chartPublic4"></chart-bar1> 
    </div>
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-public3 :title="1" ref="chartPublic3"></chart-public3> 
    </div>
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-public2 :title="1" ref="chartLine2"></chart-public2> 
    </div>
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-public2 :title="1" ref="chartBar2"></chart-public2> 
    </div>
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-public1 :title="1" ref="chartLine1"></chart-public1> 
    </div>
    <div class="f-pt20 g-h300 s-bgcfff"> 
      <chart-public1 :title="1" ref="chartBar1"></chart-public1> 
    </div>
    <div class="f-pt20 g-h200 s-bgcfff" ref="bbb">
      <div class="f-df f-dfj" @click="doToggle('bbb')">
      <div class="f-fs18 f-fwb">饼图名称</div>
      <i class="fullscreen f-mr8 f-mt8"></i></div> 
      <chart-pie :title="1" ref="chartPie1"></chart-pie> 
    </div>
  </div>
</template>
<script>
import chartPie from '../util/chartPie' //饼图
import chartPublic1 from '../util/chartPublic1' //1个echart1
import chartPublic2 from '../util/chartPublic2' //2个echart2
import chartPublic3 from '../util/chartPublic3' //3个echart3
import chartBar1 from '../util/chartBar1' //横向图表
var classid;
export default {
  name: 'srtj_fyfx',
  components: {
    chartPie,
    chartPublic1,
    chartPublic2,
    chartPublic3,
    chartBar1
  },
  computed: {},
  created() {
    var t = this
    t.updateTitle('echart图表')
    // t.setFooterData()
    t.searchForm.startdate = t.$moment(t.Date1).format('YYYYMMDD')
    t.searchForm.enddate = t.$moment(t.Date2).format('YYYYMMDD')
    t.getQyKsZbInfo()
    t.getYpsrzbData()
    t.getYpsrzbData1()
  },
  data() {
    var t = this
    return {
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

      tableData: [],
      initChartData: [],
      initChart1:{
        data:[],
        type:'line',
        label:'费用'
      },
      initChart2:{
        data:[],
        type:'bar',
        label:'费用' 
      },
      initChart3:{
        data:[],
        type:'line',
        label:['挂号人数','退号人数']
      },
      initChart4:{
        data:[],
        type:'bar',
        label:['挂号人数','退号人数'] 
      },
      initChart5:{
        data:[{value1:120,value2:200,value3:0.61,name:'12-11'},
                {value1:10,value2:32,value3:0.32, name:'12-12'},
                {value1:45,value2:90,value3:0.51, name:'12-13'},
                {value1:50,value2:99,value3:0.65, name:'12-14'},
                {value1:30,value2:60,value3:0.50, name:'12-15'},
                {value1:148,value2:300,value3:0.63, name:'12-16'},
                {value1:148,value2:240,value3:0.78, name:'12-17'}], 
        label:['药品费用','总费用','药占比'] 
      },
      initChart6:{
        data:[{name:'12-11',value:320},
                {name:'12-12',value:302},
                {name:'12-13',value:301},
                {name:'12-14',value:334},
                {name:'12-15',value:390},
                {name:'12-16',value:330},
                {name:'12-17',value:321}], 
        label:'急诊人次' 
      }
    }
  },
  methods: {
    getYpsrzbData() {
      var t = this
      t.ajax({
        method: 'post',
        url: t.WSD.serverPath1 + 'mobile/getZYMrcFyTypeInfoTop',
        params: t.searchForm,
        success(data) { 
          t.$nextTick(function() {
            t.initChartData=data
            t.initChart1.data=data
            t.initChart2.data=data
            //这里执行渲染图表 
            t.$refs.chartPie1.setOptions(t.initChartData)
            t.$refs.chartLine1.setOptions(t.initChart1)
            t.$refs.chartBar1.setOptions(t.initChart2)
            t.$refs.chartPublic3.setOptions(t.initChart5)
            t.$refs.chartPublic4.setOptions(t.initChart6)
          })
        }
      })
    },
    getYpsrzbData1() {
      var t = this
      t.ajax({
        method: 'post',
        url: t.WSD.serverPath1 + 'mobile/getMzGhThrcInfoTwo',
        params: t.searchForm,
        success(data) { 
          t.$nextTick(function() { 
            t.initChart3.data=data
            t.initChart4.data=data
            //这里执行渲染图表 4
            t.$refs.chartLine2.setOptions(t.initChart3)
            t.$refs.chartBar2.setOptions(t.initChart4)
          })
        }
      })
    },
    //请求数据
    getQyKsZbInfo() {
      var t = this
      t.ajax({
        methods: 'post',
        url: t.WSD.serverPath1 + 'mobile/getQyKsZbInfo',
        params: t.searchForm,
        success: function(data) {
          t.tableData = data
        }
      })
    },
    headerCol(col) {
      var t = this
      var key = col.property
      var data = t.tableData
      if (col.property != null) {
        t.dataChane(data, key, col.label)
      }

      if (classid != null) {
        var div = document.getElementsByClassName(classid)
        for (let i = 0; i < div.length; i++) {
          div[i].style.backgroundColor = ""
          div[i].childNodes[0].style.backgroundColor = ""
        }
        classid = col.id
        div = document.getElementsByClassName(classid)
        for (let i = 0; i < div.length; i++) {
          div[i].style.backgroundColor = "#eef1f6"
          div[i].childNodes[0].style.backgroundColor = "#eef1f6"
        }
      } else {
        classid = col.id
        div = document.getElementsByClassName(classid)
        for (let i = 0; i < div.length; i++) {
          div[i].style.backgroundColor = "#eef1f6"
          div[i].childNodes[0].style.backgroundColor = "#eef1f6"
        }
      }
    },
    dataChane(data, key, label) {
      var t = this
      var json = []
      for (var i = 0; i < data.length; i++) {
        var jsonObj = data[i]
        for (var item in jsonObj) {
          if (item == key) { //item 表示Json串中的属性，如'name'
            var j = {}
            j.value = jsonObj[item]
            j.name = jsonObj['ks']
            if (t.toDecimal(j.value) > 0) {
              json.push(j)
            }
          }
        }
      }
      console.log(json, label)
      t.$nextTick(function() { 
        //这里执行渲染图表  
        t.$refs.chartLine1.setOptions(json)

            t.initChart1.data=json 
            t.initChart1.label=label 
            //这里执行渲染图表  
            t.$refs.chartLine1.setOptions(t.initChart1)
      })
    }, 
    toDecimal(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return;
      }
      f = Math.round(x * 100) / 100;
      return f;
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
.srtj_fyfx .date-wrap .date-input {
  width: 39%;
  border: 1px solid #c0c4cc;
  border-radius: 3px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
}

.srtj_fyfx .date-wrap .date-input i {
  background: url(../../assets/img/util/calendar.svg) no-repeat;
  background-size: 100%;
  display: inline-block;
  width: 15px;
  height: 15px;
}

.srtj_fyfx>>>.van-button {
  height: 32px;
}


@media screen and (max-width: 320px) {}
</style>