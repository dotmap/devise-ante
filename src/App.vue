<script>
export default {
  name: 'App',
  data () {
    return {
      games: [
        {
          orgId: 'company',
          gameId: 'awesome-game',
          title: 'My Awesome Game'
        }
      ]
    }
  },
  computed: {
    gameTitle () {
      const {orgId, gameId} = this.$route.params
      const game = this.games.find(g => g.orgId === orgId && g.gameId === gameId)
      return game && game.title
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

    <router-view>
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
    font-family: 'Inter UI';
    padding: 0;
    margin: 0;
  }
  html, body {
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
        padding: 1rem 24px 0 24px;
        font-family: 'Nunito';
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
      // TODO remove calc height
      height: calc(100% - 61px);
      flex: initial;
    }
  }
</style>
