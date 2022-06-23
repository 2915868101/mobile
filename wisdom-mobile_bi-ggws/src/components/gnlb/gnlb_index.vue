<template>
  <div class="gnlb_index g-wrap">
    <div class="banner">
      <img src="../../assets/img/style/gnlb/bannar2.png" />
      <div class="title2">
        <span class="f-fs18 s-cfff  f-lh20">公卫运营监管</span><br>
        <span class="f-fs9 s-cfff f-lh20"> Public health operation supervision</span>
      </div>
    </div>
    <ul class="tab f-df f-dfj">
      <li v-for="(m, i) in menus" :key="m.index" @click="changeTab(m.index, i)" :class="[tabIndex == i ? 'active' : '']">
        <span class="f-fs16 f-lh20">{{ m.title }}</span>
      </li>
    </ul>
    <van-pull-refresh v-model="isLoading" @refresh="getPageData">
      <div class="card" v-for="(d, i) in datas" :key="i">
        <div class="m-list" v-if="!(d.title=='疫情物资库存'&&tabIndex>0)">
          <div v-if="d.title" class="title f-pt5">{{ d.title }}</div>
          <div v-for="(s, j) in d.subs" :key="j">
            <van-cell v-if="!s.showIndex || s.showIndex.indexOf(activeIndex) != -1" @click="toPage(s)" is-link style="padding-left:10px;">
              <template #title>
                <div class="f-fl">
                  <span class="img f-dfv f-tac" :class="s.theme"> <i :class="['iconfont', s.icon]"></i></span>
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
      t.updateTitle("公卫运营监管");
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
          title: "公共卫生",
          index: "2",
        }],
        datas: [{
            subs: [{
                title: "健康档案管理",
                icon: "wsd-tijiandanf",
                theme: "s-bc-warning",
                url: "srtj_fyfx",
              },
              {
                title: "孕产妇健康管理",
                icon: "wsd-nvrenf",
                theme: "s-bc-bluebrand",
                url: "srtj_mzfyfx",
              },
              {
                title: "儿童健康保健",
                icon: "wsd-renertong",
                theme: "s-bc-infoindigo",
                url: "srtj_zyfyfx",
              },
              {
                title: "老年人管理",
                icon: "wsd-laonianrenf",
                theme: "s-bc-bluebrand",
                url: "srtj_yzbfx",
              },
            ],
          },
          {
            subs: [{
                title: "糖尿病管理",
                icon: "wsd-shentangniaobingf",
                theme: "s-bc-bluebrand",
                url: "mzzb_mzrc",
              },
              {
                title: "高血压管理",
                icon: "wsd-xindiantuf",
                theme: "s-bc-warning",
                url: "mzzb_jzrc",
              },
              {
                title: "精神病管理",
                icon: "wsd-tounaojingshenbingf",
                theme: "s-bc-success",
                url: "mzzb_tjrc",
              },
              {
                title: "健康教育",
                icon: "wsd-shuf",
                theme: "s-bc-infopurple",
                url: "mzzb_mzyzb",
              },

            ],
          },
          {
            subs: [{
                title: "预防接种",
                icon: "wsd-dazhenf",
                theme: "s-bc-infoindigo",
                url: "zyzb_ryrc",
              },
              {
                title: "卫生计生监督\n协管",
                icon: "wsd-yiyuankeshi",
                theme: "s-bc-infopurple",
                url: "zyzb_cyrc",
              },
              {
                title: "血液中心",
                icon: "wsd-xieshuif",
                theme: "s-bc-warning",
                url: "zyzb_zyrc",
              },
              {
                title: "传染病及突发\n公共卫生事件\n报告和处理",
                icon: "wsd-bingduf",
                theme: "s-bc-bluebrand",
                url: "zyzb_zyyzb",
              },
            ],
          },
          {
            subs: [{
              title: "肺结核患者",
              icon: "wsd-feif",
              theme: "s-bc-success",
              url: "yyzb_ybzb",
            }, ],
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
        t.isLoading = false;
      },
      //请求数据
      async getRealTimeData() {
        const t = this;
        return await t.ajax({
          methods: "post",
          url: t.WSD.serverPath1 + "mobile/getHomeInfo2",
          params: {
            activeIndex: t.activeIndex,
            token: t.$route.query.token
          },
        });
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

  .gnlb_index .m-list .txt2 {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #898e97;
    margin: 0 auto;
  }

  .gnlb_index .m-list .txt3 {
    word-break: keep-all;
    width: 70px;
  }

  .gnlb_index .m-list .txt4 {
    word-break: keep-all;
    width: 60px;
  }

  @media screen and (max-width: 320px) {}
</style>