import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import slugify from 'slugify'

import App from './App.vue'
import Dashboard from './user/Dashboard.vue'
import Game from './games/Game.vue'
import NewGame from './games/NewGame.vue'

import 'element-ui/lib/theme-chalk/index.css'

slugify.extend({ '!': 'bang' })
slugify.extend({ '@': 'at' })
slugify.extend({ '#': 'hashtag' })
slugify.extend({ '%': 'percent' })
slugify.extend({ '^': 'top' })
slugify.extend({ '*': 'star' })
slugify.extend({ '~': 'tilda' })
slugify.extend({ '+': 'plus' })
slugify.extend({ '=': 'is' })

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: null },
    { path: '/new', name: 'newgame', component: NewGame },
    { path: '/:orgId', name: 'dashboard', component: Dashboard, props: true },
    {
      path: '/:orgId/:gameId/:id(\\d+)?',
      name: 'game',
      component: Game,
      props: true
    },
    { path: '*', redirect: '/' }
  ]
})

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export { app, router }
