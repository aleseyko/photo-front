<template>
  <div class="home">
    <Map :locations="locations" msg="HELLO" :multiply="multiply"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
  name: 'home',
  components: {
    Map
  }
}
</script>
