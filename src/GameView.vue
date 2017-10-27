<script>
export default {
  name: 'GameView',
  methods: {
    onElementNav (id) {
      const {game} = this.$route.params
      this.$router.push({name: 'editor', params: {game, id}})
    },
    getElementName () {
      const {id} = this.$route.params
      return id
    }
  }
}
</script>

<template>
  <div class="view">

    <at-menu @on-select="onElementNav" :activeName="getElementName()">
      <at-submenu>
        <template slot="title">Characters</template>
        <at-menu-item name="1">Chris</at-menu-item>
        <at-menu-item name="2">Linda</at-menu-item>
      </at-submenu>
      <at-submenu>
        <template slot="title">Levels</template>
        <at-menu-item name="3">Home</at-menu-item>
        <at-menu-item name="4">Store</at-menu-item>
        <at-menu-item name="5">Town</at-menu-item>
      </at-submenu>
      <at-submenu>
        <template slot="title">Items</template>
        <at-menu-item name="6">Fish</at-menu-item>
        <at-menu-item name="7">Steel Ingot</at-menu-item>
        <at-menu-item name="8">Stick</at-menu-item>
      </at-submenu>
    </at-menu>

    <router-view></router-view>

  </div>
</template>

<style lang="scss" scoped>
  .view {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row;
  }
</style>
