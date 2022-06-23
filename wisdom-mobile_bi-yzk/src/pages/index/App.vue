<template>
  <div id="app" class="g-wrap">
    <vue-ins-progress-bar></vue-ins-progress-bar>
    <transition :name="$store.state.transitionName">
      <router-view class="child-view active animated s-bgcfff"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  computed: {},
  created() {
    var t = this
    t.$insProgress.start()
  },
  data() {
    return {}
  },
  watch: {
    '$route'(to, from) {
      var t = this
      t.skipPage(to, from)
    }
  },
  methods: {},
  mounted() {
  }
}
</script>
<style lang="less">
</style>