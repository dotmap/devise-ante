<script>
export default {
  name: 'GameSelect'
}
</script>

<template>
  <div>
    <h1>GameSelect</h1>
    <router-link :to="{ name: 'game', params: {game: 1} }">Game 1</router-link>
    <router-link :to="{ name: 'game', params: {game: 2} }">Game 2</router-link>
  </div>
</template>

<style lang="scss" scoped>

</style>
