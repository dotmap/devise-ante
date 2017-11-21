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
  <div class="app">

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

    <router-view>
      <!-- Everything below the top site nav -->
    </router-view>

  </div>
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
  .app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    .el-menu {
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
  }
</style>
