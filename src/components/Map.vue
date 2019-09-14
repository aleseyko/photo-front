<template>
  <div class="map">
    <app-location-info-drawer :visible="locationInfoDrawerVisible" :close="closeLocationInfoDrawer"></app-location-info-drawer>
    <div id="mapid"></div>
  </div>
</template>

<script>
  import {drawLocation} from "../map.service";
  import AppLocationInfoDrawer from '../components/LocationInfoDrawer'
  import {SET_CURRENT_LOCATION} from "../mutations";


  const locations = [
    {
      coordinates: {
        x: 49.4455335,
        y: 32.0567807
      },
      mainPhoto: 'eb0448da-b8f4-4191-916b-ec2597a48471.png',
      name: 'Даня',
      description: 'Наначі каже фоткатися біля Дані'
    },
    {
      coordinates: {
        x: 49.4455335,
        y: 32.1567807
      },
      mainPhoto: 'fc50af27-bda5-4bea-95f4-59d72faab529.png'
    },
  ]

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
      }
    },
    mounted() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        const mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);

        const marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);

        locations.forEach(location => this.drawLocation(location, mymap, this.$store));

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiYWxlc2V5a28iLCJhIjoiY2swamtlNXA5MDZuNDNib2JrbWZwZHJtZSJ9.4rnK1BF08KPpfzMaaH0kpw'
        }).addTo(mymap);


      });


    }
  }
</script>

<style scoped>
  #mapid {
    height: 300px;
  }
</style>