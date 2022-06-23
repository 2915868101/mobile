import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var state = {
  routerLoading: false,
  toPageName: '',
  fromPageName: '',
  transitionName: 'fade',
  title: '',
  isFullPage: false
}

var mutations = {
  updateLoading(state, loading) {
    state.routerLoading = loading
  },
  updateTitle(state, title) {
    if (document) {
      document.title = title
    }
    state.title = title
  }
}

const files = require.context("../store", false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default
})

import store_config from '@/store_config.js'
modules['store_config'] = store_config

Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true
})

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  modules
})