<script>
import {setAccessToken, setIdToken} from '../auth'
export default {
  name: 'Callback',
  mounted () {
    setAccessToken()
    setIdToken()
    this.$router.push('/')
  }
}
</script>

<template>
  <div class="callback view">
    <h1>Saving session...</h1>
  </div>
</template>

<style lang="scss" scoped>
  .callback {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
