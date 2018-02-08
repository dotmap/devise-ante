<script>
import md2title from '../../util/markdown-to-title'

export default {
  name: 'ElementNav',
  props: {
    gameId: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  computed: {
    convertedList () {
      return this.elements.map(e => {
        return {
          id: e.id,
          title: md2title(e.markdown) || `Element ${e.id}`
        }
      })
    }
  },
  methods: {
    deleteElement (e) {
      this.$confirm('This will permanently delete the element. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', e)
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <el-container id="element-nav">
    <el-main>
      <el-menu :router="true">
        <span
          v-for="{id, title} in convertedList"
          :key="id"
          @contextmenu.prevent="deleteElement({id})">
          <el-menu-item
            class="element"
            :index="`e:${id}`"
            :route="{name: 'game', params: {gameId, id}}">
            {{title}}
          </el-menu-item>
        </span>
      </el-menu>
    </el-main>
    <el-footer>
      <el-button
        id="new-element"
        icon="el-icon-circle-plus"
        type="success"
        plain
        @click="$emit('create')">
        New Element
      </el-button>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
  .el-container {
    flex: initial;
    height: 100%;
    .el-main {
      padding: 0;
      overflow-y: scroll;
    }
    .el-footer {
      padding: 0;
      .el-button {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
