<script>
import {logout} from '../auth'
export default {
  name: 'Logout',
  mounted () {
    logout()
    this.$router.push('/')
  }
}
</script>

<template>
  <div class="view"></div>
</template>
