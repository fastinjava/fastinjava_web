<template>
  <el-row>
    <el-row style="padding: 20px;">
      <h4>组织管理</h4>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-tree :data="orgTreeData" :props="defaultProps" :highlight-current="true" :check-strictly="true"
                 node-key="id"
                 :default-expanded-keys="[0]"
                 :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="17">

        <el-row>
          {{ currentOperatorObj }}
        </el-row>

        <el-row>
          <el-button type="primary" style="padding: 10px" @click="insertClick">新增</el-button>
        </el-row>

        <el-row>
          <el-table
            :data="ortTableData"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="组织名称"
            >
            </el-table-column>
            <el-table-column
              prop="orgCode"
              label="组织编码"
            >
            </el-table-column>
            <el-table-column
              prop="orgDesc"
              label="组织描述">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="updateClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteClcik(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

      </el-col>
    </el-row>

    <el-row class="drawer">
      <el-drawer
        title="更新组织"
        :visible.sync="updateDrawer"
        :direction="direction"
      >
        <span>我来啦!</span>
      </el-drawer>

      <el-dialog
        title="提示"
        :visible.sync="insertDrawer"
        width="70%"
      >


        <el-row style="padding: 20px">

          {{insertPojo}}

          <el-form ref="insertPojoRef" :model="insertPojo" label-width="80px">
            <el-form-item label="上级组织">
              <el-cascader
                v-model="insertPojo.value"
                :options="orgTreeData"
                :props="{
                      children: 'children',
                      label: 'label',
                      value: 'id', checkStrictly: true
                  }"
              ></el-cascader>
            </el-form-item>
            <br>
            <el-form-item label="组织名称">
              <el-input v-model="insertPojo.orgName"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="组织编码">
              <el-input v-model="insertPojo.orgCode"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="组织描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="insertPojo.orgDesc"
              >
              </el-input>
            </el-form-item>
            <br>
            <el-form-item label=" ">
              <el-button type="primary" style="padding: 10px" @click="insertSubmit">确定</el-button>
              <el-button type="primary" style="padding: 10px">取消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-dialog>

    </el-row>

  </el-row>
</template>

<script>
  import * as orgApi from '../api/api'

  export default {
    name: "",
    data() {
      return {
        value: [],
        currentOperatorObj: {},
        insertPojo: {},
        updateDrawer: false,
        insertDrawer: false,
        direction: 'rtl',
        ortTableData: [],
        orgTreeData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          value: 'id'
        }
      }
    },
    methods: {


      insertSubmit() {

        if (this.insertPojo.value && this.insertPojo.value.length > 0) {
          this.insertPojo.orgPid = this.insertPojo.value[this.insertPojo.value.length - 1];
        } else {

        }
        console.log(this.insertPojo)
        this.insert(this.insertPojo)
      },

      insertClick() {
        this.insertDrawer = true;
      },

      deleteClcik(row) {
        this.currentOperatorObj = row;
        let reload = {};
        reload.orgId = row.orgId;
        reload.deleteFlag = '1';
        this.update(reload);

      },

      updateClick(row) {

        this.updateDrawer = true;

      },
      handleNodeClick(data) {
        console.log(data);
        this.$message.info(data.id);
        this.list({
          "orgPid": data.id,
          "pageable": false
        })
      },

      insert(reload) {
        orgApi.insert(reload).then(res => {

          this.$message.success('新增成功');

          this.insertDrawer = false;
          this.insertPojo = {};

          this.init();
        })
      },

      update(reload) {
        orgApi.update(reload).then(res => {
          if (res.success) {
            this.$message.info('操作成功');
            this.init();
          }
        })
      },

      list(reload) {

        orgApi.list(reload).then(res => {
          if (res.success) {
            this.ortTableData = res.data.list;
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
        this.list({
          "orgPid": 0,
          "pageable": false
        })
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
     this.init();
    }
  }
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

</style>
