<template>
  <el-row>

    <el-row>
      <el-col :span="4">
        <el-tree :data="appTreeData" :props="defaultProps" :check-strictly="true"
                 node-key="clientId"
                 :default-expanded-keys="['0']"
                 :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <el-row style="padding: 20px">
          <el-button type="primary" size="mini" @click="insertMenuVisible = true">新增</el-button>
        </el-row>
        <el-row>

          <el-tabs v-model="activeName"  >
            <el-card>
              当前客户端: <el-tag style="font-size: 16px">{{currentClient.clientname}}</el-tag>
            </el-card>
            <el-tab-pane label="树形视图" name="treeView">
              <div>
                <el-cascader-panel  :options="menuTreeData"
                                    :props="{ expandTrigger: 'hover',label:'menuName',value:'menuId' }"></el-cascader-panel>
              </div>
            </el-tab-pane>
            <el-tab-pane label="列表视图" name="listView">列表视图</el-tab-pane>
          </el-tabs>

        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-dialog
        title="提示"
        :visible.sync="insertMenuVisible"
        width="30%"
      >
        <el-form>
          <el-form-item label="所属客户端"></el-form-item>
          <el-form-item label="菜单类型">
            <el-radio-group v-model="menuInsertVO.menuType">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">页面路由</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="上级菜单"  class="transition-box"  v-if="menuInsertVO.menuType===2 || menuInsertVO.menuType===3">
              <el-cascader
                v-model="menuInsertVO.menuPidSelectIds"
                :options="menuTreeData"
                :props="{ expandTrigger: 'hover',label:'menuName',value:'menuId' ,checkStrictly: true}"
                @change="menuPidSelectIdsClick"
               ></el-cascader>
            </el-form-item>
          <el-form-item label="菜单编码" v-if="menuInsertVO.menuType===2 || menuInsertVO.menuType===1">
            <el-input v-model="menuInsertVO.menuCode"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称" v-if="menuInsertVO.menuType===2 || menuInsertVO.menuType===1">
            <el-input v-model="menuInsertVO.menuName"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" v-if="menuInsertVO.menuType===2 || menuInsertVO.menuType===1">
            <el-input v-model="menuInsertVO.menuIcon"></el-input>
          </el-form-item>

          <el-form-item label="菜单路径" v-if="menuInsertVO.menuType===2">
            <el-input v-model="menuInsertVO.menuUrl"></el-input>
          </el-form-item>


          <el-form-item label="按钮编码" v-if="menuInsertVO.menuType===3">
            <el-input v-model="menuInsertVO.menuCode"></el-input>
          </el-form-item>
          <el-form-item label="按钮名称" v-if="menuInsertVO.menuType===3">
            <el-input v-model="menuInsertVO.menuName"></el-input>
          </el-form-item>
          <el-form-item label="按钮图标" v-if="menuInsertVO.menuType===3">
            <el-input v-model="menuInsertVO.menuIcon"></el-input>
          </el-form-item>
          <el-form-item label="按钮是否可见" v-if="menuInsertVO.menuType===3">
            <el-radio-group v-model="menuInsertVO.menuVisible">
              <el-radio :label="1">可见</el-radio>
              <el-radio :label="0">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="insertMenuClick">确定</el-button>
          </el-form-item>
        </el-form>
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
      currentClient:{},
      activeName:'treeView',
      insertMenuVisible: false,
      menuList: [],
      appTreeData: [],
      menuInsertVO: {
        "menuApiIds": undefined,
        "menuCode": undefined,
        "menuIcon": undefined,
        "menuName": undefined,
        "menuPid": undefined,
        "menuPidSelectIds": [],
        "menuType": 1,
        "menuUrl": undefined,
        "menuVisible": undefined,
        "clientId": undefined
      },
      menuTreeData:[],
      clientList: [],
      defaultProps: {
        children: 'children',
        label: 'clientname',
        value: 'clientId'
      }

    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      if (data.clientId==='0')
      {
        this.$message.info('请选择具体客户端');
      }else {
        this.currentClient = data;
        this.menuInsertVO.clientId = data.clientId;
        this.listMenuTree({"menuPid": "0","clientId":data.clientId});
      }
    },
    selectClientIdChanged(clientId){
      console.log(clientId)
      this.listMenuTree({"menuPid": "0","clientId":clientId});
    },
    menuPidSelectIdsClick(selectPids){
      console.log(selectPids)
      if (selectPids && selectPids.length > 0)
      {
        this.menuInsertVO.menuPid = selectPids[selectPids.length-1];
      }
    },
    insertMenuClick() {
      this.insertMenuVisible = false;
      this.insertMenu(this.menuInsertVO);
      this.appTreeData = [];

    },


    insertMenu(reload) {
      api.insertMenu(reload).then(res => {
        this.$message.success(res.message)
        this.init();
        this.listMenuTree({"menuPid": "0","clientId":this.currentClient.clientId});
        this.menuInsertVO = {};
        this.menuInsertVO.clientId = this.currentClient.clientId;
      })
    },
    listMenuTree(reload){

      api.listMenuTree(reload).then(res=>{
        this.menuTreeData = res.data;
      });

    },
    listMenu(reload) {
      api.list(reload).then(res => {
        console.log("listmenu", res)
        if (res.success) {
          this.menuList = res.data.list;
        }
      });
    },

    listAllOauthClient() {
      api.listAllOauthClient({pageable: false}).then(res => {
        this.clientList = res.data.list;
        this.appTreeData.push({
          clientId: '0',
          clientname: '所有客户端',
          children: res.data.list
        })
      });
    },
    init() {
      this.listAllOauthClient();
      this.listMenu({pageable: false});

    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
