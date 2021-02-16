<template>
  <el-row>
    <el-row style="padding: 20px;"><h1>组织管理</h1></el-row>

    <el-row>
      <el-col :span="6">

        <el-tree :data="orgTreeData" :props="defaultProps"  :highlight-current="true"  :check-strictly="true" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>

      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import * as orgApi from '../api/api'

  export default {
    name: "",
    data() {
      return {
        orgTreeData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          value: 'id'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      listTree() {
        orgApi.listTree({'orgPid': 0}).then(res => {
          console.log(res)
          this.orgTreeData = res.data;
        })
      }
    },
    mounted() {
      this.listTree();
    }
  }
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

</style>
