<template>
  <div id="app">
    <div style="background-color: #fff;box-shadow: 0 4px 8px 0 rgba(28,31,33,0.1);">
      <el-button type="text" size="mini" @click="$router.push({name:'ROLE_MANAGE'})">ROLE_MANAGE</el-button>
      <el-button type="text" size="mini" @click="$router.push({name:'APP_MANAGE'})">APP_MANAGE</el-button>
      <el-button type="text" size="mini" @click="$router.push({name:'ORG_MANAGE'})">ORG_MANAGE</el-button>
      <el-button type="text" size="mini" @click="$router.push({name:'API_MANAGE'})">API_MANAGE</el-button>
      <a href="http://localhost:60000/fastinjava-application-base/swagger-ui.html" target="_blank">base application</a>
    </div>
    <div style="height: 20px;"></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

</style>
