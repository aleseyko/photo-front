<template>
  <a-drawer :visible="visible" :title="currentLocation.name" @close="close" wrapClassName="location-info-drawer">
    <p class="address">Адресa: {{currentLocation.address}}</p>
      <a-drawer :visible="isFuckingVisible" @close="visibleNot" placement="bottom">
        <div class="comments">
            <Comments :comments="currentLocation.comments"/>
        </div>
    </a-drawer>
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
      <a-input placeholder="Не обов'язково" v-model="name"></a-input>
      <a-textarea style="margin-top: 10px" placeholder="Не обов'язково" v-model="comment"></a-textarea>
      <div style="margin-top: 10px" class="sendFeedback">
        <a-rate allowHalf v-model="mark">
          <a-icon slot="character" type="fire"/>
        </a-rate>
        <a-button @click="sendComment">
          Відправити
        </a-button>
      </div>
    </div>
    <a-button @click="visibleYes">

    </a-button>
  </a-drawer>
</template>
<script>
  import {mapGetters} from "vuex";
  import {SEND_COMMENT} from "../actions";
  import Comments from "../components/Comments.vue";


  export default {
    name: 'AppLocationInfoDrawer',
    components: {Comments},
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
        isFuckingVisible: false,
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
      },
      visibleYes () {
        this.isFuckingVisible = true;
      },
      visibleNot (){
        this.isFuckingVisible = false;
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
          overflow: hidden!important;
      }
    }
    .ant-drawer-header  {
      border-bottom: none;
        padding-bottom: 0px;
      .ant-drawer-title{
        font-size: 25px;
          border-bottom: 1.5px solid #afc2d0;
          padding-bottom: 16px;
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
    margin-top: 20px;
  }
  .rating{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1.5px solid #afc2d0;
    padding-bottom: 15px;
  }
  .feedback{
    margin-top: 25px;
    display: flex;
      justify-content: space-between;
      flex-direction: column;
    .sendFeedback{
      display: flex;
      justify-content: space-between;
    }

  }

</style>
