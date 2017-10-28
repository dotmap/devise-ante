import Vue from 'vue'
import App from './App.vue'
import 'at-ui-style'
import AtUI from 'at-ui'

Vue.use(AtUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
