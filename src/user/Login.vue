<script>
import {login, isLoggedIn} from '../auth'
export default {
  name: 'Login',
  mounted () {
    if (isLoggedIn()) {
      this.$router.push('/')
    } else {
      login()
    }
  }
}
</script>

<template>
  <div class="view"></div>
</template>
