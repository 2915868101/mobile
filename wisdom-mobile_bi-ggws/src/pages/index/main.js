import '@/assets/js/util/style.js'

import Vue from 'vue'
import App from './App'

import router from '@/assets/js/util/router.js'
import store from '@/assets/js/util/store.js'
import { sync } from 'vuex-router-sync'
sync(store, router)

import '@/assets/js/util/vue-easytable.js'
import '@/assets/js/util/element-ui.js'
import '@/assets/js/util/vant.js'

import '@/assets/js/util/vue_mixin.js'
import '@/assets/js/util/vue_prototype.js'

import VueInsProgressBar from 'vue-ins-progress-bar'
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '2px'
})

router.beforeEach(function(to, from, next) {
  store.state.toPageName = to.name
  store.state.fromPageName = from.name
  if (to.name != '404') {
    store.commit('updateLoading', true)
  }
  Vue.prototype.$insProgress.start()
  next()
})
router.afterEach(function() {
  Vue.prototype.$insProgress.finish()
  store.commit('updateLoading', false)
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});