import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
