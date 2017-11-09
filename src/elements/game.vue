<script>
import ElementNav from './list'

export default {
  name: 'Game',
  props: ['game'],
  components: {
    ElementNav
  },
  computed: {
    elements () {
      return this.$store.getters.game(this.$props.game).elements
    }
  }
}
</script>

<template>
  <div class="view">
    <element-nav :game="$prop.game" :elements="elements"></element-nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    height: calc(100% - 48px);
    width: 100%;
    display: flex;
  }
</style>
