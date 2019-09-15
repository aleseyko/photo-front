<template>
  <div>
    <a-comment v-for="(comment, index) in comments" :key="index">
      <a slot="author">{{comment.name}}</a>
      <p slot="content">{{comment.comment}}</p>
    </a-comment>
  </div>
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
  },
  props: {
    comments: Array,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 a{
   font-weight: bold;
   color: black;
 }
  p{
    color: black;
  }
</style>
