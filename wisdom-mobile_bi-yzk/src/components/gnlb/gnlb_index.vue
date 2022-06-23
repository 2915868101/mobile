<template>
  <div class="gnlb_index g-wrap">
    <div class="banner">
      <img src="../../assets/img/style/gnlb/bannar2.png" />
      <div class="title2">
        <span class="f-fs18 s-cfff  f-lh20">医政运营监控</span><br>
        <span class="f-fs9 s-cfff f-lh20">Medical administration operation supervision</span>
      </div>
    </div>
    <ul class="tab f-df f-dfj">
      <li v-for="(m, i) in menus" :key="m.index" @click="changeTab(m.index, i)" :class="[tabIndex == i ? 'active' : '']">
        <span class="f-fs16 f-lh20">{{ m.title }}</span>
      </li>
    </ul>
    <van-pull-refresh v-model="isLoading" @refresh="getPageData" v-if="activeIndex !='2'">
      <div class="card" v-for="(d, i) in datas" :key="i">
        <div class="m-list" v-if="!(d.title=='疫情物资库存'&&tabIndex>0)">
          <div v-if="d.title" class="title f-pt5">{{ d.title }}</div>
          <div v-for="(s, j) in d.subs" :key="j">
            <van-cell v-if="!s.showIndex || s.showIndex.indexOf(activeIndex) != -1" @click="toPage(s)" style="padding-left:10px;">
              <template #title>
                <div class="f-fl">
                  <span class="img f-dfv f-tac" :class="s.theme"> <i :class="['wsdfont', s.icon]"></i></span>
                </div>
                <div class="f-pl50">
                  <div class="f-fs16 f-lh22 f-pl6"> {{ s.title }}</div>
                  <div class="txt f-lh18 f-pl6">
                    <b v-if="s.value">{{ s.value }}{{ s.unit }}</b>
                    <b v-else>--</b>
                  </div>
                </div>
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-pull-refresh v-model="isLoading" @refresh="getPageData" v-else>
      <div class="card" v-for="(d, i) in datas1" :key="i">
        <div class="m-list" v-if="!(d.title=='疫情物资库存'&&tabIndex>0)">
          <div v-if="d.title" class="title f-pt5">{{ d.title }}</div>
          <div v-for="(s, j) in d.subs" :key="j">
            <van-cell v-if="!s.showIndex || s.showIndex.indexOf(activeIndex) != -1" @click="toPage(s)" is-link style="padding-left:10px;">
              <template #title>
                <div class="f-fl">
                  <span class="img f-dfv f-tac" :class="s.theme"> <i :class="['wsdfont', s.icon]"></i></span>
                </div>
                <div class="f-pl50">
                  <div class="f-fs16 f-lh22 f-pl6"> {{ s.title }}</div>
                  <div class="txt f-lh18 f-pl6">
                    <b v-if="s.value">{{ s.value }}{{ s.unit }}</b>
                    <b v-else>--</b>
                  </div>
                </div>
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
  export default {
    name: "gnlb_index",
    token: "",
    components: {},
    computed: {},
    created() {
      const t = this;
      t.updateTitle("医政运营监管");
      t.tabIndex = t.$store.state.store_gnlb.tab_index;
      t.activeIndex = t.$store.state.store_gnlb.active_index + "";
      t.getPageData();
      t.token = this.$route.query.token;
      if (null == t.token || 'undefined' == t.token || "" == t.token) {
        t.linkToPage("error");
      }
    },
    data() {
      return {
        isLoading: false,
        tabIndex: 0,
        activeIndex: "2",
        menus: [{
            title: "当月",
            index: "2",
          },
          {
            title: "上月环比",
            index: "3",
          },
          {
            title: "上月同比",
            index: "4",
          },
        ],
        datas: [{
            title: "医政科指标",
            subs: [{
                name: "YLFYZZFD",
                value: "",
                unit: "%",
                title: "医疗费用增长\n幅度",
                icon: "wsd-qianzengchangf",
                theme: "s-bc-infopurple",
                url: "srtj_fyfx",
              },
              {
                name: "YYYZ",
                value: "",
                unit: "%",
                title: "公立医院药费\n用增幅",
                icon: "wsd-yaoqianf-1",
                theme: "s-bc-success",
                url: "srtj_mzfyfx",
              },
              {
                name: "LCLJBLZB",
                value: "",
                unit: "%",
                title: "临床路径病历\n增幅",
                icon: "wsd-tongjiwenjianwendangshujuf",
                theme: "s-bc-infopink",
                url: "srtj_zyfyfx",
              },
              {
                name: "YYYLFWSR",
                value: "",
                unit: "%",
                title: "公立医院医疗\n服务收入增幅",
                icon: "wsd-xinqianf",
                theme: "s-bc-bluebrand",
                url: "srtj_yzbfx",
              },
            ],
          },
          {
            subs: [{
                name: "PJZYR",
                value: "",
                unit: "%",
                title: "平均住院日增幅",
                icon: "wsd-yizhuchufanglinshif",
                theme: "s-bc-warning",
                url: "mzzb_mzrc",
              },
              {
                name: "ZYRJFYZF",
                value: "",
                unit: "%",
                title: "住院病人次均\n费用增长幅度",
                icon: "wsd-renqianf",
                theme: "s-bc-infopurple",
                url: "mzzb_jzrc",
              },
              {
                name: "MZZYRCB",
                value: "",
                unit: "%",
                title: "门诊人次数\n增幅",
                icon: "wsd-renshuyonghutongjif",
                theme: "s-bc-success",
                url: "mzzb_tjrc",
              },
              {
                name: "SSJSSZB",
                value: "",
                unit: "%",
                title: "出院患者三、\n四级手术增幅",
                icon: "wsd-shoushudaozhanbif",
                theme: "s-bc-bluebrand",
                url: "zyzb_ryrc",
              },
            ],
          },
          {
            subs: [{
                name: "MZCJYFZF",
                value: "",
                unit: "%",
                title: "门诊均药品费\n用增幅",
                icon: "wsd-yaozengfushangf",
                theme: "s-bc-warning",
                url: "zyzb_zyrc",
              },
              {
                name: "ZYCJYFZF",
                value: "",
                unit: "%",
                title: "住院次均药品\n费用增幅",
                icon: "wsd-yaoqianf ",
                theme: "s-bc-infopurple",
                url: "mzzb_mzyzb",
              }
            ],
          },
        ],
        datas1: [{
            title: "医政科指标",
            subs: [{
                name: "YLFYZE",
                value: "",
                unit: "元",
                title: "医疗费用总额",
                icon: "wsd-qianzengchangf",
                theme: "s-bc-infopurple",
                url: "srtj_fyfx",
              },
              {
                name: "YPSR",
                value: "",
                unit: "元",
                title: "药品收入",
                icon: "wsd-yaoqianf-1",
                theme: "s-bc-success",
                url: "srtj_mzfyfx",
              },
              {
                name: "LCLJWCS",
                value: "",
                unit: "人",
                title: "临床路径完成数",
                icon: "wsd-tongjiwenjianwendangshujuf",
                theme: "s-bc-infopink",
                url: "srtj_zyfyfx",
              },
              {
                name: "YLFWSR",
                value: "",
                unit: "元",
                title: "医疗服务收入",
                icon: "wsd-xinqianf",
                theme: "s-bc-bluebrand",
                url: "srtj_yzbfx",
              },
            ],
          },
          {
            subs: [{
                name: "PJZYR",
                value: "",
                unit: "天",
                title: "平均住院日",
                icon: "wsd-yizhuchufanglinshif",
                theme: "s-bc-warning",
                url: "mzzb_mzrc",
              },
              {
                name: "ZYBRJCFY",
                value: "",
                unit: "元",
                title: "住院病人次均\n费用",
                icon: "wsd-renqianf",
                theme: "s-bc-infopurple",
                url: "mzzb_jzrc",
              },
              {
                name: "MZRCS",
                value: "",
                unit: "人",
                title: "门诊人次数",
                icon: "wsd-renshuyonghutongjif",
                theme: "s-bc-success",
                url: "mzzb_tjrc",
              },
              {
                name: "ZYRCS",
                value: "",
                unit: "人",
                title: "出院人次数",
                icon: "wsd-renchuyuan2f",
                theme: "s-bc-infopink",
                url: "zyzb_cyrc",
              },
            ],
          },
          {
            subs: [{
                name: "SSJSSLS",
                value: "",
                unit: "例",
                title: "出院患者三、\n四级手术例数",
                icon: "wsd-shoushudaozhanbif",
                theme: "s-bc-bluebrand",
                url: "zyzb_ryrc",
              },
              {
                name: "MZCJYF",
                value: "",
                unit: "元",
                title: "门诊次均药品\n费用",
                icon: "wsd-yaozengfushangf",
                theme: "s-bc-warning",
                url: "zyzb_zyrc",
              },
              {
                name: "ZYCJYF",
                value: "",
                unit: "元",
                title: "住院次均药品\n费用",
                icon: "wsd-yaoqianf ",
                theme: "s-bc-infopurple",
                url: "mzzb_mzyzb",
              }
            ],
          },
        ],
      };
    },
    methods: {
      changeTab(index, val) {
        const t = this;
        t.activeIndex = index;
        t.tabIndex = val;
        t.$store.state.store_gnlb.active_index = index;
        t.$store.state.store_gnlb.tab_index = val;
        t.getPageData();
      },
      //解析数据
      async getPageData() {
        const t = this;
        let data = await t.getRealTimeData();
        if (null == data.OPENID || 'undefined' == data.OPENID || "" == data.OPENID) {
          t.linkToPage("error");
        }
        if (t.activeIndex == "2") {
          for (var a = 0; a < t.datas1.length; a++) {
            for (var b = 0; b < t.datas1[a].subs.length; b++) {
              t.datas1[a].subs[b].value = "";
              for (var key1 in data) {
                if (t.datas1[a].subs[b].name == key1) {
                  if (data[key1] > 100000000) {
                    t.datas1[a].subs[b].value =
                      t.toDecimal(data[key1] / 100000000) + "亿";
                  } else if (data[key1] > 10000) {
                    t.datas1[a].subs[b].value =
                      t.toDecimal(data[key1] / 10000) + "万";
                  } else {
                    t.datas1[a].subs[b].value = data[key1];
                  }
                }
              }
            }
          }
        } else {
          for (var i = 0; i < t.datas.length; i++) {
            for (var j = 0; j < t.datas[i].subs.length; j++) {
              t.datas[i].subs[j].value = "";
              for (var key in data) {
                if (t.datas[i].subs[j].name == key) {
                  if (data[key] > 100000000) {
                    t.datas[i].subs[j].value =
                      t.toDecimal(data[key] / 100000000) + "亿";
                  } else if (data[key] > 10000) {
                    t.datas[i].subs[j].value =
                      t.toDecimal(data[key] / 10000) + "万";
                  } else {
                    t.datas[i].subs[j].value = data[key];
                  }
                }
              }
            }
          }
        }

        t.isLoading = false;
      },
      //请求数据
      async getRealTimeData() {
        const t = this;
        return await t.ajax({
          methods: "post",
          url: t.WSD.serverPath1 + "mobile/getHomeInfo",
          params: {
            activeIndex: t.activeIndex,
            token: t.$route.query.token
          },
        });
      },
      toPage(data) {
        const t = this;
        if (t.activeIndex == 2) {
          t.linkToPage(data.url);
        }
      },
    },
    mounted() {},
  };
</script>
<style scoped>
  .gnlb_index {
    padding-left: 12px;
    padding-right: 12px;
    height: 100vh;
    background-color: #ffffff;
    background-size: 100% 100%;
    overflow: auto;
  }

  .gnlb_index .banner .title2 {
    z-index: 1;
    position: absolute;
    top: 42px;
    left: 25px;
  }

  .gnlb_index .banner {
    margin-top: 15px;
    margin: 12px 0 20px;
    z-index: -1;
    position: relative;
  }

  .gnlb_index .banner img {
    width: 100%;
    height: 120px;
  }

  .gnlb_index .tab {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 10px;
    height: 28px;
  }

  .gnlb_index .tab li {
    position: relative;
    height: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #283142;
    opacity: 0.6;
  }

  .gnlb_index .tab .active {
    font-weight: 600;
    color: #202735;
    opacity: 1;
  }

  .gnlb_index .tab .active::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 4px;
    left: 0;
    right: 0;
    top: 24px;
    margin: 0 auto;
    background: #202735;
    border-radius: 2px;
  }

  .gnlb_index .card {
    margin: 0 auto;
  }

  .gnlb_index .m-list {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #F4F5FA
  }

  .gnlb_index .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: -0px 10px;
    color: #8997B2;
  }

  .gnlb_index .m-list .img {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    opacity: 0.7;
  }

  .gnlb_index .m-list .img i {
    font-size: 32px;
    color: #ffffff;
    opacity: 0.8;
  }

  .gnlb_index .m-list .txt b {
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    color: #3B7CC2;
  }

  .gnlb_index .m-list .subs .icons .txt2 {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #898e97;
    margin: 0 auto;
  }

  /* .gnlb_index .m-list .subs .icons .txt3 {
  word-break: keep-all;
  width: 70px;
}

.gnlb_index .m-list .subs .icons .txt4{
  word-break: keep-all;
  width: 60px;
} */
  @media screen and (max-width: 320px) {}
</style>