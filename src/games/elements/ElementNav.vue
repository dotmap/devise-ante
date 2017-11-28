<script>
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
  methods: {
    open (e) {
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
  <el-container>
    <el-main>
      <el-menu :router="true">
        <span
          v-for="e in elements"
          :key="e.id"
          @contextmenu.prevent="open(e)">
          <el-menu-item
            :index="`e:${e.id}`"
            :route="{name: 'game', params: {gameId, id: e.id}}">
            {{e.title}}
          </el-menu-item>
        </span>
      </el-menu>
    </el-main>
    <el-footer>
      <el-button icon="el-icon-circle-plus" type="success" plain @click="$emit('create')">New</el-button>
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
