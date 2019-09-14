import Vue from 'vue'
import Vuex from 'vuex'
import {SET_CURRENT_LOCATION} from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLocation: {name: 'Долина троянд', description: 'Наначі говоирть фотографуйся тут', mainPhoto: 'src'},
    locations: [],
  },
  mutations: {
    [SET_CURRENT_LOCATION](state, location) {
      state.currentLocation = location;
    },
  },
  actions: {
  },
  getters: {
    currentLocation(state) {
      return state.currentLocation
    },
    locations(state) {
      return state.locations
    },
  }
})
