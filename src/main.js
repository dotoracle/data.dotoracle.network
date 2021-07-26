import Vue from 'vue'
import Vuesax from 'vuesax'
import VueAxios from 'vue-axios'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'
import 'highcharts/css/highcharts.scss'
import './assets/css/reset.css'
import './assets/fonts/stylesheet.css'
import './assets/scss/style.scss'

Vue.use(Vuesax, {
  colors: {
    primary: '#e2007a',
  },
})

// Optionally install the BootstrapVue icon components plugin
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.prototype.formatNumber = function (number) {
  number = new BigNumber(number)
  let seps = number.toString().split('.')
  seps[0] = seps[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return seps.join('.')
}
Vue.prototype.hideDecimal = function (input, number = 3) {
  return Math.floor(input * 10 ** number) / 10 ** number
}
Vue.prototype.formatAge = function (timestamp) {
  return moment(timestamp).fromNow()
}

new Vue({
  router,
  store,
  render: function (createElement) {
    return createElement(App)
  },
}).$mount('#app')
