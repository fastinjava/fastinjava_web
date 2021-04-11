<template>
  <el-row>
    <el-row style="padding: 20px">
     <el-col :sapn="4">请选择数据源</el-col>
      <el-col :span="15">
        <el-select v-model="genConfig.dsName" clearable placeholder="请选择数据源" @change="currentSel">
          <el-option
            v-for="(item,index) in genDsList"
            :key="index"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-button @click="codegenProduct" type="primary" :loading="fileUrlRuning">确认生成</el-button>
    </el-row>

    <el-row>
      <el-table
        :data="tableList"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        size="mini">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tableName"
          label="表名称"
         >
        </el-table-column>
    <el-table-column
          prop="comments"
          label="表注释"
          >
        </el-table-column>
    <el-table-column
          prop="engine"
          label="引擎"
         >
        </el-table-column>

        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="ziduanyulan(scope.row)">字段</el-button>
            <el-button type="text" size="small" @click="ziduanshengcheng(scope.row)">生成</el-button>
            <el-button type="text" size="small">设计</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="dialogs">


      <el-dialog
        title="生成文件下载"
        :visible.sync="fileUrlRuning"
        width="80%"
      >

        <el-link :href="fileUrl" target="_blank">点击下载</el-link>

      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="ziduanshengchengdialogVisible"
        width="80%"
      >

        <el-row>
          <h4>全局配置</h4>
          <el-row>
            <el-col :span="5">当前数据源:</el-col>
            <el-col :span="12"><el-input v-model="genConfig.dsName" disabled></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">当前表:</el-col>
            <el-col :span="12"><el-input v-model="genConfig.tableNames" disabled></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">作者</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.author"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">日期</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.dateStr"></el-input></el-col>
          </el-row>
        </el-row>
        <el-row>
          <h4>Model配置</h4>
          <el-row>
            <el-col :span="5">实体类名 modelJavaClassName：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genModelConfig.modelJavaClassName"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">实体包名 modelPackage：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genModelConfig.modelPackage"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">实体类ftl模板内容：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genModelConfig.modelTemplateContent" type="textarea" :rows="7"></el-input></el-col>
          </el-row>
        </el-row>

        <el-row>
          <h4>Mapper配置</h4>
          <el-row>
            <el-col :span="5">Mapper包名 mapperPackage：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genMapperConfig.mapperPackage"></el-input></el-col>
          </el-row>
        </el-row>

        <el-row>
          <h4>IService配置</h4>
          <el-row>
            <el-col :span="5">IService包名 servicePackage：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genServiceConfig.servicePackage"></el-input></el-col>
          </el-row>
        </el-row>


        <el-row>
          <h4>ServiceImpl配置</h4>
          <el-row>
            <el-col :span="5">ServiceImpl包名 serviceImplPackage：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genServiceImplConfig.serviceImplPackage"></el-input></el-col>
          </el-row>
        </el-row>

        <el-row>
          <h4>Controller配置</h4>
          <el-row>
            <el-col :span="5">Controller包名 controllerPackage：</el-col>
            <el-col :span="12"><el-input v-model="genConfig.genGlobalConfig.genControllerConfig.controllerPackage"></el-input></el-col>
          </el-row>
        </el-row>

        <el-row>
          <el-button size="mini" type="primary" @click="codeGenPreview">预览</el-button>
          <el-button>确认生成</el-button>
        </el-row>


      </el-dialog>
      <el-dialog
        title="字段列表"
        :visible.sync="ziduanyulandialogVisible"
        width="70%"
      >
        <el-table
          border
          :data="currentColums"
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="columnName"
            label="字段名"
            >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="注释"
            >
          </el-table-column><el-table-column
            prop="columnType"
            label="字段类型"
            >
          </el-table-column><el-table-column
            prop="javaType"
            label="Java类型"
            >
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-row>

    <el-row  class="drawers">
      <el-dialog
        title="预览结果"
        :visible.sync="ziduanshengchengpreviw"
        size="90%"
        style="padding: 20px"
        >
        <el-tabs v-model="yulanjieguomorentab">
          <el-tab-pane label="Model" name="Model">
            <el-card>
             <pre>
               {{genResult.modelRenderContent}}
             </pre>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Mapper" name="Mapper">
            <el-card>
             <pre>
               {{genResult.mapperRenderContent}}
             </pre>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="MapperXml" name="MapperXml">
            <el-card>
             <pre>
               {{genResult.mapperXmlRenderContent}}
             </pre>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Service" name="Service">
            <el-card>
             <pre>
              {{genResult.serviceRenderContent}}
             </pre>
            </el-card>


          </el-tab-pane>
          <el-tab-pane label="ServiceImpl" name="ServiceImpl">
            <el-card>
             <pre>
              {{genResult.serviceImplRenderContent}}
             </pre>
            </el-card>


          </el-tab-pane>
          <el-tab-pane label="Controller" name="Controller">
            <el-card>
             <pre>
              {{genResult.controllerRenderContent}}
             </pre>
            </el-card>


          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-row>

  </el-row>
</template>

<script>
import * as genDsController from '../api/api'

export default {
  name: "code_gen_tables",
  data() {
    return {
      fileUrlRuning:false,
      fileUrl:undefined,
      yulanjieguomorentab:'Model',
      ziduanshengchengpreviw:false,
      genConfig: {
        "dsName": "",
        "rootProjectGroupId": "org.example",
        "rootProjectArtifactId": "example",
        "moduleName": "codegendemo",
        "genGlobalConfig": {
          "author": "fastdevelopinjava",
          "dateStr": "",
          "genControllerConfig": {
            "controllerGenDesLocationDir": "",
            "controllerJavaClassName": "",
            "controllerPackage": "com.fastdevelopinjava.service.codegen.controller",
            "controllerTemplateContent": "",
            "controllerTemplateLocation": "",
            "extendsClassNames": [],
            "implmentsClassNames": [],
            "importPkgs": []
          },
          "genMapperConfig": {
            "extendsClassNames": [],
            "implmentsClassNames": [],
            "importPkgs": [],
            "mapperGenDesLocationDir": "",
            "mapperJavaClassName": "",
            "mapperPackage": "com.fastdevelopinjava.service.codegen.mapper",
            "mapperTemplateContent": "",
            "mapperTemplateLocation": ""
          },
          "genMapperXmlConfig": {
            "mapperXmlGenDesLocationDir": "",
            "mapperXmlPackage": "",
            "mapperXmlTemplateContent": "",
            "mapperXmlTemplateLocation": ""
          },
          "genModelConfig": {
            "extendsClassNames": [],
            "implmentsClassNames": [],
            "importPkgs": [],
            "lombokConfig": {
              "allargsconstructor": true,
              "builder": true,
              "data": true,
              "gstter": true,
              "noargsconstructor": true
            },
            "modelGenDesLocationDir": "",
            "modelJavaClassName": "",
            "modelPackage": "com.fastdevelopinjava.service.codegen.model",
            "modelTemplateContent": "",
            "modelTemplateLocation": ""
          },
          "genServiceConfig": {
            "extendsClassNames": [],
            "implmentsClassNames": [],
            "importPkgs": [],
            "serviceGenDesLocationDir": "",
            "serviceJavaClassName": "",
            "servicePackage": "com.fastdevelopinjava.service.codegen.service",
            "serviceTemplateContent": "",
            "serviceTemplateLocation": ""
          },
          "genServiceImplConfig": {
            "extendsClassNames": [],
            "implmentsClassNames": [],
            "importPkgs": [],
            "serviceImplGenDesLocationDir": "",
            "serviceImplJavaClassName": "",
            "serviceImplPackage": "com.fastdevelopinjava.service.codegen.service.impl",
            "serviceImplTemplateContent": "",
            "serviceImplTemplateLocation": ""
          }
        },
        "tableNames": []
      },
      genDsList: [],
      tableList: [],
      currentColums:[],
      ziduanyulandialogVisible:false,
      ziduanshengchengdialogVisible:false,
      genResult:{},
    }
  },
  methods: {

    codegenProduct(){
      this.fileUrlRuning = true;
      genDsController.generatorCodeV1(this.genConfig).then(res=>{
        if (res.success){
          this.fileUrl = res.data;
          // this.$message.success(res.data)
        }

      })
    },

    handleSelectionChange(rows) {
      this.genConfig.tableNames = [];
      for (let i = 0; i < rows.length; i++) {
        var rowElement = rows[i];
        this.genConfig.tableNames.push(rowElement.tableName)
        console.log(this.genConfig.tableNames)
        console.log(this.genConfig.dsName)
      }
    },

    codeGenPreview(){
      genDsController.codeGenPreview(this.genConfig).then(res=>{
        console.log(res)
        this.ziduanshengchengpreviw = true;
        this.genResult = res.data;
      })
    },
    ziduanshengcheng(table){
      this.ziduanshengchengdialogVisible = true;
      this.genConfig.tableNames = [];
      this.genConfig.tableNames.push(table.tableName)
    },
    ziduanyulan(table){
      this.currentColums = table.columns;
      this.ziduanyulandialogVisible = true;
    },
    currentSel(select) {
      console.log(select)
      let dsName = select;
      this.getTablesByDsName(dsName);
    },
    getTablesByDsName(dsName) {
      genDsController.getTablesByDsName(dsName).then(res => {
        if (res.success) {
          this.tableList = res.data;
        }
      })
    },
    listAllGenDsConf(reload) {
      genDsController.list(reload).then(res => {
        console.log(res)
        this.genDsList = res.data.list;
      })
    },
  },
  mounted() {
    this.listAllGenDsConf({"pageable": false});
  }
}
</script>

<style scoped>

</style>
