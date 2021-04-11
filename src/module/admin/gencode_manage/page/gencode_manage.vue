<template>
  <div>
    <el-row>
      <el-tag>数据源类型暂时只支持MySQL</el-tag>
    </el-row>
    <el-row>
      <el-table
        :data="tableDta"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="jdbcUrl">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import * as genDsController from '../api/api'
export default {
  name: "gencode_manage.vue",
  data(){
    return{
      tableDta:[]
    }
  },
  methods:{
    list(reload){
      genDsController.list(reload).then(res=>{
        console.log(res)
        this.tableDta = res.data.list;
      })
    },
  },
  mounted() {
    this.list({"pageable":false});
  }
}
</script>

<style scoped>

</style>
