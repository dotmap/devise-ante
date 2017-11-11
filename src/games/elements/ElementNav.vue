<script>
export default {
  name: 'ElementNav',
  props: ['game', 'elements']
}
</script>

<template>
  <el-menu :router="true">
    <el-menu-item-group title="elements">
      <el-menu-item v-for="e in elements" :key="e.slug" :route="{name: 'edit', params: {game, slug: e.slug}}" :index="e.slug">{{e.name}}</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="actions">
      <el-menu-item :route="{ name: 'newelement' }" index="newelement"><i class="icon icon-plus-circle"></i>new element</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<style lang="scss" scoped>
  .el-menu {
    overflow-y: scroll;
    width: 240px;
    box-sizing: border-box;
    position: relative;
  }
</style>
