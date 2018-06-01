import Vue from 'vue'
import App from './App.vue'
import Flags from './Flags.js'

Vue.use(Flags)

new Vue({
  el: '#app',
  render: h => h(App)
})
