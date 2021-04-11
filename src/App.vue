<template>
  <div id="app">
    <el-card style="text-align: center">
      <el-button type="text" size="mini" style="color: #8b8a8a" @click="$router.push({name:'ROLE_MANAGE'})">ROLE_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'APP_MANAGE'})">APP_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'ORG_MANAGE'})">ORG_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'API_MANAGE'})">API_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'MENU_MANAGE'})">MENU_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'OAUTH_MANAGE'})">OAUTH_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'USER_MANAGE'})">USER_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'GENCODE_MANAGE'})">GENCODE_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'CODE_GEN_TABLES'})">CODE_GEN_TABLES</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'LOGIN_MANAGE'})">LOGIN_MANAGE</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'JAVA_LEARN_MAP'})">JAVA_LEARN_MAP</el-button>
      <el-button type="text" size="mini"  style="color: #8b8a8a" @click="$router.push({name:'FILE_GROUP'})">FILE_GROUP</el-button>
<!--      <a href="http://localhost:60000/fastinjava-application-base/doc.html" target="_blank">base application</a>-->
    </el-card>
    <div style="height: 20px;"></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',

  }
</script>

<style>

* {
  padding: 0;
  margin: 0;
}

</style>
