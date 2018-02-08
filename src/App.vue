<script>

const save = s => localStorage.setItem('daba', JSON.stringify(s))

const load = () => {
  return JSON.parse(localStorage.getItem('daba') || 'false') || {
    games: [
      {
        orgId: 'company',
        gameId: 'awesome-game',
        title: 'My Awesome Game',
        elements: [],
        nextElement: 1,
        tags: [],
        types: [
          {id: '84bfdd02-7ceb-4f16-9653-0b60f9bf25ea', title: 'Level'},
          {id: '87216350-313c-43b4-8eb7-42fabfea00d4', title: 'Character'},
          {id: 'e00463d3-90fa-428d-9d98-681360de031c', title: 'Item'}
        ]
      }
    ]
  }
}

export default {
  name: 'App',
  data: () => load(),
  computed: {
    game () {
      const {orgId, gameId} = this.$route.params
      return this.games.find(g => g.orgId === orgId && g.gameId === gameId)
    },
    gameTitle () {
      const {game} = this
      return game && game.title
    }
  },
  methods: {
    saveAll () {
      const {games} = this
      return save({games})
    }
  }
}
</script>

<template>
  <el-container class="app">

    <el-header>
      <el-menu mode="horizontal" :router="true">
        <span class="brand">devise</span>
        <el-menu-item index="dashboard" :route="{name:'dashboard',params:{orgId:'me'}}" class="right">
          Dashboard
        </el-menu-item>
        <el-submenu index="games" class="right">
          <template slot="title">{{gameTitle || 'Select a Game'}}</template>
          <el-menu-item
            v-for="g in games"
            :key="`${g.orgId}/${g.gameId}`"
            :index="`${g.orgId}/${g.gameId}`"
            :route="{name:'game',params:g}">
            {{g.orgId}}/{{g.gameId}}
          </el-menu-item>
          <el-menu-item index="newgame" :route="{name:'newgame'}">
            <i class="el-icon-circle-plus"></i>New Game
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>

    <router-view :game="game" @change="saveAll">
      <!-- Everything below the top site nav -->
    </router-view>

  </el-container>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Inter UI';
    src: url(./fonts/Inter-UI-Regular.woff2);
  }

  body {
    font-family: 'Inter UI', sans-serif;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  .el-container.app {
    width: 100%;
    height: 100%;
    flex: initial;
  
    .el-header {
      padding: 0;
      z-index: 1;

      .brand {
        padding: 1rem 24px 0;
        font-family: 'Nunito', sans-serif;
        font-size: 14pt;
        position: relative;
        float: left;
        height: 60px;
        box-sizing: border-box;
      }

      .right {
        float: right;
      }
    }

    .el-container {
      height: calc(100% - 61px);
      flex: initial;
    }
  }
</style>
