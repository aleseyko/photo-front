<template>
  <div class="map">
    <app-location-info-drawer :visible="locationInfoDrawerVisible"
                              :close="closeLocationInfoDrawer"></app-location-info-drawer>
    <div id="mapid"></div>
  </div>
</template>

<script>
  import AppLocationInfoDrawer from '../components/LocationInfoDrawer'
  import {SET_CURRENT_LOCATION} from "../mutations";
  import {GET_ALL_LOCATIONS} from "../actions";
  import {mapGetters} from "vuex";


  export default {
    name: "Map",
    components: {
      AppLocationInfoDrawer,
    },
    methods: {
      openLocationInfoDrawer() {
        this.locationInfoDrawerVisible = true;
      },
      closeLocationInfoDrawer() {
        this.locationInfoDrawerVisible = false;
      },
      drawLocation(Location, Map) {
        const myIcon = L.icon({
          iconUrl: `http://localhost:3000/images/${Location.mainPhoto}`,
          iconSize: '40'
        });

        const marker = L.marker([Location.coordinates.x, Location.coordinates.y], {icon: myIcon}).addTo(Map);
        marker.on("click", (e) => {
          this.$store.commit(SET_CURRENT_LOCATION, Location);
          this.openLocationInfoDrawer();
        });
      }
    },
    data() {
      return {
        locationInfoDrawerVisible: false,
        kostyl: true,
      }
    },
    computed: {
      ...mapGetters(['locations'])
    },
    mounted() {
      navigator.geolocation.getCurrentPosition((position) => {

        this.mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiYWxlc2V5a28iLCJhIjoiY2swamtlNXA5MDZuNDNib2JrbWZwZHJtZSJ9.4rnK1BF08KPpfzMaaH0kpw'
        }).addTo(this.mymap);


      });
    },
    watch: {
      locations() {
        navigator.geolocation.getCurrentPosition((position) => {
          const marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.mymap);
          this.locations.forEach(location => this.drawLocation(location, this.mymap, this.$store));


        });
      },
    },
    beforeCreate() {
      this.$store.dispatch(GET_ALL_LOCATIONS)
    }
  }
</script>

<style scoped>
  #mapid {
    height: 300px;
  }
</style>