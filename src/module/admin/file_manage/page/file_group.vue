<template>
 <el-row>
   <el-row>
     <el-col :span="3" >

       <el-card style="border-radius: 10px;min-height: 1500px">
         <div style="display: flex;flex-direction: row;">
           <el-button size="mini" @click="addFileGroupVisible = true" >新增分组</el-button>
         </div>
         <el-divider></el-divider>
         <el-tree :data="fileGroupList" :props="{label:'groupName',value:'id'}" @node-click="handleNodeClick"></el-tree>
       </el-card>
     </el-col>
     <el-col :span="20" :offset="1">

       <el-card style="border-radius: 10px;">
         <el-button @click="uploadFileVisible = true">上传文件</el-button>
       </el-card>

       <div style="height: 20px"></div>

       <el-row>

         <el-container>

           <el-table :data="fileInfoList" size="mini" border>
             <el-table-column
               prop="fileGroupCode"
               label="fileGroupCode"
             >
             </el-table-column>
             <el-table-column
               prop="fileGroupName"
               label="fileGroupName"
             >
             </el-table-column><el-table-column
             prop="fileUploadType"
             label="fileUploadType"
           >
           </el-table-column><el-table-column
             prop="fileMd5"
             label="fileMd5"
           >
           </el-table-column><el-table-column
             prop="fileHandleType"
             label="fileHandleType"
           >
           </el-table-column><el-table-column
             prop="fileType"
             label="fileType"
           >
           </el-table-column><el-table-column
             prop="host"
             label="host"
           >
           </el-table-column><el-table-column
             prop="fileSavedNewName"
             label="fileSavedNewName"
           >
           </el-table-column><el-table-column
             prop="relativeNetPath"
             label="relativeNetPath"
           >
           </el-table-column><el-table-column
             prop="relativePhysicalPath"
             label="relativePhysicalPath"
           >
           </el-table-column>
             <el-table-column
               label="图片预览"
               width="100">
               <template slot-scope="scope">
<!--                 <el-link :href="imgPreffix + scope.row.relativeNetPath + scope.row.fileSavedNewName" target="_blank" type="primary">预览</el-link>-->

                 <el-button @click="fileInfoPreview(scope.row)">预览</el-button>

               </template>
             </el-table-column>
           </el-table>

         </el-container>

       </el-row>

     </el-col>
   </el-row>

   <el-row class="dialgos">
     <el-dialog
       title="保存文件分组信息"
       :visible.sync="addFileGroupVisible"
       width="70%"
     >
       <el-form label-width="120px" ref="fileGroupModel" :rules="fileGroupModelrules" :model="fileGroupModel">
         <el-form-item label="分组编码"  prop="groupCode">
           <el-input v-model="fileGroupModel.groupCode" ></el-input>
         </el-form-item>
         <el-form-item label="分组名称" prop="groupName">
           <el-input v-model="fileGroupModel.groupName" ></el-input>
         </el-form-item>
         <el-form-item label="">
           <el-button @click="filegroupSubmit('fileGroupModel')">确定</el-button>
           <el-button @click="$refs['fileGroupModel'].resetFields()">重置</el-button>
         </el-form-item>
       </el-form>

     </el-dialog>
     <el-dialog
       title="上传文件"
       :visible.sync="uploadFileVisible"
       width="70%"
     >



       <el-form label-width="100px">
         {{fileUploadData}}
         <el-form-item label="文件类型">
           <el-select v-model="fileUploadData.fileUploadType" placeholder="文件类型">
             <el-option
               v-for="item in [{value:'img',label:'图片文件'},{value: 'md',label: 'Markdown文件'},{value: 'vedio',label: '视频文件'}]"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="上传类型">
           <el-select v-model="fileUploadData.fileHandleType" placeholder="上传类型">
             <el-option
               v-for="item in [{value:'fast_dfs',label:'FAST_DFS'},{value:'hdfs',label:'HDFS'},{value:'file_system',label:'FS'},{value:'ftp',label:'FTP'}]"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="文件分组">


           <el-select v-model="fileUploadData.fileGroupCode" placeholder="文件分组">
             <el-option
               v-for="item in fileGroupList"
               :key="item.groupCode"
               :label="item.groupName"
               :value="item.groupCode">
             </el-option>
           </el-select>



         </el-form-item>
         <el-form-item label="">
           <el-upload class="upload-demo"
                      action="/api/fastdevelopinjava-service-filesystem/file_upload/upload"
                      :multiple="false"
                      :limit="1"
                      :data="fileUploadData"
                      name="file"
                      :on-success="uploadSuccess"
                      :before-upload="uploadBefore"
           >
             <el-button size="small" type="primary">选择上传</el-button>
           </el-upload>
         </el-form-item>
       </el-form>


     </el-dialog>
     <el-dialog
       title="文件预览"
       :visible.sync="filePreviewVisible"
       width="70%"
     >

       <el-row>
          <el-card v-if="'img' === filePreviewPojo.fileUploadType">
            <div slot="header" class="clearfix">
              <span>图片预览</span>
            </div>
            <div>
              <div class="demo-image__preview">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="'data:image/png;base64,'+filePreviewPojo.fileContent"
                >
                </el-image>
<!--                <div>-->
<!--                  <img :src="'data:image/png;base64,'+filePreviewPojo.fileContent" alt="">-->
<!--                </div>-->
              </div>
            </div>
          </el-card>
         <el-card v-if="'md' === filePreviewPojo.fileUploadType">
            Markdown文件预览
           <div>
             <v-md-editor
               ref="editor"
               :value="filePreviewPojo.fileContent"
               mode="preview"
             ></v-md-editor>
           </div>
          </el-card>
       </el-row>

     </el-dialog>
   </el-row>

 </el-row>
</template>

<script>
import * as api from '../api/api'
export default {
  name: "file_group.vue",
  components: {

  },

  data(){
    return {
      filePreviewPojo:{

      },
      mdContent:'# djlfjd',
      filePreviewVisible:false,
      imgPreffix:'http://localhost:50010/fastdevelopinjava-service-filesystem',
      uploadFileVisible:false,
      uploadBefore(file){
        console.log("uploadBefore")
      },
      fileUploadData:{
        fileUploadType:undefined,
        fileHandleType:undefined,
        fileGroupCode:undefined,
      },
      fileGroupModel:{
        "groupCode": undefined,
        "groupName": undefined

      },
      addFileGroupVisible:false,
      fileGroupList:[],
      fileInfoList:[],
      fileGroupModelrules:{

          groupCode:[
            { required: true, message: '请输入文件分组编码', trigger: 'blur' },
          ],  groupName:[
            { required: true, message: '请输入文件分组名称', trigger: 'blur' },
          ],

       }
    }
  },
  methods:{

    fileInfoPreview(row){
      this.filePreviewVisible = true;
      api.detailFileinfo(
        row.id
      ).then(res=>{
        this.filePreviewPojo = res.data;
      })
    },

    uploadSuccess(res){
      console.log(res)

      if (res.success){
        this.fileGroupModel = {};
        this.uploadFileVisible = false;
        this.$message.success('上传成功');
        this.listallfileinfo({});
      }else {
        if (res.message){
          this.$message.error(res.message);
        }
        if (res.msg){
          this.$message.error(res.msg);
        }
      }

    },

    listallfileinfo(reload){
      api.listallfileinfo(reload).then(res=>{
        if (res.success){
          this.fileInfoList = res.data;
        }
      })
    },
    saveFileGroup(){

      api.saveFileGroup(this.fileGroupModel).then(res=>{
        if (res.success){
          this.$notify({
            title:'',
            message:'保存成功'
          });
          this.addFileGroupVisible = false;
          this.fileGroupModel = {};
          this.listAllFileGroup();
        }else {
          this.$notify({
            title:'',
            message:'失败'
          });
        }
      })

    },
    filegroupSubmit(formName){
      this.saveFileGroup();
    },
    handleNodeClick(data){
      console.log(data)
      this.listallfileinfo({});
      this.$notify(
        {
          title:'当先显示分组',
          message:data.groupName
        }
      );
    },
    listAllFileGroup(){
      api.listAllFileGroup({}).then(res=>{
        if (res.success){
          this.fileGroupList = res.data;
        }
      })
    }
  },
  mounted() {

    this.listAllFileGroup();

  }
}
</script>

<style scoped>

</style>
