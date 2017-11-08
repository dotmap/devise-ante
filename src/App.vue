<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: mapGetters([
    'games'
  ])
}
</script>

<template>
  <main>
    <at-menu mode="horizontal" :router="true">
      <span class="brand">devise</span>
      <at-menu-item class="right" replace :to="{ name: 'user' }"><i class="icon icon-user"></i>user</at-menu-item>
      <at-submenu class="right">
        <template slot="title">{{$route.params.game || 'select a game'}}</template>
        <at-menu-item v-for="{name, slug} in games" :key="slug" replace :to="{ name: 'game', params: {game: slug} }">{{name}}</at-menu-item>
        <at-menu-item replace :to="{ name: 'newgame' }"><i class="icon icon-plus-circle"></i>new game</at-menu-item>
      </at-submenu>
    </at-menu>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Inter UI';
    src: url(./fonts/Inter-UI-Regular.woff2);
  }
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
