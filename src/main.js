import slugify from 'slugify'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import App from './App.vue'
import Callback from './user/Callback.vue'
import Login from './user/Login.vue'
import Logout from './user/Logout.vue'
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

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: enLocale,
    zh: zhLocale
  }
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: null },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/callback', component: Callback },
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
  i18n,
  router,
  render: h => h(App)
})

export { app, router }
