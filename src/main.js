import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import slugify from 'slugify'

import App from './App.vue'
import Dashboard from './user/Dashboard.vue'
import Game from './games/Game.vue'
import NewGame from './games/NewGame.vue'
import EditElement from './games/elements/EditElement.vue'
import NewElement from './games/elements/NewElement.vue'

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
Vue.use(ElementUI)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: null },
    { path: '/me', name: 'dashboard', component: Dashboard },
    { path: '/new', name: 'newgame', component: NewGame },
    {
      path: '/g/:game',
      component: Game,
      props: true,
      children: [
        { path: '', component: null, name: 'game' },
        { path: 'new', component: NewElement, props: true, name: 'newelement' },
        { path: ':slug', component: EditElement, props: true, name: 'edit' }
      ]
    }
  ]
})

const store = new Vuex.Store({
  state: {
    games: [
      {
        slug: 'zero-point',
        name: 'Zero Point',
        elements: [
          {
            slug: 'player-rovs',
            name: 'ROVs',
            text: `Remotely operated vehicles are the player's eyes and ears. Most actions in the game will done through an ROV--it is much safer than risking their own life exploring ships and structures.`
          },
          {
            slug: 'levels-ships',
            name: 'Ships',
            text: `Spaceships are the primary living space of space-faring folk. See the rules about rooms and airlocks to create levels.`
          }
        ]
      }
    ]
  },
  getters: {
    games: s => s.games,
    game: (state, get) => slug => {
      return state.games.find(g => g.slug === slug)
    },
    gameName: (state, get) => slug => {
      const game = get.game(slug)
      return game && game.name
    },
    element: (state, get) => (game, slug) => {
      return get.game(game).elements.find(e => e.slug === slug)
    }
  },
  actions: {
    createElement ({ commit }, { game, slug, name, text }) {
      commit('addElement', { game, slug, name, text })
    }
  },
  mutations: {
    addElement (state, { game, slug, name, text }) {
      console.log(game, slug, name, text)
      const gameInst = state.games.find(g => g.slug === game)
      if (gameInst.elements.find(e => e.slug === slug)) {
        throw new Error('Slug taken!')
      }
      gameInst.elements.push({ slug, name, text })
      return state
    }
  }
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export { app, router, store }
