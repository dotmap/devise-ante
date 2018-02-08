<script>
import {v1} from 'uuid'

export default {
  name: `GameSettings`,
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    nextType: ''
  }),
  methods: {
    handleDelete (index, row) {
      const {game} = this
      game.types = game.types.filter(t => t.id !== row.id)
      game.elements.forEach(e => {
        if (e.typeId === row.id) e.typeId = ''
      })
      this.$emit('change')
    },
    handleCreate (e) {
      const {game, nextType} = this
      if (!game.types.find(({title}) => title.toLowerCase() === nextType.toLowerCase())) {
        game.types.push({id: v1(), title: nextType})
        this.nextType = ''
        this.$emit('change')
      }
    }
  }
}
</script>

<template>
  <div class="settings view">
    <h1>{{game.title}}</h1>
    <code>{{game.orgId}}/{{game.gameId}}</code>
    <hr>
    <el-row :gutter="20">
      <el-col :span="12">
        <h4>Kinds &amp; Names</h4>
        <el-input
          placeholder="New type..."
          v-model="nextType"
          @keypress.enter.native="handleCreate">
          <template slot="prepend">Types</template>
        </el-input>
        <br>
        <br>
        <el-table
          :show-header="false"
          :data="game.types"
          style="width: 100%">
          <el-table-column prop="title"/>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <h4>Members &amp; Privacy</h4>
        <p>Placeholder</p>
      </el-col>

    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .settings.view {
    padding: 1rem;
  }
</style>
