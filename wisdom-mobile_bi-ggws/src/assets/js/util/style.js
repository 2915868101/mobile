import '@/assets/css/util/root.css'
import '^/theme.css'
import '@/assets/fonts/iconfont/iconfont.css'
import '@/assets/fonts/iconfont2/iconfont2.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'swiper/css/swiper.css'
import '@/assets/css/util/common.css'
import '@/assets/css/util/base.css'
import '@/assets/css/util/style.css'

import Vue from 'vue'
import querystring from 'querystring'
Vue.prototype.$querystring = querystring

import vueMoment from 'vue-moment'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(vueMoment, {
  moment
})