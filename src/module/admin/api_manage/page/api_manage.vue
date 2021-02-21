<template>
  <el-row>



    <el-row>

    </el-row>



    <el-row>
      <el-col :span="6">
        <el-tree :data="appList" :props="defaultProps"  :check-strictly="true"
                 node-key="appId"
                 :default-expanded-keys="['0']"
                 :expand-on-click-node="false" ></el-tree>
      </el-col>
      <el-col :span="17">

        <el-row style="padding: 10px;">
          <el-button @click="insertDialogVisible = true">新增</el-button>
        </el-row>
        <el-row>

          <el-table
            :data="tableData"
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
            prop="appId"
            label="所属应用">
          </el-table-column><el-table-column
            prop="needAuth"
            label="是否授权才能访问">
          </el-table-column>
          </el-table>
        </el-row>


      </el-col>
    </el-row>

    <el-row>


      <el-dialog
        title="提示"
        :visible.sync="insertDialogVisible"
      >
        <div>
          <el-form ref="elForm" :model="apiInfoInsertVO" size="medium" label-width="100px">
            <el-form-item label="apiCode" prop="apiCode">
              <el-input v-model="apiInfoInsertVO.apiCode" placeholder="请输入apiCode" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="apiName" prop="apiName">
              <el-input v-model="apiInfoInsertVO.apiName" placeholder="请输入apiName" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="apiDesc" prop="apiDesc">
              <el-input v-model="apiInfoInsertVO.apiDesc" placeholder="请输入apiDesc" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="appId" prop="appId">
              <el-input v-model="apiInfoInsertVO.appId" placeholder="请输入appId" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="needAuth" prop="needAuth">
              <el-switch
                v-model="apiInfoInsertVO.needAuth"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-value="1"
                inactive-value="0">
              </el-switch>{{apiInfoInsertVO.needAuth==='0'?'否':'是'}}
            </el-form-item>
            <el-form-item label="apiUrl" prop="apiUrl">
              <el-input v-model="apiInfoInsertVO.apiUrl" placeholder="请输入apiUrl" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" icon="el-icon-check" size="mini" @click="insertSubmitClick"> 确定</el-button>
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
        appList:[],
        tableData: [],
        insertDialogVisible: false,
        apiInfoInsertVO: {
          "apiCode": "",
          "apiName": "",
          "apiDesc": "",
          "appId": 1,
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

      insertSubmitClick() {
        this.insertDialogVisible = false;
        this.insertSelective(this.apiInfoInsertVO);
        this.list({pageable:false});
      },

      insertSelective(reload) {
        api.insertSelective(reload).then(res => {
          if (res.success) {
            this.$message.success('新增成功');
          }
        })
      },


      listAllApps(){
        api.listAllApplication({pageable:false}).then(res=>{
          if (res.success) {
            this.appList.push({
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
