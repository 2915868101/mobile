<template>
  <div class="chartTitle f-df">
    <div class="f-df1" v-for="(c,i) in items" :key="i">
      <div class="f-df" :style="{'padding-left':c.left,'padding-right':c.left,'padding-top':c.top}">
        <div class="f-mr8"><i class="item_tag" :style="{'background-color':c.color}"></i></div>
        <div class="f-df1">
          <div :class="[(c.theme==2?'s-cd4d4d6 f-ff0':'s-cfff f-ff1')]"><span :style="{'font-size':setMediaSize(c.theme==2?12:14)+'px'}">{{c.text}}</span></div>
          <div :class="['f-mt5 '+(c.theme==2?'s-cfff f-ff0':'s-c8d8d8d f-ff1')]"><span :style="{'font-size':setMediaSize(c.theme==2?20:12)+'px'}">{{c.subtext}}</span></div>
        </div>
        <div class="f-pt20 f-ff0" v-if="typeof c.value!='undefined'">
          <span class="s-cfff" :style="{'font-size':setMediaSize(20)+'px'}">{{c.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chartTitle',
  props: ['title'],
  components: {},
  computed: {},
  created() {
  },
  data() {
    return {
      items: this.title
    }
  },
  methods: {},
  mounted() {}
}
</script>
<style scoped>
.chartTitle .item_tag {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #157cfc;
  z-index: 11;
}
</style>