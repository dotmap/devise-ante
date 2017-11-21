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
  <div class="column">
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
    <el-button icon="el-icon-circle-plus" type="success" plain @click="$emit('create')">New</el-button>
  </div>
</template>

<style lang="scss" scoped>
  .column {
    width: 240px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    .el-menu {
      overflow-y: scroll;
      flex-grow: 1;
    }
    .el-button {
      box-sizing: border-box;
      width: 100%;
    }
  }
</style>
