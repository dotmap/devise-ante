<script>
import './fonts/Inter-UI-Regular.woff2'

export default {
  name: 'App'
}
</script>

<template>
  <main>
    <at-menu mode="horizontal" :router="true">
      <span class="brand">devise</span>
      <at-menu-item class="right" replace :to="{ name: 'user' }"><i class="icon icon-user"></i>user</at-menu-item>
      <at-submenu class="right">
        <template slot="title">{{$route.params.game || 'select a game'}}</template>
        <at-menu-item replace  :to="{ name: 'game', params: {game: 'ugh-please-no'} }">My Ugh Game</at-menu-item>
        <at-menu-item replace  :to="{ name: 'game', params: {game: 'stop-arcade'} }">Stop Arcade</at-menu-item>
        <at-menu-item replace  :to="{ name: 'newgame' }"><i class="icon icon-plus-circle"></i>create game...</at-menu-item>
      </at-submenu>
    </at-menu>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
  body {
    font-family: 'Inter UI';
  }
</style>

<style lang="scss" scoped>
  main {
    width: 100%;
    height: 100%;
    font-family: 'Inter UI';
    display: flex;
    flex-flow: column;
    .at-menu {
      .brand {
        position: relative;
        float: left;
        padding: 0 24px;
        font-family: 'Nunito';
        font-size: 14pt;
      }
      .right {
        float: right;
      }
    }
  }
</style>
