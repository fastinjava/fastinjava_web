<template>
<el-row>

  <el-row>
    <el-form label-width="100px">
      <el-form-item label="客户端">
        <el-select v-model="loginForm.clientId" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="(item,index) in allClients"
            :key="index"
            :label="item.clientname"
            :value="item.clientId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户端密码">
        <el-input v-model="loginForm.clientSecret"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="loginSubmit" type="primary" size="mini">确定</el-button>
      </el-form-item>
    </el-form>
  </el-row>

  <el-row>

  </el-row>


</el-row>
</template>

<script>
import * as oauthController from '../../oauth_manage/api/api'
import * as loginController from "../api/api"
export default {
  name: "login_manage",
  data(){
    return {
      loginForm:{
        clientId:'',
        clientSecret:'123456',
        username:'xishi',
        password:'123456',
      },
      allClients:[]
    }
  },
  methods:{
    loginSubmit(){
      this.login(this.loginForm);
    },
    login(reload){
      loginController.accessToken(reload).then(res=>{
        console.log(res)
        if (res.success)
        {
          this.$message.success("登陆成功");
        }
      })
    },
    listallClient(){
      oauthController.list({"pageable":false}).then(res=>{
        console.log(res)
        if (res.success){
          this.allClients = res.data.list;
        }
      })
    }
  },
  mounted() {
    this.listallClient();
  }
}
</script>

<style scoped>

</style>
