<script>
export default {
  name: 'App',
  data () {
    return {
      dialogFormVisible: false,
      form: {}
    }
  }
}
</script>

<template>
  <div class="app">

    <el-dialog title="create new game" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="display name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="slug">
          <el-input v-model="form.slug" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-menu mode="horizontal" :router="true">
      <span class="brand">devise</span>
      <el-menu-item index="dashboard" :route="{name:'dashboard'}" class="right">
        dashboard
      </el-menu-item>
      <el-submenu index="games" class="right">
        <template slot="title">{{$route.params.game||'select a game'}}</template>
        <el-menu-item index="game:vacuum" :route="{name:'game',params:{game:'vacuum'}}">Vacuum</el-menu-item>
        <el-menu-item index="newgame" :route="{name:'newgame'}"><i class="el-icon-circle-plus"></i>new game</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view>
      <!-- Everything below the top site nav -->
    </router-view>

  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Inter UI';
    src: url(./fonts/Inter-UI-Regular.woff2);
  }
  body {
    font-family: 'Inter UI';
    padding: 0;
    margin: 0;
  }
  html, body {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  .app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    .el-menu {
      .brand {
        padding: 1rem 24px 0 24px;
        font-family: 'Nunito';
        font-size: 14pt;
        position: relative;
        float: left;
        height: 60px;
        box-sizing: border-box;
      }
      .right {
        float: right;
      }
    }
  }
</style>
