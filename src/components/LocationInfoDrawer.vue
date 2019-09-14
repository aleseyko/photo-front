<template>
  <a-drawer :visible="visible" :title="currentLocation.name" @close="close" wrapClassName="location-info-drawer">
    <img :src="currentLocation.mainPhoto" alt="">
    {{currentLocation.address}}
    {{currentLocation.description}}
    <a-rate allowHalf
            :value="currentLocation &&
             currentLocation.comments &&
              currentLocation.comments.reduce((a, b)=> a + b.mark, 0)/currentLocation.comments.length || 0">
      <a-icon slot="character" type="fire"/>
    </a-rate>
    <a-button v-if="!isOpenComment" @click="()=>isOpenComment = true">
      Оцінити
    </a-button>
    <div v-if="isOpenComment">
      <a-input v-model="name"></a-input>
      <a-textarea v-model="comment"></a-textarea>
      <a-rate allowHalf v-model="mark">
        <a-icon slot="character" type="fire"/>
      </a-rate>
      <a-button @click="sendComment">
        Відправити
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
  import {mapGetters} from "vuex";
  import {SEND_COMMENT} from "../actions";

  export default {
    name: 'AppLocationInfoDrawer',
    props: {
      visible: Boolean,
      close: Function,
    },
    data() {
      return {
        isOpenComment: false,
        name: '',
        comment: '',
        mark: 5,
      }
    },
    computed: {
      ...mapGetters(['currentLocation'])
    },
    methods: {
      sendComment() {
        console.log(this.currentLocation);
        this.$store.dispatch(SEND_COMMENT, {
          name: this.name,
          comment: this.comment,
          mark: this.mark,
          locationId: this.currentLocation._id
        })
        this.isOpenComment = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .location-info-drawer {
    .ant-drawer-content-wrapper {
      width: 100% !important;

      .ant-drawer-wrapper-body {
        background-color: aquamarine;
      }
    }
  }
</style>
