<template>
  <div class="gnlb_index g-wrap">
    <div class="banner">
      <img src="../../assets/img/style/gnlb/bannar2.png" />
      <div class="title2">
        <span class="f-fs18 s-cfff  f-lh20">领导运营监管</span><br>
        <span class="f-fs9 s-cfff f-lh20"> Lead operation supervision</span>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading">
      <div class="card" v-for="(d, i) in datas" :key="i">
        <div class="m-list" v-if="!(d.title=='疫情物资库存'&&tabIndex>0)">
          <div v-if="d.title" class="title f-pt5">{{ d.title }}</div>
          <div v-for="(s, j) in d.subs" :key="j">
            <van-cell v-if="!s.showIndex || s.showIndex.indexOf(activeIndex) != -1" @click="toPage(s)" is-link style="padding-left:10px;">
              <template #title>
                <div class="f-fl">
                  <span class="img f-dfv f-tac" :class="s.theme"> <i :class="['wsdfont', s.icon]"></i></span>
                </div>
                <div class="f-fs16 f-lh26 f-ml40">{{ s.title }}</div>
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
      t.updateTitle("领导运营监管");
      t.tabIndex = t.$store.state.store_gnlb.tab_index;
      t.activeIndex = t.$store.state.store_gnlb.active_index + "";
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
        datas: [{
            title: "医疗服务",
            subs: [{
                title: "门诊概况",
                icon: "wsd-menzhenyiyuankeshiyiliaof",
                theme: "s-bc-bluebrand",
                url: "srtj_fyfx",
              },
              {
                title: "住院概况",
                icon: "wsd-zhuyuan3f",
                theme: "s-bc-warning",
                url: "srtj_mzfyfx",
              },
              {
                title: "运营效率",
                icon: "wsd-qianyiliaoshouru7f ",
                theme: "s-bc-success",
                url: "srtj_zyfyfx",
              }
            ],
          },
          {
            title: "医疗保障",
            subs: [{
                title: "门诊医保概况",
                icon: "wsd-yibao2f ",
                theme: "s-bc-infopurple",
                url: "srtj_yzbfx",
              },
              {
                title: "住院医保概况",
                icon: "wsd-yiyuankeshif ",
                theme: "s-bc-infoteal",
                url: "zyzb_zyyzb",
              }
            ],
          },
          {
            title: "远程监控",
            subs: [{
                title: "区域检验",
                icon: "wsd-jianyanhuaxueshaopinghuayanf ",
                theme: "s-bc-infopurple",
                url: "zyzb_zyrc",
              },
              {
                title: "区域影像",
                icon: "wsd-tupianwenjianf ",
                theme: "s-bc-success",
                url: "zyzb_ryrc",
              },
              {
                title: "区域心电",
                icon: "wsd-xindiantuf",
                theme: "s-bc-danger",
                url: "zyzb_cyrc",
              },
              {
                title: "远程会诊",
                icon: "wsd-pingmuxianshif ",
                theme: "s-bc-bluebrand",
                url: "yyzb_swrc",
              },
              {
                title: "双向转诊",
                icon: "wsd-jiaohuan2f ",
                theme: "s-bc-warning",
                url: "yyzb_ybzb",
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
      },
      toPage(data) {
        const t = this;
        t.linkToPage(data.url);
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
    margin: 12px 0 0px;
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
    width: 26px;
    height: 26px;
    border-radius: 4px;
    opacity: 0.7;
  }

  .gnlb_index .m-list .img i {
    font-size: 20px;
    color: #ffffff;
    opacity: 0.8;
  }

  .gnlb_index .m-list .txt b {
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #202735;
  }

  .gnlb_index .m-list .subs .icons .txt2 {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #898e97;
    margin: 0 auto;
  }

  .gnlb_index .m-list .subs .icons .txt3 {
    word-break: keep-all;
    width: 70px;
  }

  .gnlb_index .m-list .subs .icons .txt4 {
    word-break: keep-all;
    width: 60px;
  }

  @media screen and (max-width: 320px) {}
</style>