<template>
  <el-row>
    <el-row>
      <el-button @click="oauthInsertVisible = true">新增</el-button>
      <el-button @click="list({pageable:false})">刷新</el-button>
    </el-row>


    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="clientId"
          label="clientId"
          width="180">
        </el-table-column>
        <el-table-column
          prop="clientname"
          label="客户端名称"
          width="180">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="resourceIds"-->
<!--          label="resourceIds"-->
<!--          width="180">-->
<!--        </el-table-column>-->

        <el-table-column
          label="资源列表"
          >
          <template slot-scope="scope">
            {{scope.row.resourceNameList}}
          </template>
        </el-table-column>

        <el-table-column
          prop="clientSecret"
          label="clientSecret">
        </el-table-column>

        <el-table-column
          prop="scope"
          label="scope">
        </el-table-column><el-table-column
          prop="authorizedGrantTypes"
          label="authorizedGrantTypes">
        </el-table-column>
        <el-table-column
          prop="webServerRedirectUri"
          label="webServerRedirectUri">
        </el-table-column>
        <el-table-column
          prop="accessTokenValidity"
          label="accessTokenValidity">
        </el-table-column>

        <el-table-column
          prop="refreshTokenValidity"
          label="refreshTokenValidity">
        </el-table-column>
         <el-table-column
          prop="additionalInformation"
          label="additionalInformation">
        </el-table-column>
         <el-table-column
          prop="autoapprove"
          label="autoapprove">
        </el-table-column>
        <el-table-column
          label="status">
          <template slot-scope="scope">
            {{statusDicData[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column
          label="status">
          <template slot-scope="scope">
           <el-button size="mini" @click="grantApiClick(scope.row)">配置接口列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="dialogs">
      <el-dialog
        title="提示"
        :visible.sync="oauthInsertVisible"
        width="90%"
      >
        <el-form ref="oauthDetailsInsertVO" size="medium" label-width="200px">

          {{oauthDetailsInsertVO}}
          <el-form-item label="token有效时间">
            <el-input v-model="oauthDetailsInsertVO.accessTokenValidity" placeholder="accessTokenValidity" :style="{width: '100%'}"></el-input>
          </el-form-item>


          <el-form-item label="refreshTokenValidity">
            <el-input v-model="oauthDetailsInsertVO.refreshTokenValidity" placeholder="refreshTokenValidity" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="additionalInformation">
            <el-input v-model="oauthDetailsInsertVO.additionalInformation" placeholder="additionalInformation" :style="{width: '100%'}"></el-input>
          </el-form-item>



          <el-form-item label="authorizedGrantTypes">
            <el-input v-model="oauthDetailsInsertVO.authorizedGrantTypes" placeholder="authorizedGrantTypes" :style="{width: '100%'}"></el-input>
          </el-form-item>




          <el-form-item label="clientId" >
            <el-input v-model="oauthDetailsInsertVO.clientId" placeholder="clientId" :style="{width: '100%'}"></el-input>
          </el-form-item>


          <el-form-item label="clientname" >
            <el-input v-model="oauthDetailsInsertVO.clientname" placeholder="clientname" :style="{width: '100%'}"></el-input>
          </el-form-item>


          <el-form-item label="clientSecret" >
            <el-input v-model="oauthDetailsInsertVO.clientSecret" placeholder="clientSecret" :style="{width: '100%'}"></el-input>
          </el-form-item>

          <el-form-item label="resourceIds" >
            <el-select v-model="oauthDetailsInsertVO.resourceIdList" multiple placeholder="请选择">
              <el-option
                v-for="item in allResources"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="scope" >
            <el-input v-model="oauthDetailsInsertVO.scope" placeholder="scope" :style="{width: '100%'}"></el-input>
          </el-form-item>




          <el-form-item label="webServerRedirectUri" >
            <el-input v-model="oauthDetailsInsertVO.webServerRedirectUri" placeholder="webServerRedirectUri" :style="{width: '100%'}"></el-input>
          </el-form-item>




          <el-form-item size="large">
            <el-button @click="insertClick">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="给客户端配置接口列表"
        :visible.sync="grantApiVisible"
        width="90%"
      >
          <el-table
            :data="allapilist"
            style="width: 100%"
            @selection-change="handleSelectGrantApi"

          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="apiId"
              label="id"
            >
            </el-table-column>
            <el-table-column
              prop="apiCode"
              label="接口编码"
            >
            </el-table-column>
            <el-table-column
              prop="apiUrl"
              label="接口url">
            </el-table-column>  <el-table-column
            prop="apiName"
            label="接口名称">
          </el-table-column> <el-table-column
            prop="apiDesc"
            label="接口描述">
          </el-table-column><el-table-column
            prop="appName"
            label="所属应用">
          </el-table-column>
            <el-table-column
              label="是否授权才能访问"
            >
              <template slot-scope="scope">
                {{scope.row.needAuth === '0' ? '否':'是'}}
              </template>
            </el-table-column>
          </el-table>

        <el-divider></el-divider>
        <el-button @click="grantApiSubmit">确定授权这些接口</el-button>

      </el-dialog>
    </el-row>
  </el-row>
</template>

<script>
import * as oauthClientDetailApi from '../api/api'
import * as appController from '../../app_manage/api/api'
import * as apiController from '../../api_manage/api/api'
import * as api from "../../api_manage/api/api";

export default {
  name: "oauth_manage",
  data() {
    return {
      grantApiVisible:false,
      statusDicData:
        {
          '0':'创建',
          '1':'申请中',
          '2':'申请通过',
          '3':'申请拒绝',
        },
      grantClientApiVO:{
        'clientId':undefined,
        'apiCodeList':[],
      },
      oauthInsertVisible: false,
      tableData:[],
      allResources:[],
      allapilist:[],
      oauthDetailsInsertVO: {
        "accessTokenValidity": 4200,
        "additionalInformation": "{}",
        "authorizedGrantTypes": "authorization_code,password,refresh_token,client_credentials",
        "autoapprove": "",
        "clientId": "",
        "clientSecret": "",
        "refreshTokenValidity": 4200,
        "resourceIdList":[],
        "scope": "app",
        "webServerRedirectUri": "http://"
      }
    }
  },
  methods: {


    grantApiSubmit(){
      console.log(this.grantClientApiVO)
      oauthClientDetailApi.grantClientApi(this.grantClientApiVO).then(res=>{
        if (res.success){
          this.$message.success('授权接口成功');
          this.grantClientApiVO = {};
          this.grantApiVisible = false;
        }
      })
    },

    handleSelectGrantApi(selectApiList){
      console.log(selectApiList)
      this.grantClientApiVO.apiCodeList = [];
      for (let i = 0; i < selectApiList.length; i++) {
        var selectApiListElement = selectApiList[i];
        this.grantClientApiVO.apiCodeList.push(selectApiListElement.apiCode);
      }
    },

    grantApiClick(row){
      this.grantApiVisible = true;
      console.log(row.clientId)
      this.grantClientApiVO.clientId = row.clientId;
    },

    insertClick(){

      this.insert(this.oauthDetailsInsertVO);
      this.oauthInsertVisible = false;
    },


    list(reload){
      oauthClientDetailApi.list(reload).then(res=>{
        if (res.success){
          this.tableData = res.data.list;
        }
      })
    },

    insert(reload){
      oauthClientDetailApi.insert(reload).then(res=>{
        if (res.success){
          this.$message.success(res.message)
          this.init();
        }
      });
    },

    listAllApis(reload) {
      apiController.list(reload).then(res => {
        console.log(res)
        if (res.success) {
          console.log('allapilist',res.data)
          this.allapilist = res.data.list;
        }
      })
    },

    listAllApps() {

      appController.list({"pageable": false}).then(res=>{
        if (res.success){
          this.allResources = res.data.list;
        }
      });

    },
    init(){
      this.list({
        "pageable": false
      });
      this.listAllApis({
        "pageable": false
      });
      this.listAllApps();
    }

  },
  mounted() {
      this.init();
  }
}
</script>

<style scoped>

</style>
