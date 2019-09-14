<template>
  <a-comment>
    <a slot="author">Han Solo</a>
    <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    <a-tooltip slot="datetime" :title="tooltipTitle">
      <span>{{timeFromNow}}</span>
    </a-tooltip>
  </a-comment>
</template>

<script>
  import moment from 'moment'
export default {
  name: 'HelloWorld',
  computed: {
    timeFromNow: function() {
      return moment().fromNow() || 'not found time'
    },
    tooltipTitle: function() {
      return moment().format('YYYY-MM-DD HH:mm:ss') || 'not found time'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
