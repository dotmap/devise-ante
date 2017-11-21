<script>
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'

const save = s => localStorage.setItem('elements', JSON.stringify(s))
const load = () => JSON.parse(localStorage.getItem('elements') || '[]')

export default {
  name: 'Game',
  components: {
    ElementNav,
    EditElement
  },
  props: {
    game: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      elements: load()
    }
  },
  computed: {
    safeMarkdown () {
      if (!this.slug) return null
      const element = this.elements.find(e => e.slug === this.slug)
      return element && element.markdown
    }
  },
  methods: {
    onEdit (markdown) {
      this.elements.find(e => e.slug === this.slug).markdown = markdown
      save(this.elements)
    },
    create () {
      const {game} = this
      const slug = `${this.elements.length + 1}`
      this.elements.push({title: slug, slug, markdown: ''})
      save(this.elements)
      this.$router.push({ name: 'element', params: {game, slug} })
    },
    del ({slug}) {
      const {game} = this
      this.elements = this.elements.filter(e => e.slug !== slug)
      save(this.elements)
      this.$router.push({ name: 'game', params: {game} })
      this.$message({
        type: 'success',
        message: 'Delete completed'
      })
    }
  }
}
</script>

<template>
  <div class="view">
    <element-nav :game="game" :elements="elements" @create="create" @delete="del"/>
    <router-view :markdown="safeMarkdown" @edit="onEdit"/>
  </div>
</template>

<style lang="scss" scoped>
  .view {
    flex-grow: 1;
    width: 100%;
    display: flex;
    // necessary for router-view's vertical scrolling
    height: calc(100% - 61px);
  }
</style>
