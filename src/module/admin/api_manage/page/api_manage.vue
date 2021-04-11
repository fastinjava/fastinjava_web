<template>
  <el-row>



    <el-row>

    </el-row>

    <el-row>
        <el-col :span="6">
          <el-card style="min-height: 1500px">
            <el-tree :data="appTreeData" :props="defaultProps"  :check-strictly="true"
                     node-key="appId"
                     :default-expanded-keys="['0']"
                     :expand-on-click-node="false" ></el-tree>
          </el-card>
        </el-col>
      <el-col :span="17">

        <el-row style="padding: 10px;">
          <el-button type="primary" size="mini" @click="insertDialogVisible = true">新增</el-button>
          <el-button>初始化接口</el-button>
        </el-row>
        <el-row>

          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%">
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
        </el-row>


      </el-col>
    </el-row>

    <el-row>


      <el-dialog
        title="新增接口"
        :visible.sync="insertDialogVisible"
      >
        <div style="padding: 0 40px">
          <el-form ref="elForm" :model="apiInfoInsertVO" size="mini" label-width="150px">

            <el-form-item label="所属应用" prop="appId">
              <el-select v-model="apiInfoInsertVO.appId" placeholder="请选择所属应用" @change="chooseApp" style="width: 100%">
                <el-option
                  v-for="item in appList"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId"
                  :style="{width: '100%'}">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="接口基础信息筛选">
              <el-select  v-model="apiInfoInsertVO.apiUrl" placeholder="请选择所属应用" @change="selectChanged" style="width: 100%">
                <el-option
                  v-for="(item,index) in baseAllApiInfos"
                  :key="index"
                  :label="item.apiName"
                  :value="item.apiUrl"
                  :style="{width: '100%'}">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="接口编码" prop="apiCode">
              <el-input v-model="apiInfoInsertVO.apiCode" placeholder="请输入apiCode" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="接口名称" prop="apiName">
              <el-input v-model="apiInfoInsertVO.apiName" placeholder="请输入apiName" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="接口描述" prop="apiDesc">
              <el-input v-model="apiInfoInsertVO.apiDesc" placeholder="请输入apiDesc" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>

            <el-form-item label="是否授权登录" prop="needAuth">
              <el-switch
                v-model="apiInfoInsertVO.needAuth"
                active-color="green"
                inactive-color="grey"
                active-value="1"
                inactive-value="0">
              </el-switch>{{apiInfoInsertVO.needAuth==='0'?'否':'是'}}
            </el-form-item>
            <el-form-item label="接口地址" prop="apiUrl">
              <el-input v-model="apiInfoInsertVO.apiUrl" placeholder="请输入apiUrl" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" icon="el-icon-check" size="mini" @click="insertSubmitClick"> </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

    </el-row>

  </el-row>
</template>

<script>
  import * as api from '../api/api'

  export default {
    name: "",
    data() {
      return {
        currentChooseApi:{
          value:undefined

        },
        baseAllApiInfos:[],
        appTreeData:[],
        appList:[],
        tableData: [],
        insertDialogVisible: false,
        apiInfoInsertVO: {
          "apiCode": "",
          "apiName": "",
          "apiDesc": "",
          "appId": undefined,
          "needAuth": "0",
          "apiUrl": ""
        },
        defaultProps: {
          children: 'children',
          label: 'appName',
          value: 'appId'
        }

      }
    },
    methods: {
      selectChanged(value){
        console.log(value)

        var baseAllApiInfos = this.baseAllApiInfos;
        for (let i = 0; i < baseAllApiInfos.length; i++) {
          var baseAllApiInfo = baseAllApiInfos[i];
          if (baseAllApiInfo.apiUrl === value){
            console.log(baseAllApiInfo)
            this.apiInfoInsertVO.apiCode = baseAllApiInfo.apiCode;
          }
        }

      },
      chooseApp(param){
        console.log(param)
        api.listallApi(param).then(res=>{
          if (res.success){
            this.baseAllApiInfos = res.data;
          }
        })
      },
      insertSubmitClick() {
        this.insertDialogVisible = false;
        this.insertSelective(this.apiInfoInsertVO);

      },

      insertSelective(reload) {
        api.insertSelective(reload).then(res => {
          if (res.success) {
            this.$message.success('新增成功');
          }
        }).then(res=>{
          this.list({pageable:false});
        });
      },

      listAllApiBaseInfo(reload){
        api.listAllApiBaseInfo(reload).then(res=>{
          console.log(res);
          if (res.success){
            this.baseAllApiInfos = res.data;
          }
        });
      },

      listAllApps(){
        api.listAllApplication({pageable:false}).then(res=>{
          if (res.success) {
            this.appList = res.data.list
            this.appTreeData.push({
              appId:'0',
              appName:'所有应用',
              children: res.data.list
            })
          }
        })
      },
      list(reload) {
        api.list(reload).then(res => {
          console.log(res)
          if (res.success) {
            this.tableData = res.data.list;
          }
        })
      },
      init() {

        this.list({pageable:false});
        this.listAllApps();

      },

    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
