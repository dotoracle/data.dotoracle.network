import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'

import '@/assets/js/app.js'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import '@/assets/scss/app.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highcharts/css/highcharts.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false



Vue.prototype.formatNumber = function (number) {
  number = new BigNumber(number)
  let seps = number.toString().split('.')
  seps[0] = seps[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return seps.join('.')
}
Vue.prototype.hideDecimal = function (input, number = 3) {
  return Math.floor(input * 10**number) / 10**number
}
Vue.prototype.formatAge = function (timestamp) {
  return moment(timestamp).fromNow()
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
