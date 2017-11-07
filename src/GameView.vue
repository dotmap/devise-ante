<script>
export default {
  name: 'GameView',
  props: ['game'],
  computed: {
    elements () {
      return this.$store.getters.elements(this.$props.game)
    }
  }
}
</script>

<template>
  <div class="view">
    <at-menu :router="true">
      <at-menu-item v-for="e in elements" :key="e.slug" :to="{ path: `/${$props.game}/${e.slug}` }">{{e.name}}</at-menu-item>
    </at-menu>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    height: calc(100% - 48px);
    width: 100%;
    display: flex;
  }
  .at-menu {
    overflow-y: scroll;
  }
</style>
