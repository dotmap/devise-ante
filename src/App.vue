<script>
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
    <at-menu mode="horizontal" @on-select="onNav" :activeName="$route.name">
      <span class="brand">devise</span>
      <at-submenu>
        <template slot="title">My Game</template>
        <at-menu-item name="1">My Game</at-menu-item>
        <at-menu-item name="2">Arcade Thing</at-menu-item>
      </at-submenu>
      <at-menu-item class="right" name="user"><i class="icon icon-user"></i>user</at-menu-item>
    </at-menu>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
  main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column;

    .at-menu {
      .brand {
        position: relative;
        float: left;
        padding: 0 24px;
        width: 240px;
        background-color: rgba(200, 255, 200, 0.3);
      }
      .right {
        float: right;
      }
    }
  }
</style>
