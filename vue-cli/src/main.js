import Vue from 'vue'
import App from './App.vue'
import {store} from './store/Store.js'

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
