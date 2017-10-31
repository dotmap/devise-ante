<script>
export default {
  name: 'GameSelect'
}
</script>

<template>
  <div>
    <h1>GameSelect</h1>
    <router-link class="at-btn at-btn--default" :to="{ name: 'game', params: {game: 'please-stop'} }">
      <span class="at-btn__text">Game 1</span>
    </router-link>
    <router-link class="at-btn at-btn--default" :to="{ name: 'game', params: {game: 'ugh-please-no'} }">
      <span class="at-btn__text">Game 2</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  div {
    margin: 4rem auto;
    text-align: center;
  }
  a {
    display: block;
    border: 1px solid gray;
    margin: 1rem;
  }
</style>
