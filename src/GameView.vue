<script>
export default {
  name: 'GameView',
  methods: {
    onElementNav (slug) {
      const {game} = this.$route.params
      this.$router.push(`/${game}/${slug}`)
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
      <at-menu-item name="chars/chris">Chris</at-menu-item>
      <at-menu-item name="chars/linda">Linda</at-menu-item>
      <at-menu-item name="alex">Alex</at-menu-item>
      <at-menu-item name="chad">Chad</at-menu-item>
      <at-menu-item name="graham">Grahamm</at-menu-item>
      <at-menu-item name="home">Home</at-menu-item>
      <at-menu-item name="store">Store</at-menu-item>
      <at-menu-item name="town">Town</at-menu-item>
      <at-menu-item name="city">City</at-menu-item>
      <at-menu-item name="neotokyo">Neotokyo</at-menu-item>
      <at-menu-item name="caves">Caves</at-menu-item>
      <at-menu-item name="hub">Hub</at-menu-item>
      <at-menu-item name="fish">Fish</at-menu-item>
      <at-menu-item name="steel">Steel Ingot</at-menu-item>
      <at-menu-item name="stick">Stick</at-menu-item>
      <at-menu-item name="food">A Food</at-menu-item>
      <at-menu-item name="saveme">Please help me I'm trapped in a software development shop</at-menu-item>
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
