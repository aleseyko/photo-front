<template>
  <a-drawer :visible="true" :title="currentLocation.name" @close="close" wrapClassName="location-info-drawer">
    <p class="address">Адресс: {{currentLocation.address}}</p>
    <a-carousel>
      <div class="photo" :style="{'background-image': `url(http://192.168.43.210:3000/images/${currentLocation.mainPhoto})`}"></div>
      <div class="photo" v-for="(photo, index) in currentLocation.photos" :key="index" :style="{'background-image': `url(http://192.168.43.210:3000/images/${photo})`}"></div>

    </a-carousel>


    <p class="description">{{currentLocation.description}}</p>
    <div class="rating">
      <a-rate allowHalf
              :value="currentLocation &&
             currentLocation.comments &&
              currentLocation.comments.reduce((a, b)=> a + b.mark, 0)/currentLocation.comments.length || 0">
        <a-icon slot="character" type="fire"/>
      </a-rate>
      <a-button v-if="!isOpenComment" @click="()=>isOpenComment = true">
        Оцінити
      </a-button>
    </div>

    <div class="feedback" v-if="isOpenComment">
      <a-input v-model="name"></a-input>
      <a-textarea v-model="comment"></a-textarea>
      <div class="sendFeedback">
        <a-rate allowHalf v-model="mark">
          <a-icon slot="character" type="fire"/>
        </a-rate>
        <a-button @click="sendComment">
          Відправити
        </a-button>
      </div>
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

      }
    }
    .ant-drawer-header  {
      border-bottom: 1.5px solid #afc2d0;
      .ant-drawer-title{
        font-size: 25px;
      }
    }
  }
  .address{

  }
  .ant-carousel {
      height: 300px;
  }
  .photo {
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .description {
    display: block;
  }
  .rating{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .feedback{
    margin-top: 50px;
    .sendFeedback{
      display: flex;
      justify-content: space-between;
    }

  }
</style>
