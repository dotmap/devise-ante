<script>
import './fonts/Inter-UI-Regular.woff2'

export default {
  name: 'App',
  methods: {
    onNav (name) {
      this.$router.push({path: `/${name}`})
    }
  }
}
</script>

<template>
  <main>
    <at-menu mode="horizontal" @on-select="onNav">
      <span class="brand">devise</span>
      <at-menu-item class="right" name="user"><i class="icon icon-user"></i>user</at-menu-item>
      <at-submenu class="right gamechoose">
        <template slot="title">{{$route.params.game || 'Select a game'}}</template>
        <at-menu-item name="ugh-please-no">My Ugh Game</at-menu-item>
        <at-menu-item name="please-stop">Stop Arcade</at-menu-item>
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
      .gamechoose {
        text-align: right;
      }
    }
  }
</style>
