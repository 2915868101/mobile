import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/assets/js/util/http.js'

const noPage = () => import('@/components/util/404')

Vue.use(VueRouter)

var routes = [{
  path: '*',
  name: 'noPage',
  component: noPage,
  meta: {
    title: '404页面'
  }
}]

const files = require.context("../router/", false, /\.js$/)
files.keys().forEach((key) => {
  let route = files(key).default
  routes = routes.concat(route)
})

export default new VueRouter({
  routes: routes
})