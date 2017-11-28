<script>
import ElementNav from './elements/ElementNav.vue'
import EditElement from './elements/EditElement.vue'

const save = s => localStorage.setItem('daba', JSON.stringify(s))
const load = () => JSON.parse(localStorage.getItem('daba') || 'false') || {
  elements: [],
  nextElement: 1
}

export default {
  name: 'Game',
  components: {
    ElementNav,
    EditElement
  },
  props: {
    gameId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return load()
  },
  computed: {
    element () {
      return this.elements.find(e => e.id === this.id)
    }
  },
  methods: {
    create () {
      const {gameId, elements, nextElement} = this
      const id = `${nextElement + 1}`
      elements.push({id, title: id, markdown: `# ${id}\n\n`})
      this.nextElement++
      save({elements, nextElement: nextElement + 1})
      this.$message({type: 'success', message: `Created Element ${id}`})
      this.$router.push({name: 'game', params: {gameId, id}})
    },
    del ({id}) {
      const {gameId, elements, nextElement} = this
      const i = elements.findIndex(e => e.id === id)
      elements.splice(i, 1)
      save({elements, nextElement})
      this.$message({ type: 'success', message: 'Deleted' })
      this.$router.push({ name: 'game', params: {gameId} })
    },
    onEdit (markdown) {
      const {elements, nextElement} = this
      this.element.markdown = markdown
      save({elements, nextElement})
    }
  }
}
</script>

<template>
  <el-container>
    <el-aside width="240px">
      <element-nav :gameId="gameId" :elements="elements" @create="create" @delete="del"/>
    </el-aside>
    <el-main>
      <edit-element v-if="element" :markdown="element.markdown" @edit="onEdit"/>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
  .el-container {
    .el-aside {
      overflow: inherit;
    }
    .el-main {
      padding: 0;
      .edit-element {
        height: 100%;
      }
    }
  }
</style>
