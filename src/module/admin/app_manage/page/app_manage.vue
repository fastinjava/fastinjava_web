<template>
  <el-row>
    <el-row style="padding: 20px;">
      <h4>资源管理</h4>
    </el-row>


    <el-row >
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">


        <el-row style="padding: 20px">

          <el-button type="primary" @click="insertDialogVisible = true">新增</el-button>

        </el-row>
        <el-row >



            <el-table
              v-loading="tableLoading"
              :data="tableData"

            >
              <!--<el-table-column-->
              <!--type="index"-->
              <!--width="50">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="appId"
                label="主键"
              >
              </el-table-column>
              <el-table-column
                prop="appName"
                label="资源名称"
              >
              </el-table-column>
              <el-table-column
                prop="appCode"
                label="资源编码"
              >
              </el-table-column>
              <el-table-column
                label="资源类型"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{scope.row.appType ==='1'?'客户端':'服务端'}}
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--label="是否支持https"-->
              <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--<el-button type="text" size="small">{{scope.row.appHttps ===0?'否':'是'}}</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="appHost"-->
              <!--label="主机名"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="appPort"-->
              <!--label="端口号"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="appContext"-->
              <!--label="资源路径"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <el-table-column
                label="资源地址"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                    {{scope.row.appHttps ===0?'http://':'https://'}}{{scope.row.appHost}}:{{scope.row.appPort}}/{{scope.row.appContext}}
                </template>
              </el-table-column>
              <el-table-column
                prop="appDesc"
                label="资源描述"
              >
              </el-table-column>
            </el-table>


        </el-row>

      </el-col>
    </el-row>


    <el-row class="dialog">
      <el-dialog
        title="新增资源"
        :visible.sync="insertDialogVisible"
        width="95%"
        >

        <table>
          <tr>
            <th>资源名称</th>
            <th>资源编码</th>
            <th>资源描述</th>
            <th>资源类型</th>
            <th>是否支持https</th>
            <th>主机名</th>
            <th>端口号</th>
            <th>资源基础路径</th>
            <th>操作</th>
          </tr>

          <tr>
            <td><el-input  v-model="appInsertPojo.appName"/></td>
            <td><el-input v-model="appInsertPojo.appCode"/></td>
            <td><el-input v-model="appInsertPojo.appDesc"/></td>
            <td><el-input v-model="appInsertPojo.appType"/></td>
            <td><el-input v-model="appInsertPojo.appHttps"/></td>
            <td><el-input v-model="appInsertPojo.appHost"/></td>
            <td><el-input v-model="appInsertPojo.appPort"/></td>
            <td><el-input v-model="appInsertPojo.appContext"/></td>
            <td><button @click="insertClick">确定</button></td>
          </tr>
          
        </table>

      </el-dialog>
    </el-row>

  </el-row>
</template>

<script>
  import * as appApi from '../api/api'

  export default {
    name: "",
    data() {
      return {
        tableLoading:false,
        tableData: [],
        insertDialogVisible:false,
        appInsertPojo:{
          "appName": "",
          "appCode": "",
          "appDesc": "",
          "appType": "",
          "deleteFlag": "",
          "appHttps": 0,
          "appHost": "",
          "appContext": "",
          "appPort": 8080,
        },
      }
    },
    methods: {


      insertClick(){

        this.insertApp(this.appInsertPojo);
        this.insertDialogVisible = false;
        this.appInsertPojo  = {};
      },
      insertApp(reload){
        appApi.insert(reload).then(res=>{
          this.$message.success(res.message);
          this.init();
        })
      },
      list(reload) {
        this.tableLoading = true;
        appApi.list(reload).then(res => {
          if (res.success) {
            this.tableData = res.data.list;
            this.tableLoading = false;
          }
        })
      },

      init() {

        this.list(
          {
            "pageable": false
          }
        );

      },

    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
