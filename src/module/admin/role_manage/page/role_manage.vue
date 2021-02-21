<template>
  <el-row>
    <el-row >
      <h4>角色管理</h4>
    </el-row>


    <el-row>

        <el-col :span="6">
          <el-tree :data="orgTreeData" :props="defaultProps" :highlight-current="true" :check-strictly="true"
                   node-key="id"
                   :default-expanded-keys="[0]"
                   :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
        </el-col>

      <el-col :span="17">

        <el-row style="padding: 20px;">
          <el-button type="primary" @click="insertDialogVisible = true">新增</el-button>
        </el-row>




        <el-row>
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            style="width: 100%">
            <!--<el-table-column-->
              <!--type="index"-->
              <!--width="50">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="id"
              label="主键"
            >
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="所属组织名称"
            >
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
            >
            </el-table-column>
            <el-table-column
              prop="roleCode"
              label="角色编码"
            >
            </el-table-column>
            <el-table-column
              prop="roleDesc"
              label="角色描述"
            >
            </el-table-column>
          </el-table>

        </el-row>

      </el-col>
    </el-row>


    <el-row class="dialogs">

      <el-dialog
        title="新增角色"
        :visible.sync="insertDialogVisible"
        width="70%"
      >
        <el-card>
          <el-cascader
            v-model="insertPojo.value"
            :options="orgTreeData"
            :props="{
                      children: 'children',
                      label: 'label',
                      value: 'id', checkStrictly: true
                  }"
          ></el-cascader>
        </el-card>

        <table>
          <tr>
            <td>角色名称</td>
            <td>角色编码</td>
            <td>角色描述</td>
            <td>操作</td>
          </tr>
          <tr>
            <td><input v-model="insertPojo.roleName"></input></td>
            <td><input v-model="insertPojo.roleCode"></input></td>
            <td><input v-model="insertPojo.roleDesc"></input></td>
            <td>
              <button @click="insertClick">确定</button>
            </td>
          </tr>
        </table>

      </el-dialog>

    </el-row>

  </el-row>
</template>

<script>
  import * as roleApi from '../api/api'
  import * as orgApi from '../../org_manage/api/api'

  export default {
    name: "",
    data() {
      return {
        tableLoading:false,
        insertPojo: {
          "roleCode": "",
          "roleDesc": "",
          "roleName": "",
          "orgId":'',
          value:[]
        },
        defaultProps: {
          children: 'children',
          label: 'label',
          value: 'id'
        },
        insertDialogVisible: false,
        tableData: [],
        orgTreeData: [],
      }
    },
    methods: {

      insertClick() {

        if (this.insertPojo.value && this.insertPojo.value.length > 0) {
          this.insertPojo.orgId = this.insertPojo.value[this.insertPojo.value.length - 1];
        } else {

        }

        this.insert(this.insertPojo);
      },


      handleNodeClick(data) {
        console.log(data);
        this.tableLoading = true;
        this.list(
          {
            "orgId":data.id
          }
        )


      },

      insert(reload) {
        roleApi.insert(reload).then(res => {
          this.$message.success(res.message);
          this.insertDialogVisible = false;
          this.list();
        })
      },
      list(reload) {
        roleApi.list(reload).then(res => {
          this.tableData = res.data.list;
          if (res.success) {
            this.tableLoading = false;
          }
        })
      },
      listTree() {
        orgApi.listTree({'orgPid': 0}).then(res => {
          console.log(res)
          this.orgTreeData = res.data;
        }).then(res => {
          this.getTreeData(this.orgTreeData);
        })
      },

      init() {
        this.listTree();
        this.list();
      },
      getTreeData(data) {
        // 循环遍历json数据
        for (var i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined;
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children);
          }
        }
        return data;
      }
    },
    mounted() {
      this.tableLoading = true;
      this.init();
    }
  }
</script>

<style scoped>

</style>
