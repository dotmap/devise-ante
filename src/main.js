import Vue from 'vue'
import VueRouter from 'vue-router'
import AtUI from 'at-ui'
import 'at-ui-style'

import App from './App.vue'
import Editor from './Editor.vue'
import GameView from './GameView.vue'
import GameSelect from './GameSelect.vue'
import UserView from './UserView.vue'

Vue.use(AtUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: GameSelect },
    { path: '/user', name: 'user', component: UserView },
    {
      path: '/:game',
      component: GameView,
      children: [
        { path: '', component: null, name: 'game' },
        {
          path: '*',
          component: Editor,
          props: route => ({ slug: route.params[0] })
        }
      ]
    }
  ]
})

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export { app, router }
