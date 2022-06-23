import Vue from 'vue'

Vue.mixin({
  computed: {
    baseUrl() {
      return window.location.origin + '/'
    },
    WSD() {
      return window.WSD
    },
    __static() {
      return process.env.BASE_URL + 'static'
    },
    store_config() {
      return this.$store.state.store_config
    },
    queryData() {
      var t = this
      var obj = ''
      if (t.$route.query.data) {
        obj = JSON.parse(t.$route.query.data)
      }
      return obj
    },
    isFullPage() {
      return this.$store.state.isFullPage
    }
  },
  filters: {
    currency: function(value) {
      return Number(value) ? (Number(value) > 0 ? (parseInt(value)).toLocaleString('en-US') : 0) : value
    }
  },
  activated() {},
  created() {},
  data() {
    return {}
  },
  watch: {},
  methods: {
    divFullScreen($event, type) {
      var t = this
      t.toggleFullPage($event.currentTarget, type)
    },
    toggleFullPage(el, type) {
      var t = this
      t.$store.state.isFullPage = !t.$store.state.isFullPage
      if (el) {
        t.$nextTick(function() {
          var pel = document.querySelector('.child-view')
          var body = document.body
          var s_w = body.clientWidth
          var s_h = body.clientHeight
          var cla = el.getAttribute('class')
          if (cla.indexOf('animation') == -1) {
            el.setAttribute('class', cla + ' animation')
          }
          cla = el.getAttribute('class')
          if (t.isFullPage) {
            if ((el.offsetWidth > el.offsetHeight && !type) || type == 'v') {
              el.style.width = s_h + 'px'
              el.style.height = s_w + 'px'
              el.setAttribute('class', cla + ' screen-full rotate')
            } else {
              el.style.width = s_w + 'px'
              el.style.height = s_h + 'px'
              el.setAttribute('class', cla + ' screen-full')
            }
            pel.style.overflow = 'hidden'
          } else {
            el.setAttribute('class', cla.replace(/ screen-full/g, '').replace(/ rotate/g, ''))
            el.removeAttribute('style')
            pel.removeAttribute('style')
          }
        })
      }
    }
  },
  mounted() {
    var t = this
    t.$insProgress.finish()
  },
  beforeDestroy() {},
  deactivated() {}
})