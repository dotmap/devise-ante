<script>
import slugify from 'slugify'

export default {
  name: 'NewElement',
  data () {
    return {
      title: '',
      slug: ''
    }
  },
  computed: {
    defaultSlug: data => slugify(data.title, {lower: true})
  },
  methods: {
    create () {
      const {title} = this
      const slug = this.slug || this.defaultSlug
      this.$emit('new', {slug, title})
    }
  }
}
</script>

<template>
  <div class="new-element">
    <h2>create element</h2>
    <p>This is a markedly unique component of the game. A character, a place, technology from lore, or anything you could imagine needs to be described to other developers working the game.</p>
    <el-input v-model="title"></el-input>
    <code>{{slug || defaultSlug || '...'}}</code>
    <el-button type="primary" :disabled="!title" @click="create">create</el-button>
    <el-button>cancel</el-button>
  </div>
</template>

<style lang="scss" scoped>
  .new-element {
    text-align: center;
    flex-grow: 1;
    padding: 4rem;
    h2, p, code {
      display: block;
      margin: 1rem 0;
      text-align: center;
    }
    /deep/ input {
      text-align: center;
    }
  }
</style>
