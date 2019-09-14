import Vue from 'vue'
import Vuex from 'vuex'
import {SET_CURRENT_LOCATION, SET_LOCATIONS, UPDATE_LOCATION} from "./mutations";
import {GET_ALL_LOCATIONS, SEND_COMMENT} from "./actions";
import {getAllLocations, sendComment} from "./map.service";

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
    [SET_LOCATIONS](state, locations) {
      state.locations = locations;
    },
    [UPDATE_LOCATION](state, location) {
      const index = state.locations.findIndex(e => location._id === e._id);
      if (state.currentLocation._id === location._id) {
        state.currentLocation = location;
      }
      state.locations = [...state.locations.slice(0, index), location, ...state.locations.slice(index + 1)]
    },
  },
  actions: {
    [GET_ALL_LOCATIONS]: getAllLocations,
    [SEND_COMMENT]: sendComment
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
