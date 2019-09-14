import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLocation: {name: 'Долина троянд', description: 'Наначі говоирть фотографуйся тут', mainPhoto: 'src'}
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    currentLocation(state) {
      return state.currentLocation
    }
  }
})
