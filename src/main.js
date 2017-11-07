import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import AtUI from 'at-ui'
import 'at-ui-style'
import slugify from 'slugify'

import App from './App.vue'
import Editor from './Editor.vue'
import GameNew from './GameNew.vue'
import GameView from './GameView.vue'
import GameSelect from './GameSelect.vue'
import UserView from './UserView.vue'

slugify.extend({ '!': 'bang' })
slugify.extend({ '@': 'at' })
slugify.extend({ '#': 'hashtag' })
slugify.extend({ '%': 'percent' })
slugify.extend({ '^': 'top' })
slugify.extend({ '*': 'star' })
slugify.extend({ '~': 'tilda' })
slugify.extend({ '+': 'plus' })
slugify.extend({ '=': 'is' })

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(AtUI)

const store = new Vuex.Store({
  state: {
    games: [
      {
        slug: 'example-game',
        name: 'Example Game',
        elements: [
          {
            slug: 'the-hedge',
            name: 'The Hedge',
            text: 'This is some example text about the Hedge.'
          }
        ]
      }
    ]
  },
  getters: {
    games: s => s.games,
    elements: (state, get) => slug =>
      state.games.find(g => g.slug === slug).elements,
    element: (state, get) => (game, slug) =>
      get.elements(game).find(e => e.slug === slug)
  },
  actions: {},
  mutations: {}
})

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: GameSelect },
    { path: '/user', name: 'user', component: UserView },
    { path: '/new', name: 'newgame', component: GameNew },
    {
      path: '/:game',
      component: GameView,
      props: route => ({ game: route.params.game }),
      children: [
        { path: '', component: null, name: 'game' },
        {
          path: '*',
          component: Editor,
          props: route => ({ game: route.params.game, slug: route.params[0] })
        }
      ]
    }
  ]
})

const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

export { app, store, router }
