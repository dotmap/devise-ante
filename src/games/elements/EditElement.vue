<script>
export default {
  name: 'EditElement',
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  methods: {
    input (value) {
      this.$emit('edit', value)
    }
  }
}
</script>

<template>
  <div class="edit-element">
    <el-input :value="markdown" @input="input" placeholder="add a description..." type="textarea"/>
  </div>
</template>

<style lang="scss" scoped>
  .edit-element {
    display: flex;

    .el-textarea {
      flex-grow: 1;

      /deep/ .el-textarea__inner {
        height: 100%;
        border: 0;
        margin: 0;
        resize: none;
      }
    }
  }
</style>
