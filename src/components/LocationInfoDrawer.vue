<template>
    <a-drawer :visible="visible" :title="currentLocation.name" @close="close" wrapClassName="location-info-drawer">
      {{currentLocation.description}}
    </a-drawer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'AppLocationInfoDrawer',
  props: {
    visible: Boolean,
    close: Function,
  },
  computed: {
    ...mapGetters(['currentLocation'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .location-info-drawer {
    .ant-drawer-content-wrapper {
      width: 100%!important;
      .ant-drawer-wrapper-body {
        background-color: aquamarine;
      }
    }
  }
</style>
